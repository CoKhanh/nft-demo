import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Web3 from 'web3';

import { expo } from '../app.json';

import SmartContract from '../config/abi/SmartContract.json';

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
  button: {
    borderRadius: 4,
    padding: 11,
    marginBottom: 10
  },
  text: {
    color: "white"
  },
  alignCenter: {
    textAlign: "center",
    marginBottom: 10
  }
});

function App(): JSX.Element {
  const connector = useWalletConnect();

  //get metamask account
  const accounts = connector.accounts;
  //smart contract instance
  const [smObj, setSmObj] = React.useState(null);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    )
  );

  React.useEffect(() => {
    //smart contract instance
    const SmartContractObj = new web3.eth.Contract(
      SmartContract.abi,
      // NetworkData.address
      '0xBf95892A179226A4DEa54e76A8F53d5D2825eB93'
    );
    setSmObj(SmartContractObj);
  },[])

  const mintNFTs = async (_amount) => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceHex = web3.utils.toHex(gasPrice);
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      const nonceHex = web3.utils.toHex(nonce);
      const tx = {
        from: accounts[0],
        to: '0xBf95892A179226A4DEa54e76A8F53d5D2825eB93',
        data: smObj.methods.mint(accounts[0], _amount).encodeABI(),
        value: web3.utils.toWei((0.01*_amount).toString(), "ether"),
        gasPrice: gasPriceHex,
        nonce: nonceHex
      };
      console.log('tx', tx);
      const response = await connector.sendTransaction(tx);
      console.log('response: ', response);
      if(response){
        console.log('success')
      }
    }catch(e){
      console.log('error: ', e);
    }
  }

  const connectWallet = React.useCallback(() => {
    return connector
      .connect()
      .then((response) => console.log(response))
      .catch((error) => console.log(error.message));
  }, [connector]);

  const killSession = async () => {
    await connector.killSession();
    console.log('Disconnected');
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      {!connector.connected && (
        <TouchableOpacity style={[styles.button, {backgroundColor: "#1FC7D4"}]} onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text style={styles.alignCenter}>Connected address: {accounts[0]}</Text>
          <TouchableOpacity style={[styles.button, {backgroundColor: "#3366CC"}]} onPress={() => mintNFTs(1)}>
            <Text style={styles.text}>Mint 1 NFT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: "#ED8306"}]} onPress={() => mintNFTs(3)}>
            <Text style={styles.text}>Mint 3 NFT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: "#FF0100"}]} onPress={killSession}>
            <Text style={styles.text}>Kill session</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const { scheme } = expo;

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
});