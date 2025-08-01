import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/public/Login";
import { PublicLayout } from "../layouts/PublicLayout";
import { useEffect, useState } from "react";
import { usePublicQuery } from "../hooks/usePublicQuery";
import { ResourcesSchema } from "../schemas/resourcesSchema";
import { useSiteStore } from "../store/siteStore";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { DashboardView } from "../views/DashboardView";
import { ProductsView } from "../views/ProductsView";
import { UsersView } from "../views/UsersView";
import { FinancieroView } from "../views/FinancieroView";
import type { ResponseResourcesType } from "../types/resourcesTypes";
import { ProductionView } from "../views/ProductionView";

export const MainRouter = () => {
  const [initialView, setInitialView] = useState(true);
  const { setLogoType } = useSiteStore();

  useEffect(() => {
    setTimeout(() => {
      setInitialView(false);
    }, 500);
  }, []);

  const { data: img } = usePublicQuery<ResponseResourcesType>({
    key: ["logo"],
    url: `/resources-manage/view/3`,
    schema: ResourcesSchema,
  });

  useEffect(() => {
    if (!img?.unicResource?.path) return;

    const faviconUrl = img.unicResource.path;

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = faviconUrl;

    setLogoType(img?.unicResource.path || "");
  }, [img]);

  if (initialView) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#151515]">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <div className="absolute top-0 w-16 h-16 rounded-full animate-ping bg-gray-300 opacity-10"></div>
          <p className="mt-6 text-gray-700 text-lg font-medium animate-pulse">
            Cargando experiencia...
          </p>
        </div>
      </div>
    );
  } else
    return (
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="auth" element={<Login />} />
          </Route>

          {/* Private Routes */}

          <Route path="/auth/dashboard" element={<PrivateLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="products" element={<ProductsView />} />
            <Route path="users" element={<UsersView />} />
            <Route path="financiero" element={<FinancieroView />} />
            <Route path="production" element={<ProductionView />} />
          </Route>
          {/* Add your private routes here */}
        </Routes>
      </BrowserRouter>
    );
};
