import { ethers } from "hardhat";
import config from "../config";

const { expect } = require("chai");

const getDeadline = () => {
    return Math.floor(Date.now() / 1000) + 90000
}
function sleep(time: number) {
    console.log("Sleeping for ", time / 1000, "seconds")
    return new Promise((resolve) => setTimeout(resolve, time));
}
describe("AMMTest", function () {


    it("Mint Tokens", async function () {
        await sleep(10000)

        const testToken = await ethers.getContractAt("TestToken", config.TEST_TOKEN_ADDRESS);
        const mintAmount = "1000000000000000000000" // 1000 tokens
        const mintResp = await testToken.mint(mintAmount);
        await mintResp.wait()
        expect(mintResp.hash).to.not.equal(null);
        expect(mintResp.hash).to.not.equal(undefined);
    });

    it("ERC20 Approval", async function () {
        await sleep(10000)
        const testToken = await ethers.getContractAt("TestToken", config.TEST_TOKEN_ADDRESS);
        const testTokenAmount = "1000000000000000000000000000" // 100000 tokens
        const resp = await testToken.approve(config.ROUTER_ADDRESS, testTokenAmount);
        await resp.wait()
        expect(resp.hash).to.not.equal(null);
        expect(resp.hash).to.not.equal(undefined);


    });

    it("Add Liquidity Tokens", async function () {
        await sleep(10000)

        const [owner] = await ethers.getSigners();
        const routerInstance = await ethers.getContractAt("UniswapV2Router02", config.ROUTER_ADDRESS);
        const testTokenAmount = "1000000000000000000000" // 1000 tokens

        
        const resp = await routerInstance.addLiquidityETH(
            config.TEST_TOKEN_ADDRESS,
            testTokenAmount,
            "0",
            "0",
            owner.address,
            getDeadline(), {
            value: ethers.parseEther("0.001"),
        }
        );
        await resp.wait()

        expect(resp.hash).to.not.equal(null);
        expect(resp.hash).to.not.equal(undefined);



    });

    it("SWAP TEST Token TO SHM", async function () {
        await sleep(10000)

        const [owner] = await ethers.getSigners();

        const routerInstance = await ethers.getContractAt("UniswapV2Router02", config.ROUTER_ADDRESS);
        const tokenToSHMAmount = "1000000000000000000" // 1 tokens
        const resp2 = await routerInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenToSHMAmount,
            "0",
            [config.TEST_TOKEN_ADDRESS, config.WETH],

            owner.address,
            getDeadline()
        );
        await resp2.wait()
        await sleep(4000)

        expect(resp2.hash).to.not.equal(null);
        expect(resp2.hash).to.not.equal(undefined)

    });

    it("SWAP SHM TO TEST Token", async function () {
        await sleep(10000)

        const [owner] = await ethers.getSigners();
        const routerInstance = await ethers.getContractAt("UniswapV2Router02", config.ROUTER_ADDRESS);
        const ethAmount = "1000000000000000" // 0.001 ETH


        const resp = await routerInstance.swapExactETHForTokensSupportingFeeOnTransferTokens(
            "0",
            [config.WETH, config.TEST_TOKEN_ADDRESS,],
            owner.address,
            getDeadline(),
            {
                value: ethAmount
            }
        );
        await resp.wait()

        expect(resp.hash).to.not.equal(null);
        expect(resp.hash).to.not.equal(undefined);



    });


});