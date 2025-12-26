// "use client";

// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function NotFound() {
//   const router = useRouter();

//   return (
//     <div>
//       <h2>404 - Page Not Found</h2>

//       {/* Test both approaches */}
//       <button onClick={() => router.back}>Go Back (router.back)</button>
//       <button onClick={() => router.push("/")}>Home (router.push)</button>
//       <Link href="/">Home (Link)</Link>
//     </div>
//   );
// }
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Notfound() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1>404! Not Found</h1>
      <div className="flex gap-3">
        <button>
          <Link href="/">Home</Link>
        </button>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    </div>
  );
}

export default Notfound;
