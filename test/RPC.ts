
import { expect } from "chai";
import { ethers } from "hardhat";
import { RPCClient } from "../abstract/rpc.client";


require('dotenv').config();

describe("RPCTest", function () {

  let rpcClient: RPCClient;
  let currentBlockNumber: number;
  let blockHash: string | undefined | null
  const RPC = process.env.RPC;

  if (!RPC) {
    throw new Error("Provide RPC like RPC=https://rpc.com")
  }
  let privateKey: any;

  this.beforeAll(async () => {
    rpcClient = new RPCClient(RPC);
    const pvtKeyFromENV = process.env.PRIVATE_KEY
    if (pvtKeyFromENV) {
      privateKey = Buffer.from(pvtKeyFromENV, "hex");
    } else {
      throw new Error("Provide PrivateKey in .env")
    }
  })


  it("Get Web3 Client Version::web3_clientVersion", async function () {
    const resp = await rpcClient.callApi("web3_clientVersion", [])
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);

  });



  it('Get Current Block Number::eth_blockNumber', async function () {
    const resp = await ethers.provider.getBlockNumber()
    currentBlockNumber = parseInt(resp.toString())
    expect(currentBlockNumber).to.greaterThan(0)
  });


  it('Get Block By Number::eth_getBlockByNumber', async () => {
    const resp = await ethers.provider.getBlock(currentBlockNumber)
    if (resp) {
      blockHash = resp?.hash
    }
    expect(resp?.hash).to.not.equal(null);
    expect(resp?.hash).to.not.equal(undefined);
  });

  it('Get Block By Hash::eth_getBlockByHash', async () => {
    //@ts-ignore
    const resp = await ethers.provider.getBlock(blockHash)
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Block Transaction Count By Hash::eth_getBlockTransactionCountByHash', async () => {

    const resp = await rpcClient.callApi("eth_getBlockTransactionCountByHash", [blockHash])
    const counts = Number(resp)
    expect(counts).to.not.NaN
  });




  it('Get Block Transaction Count By Number::eth_getBlockTransactionCountByNumber', async () => {
    const resp = await rpcClient.callApi("eth_getBlockTransactionCountByNumber", [currentBlockNumber])
    const counts = Number(resp)
    expect(counts).to.not.NaN
  });






  it('Get Transaction By Block Number and Index::eth_getTransactionByBlockNumberAndIndex', async () => {
    const resp = await rpcClient.callApi("eth_getTransactionByBlockNumberAndIndex", [
      currentBlockNumber.toString(16),
      "0x0"
      ,])
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Transaction By Block Hash and Index::eth_getTransactionByBlockHashAndIndex', async () => {

    const resp = await rpcClient.callApi("eth_getTransactionByBlockHashAndIndex", [
      blockHash,
      "0x0"
      ,])
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get ETH Mining::eth_mining', async () => {
    const resp = await rpcClient.callApi("eth_mining", [])
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get ETH HashRate::eth_hashrate', async () => {
    const resp = await rpcClient.callApi("eth_hashrate", [])
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });

  it('Get Gas Price::eth_gasPrice', async () => {
    const resp = await ethers.provider.getFeeData()
    expect(Number(resp.gasPrice)).greaterThan(0)
  });


  it('Get New Pending Txn Filter::eth_newPendingTransactionFilter', async () => {
    const resp = await rpcClient.callApi("eth_newPendingTransactionFilter", [
    ]);
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Filter Changes::shh_getFilterChanges', async () => {

    const resp = await rpcClient.callApi("shh_getFilterChanges", [
    ]); 

    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Work::eth_getWork', async () => {

    const resp = await rpcClient.callApi("eth_getWork", [
    ]);

    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get New Block Filter::eth_newBlockFilter', async () => {

    const resp = await rpcClient.callApi("eth_newBlockFilter", [
    ]);

    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);

  });



  it('Get Filter Logs::eth_getFilterLogs', async () => {

    const resp = await rpcClient.callApi("eth_getFilterLogs", [
      "0x7"
    ]);

    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });



  it('Get Filter Logs::eth_getstorageat', async () => {

    const resp = await ethers.provider.getStorage("0xeca7c18438c86f63cc8a56f376da97fd77ccc365", "0")

    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Code::eth_getCode', async () => {
    const resp = await ethers.provider.getCode("0xeca7c18438c86f63cc8a56f376da97fd77ccc365")
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });



  it('Get Balance::eth_getBalance', async () => {
    const resp = await ethers.provider.getBalance("0x8eddaa6dbe79550899804ea2aa346e1b9488243f")

    expect(resp.toString()).to.not.equal(null);
    expect(resp.toString()).to.not.equal(undefined);

  });


  // it('Get Balance::eth_getLogs', async () => {
  //   const resp = await rpcClient.callApi("eth_getLogs", []);
  //   expect(resp).to.not.equal(null);
  //   expect(resp).to.not.equal(undefined);
  // });



  it('Estimate Gas::eth_estimateGas', async () => {
    const gasAmount = await ethers.provider.estimateGas({
      to: process.env.WALLET_ADDRESS,
      from: process.env.TO_ADDRESS,
      value: "1000000000"
    });
    expect(gasAmount.toString()).to.not.equal(null);
    expect(gasAmount.toString()).to.not.equal(undefined);


  });


  it('Send Raw Txn ::eth_sendRawTransaction', async () => {
    const toAddress: string = process.env.TO_ADDRESS ? process.env.TO_ADDRESS : ""
    const [owner] = await ethers.getSigners();

    const txn = await owner.sendTransaction({
      to: toAddress,
      value: ethers.parseEther("0.0000000001")
    });

    expect(txn.hash).to.not.equal(null);
    expect(txn.hash).to.not.equal(undefined);



  });


  it('Get Txn by Hash ::eth_getTransactionByHash', async () => {
    const txnHash = "0x0e95c3674e155ec39a1fe0af4325f741dc4915d470f72a9fc00567b72767dfde"
    // remarks returns null if txn is too old
    const resp = await ethers.provider.getTransaction(txnHash)
    console.log({ resp })
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });


  it('Get Txn Receipt ::eth_getTransactionReceipt', async () => {
    const txnHash = "0x0e95c3674e155ec39a1fe0af4325f741dc4915d470f72a9fc00567b72767dfde"

    const resp = await ethers.provider.getTransactionReceipt(txnHash)
    console.log({ resp })
    expect(resp).to.not.equal(null);
    expect(resp).to.not.equal(undefined);
  });

});
