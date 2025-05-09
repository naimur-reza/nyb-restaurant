import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-black font-babas-neue">
      <Navbar />
     <div className="pt-[55px] md:pt-0 min-h-[calc(100vh-360px)]">
       <Outlet />
       <ToastContainer/>
     </div>
      <Footer />
   
    </div>
  );
};

export default MainLayout;
