import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="bg-black font-babas-neue">
      <Navbar />
     <div className="pt-[55px] md:pt-0 min-h-[calc(100vh-360px)]">
       <Outlet />
        <ToastContainer theme="dark"  position="bottom-right" />
     </div>
      <Footer />
   
    </div>
  );
};

export default MainLayout;
