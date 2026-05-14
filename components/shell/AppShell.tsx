"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { BoasVindasModal } from "@/components/modals/BoasVindasModal";
import { getOnboardingStatus, setOnboardingDone } from "@/lib/onboarding";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    if (getOnboardingStatus() === "pending") {
      setOnboardingOpen(true);
    }
  }, []);

  const handleClose = useCallback(() => {
    setOnboardingDone();
    setOnboardingOpen(false);
  }, []);

  const handleComplete = useCallback(() => {
    setOnboardingDone();
    setOnboardingOpen(false);
  }, []);

  const handleOpenManual = useCallback(() => {
    setOnboardingOpen(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-bg lg:h-screen">
      <Sidebar mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-hidden">
        <TopBar
          onOpenMenu={() => setMobileNavOpen(true)}
          onOpenOnboarding={handleOpenManual}
        />
        <main className="flex-1 lg:overflow-y-auto">{children}</main>
      </div>

      <BoasVindasModal
        open={onboardingOpen}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </div>
  );
}
