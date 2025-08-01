import {
  faMoneyBillWave,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePublicQuery } from "../hooks/usePublicQuery";
import { ResponseOrderSchema } from "../schemas/orderSchema";
import { useEffect, useState } from "react";
import { useSessionStore } from "../store/sessionStore";
import type { OrdersType } from "../types/ordersType";
import type { ResponseUsersType } from "../types/usersTypes";
import { ResponseUserSchema } from "../schemas/userSchema";

export const DashboardView = () => {
  const { token } = useSessionStore();
  const [totalSalesPerDay, setTotalSalesPerDay] = useState(0);
  const { data: orders } = usePublicQuery<OrdersType>({
    key: ["orders"],
    url: "/orders",
    token,
    schema: ResponseOrderSchema,
  });

  const { data: users } = usePublicQuery<ResponseUsersType>({
    key: ["users"],
    url: "/users-manage",
    token,
    schema: ResponseUserSchema,
  });

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  useEffect(() => {
    const date = new Date();
    let ordersPerDay = 0;
    let totalPricePerDay = 0;

    for (const order of orders?.orders || []) {
      ordersPerDay +=
        new Date(order.createdAt).getDate() === date.getDate() ? 1 : 0;
      totalPricePerDay +=
        new Date(order.createdAt).getDate() === date.getDate()
          ? order.totalPrice
          : 0;
    }

    // setTotalPricePerDay(totalPricePerDay);
    setTotalSalesPerDay(ordersPerDay);
  }, [orders]);

  return (
    <div className="" id="dashboard-view">
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

      <main className="mt-5 flex flex-col gap-5">
        <section id="cards-values" className="flex gap-5 md: p-2 w-full">
          <div className="py-4 px-5 rounded-xl border border-gray-600 lg:w-[200px] xl:w-[300px]">
            <h2 className="text-sm text-[#868686]">Total ventas del día</h2>
            <span className="flex gap-2 mt-2 items-center">
              <FontAwesomeIcon icon={faMoneyBillWave} />
              <p>{totalSalesPerDay}</p>
            </span>
          </div>

          <div className="py-4 px-5 rounded-xl border border-gray-600 lg:w-[200px] xl:w-[300px]">
            <h2 className="text-sm text-[#868686]">Usuarios activos</h2>
            <span className="flex gap-2 mt-2 items-center">
              <FontAwesomeIcon icon={faUsers} />
              <p>{users?.users.length || 0}</p>
            </span>
          </div>
        </section>
        <div className="flex lg:flex-row flex-col gap-2">
          <div className="md:w-9/12">
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
                {orders?.orders
                  .filter((order) => order.status.toLowerCase() === "completed")
                  ?.map((order) => (
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
                            order?.status.toLowerCase() === "completed"
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
          <div className="md:w-3/12 ">
            {users?.users?.map((user) => (
              <div
                key={user.document}
                className="flex items-center gap-2 rounded-xl p-2 bg-transparent hover:bg-[#1d1d1d] cursor-pointer"
                id="user-info"
              >
                <span className="w-[40px] h-[40px] flex items-center justify-center bg-[#3e3e3e] rounded-full">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{user.name}</h3>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
