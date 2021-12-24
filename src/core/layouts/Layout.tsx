import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="task_container">
        <div className="btns">
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
