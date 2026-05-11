"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-bg lg:h-screen">
      <Sidebar mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-hidden">
        <TopBar onOpenMenu={() => setMobileNavOpen(true)} />
        <main className="flex-1 lg:overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
