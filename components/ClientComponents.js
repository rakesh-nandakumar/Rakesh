"use client";

import WebVitalsMonitor from "./WebVitalsMonitor";
import { PrefetchImportantLinks } from "./SmartLink";
import AOSInit from "./AOSInit";

export default function ClientComponents() {
  return (
    <>
      <AOSInit />
      <WebVitalsMonitor />
      <PrefetchImportantLinks />
    </>
  );
}
