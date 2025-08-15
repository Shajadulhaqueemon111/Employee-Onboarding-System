import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const MainRoute = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default MainRoute;
