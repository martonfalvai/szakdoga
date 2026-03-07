import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayouts";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Apartment from "./Pages/Apartment";
import Admin from "./Pages/Admin";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/rent/:apartmentId" element={<Apartment />} />
        <Route path="about" element={<div>Rólunk oldal</div>} />
        <Route path="contact" element={<div>Kapcsolat oldal</div>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
