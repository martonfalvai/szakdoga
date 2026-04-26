import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Apartment from "./Pages/Apartment";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import CreateAdvertisement from "./Pages/CreateAdvertisement";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import { AuthProvider } from "./hooks/authProvider";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Routing = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/rent/:apartmentId" element={<Apartment />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin" element={<Admin />} />
      <Route path="profile" element={<Profile />} />
      <Route path="create-advertisement" element={<CreateAdvertisement />} />
      <Route path="*" element={<div>404 - Az oldal nem található</div>} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routing />
      <Footer />
    </AuthProvider>
    <Toaster position="top-right" />
  </BrowserRouter>
);

export default App;
