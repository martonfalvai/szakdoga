import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import KepFeltoltes from "./KepFeltoltes";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* <KepFeltoltes /> */}
        <Outlet /> {/* gyerek komponens ide tölt be */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
