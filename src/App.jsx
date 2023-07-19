import React, { useEffect, useState } from 'react';
import { ChainId } from '@biconomy/core-types';
import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster';
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

const NEXT_PUBLIC_PROJECT_ID = 'f8e5bc7c8cb6b3672f2dbb7499383542';

const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc', // you can get this value from the Biconomy dashboard.
  chainId: ChainId.POLYGON_MUMBAI,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/cIhIeS-I0.7e1f17b1-6ebb-454c-8499-c5f66dd098c6',
});

export default function HomePage() {
  const [providerClient, setProviderClient] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState('');
  const [scwLoading, setScwLoading] = useState(false);

  // 1. Initialize sign client
  useEffect(() => {
    async function onInitializeProviderClient() {
      const client = await EthereumProvider.init({
        projectId: NEXT_PUBLIC_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: { themeMode: 'light' },
        chains: [1],
        optionalChains: [5, 80001], // Add the missing comma here
        methods: ['eth_sendTransaction', 'personal_sign'],
        events: ['chainChanged', 'accountsChanged'],
      });
      setProviderClient(client);
    }

    onInitializeProviderClient();
  }, []);

  // 2. Enable / connect with provider, will open web3modal
  async function onConnect() {
    if (providerClient) {
      await providerClient.connect();
      console.log(providerClient); // Print providerClient
      const web3Provider = new ethers.providers.Web3Provider(providerClient);
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
    } else {
      throw new Error('providerClient is not initialized');
    }
  }

  // 3. Setup biconomy smart account
  async function setupSmartAccount() {
    try {
      setScwAddress('');
      setScwLoading(true);
  
      const biconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
  
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
      biconomySmartAccount = await biconomySmartAccount.init();
  
      console.log("owner: ", biconomySmartAccount.owner);
      const smartContractAddress = await biconomySmartAccount.getSmartAccountAddress(); // Get the smart contract address 
      console.log("address: ", smartContractAddress);
      console.log("deployed: ", await biconomySmartAccount.isAccountDeployed(smartContractAddress));
  
      setSmartAccount(biconomySmartAccount);
      setScwAddress(smartContractAddress); // Set the smart contract address in the state variable.
      setScwLoading(false);
    } catch (err) {
      console.log('error setting up smart account... ', err);
    }
  }
  

  // 4. Handle account and provider changes to setup smart account
  useEffect(() => {
    if (provider !== undefined && account !== undefined) {
      setupSmartAccount();
      console.log('Provider...', provider);
      window.localStorage.clear();
    }
  }, [account, provider]);

  // 5. Disconnect Wallet
  const disconnectWallet = async () => {
    if (providerClient) {
      await providerClient.disconnect();
      setProvider(undefined);
      setAccount(undefined);
      setScwAddress('');
    }
  };

  return (
    <div>
      <h1>WalletConnect and Biconomy SDK</h1>
      <button onClick={account ? disconnectWallet : onConnect}>
        {account ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>

      <div className="loadeoa">
        {account && (
          <div>
            <h2>EOA Address</h2>
            <p>{account}</p>
          </div>
        )}
      </div>

      <div className="loadscw">
        {scwAddress && (
          <div>
            <h2>Smart Account Address</h2>
            <p>{scwAddress}</p>
          </div>
        )}

        {scwLoading && <h2>Loading Smart Account...</h2>}
      </div>
    </div>
  );
}
