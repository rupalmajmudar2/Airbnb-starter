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
        }/*,
        {
            path: "favResturants.json",
            content: {
                one: "Red Lobster",
                two: "Chipotle", 
                three: "Chic-Fil-A"
            },
        },*/
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    console.log(response.result)
}

uploadToIpfs();