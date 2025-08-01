import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoutes";
import { useSiteStore } from "../store/siteStore";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSessionStore } from "../store/sessionStore";

const navsArray = [
  {
    img: "/dashboard.svg",
    linkTitle: "Dashboard",
    path: "/auth/dashboard",
  },
  {
    img: "/products.svg",
    linkTitle: "Productos",
    path: "/auth/dashboard/products",
  },
  {
    img: "/users.svg",
    linkTitle: "Usuarios",
    path: "/auth/dashboard/users",
  },
  {
    img: "/financiero.svg",
    linkTitle: "Financiero",
    path: "/auth/dashboard/financiero",
  },
];

export const PrivateLayout = () => {
  const { logoType } = useSiteStore();
  const navigate = useNavigate();
  const { setClearToken } = useSessionStore();

  const handleLogout = () => {
    setClearToken();
    navigate("/auth");
  };

  return (
    <PrivateRoute>
      <div className="bg-[#242424] text-white min-h-screen h-screen w-full px-5 py-2 flex gap-2 overflow-hidden">
        <section
          className="w-2/12 flex flex-col gap-5 h-full justify-between py-3"
          id="private-sidebar"
        >
          <div className="flex flex-col gap-5">
            <header className="flex gap-2 items-center" id="private-header">
              <img
                src={logoType}
                alt="Logotipo de Brasa & Corte"
                className="max-h-[40px] w-auto rounded-sm"
              />
              <h1 className="text-2xl font-semibold text-[#fefefe]">
                Brasa & Corte
              </h1>
            </header>
            <nav className="mt-3" id="private-nav">
              <ul className="flex flex-col gap-2" id="private-nav-list">
                {navsArray?.map((nav, index) => (
                  <li
                    key={index}
                    className="flex gap-3 items-center px-3 py-2 hover:bg-[#3e3e3e] hover:cursor-pointer rounded-xl"
                  >
                    <div>
                      <img
                        src={nav.img}
                        alt={`${nav.linkTitle} ícono`}
                        className="w-[25px] h-[25px] max-h-[20px]"
                      />
                    </div>
                    <NavLink to={nav.path}>
                      <span className="text-[#dedede]">{nav.linkTitle}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="relative group" id="user-container">
            <div
              className="flex items-center gap-2 rounded-xl p-2 bg-[#0a0a0a] hover:bg-[#1d1d1d] cursor-pointer"
              id="user-info"
            >
              <span className="w-[40px] h-[40px] flex items-center justify-center bg-[#3e3e3e] rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Nombre de usuario</h3>
                <p className="text-xs text-gray-400">email@example.com</p>
              </div>

              <div className="absolute left-0 top-[-40px] mt-2 w-full rounded-xl hidden cursor-pointer group-hover:flex flex-col bg-[#1a1a1a] text-white shadow-lg z-50">
                <button
                  className="px-4 py-2 text-sm hover:bg-[#2c2c2c] text-left cursor-pointer rounded-xl flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span className="mr-2">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <main
          className="w-10/12 shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-3xl bg-[#101010] px-5 py-7"
          id="main-content-dashboard"
        >
          <Outlet />
        </main>
      </div>
    </PrivateRoute>
  );
};
