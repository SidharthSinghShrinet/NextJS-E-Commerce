import { CometCard } from "@/components/ui/comet-card";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export async function CometCardDemo() {
  const data = await currentUser();
  console.log(data);
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <Image
              loading="lazy"
              fill={true}
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-100"
              alt="Invite background"
              src={data.imageUrl}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-start justify-center p-4 font-mono text-white">
          <div className="text-sm">
            Name:{data.firstName + " " + data.lastName}
          </div>
          <div className="text-sm">
            Email:{data.emailAddresses[0].emailAddress}
          </div>
          <div className="text-sm">
            Date Joined: {new Date(data.createdAt).toLocaleDateString()}
          </div>
        </div>
      </button>
    </CometCard>
  );
}
