"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import LSP3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { useEthereum } from "./EthereumContext";
import supportedNetworks from "@/app/SupportedNetworks.json";

interface ProfileContextType {
  profileData: any;
  issuedAssets: any[];
  loading: boolean;
  error: string | null;
  fetchProfileData: (address: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [issuedAssets, setIssuedAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { provider, network } = useEthereum();

  const fetchProfileData = useCallback(
    async (address: string) => {
      setLoading(true);
      setError(null);

      if (!address || !network) {
        setError("Address or network not available");
        setLoading(false);
        return;
      }

      const currentNetwork = supportedNetworks.find(
        (net) => net.name === network.name
      );

      if (!currentNetwork) {
        setError("Unsupported network");
        setLoading(false);
        return;
      }

      try {
        const erc725 = new ERC725(
          LSP3ProfileSchema as ERC725JSONSchema[],
          address,
          currentNetwork.rpcUrl,
          { ipfsGateway: currentNetwork.ipfsGateway }
        );

        const profileMetadata = await erc725.fetchData("LSP3Profile");
        const lsp12IssuedAssets = await erc725.fetchData("LSP12IssuedAssets[]");

        if (
          profileMetadata.value &&
          typeof profileMetadata.value === "object" &&
          "LSP3Profile" in profileMetadata.value
        ) {
          setProfileData(profileMetadata.value.LSP3Profile);
        } else {
          throw new Error("No profile data found");
        }

        if (lsp12IssuedAssets.value && Array.isArray(lsp12IssuedAssets.value)) {
          setIssuedAssets(lsp12IssuedAssets.value);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [network]
  );

  const value = {
    profileData,
    issuedAssets,
    loading,
    error,
    fetchProfileData,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
