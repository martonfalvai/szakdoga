import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ImageUpload from "../components/ImageUploader";
import ShowImage from "../components/ShowImage";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <ImageUpload
          rentId={2}
          token="1|bEJUX7IlX2XRnntHOrLUkiXxAeUBSdg9d9TJALf73f37583f"
        />
        <ShowImage />
        <Outlet /> {/* gyerek komponens ide tölt be */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
