import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";

// This is the layout for all of the pages and components in the App - Mudasir Nizamani
function Layout() {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="task_container">
        <div className="btns">
          {/* Navbar - Mudasir Nizamani */}
          <Button onClick={() => navigate("/", { replace: true })}>Home</Button>
          <Button onClick={() => navigate("/create/list", { replace: true })}>
            Create List
          </Button>
          <Button onClick={() => navigate("/create/item", { replace: true })}>
            Create Item
          </Button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
