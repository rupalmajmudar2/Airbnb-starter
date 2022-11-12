const Moralis = require("moralis/node");
const M2 = require('moralis');
const { EvmChain } = require('@moralisweb3/evm-utils');
const fs = require("fs"); 

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: "FIWOgUq0h8S4DJYatUJ7Ii425kbaqCd9qjtfGzDt",
        serverUrl: "https://dazx73hqzmpc.usemoralis.com:2053/server",
        appId: "1HI0HUzgFNDiBKGgG9X70W7Ca20afpy7JuVQss58"
    });

    const uploadArray = [
        {
            path: "rm.png",
            content: fs.readFileSync('C:\\Users\\rupal\\work\\repos\\Airbnb-starter\\src\\images\\airbnb.png', {encoding: 'base64'})
        },
        {
            path: "rm2.png",
            content: fs.readFileSync('C:\\Users\\rupal\\work\\repos\\Airbnb-starter\\src\\images\\frontpagebg.png', {encoding: 'base64'})
        },
        {
            path: "rm3.png",
            content: fs.readFileSync('C:\\Users\\rupal\\work\\repos\\Airbnb-starter\\src\\images\\frontpagebg2.png', {encoding: 'base64'})
        }
    ];

    //Until the Moralis call works, use this string with https://docs.moralis.io/reference/uploadfolder to upload into Ipfs. [Select IpfsUploader.js RunOrDebug and breakpoint here]
    const first_img_base64 = uploadArray[0].content; //https://ipfs.moralis.io:2053/ipfs/Qme8xAgPoUdSuLuZ5HqjYiKjQWJnyjWC7zuMYtSpQGDZov/rm.png
    const second_img_base64 = uploadArray[1].content; //https://ipfs.moralis.io:2053/ipfs/QmecVFyZiDxko9SyEXL2J1qFnrb2AowbZP1NQRFyGUgxwh/rm2.png
    const third_img_base64 = uploadArray[2].content; //https://ipfs.moralis.io:2053/ipfs/QmWkb41tJdv51rvQJK1yZRFwrbvyH2Ys32s4b2q8ct9kXi/rm3.png"
  
    //And to fetch the images:
    //Works! https://gateway.moralisipfs.com/ipfs/Qme8xAgPoUdSuLuZ5HqjYiKjQWJnyjWC7zuMYtSpQGDZov/rm.png


    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    console.log(response.result)
}

uploadToIpfs();