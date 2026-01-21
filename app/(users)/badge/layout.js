import Footer2 from "@/components/Footer2";
import Navbar from "@/components/Navbar";

export default function rootLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer2 />
      </footer>
    </>
  );
}
