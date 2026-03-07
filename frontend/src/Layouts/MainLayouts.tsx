import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import KepFeltoltes from "./KepFeltoltes";
import { AuthProvider } from "../hooks/authProvider";

const MainLayout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        {/* <KepFeltoltes /> */}
        <Outlet /> {/* gyerek komponens ide tölt be */}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default MainLayout;
