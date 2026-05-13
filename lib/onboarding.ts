const KEY = "onboarding-status";

export type OnboardingStatus = "pending" | "done";

export function getOnboardingStatus(): OnboardingStatus {
  if (typeof window === "undefined") return "pending";
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "done" ? "done" : "pending";
  } catch {
    return "pending";
  }
}

export function setOnboardingDone(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, "done");
  } catch {
    // localStorage unavailable (privacy mode). Silently ignore.
  }
}
