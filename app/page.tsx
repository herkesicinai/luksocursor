"use client";

import { useState, useEffect } from "react";
import { useEthereum } from "@/components/contexts/EthereumContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LuksoBg from "../app/img/lukso-bg.webp";
import { AddressDisplay } from "@/components/ui/addressdisplay";

export default function Home() {
  const { connect, disconnect, address } = useEthereum();
  const [isUPInstalled, setIsUPInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsUPInstalled(!!window.lukso);
  }, []);

  const handleConnectToggle = async () => {
    if (address) {
      disconnect();
    } else {
      setIsLoading(true);
      await connect();
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-lukso-offblack">
      <Image
        src={LuksoBg}
        alt="LUKSO Background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
        className="z-0"
      />
      <div className="z-10 flex gap-8 w-full max-w-7xl px-4">
        <main className="text-center p-8 bg-white/80 rounded-lg shadow-lg w-1/3">
          <h1 className="text-4xl font-bold mb-8 text-lukso-fuchsia font-[var(--font-geist-sans)]">
            Welcome to the <b className="text-lukso-offblack">LUKSO Cursor </b>
            Template
          </h1>

          {!isUPInstalled && (
            <p className="mb-4 text-lukso-softgrey font-semibold font-[var(--font-geist-sans)]">
              Universal Profiles browser extension is not installed. Please
              install it to use this dApp.
            </p>
          )}

          <Button
            onClick={handleConnectToggle}
            disabled={!isUPInstalled || isLoading}
            variant={address ? "default" : "secondary"}
            size="lg"
            className={cn(
              "transform transition duration-200 ease-in-out",
              "hover:scale-105",
              "active:scale-95",
              "focus:outline-none focus:ring-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "bg-lukso-offblack hover:bg-lukso-offblack text-white",
              "font-[var(--font-geist-sans)]"
            )}
          >
            {isLoading
              ? "Connecting..."
              : address
              ? "Disconnect Wallet"
              : "Connect Universal Profile"}
          </Button>

          {address && (
            <div className="mt-6 p-6 bg-lukso-softgrey rounded-lg shadow-md text-lukso-fuchsia animate-fadeIn">
              <AddressDisplay address={address} />
            </div>
          )}
        </main>

        {address && (
          <div className="p-8 bg-gradient-to-br from-lukso-offblack to-lukso-fuchsia rounded-lg shadow-lg w-3/4 flex flex-col justify-center items-center opacity-0 animate-fadeIn">
            <div className="w-full mx-auto p-6 text-white text-center space-y-6">
              <p className="text-3xl font-light font-[var(--font-geist-sans)] leading-relaxed">
                This is your canvas.
              </p>
              <p className="text-2xl font-[var(--font-geist-sans)] leading-relaxed">
                Dream big.
              </p>
              <p className="text-3xl font-semibold font-[var(--font-geist-sans)] leading-relaxed">
                Prompt boldly.
              </p>
            </div>
            {/* Add your prototyping content here */}
          </div>
        )}
      </div>
    </div>
  );
}
