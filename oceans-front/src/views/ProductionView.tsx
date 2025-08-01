import { useQueryClient } from "@tanstack/react-query";
import type { OrdersType } from "../types/ordersType";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductionView = () => {
  const [orders, setOrders] = useState<OrdersType["orders"]>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = queryClient.getQueryData<OrdersType>(["orders"]);

    setOrders(orders?.orders || []);
  }, []);

  return (
    <div>
      <header className="flex flex-col gap-3">
        <h1 className="text-xl text-gray-100">Dashboard</h1>
        <nav className="w-full">
          <ul className="flex gap-3 text-[#a0a0a0] font-semibold">
            <li className="">
              <NavLink
                to={"/auth/dashboard"}
                className={({ isActive }) =>
                  location.pathname === "/auth/dashboard" && isActive
                    ? "underline text-[#dadada] p-1"
                    : "hover:underline p-1"
                }
              >
                Gestión
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={"/auth/dashboard/production"}
                className={({ isActive }) =>
                  location.pathname === "/auth/dashboard/production" && isActive
                    ? "underline text-[#585858] p-1"
                    : "hover:underline p-1"
                }
              >
                Producción
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {/* <div className="flex lg:flex-row flex-col gap-2 mt-10">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-center"># Orden</th>
                <th className="text-center">Menu</th>
                <th className="text-center">Pagó $</th>
                <th className="text-center">Atendió</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="">
              {orders?.map((order) => (
                <tr key={order.orderId}>
                  <td className="text-center">{order.orderId}</td>
                  <td className="text-center">
                    {order.menus?.map((menu) => menu.menuName).join(", ")}
                  </td>
                  <td className="text-center">$: {order.totalPrice}</td>
                  <td className="text-center">{order.user?.name}</td>
                  <td className="text-center">
                    <span
                      className={
                        order?.status === "pending"
                          ? "text-green-500 p-1 rounded-lg"
                          : "text-red-500 p-1 rounded-lg"
                      }
                    >
                      {order?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="flex flex-row gap-4 mt-10 flex-wrap  justify-center overflow-auto">
        {orders?.map((order) => (
          <div
            key={order.orderId}
            className="w-[400px] bg-transparent shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Información izquierda */}
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-400"># Orden:</span>{" "}
                  {order.orderId}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Menú:</span>{" "}
                  {order.menus?.map((menu) => menu.menuName).join(", ") || "-"}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Atendió:</span>{" "}
                  {order.user?.name || "Sin asignar"}
                </p>
              </div>

              {/* Información derecha */}
              <div className="space-y-2 text-right">
                <p>
                  <span className="font-semibold text-gray-600">Pagó:</span> $
                  {order.totalPrice}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Estado:</span>{" "}
                  <span
                    className={
                      order?.status === "pending"
                        ? "text-yellow-600 font-semibold"
                        : order?.status === "completed"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
