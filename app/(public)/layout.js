import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function rootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
