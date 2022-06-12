import { Contract } from '@ethersproject/contracts';
import { ChainId } from '@uniswap/sdk';
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import { useMemo } from 'react';
import ENS_PUBLIC_RESOLVER_ABI from 'constants/abis/ens-public-resolver.json';
import ENS_ABI from 'constants/abis/ens-registrar.json';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from 'constants/multicall';
import { getContract } from 'utils';
import { useActiveWeb3React } from 'hooks';
import QUICKConversionABI from 'constants/abis/quick-conversion.json';
import ERC20_ABI from 'constants/abis/erc20';

function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
export function useENSRegistrarContract(
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React();
  let address: string | undefined;
  if (chainId) {
    switch (chainId) {
      case ChainId.MATIC:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'; //TODO: MATIC
        break;
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}
export function usePairContract(
  pairAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false,
  );
}

export function useQUICKConversionContract(): Contract | null {
  return useContract(
    process.env.REACT_APP_QUICK_CONVERSION_CONTRACT_ADDRESS,
    QUICKConversionABI,
    true,
  );
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
