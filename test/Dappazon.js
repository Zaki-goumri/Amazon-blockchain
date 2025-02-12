const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dappazon", function () {
    let Dappazon, contractDeployed
    , owner, addr1, addr2;

    beforeEach(async function () {
        Dappazon = await ethers.getContractFactory("Dappazon");
        [owner, addr1, addr2] = await ethers.getSigners();
        contractDeployed
         = await Dappazon.deploy();
        await contractDeployed
        .deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await contractDeployed
            .owner()).to.equal(owner.address);
        });
    });

    describe("Add Product", function () {
        it("Should add a product", async function () {
            await contractDeployed
            .addProduct("Product1", 100, "Category1", "Image1", 10);
            const product = await contractDeployed
            .getProduct(0);
            expect(product.name).to.equal("Product1");
            expect(product.price).to.equal(100);
            expect(product.category).to.equal("Category1");
            expect(product.stock).to.equal(10);
        });

        it("Should emit ProductAdded event", async function () {
            await expect(contractDeployed
            .addProduct("Product1", 100, "Category1", "Image1", 10))
                .to.emit(contractDeployed
                , "ProductAdded")
                .withArgs("Product1", 100, "Category1", 10);
        });

        it("Should only allow owner to add product", async function () {
            await expect(
                contractDeployed
                .connect(addr1).addProduct("Product1", 100, "Category1", "Image1", 10)
            ).to.be.revertedWith("Only the owner can do it");
        });
    });

    describe("Buy Product", function () {
        beforeEach(async function () {
            await contractDeployed
            .addProduct("Product1", 100, "Category1", "Image1", 10);
        });

        it("Should allow buying a product", async function () {
            await contractDeployed
            .connect(addr1).buyProduct(0, 1, { value: 100 });
            const product = await contractDeployed
            .getProduct(0);
            expect(product.stock).to.equal(9);
        });

        it("Should revert if not enough funds", async function () {
            await expect(
                contractDeployed
                .connect(addr1).buyProduct(0, 1, { value: 50 })
            ).to.be.revertedWith("Not enough funds");
        });

        it("Should revert if product does not exist", async function () {
            await expect(
                contractDeployed
                .connect(addr1).buyProduct(3, 1, { value: 100 })
            ).to.be.revertedWith("Product does not exist");
        });

        it("Should revert if not enough stock", async function () {
            await expect(
                contractDeployed
                .connect(addr1).buyProduct(0, 11, { value: 1100 })
            ).to.be.revertedWith(" there no products ");
        });
    });

    describe("Withdraw", function () {
        beforeEach(async function () {
            await contractDeployed
            .addProduct("Product1", 100, "Category1", "Image1", 10);
            await contractDeployed
            .connect(addr1).buyProduct(0, 1, { value: 100 });
        });

        it("Should allow owner to withdraw funds", async function () {
            const initialBalance = await ethers.provider.getBalance(owner.address);
            const tx = await contractDeployed.withdraw();
            const receipt = await tx.wait();
            const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);
            const finalBalance = await ethers.provider.getBalance(owner.address);
            expect(finalBalance).to.be.above(initialBalance.sub(gasUsed));
        });

        it("Should only allow owner to withdraw", async function () {
            await expect(contractDeployed
            .connect(addr1).withdraw()).to.be.revertedWith("Only the owner can do it");
        });
    });
});