import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-black font-babas-neue">
      <Navbar />
     <div className=" ">
       <Outlet />
     </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
