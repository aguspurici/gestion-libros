import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const MainLayout: React.FC = () => {
  return (
    <div >

      <Navbar />
      <Outlet />

    </div>
  );
};

export default MainLayout;