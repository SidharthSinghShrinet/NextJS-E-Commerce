import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
export default function rootLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
