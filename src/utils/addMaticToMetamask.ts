const addMaticToMetamask: () => void = () => {
  const { ethereum } = window as any;

  const chainIdHex = process.env.REACT_APP_CHAIN_ID_HEX;
  const rpc = process.env.REACT_APP_NETWORK_URL;
  const blockExplorerUrl = process.env.REACT_APP_BLOCK_EXPLORER_URL;
  const chainLogo = process.env.REACT_APP_CHAIN_LOGO;
  const chainName = process.env.REACT_APP_CHAIN_NAME;

  if (ethereum) {
    ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: chainName,
            rpcUrls: [rpc],
            iconUrls: [chainLogo],
            blockExplorerUrls: [blockExplorerUrl],
            nativeCurrency: {
              name: 'Matic Token',
              symbol: 'MATIC',
              decimals: 18,
            },
          },
        ], // you must have access to the specified account
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          console.log('We can encrypt anything without the key.');
        } else {
          console.error(error);
        }
      });
  }
};

export default addMaticToMetamask;
