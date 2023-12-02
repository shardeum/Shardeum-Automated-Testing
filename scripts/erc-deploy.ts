import { ethers } from "hardhat";
import config from "../config";

function sleep(time: number) {
  console.log("Sleeping for ", time / 1000, "seconds")
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function main() {

    // ERC20
    console.log("\n\n\n\n\n=========== Deploying ERC20 ===========")
    const erc20Token = await ethers.deployContract("TestToken", [],);
    await erc20Token.waitForDeployment();
    await sleep(config.SLEEP_TIME)
    console.log(`=========== ERC20 deployed to ${erc20Token.target} ===========`)


    // ERC721
    console.log("\n\n\n\n\n=========== Deploying ERC721 ===========")
    const erc721Token = await ethers.deployContract("TestNFT", [],);
    await erc721Token.waitForDeployment();
    await sleep(config.SLEEP_TIME)

    console.log(`=========== ERC721 deployed to ${erc721Token.target} ===========`)



    // ERC720
    console.log("\n\n\n\n\n=========== Deploying ERC1155 ===========")
    const erc1155Token = await ethers.deployContract("RockPaperScissors", [],);
    await erc1155Token.waitForDeployment();
    // await sleep(config.SLEEP_TIME)

    console.log(`=========== ERC1155 deployed to ${erc1155Token.target} ===========`)

    
    
    
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});