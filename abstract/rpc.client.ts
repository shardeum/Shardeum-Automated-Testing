
import axios from "axios";

export class RPCClient {
    private rpcUrl: string;

    constructor(_url: string) {
        this.rpcUrl = _url;

    }


   async callApi(functionName: string, params?: any) {
        const payload ={
            "jsonrpc":"2.0",
            "method":functionName,
            "params":params?params:[],
            "id":1
        }
       const resp = await axios.post(this.rpcUrl, payload)
       return resp.data.result
    }



}