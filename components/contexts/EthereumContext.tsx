"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers, BrowserProvider } from "ethers";
import supportedNetworks from "@/app/SupportedNetworks.json";

// Add this at the top of the file
declare global {
  interface Window {
    lukso?: any;
    ethereum?: any;
  }
}

interface Network {
  name: string;
  chainId: string;
  rpcUrl: string;
  ipfsGateway: string;
  explorer: string;
  token: string;
}

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<string | null>;
  disconnect: () => void;
  address: string | null;
  network: Network | null;
  isConnecting: boolean;
  error: string | null;
}

const EthereumContext = createContext<EthereumContextType | null>(null);

export const EthereumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initProvider = useCallback(async () => {
    if (typeof window !== "undefined" && (window.lukso || window.ethereum)) {
      const browserProvider = new ethers.BrowserProvider(
        window.lukso || window.ethereum
      );
      setProvider(browserProvider);

      try {
        const network = await browserProvider.getNetwork();
        const currentNetwork = supportedNetworks.find(
          (n) => n.chainId === network.chainId.toString()
        );
        setNetwork(currentNetwork || null);
      } catch (error) {
        console.error("Failed to get network:", error);
        setError("Failed to get network");
      }
    }
  }, []);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  const handleNetworkChange = useCallback(async () => {
    await initProvider();
  }, [initProvider]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window.lukso || window.ethereum)) {
      const ethereum = window.lukso || window.ethereum;
      ethereum.on("chainChanged", handleNetworkChange);
      ethereum.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });

      return () => {
        ethereum.removeListener("chainChanged", handleNetworkChange);
        ethereum.removeListener("accountsChanged", () => {});
      };
    }
  }, [handleNetworkChange]);

  const connect = useCallback(async (): Promise<string | null> => {
    if (!provider) {
      setError("No provider available");
      return null;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
    return null;
  }, [provider]);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  const value: EthereumContextType = {
    provider,
    connect,
    disconnect,
    address,
    network,
    isConnecting,
    error,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = (): EthereumContextType => {
  const context = useContext(EthereumContext);
  if (context === null) {
    throw new Error("useEthereum must be used within an EthereumProvider");
  }
  return context;
};
