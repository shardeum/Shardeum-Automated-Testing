
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERCTest", function () {


  it("DeployERC20", function () {
    return new Promise<void>(async function (resolve) {
      const erc20 = await ethers.deployContract("TestToken", []);
      const erc20Result = await erc20.waitForDeployment();
      if (erc20Result && erc20Result.target) {
        console.log("ERC20 Deployed At ", erc20Result.target)
      }
      expect(erc20Result.target).to.not.equal(null);
      resolve()
    });
  });


  it("Deploy ERC721", function () {
    return new Promise<void>(async function (resolve) {
      const contract = await ethers.deployContract("TestNFT", []);
      const contractResult = await contract.waitForDeployment();
      if (contractResult && contractResult.target) {
        console.log("Contract Deployed At ", contractResult.target)
      }
      expect(contractResult.target).to.not.equal(null);
      resolve()
    });
  });





  it("DeployERC1155", function () {
    return new Promise<void>(async function (resolve) {
      const contract = await ethers.deployContract("RockPaperScissors", []);
      const contractResult = await contract.waitForDeployment();
      if (contractResult && contractResult.target) {
        console.log("Contract Deployed At ", contractResult.target)
      }
      expect(contractResult.target).to.not.equal(null);
      resolve()

    });

  });


});
