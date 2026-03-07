import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Apartment from "./Pages/Apartment";
import Admin from "./Pages/Admin";
import { AuthProvider } from "./hooks/authProvider";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Routing = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/rent/:apartmentId" element={<Apartment />} />
      <Route path="about" element={<div>Rólunk oldal</div>} />
      <Route path="contact" element={<div>Kapcsolat oldal</div>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin" element={<Admin />} />
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
  </BrowserRouter>
);

export default App;
