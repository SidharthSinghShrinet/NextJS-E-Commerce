import { AnimatedCard } from "@/components/AnimateCard";
import { CometCardDemo } from "@/components/CometCartDemo";
import React from "react";
function page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AnimatedCard>
        <CometCardDemo />
      </AnimatedCard>
    </div>
  );
}

export default page;
