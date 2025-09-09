import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      <main className="flex-1 pt-16"> {/* Added pt-16 to account for fixed header height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;