"use client";

import WebVitalsMonitor from "./WebVitalsMonitor";
import { PrefetchImportantLinks } from "./SmartLink";

export default function ClientComponents() {
  return (
    <>
      <WebVitalsMonitor />
      <PrefetchImportantLinks />
    </>
  );
}
