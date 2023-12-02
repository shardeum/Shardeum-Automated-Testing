import { ethers } from "hardhat";
import config from "../config";


function sleep(time: number) {
  console.log("Sleeping for ", time / 1000, "seconds")
  return new Promise((resolve) => setTimeout(resolve, time));
}

const getDeadline = () => {
  return Math.floor(Date.now() / 1000) + 90000
}



const makeTxn = async (txnName: string, contract: any, functionName: string, params: any) => {
  console.log("\n\n")
  console.log(`=========== Making ${txnName} Transaction ===========`)
  try {
    const resp = await contract[functionName](...params);
    console.log(`${txnName}-hash`, resp.hash)
    await sleep(config.SLEEP_TIME)
  } catch (err) {
    console.error("xxxxxxxxxxx ", txnName, "Failed", " xxxxxxxxxxx")
    console.error(err)
  }
  console.log(`=========== ${txnName} Done ===========`)
  console.log("\n\n\n\n\n")


}

async function main() {

  const testToken = await ethers.getContractAt("TestToken", config.TEST_TOKEN_ADDRESS)
  const [owner] = await ethers.getSigners();
  const routerInstance = await ethers.getContractAt("UniswapV2Router02", config.ROUTER_ADDRESS);
  const factoryInstance = await ethers.getContractAt("IUniswapV2Factory", await routerInstance.factory());



  // Minting 
  const mintAmount = "1000000000000000000000" // 1000 tokens
  await makeTxn("mint token", testToken, "mint", [mintAmount])



  // Approval
  const testTokenAmount = "10000000000000000000000" // 100000 tokens
  await makeTxn("approve token", testToken, "approve", [config.ROUTER_ADDRESS, testTokenAmount])

  //===========================



  // Add Liquidity
  const liquidtyAmount = "10000000000000000000" // 10 tokens
  await makeTxn("add liquidity", routerInstance, "addLiquidityETH", [config.TEST_TOKEN_ADDRESS,
    liquidtyAmount,
    "0",
    "0",
  owner.address,
  getDeadline(), {
    value: ethers.parseEther("0.008"),
  }])
  //===========================


  // SWAP TOKEN TO SHM  
  const tokenToSHMAmount = "1000000000000000000" // 1 tokens

  await makeTxn(" TOKEN TO SHM SWAP", routerInstance, "swapExactTokensForETHSupportingFeeOnTransferTokens", [
    tokenToSHMAmount,
    "0",
    [config.TEST_TOKEN_ADDRESS, config.WETH],
    owner.address,
    getDeadline()])

  //===========================



  // SHM TO TOKEN SWAP

  const ethAmount = "1000000000000000" // 0.001 ETH


  await makeTxn(" SHM TO TOKEN SWAP", routerInstance, "swapExactETHForTokensSupportingFeeOnTransferTokens", [

    "0",
    [config.WETH, config.TEST_TOKEN_ADDRESS],
    owner.address,
    getDeadline(),
    {
      value: ethAmount
    }
  ])

  //===========================






  // APPROVE LP TOKEN 

  const pairAddress = await factoryInstance.getPair(config.TEST_TOKEN_ADDRESS, config.WETH);
  const pairContract = await ethers.getContractAt("TestToken", pairAddress);
  const lpBalance = await pairContract.balanceOf(owner.address);

  await makeTxn("approve lp token", pairContract, "approve", [config.ROUTER_ADDRESS, lpBalance])
 
  //===========================


  // REMOVE LIQUIDITY

  await makeTxn("REMOVE LIQUIDITY", routerInstance, "removeLiquidityETHSupportingFeeOnTransferTokens", [
    config.TEST_TOKEN_ADDRESS,
    lpBalance,
    "0",
    "0",
    owner.address,
    getDeadline(),

  ])

  //===========================


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
