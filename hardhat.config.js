/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0xefd5bc99dd9eadb221ae473c21ffc9a743913918cf15cb89011b455a79dd0698","balance":"1000000000000000000000"},{"privateKey":"0x1516e531c2763989d53182a29344ddaf93a5333a51c40ebd810ce0cc5c2f02c8","balance":"1000000000000000000000"},{"privateKey":"0x555a9914e9ba8965f93292f5d1feb5c0fc1774470bc3d7391a8a49d802c6f0aa","balance":"1000000000000000000000"},{"privateKey":"0xe84367108c3b3cfc6a94a6cc4f272a0bb396983795412ba99fa087ef8474dfcf","balance":"1000000000000000000000"},{"privateKey":"0x394b71d08918564f341fc9ab1ad964a66e7de1889163dce7b01159ac267b5673","balance":"1000000000000000000000"},{"privateKey":"0xbcf5ad5fa54b9d90d29d798e8817064c0e71f5c431c172bafe7323c97b7d38ea","balance":"1000000000000000000000"},{"privateKey":"0x2628abfb0c3609c44a18aef5b7e3f71c602731878bb950e2ea7641090549fcc3","balance":"1000000000000000000000"},{"privateKey":"0xa3c4c6a8f7571c3686f215a414fcd6ea255c5e3346aec746e79c667d97327a92","balance":"1000000000000000000000"},{"privateKey":"0xb98c714343514f9857ba277f934f75251510720f9c5e86f9acb8069989f20228","balance":"1000000000000000000000"},{"privateKey":"0x81a7a2a78cab3a735b006253007f0a0f51e5ca5466f8b8156c4927bb7ccbccde","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};