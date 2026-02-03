import Image from "next/image";
import React from "react";
import logo from "@/public/DesireMart.png";
function Loading() {
  return (
    <div className="h-[85vh] w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex items-end">
          <span className="text-6xl">L</span>
          <div className="relative mb-1 h-8.5 w-8.5">
            <Image
              src={logo}
              alt={logo}
              fill={true}
              className="animate-[spin_3s_linear_infinite]"
            />
          </div>
          <span className="text-6xl">ading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
