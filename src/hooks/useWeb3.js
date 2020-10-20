import { useState, useEffect } from 'react';

import i18next from 'i18next';

import Web3 from "web3";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  injected: {
    display: {
      name: 'Injected',
      description: i18next.t('Home-BrowserWallet'),
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    rpc: {
      56: 'https://bsc-dataseed.binance.org/',
      97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
  },
};

const useWeb3 = () => {
  const [web3, setWeb3] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      console.log('>>>>>', 'web3ModalConnect');
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
      });
      
      const provider = await web3Modal.connect();

      console.log('>>>>>>>>>>', 'PRE');
      console.log('>>>>>', 'web3', web3);
      console.log('>>>>>', 'connected', connected);
      console.log('>>>>>', 'address', address);
      
      setWeb3(new Web3(provider));
      setConnected(true);

      if(web3 && web3.eth) { 
        const accs = web3.eth.getAccounts();
        if(accs && accs.length > 0) { setAddress([0]); }
      }

      console.log('>>>>>>>>>>', 'POST');
      console.log('>>>>>', 'web3', web3);
      console.log('>>>>>', 'connected', connected);
      console.log('>>>>>', 'address', address);
    })();
  });

  return { web3, address, connected };
};

export default useWeb3;