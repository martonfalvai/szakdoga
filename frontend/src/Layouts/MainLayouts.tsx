import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
    return (
      <>
        <Navbar />
        <main>
          <Outlet />  { /* gyerek komponens ide tölt be */}
        </main>
        <Footer />
      </>
    );
  };
  
  export default MainLayout;