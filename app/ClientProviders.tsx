"use client";

import { EthereumProvider } from "@/components/contexts/EthereumContext";
import { ProfileProvider } from "@/components/contexts/ProfileContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EthereumProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </EthereumProvider>
  );
}
