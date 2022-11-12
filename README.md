# Airbnb-Starter
https://academy.moralis.io/lessons/what-are-we-going-to-build
git clone https://github.com/IAmJaysWay/Airbnb-starter.git
cd .\Airbnb-starter\
yarn

To start the server: yarn start  then go to http://localhost:3000/

Full code: https://github.com/MoralisWeb3/youtube-tutorials/tree/main/AirBNB_Decentral

Web3 UI Kit:
https://github.com/web3ui/web3uikit
https://web3ui.github.io/web3uikit/
https://moralis.io/web3ui-kit-the-ultimate-web3-user-interface-kit/


IpfsUploader:
https://moralis.io/how-to-upload-files-to-ipfs-full-guide/
New: https://docs.moralis.io/docs/how-to-upload-a-folder-to-ipfs
npm i @moralisweb3/core @moralisweb3/evm-api
npm install @moralisweb3/evm-utils
npm install Moralis.EvmApi  


C:\Users\rupal\work\repos\Airbnb-starter\src\pages> node IpfsImageUploader.js
//Until the Moralis call works, use this string with https://docs.moralis.io/reference/uploadfolder to upload into Ipfs. [Select IpfsUploader.js RunOrDebug and breakpoint here]
    const first_img_base64 = uploadArray[0].content; //https://ipfs.moralis.io:2053/ipfs/Qme8xAgPoUdSuLuZ5HqjYiKjQWJnyjWC7zuMYtSpQGDZov/rm.png
    const second_img_base64 = uploadArray[1].content; //https://ipfs.moralis.io:2053/ipfs/QmecVFyZiDxko9SyEXL2J1qFnrb2AowbZP1NQRFyGUgxwh/rm2.png
    const third_img_base64 = uploadArray[2].content; //https://ipfs.moralis.io:2053/ipfs/QmWkb41tJdv51rvQJK1yZRFwrbvyH2Ys32s4b2q8ct9kXi/rm3.png"
  
    //And to fetch the images:
    //Works! https://gateway.moralisipfs.com/ipfs/Qme8xAgPoUdSuLuZ5HqjYiKjQWJnyjWC7zuMYtSpQGDZov/rm.png

Moralis v1 : https://v1docs.moralis.io/moralis-dapp/files/ipfs
Non-Moralis ipfs folder upload: https://stackoverflow.com/questions/57413598/upload-a-full-directory-to-ipfs-using-ipfs-js-ipfs-http-client