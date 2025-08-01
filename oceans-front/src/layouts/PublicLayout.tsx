import { Outlet, useLocation } from "react-router-dom";

export const PublicLayout = () => {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return (
      <div
        className="w-full h-full overflow-hidden flex items-center justify-center"
        id="main-content-layout-auth"
      >
        <Outlet />
      </div>
    );
  }

  return (
    <div className="container" id="public-layout">
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};
