import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import StoreProvider from "@/libs/StoreProvider";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
