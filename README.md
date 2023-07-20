# Biconomy-WalletConnect-StarterKit
This is a starter-kit/template for anyone who would like to use the new Biconomy SDK along with WalletConnect v2 version. The idea is to give a structure of how anyone can simply spin up a smart account on top of the EOA Address that comes from WalletConnect. All you need to do is to scan Wallet Connect and you will simply get a smart account associated with your EOA.

## How to setup this for your dApp ?

1. To start off run `npm install`
2. Setup your bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc'
3. Get your Paymaster URL from [Biconomy Dashboard](https://dashboard.biconomy.io/) . It should look something like this paymasterUrl: 'https://paymaster.biconomy.io/api/v1/{CHAIN_ID}/{ YOUR_API_KEY }'
4. For more reference, check out the docs here - [Biconomy Documentation](https://docs.biconomy.io/docs/overview)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

