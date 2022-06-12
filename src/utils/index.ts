import { getAddress } from '@ethersproject/address';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import {
  ChainId,
  CurrencyAmount,
  JSBI,
  Percent,
  Token,
  WETH,
} from '@uniswap/sdk';
import { BigNumber } from '@ethersproject/bignumber';
import tokenData from 'constants/tokens.json';

export { default as addMaticToMetamask } from './addMaticToMetamask';

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}

export function isAddress(value: string | null | undefined): string | false {
  try {
    return getAddress(value || '');
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function isSupportedNetwork(ethereum: any) {
  return Number(ethereum.chainId) === Number(process.env.REACT_APP_CHAIN_ID);
}

export function isZero(hexNumberString: string): boolean {
  return /^0x0*$/.test(hexNumberString);
}

export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  );
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const prefix =
    'https://' + (chainId === 80001 ? 'mumbai.' : '') + 'polygonscan.com';

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function formatTokenAmount(amount?: CurrencyAmount, digits = 3) {
  if (!amount) return '-';
  const amountStr = amount.toExact();
  if (Math.abs(Number(amountStr)) > 1) {
    return Number(amountStr).toLocaleString();
  }
  return amount.toSignificant(digits);
}

export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export function getChainId(): ChainId {
  if (process.env.REACT_APP_CHAIN_ID === '137') {
    return ChainId.MATIC;
  }

  return ChainId.MUMBAI;
}

export function returnTokenFromKey(key: string): Token {
  const chainId = getChainId();
  if (key === 'MATIC') return WETH[chainId];
  const tokenIndex = Object.keys(tokenData).findIndex(
    (tokenKey) => tokenKey === key,
  );
  const token = Object.values(tokenData)[tokenIndex];
  return new Token(
    chainId,
    getAddress(token.address),
    token.decimals,
    token.symbol,
    token.name,
  );
}
