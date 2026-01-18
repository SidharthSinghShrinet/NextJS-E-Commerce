import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import StoreProvider from "@/libs/StoreProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div>
            <Toaster position="top-center" reverseOrder={true} />
          </div>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
