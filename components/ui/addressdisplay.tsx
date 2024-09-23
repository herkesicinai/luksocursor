"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useProfile } from "@/components/contexts/ProfileContext";
import Image from "next/image";

interface AddressDisplayProps {
  address: string;
}

export function AddressDisplay({ address }: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { profileData, loading, error, fetchProfileData } = useProfile();

  useEffect(() => {
    if (address) {
      fetchProfileData(address);
    }
  }, [address, fetchProfileData]);

  useEffect(() => {
    if (profileData && !loading) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [profileData, loading]);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 16)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backgroundImage = useMemo(() => {
    return profileData?.backgroundImage?.[0]?.url || "/default-background.jpg";
  }, [profileData]);

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full mx-auto transition-all animate-fadeIn duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative h-32 w-full">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="relative px-4 pb-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0">
          {profileData?.profileImage && profileData.profileImage[0] && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <Image
                src={profileData.profileImage[0].url}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="pt-20 text-center">
          <h2 className="text-xl font-semibold text-lukso-fuchsia mb-2 font-[var(--font-geist-sans)]">
            {profileData?.name || "Anonymous"}
          </h2>
          {profileData?.tags && profileData.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {profileData.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-lukso-softgrey text-lukso-fuchsia text-xs px-2 py-1 rounded-full font-[var(--font-geist-sans)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="w-22 h-px bg-lukso-fuchsia opacity-50 mx-auto mb-2"></div>

          {profileData?.description && (
            <p className="text-sm text-gray-600 mb-4 font-[var(--font-geist-sans)]">
              {profileData.description}
            </p>
          )}
          <div className="flex items-center justify-center mb-4">
            <span className="font-mono text-sm text-lukso-fuchsia font-[var(--font-geist-sans)]">
              {truncateAddress(address)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="ml-2 text-lukso-fuchsia hover:text-lukso-offblack"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {profileData?.links && profileData.links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {profileData.links.map(
                (link: { title: string; url: string }, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-lukso-fuchsia text-white text-sm px-3 py-1.5 rounded-md hover:bg-lukso-offblack transition-colors duration-200 ease-in-out font-[var(--font-geist-sans)]"
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{link.title}</span>
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
