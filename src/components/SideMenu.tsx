import { useState } from "react";
import { Home, LayoutDashboard, BarChart2, Drill, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { IUsuario } from "../types";

export default function SideMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const stringuser = localStorage.getItem("user");
  const user: IUsuario = stringuser && JSON.parse(stringuser);

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      link: "/home",
    },
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      name: "Cotações de Mercado",
      icon: BarChart2,
      link: "/analise",
    },
    {
      name: "Equipamentos",
      icon: Drill,
      link: "/equipamentos",
    },
    {
      name: "Usuário",
      icon: Users,
      link: "/usuario",
    },
  ];

  const validaPerfilAdmin = () => {
    return true;
  };

  return (
    <aside
      className={`bg-surface p-4 rounded-md shadow-md transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav>
        <ul className="flex flex-col gap-5 mt-10 md:mt-5">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.link}
                className={`flex items-center text-textSecondary hover:text-primary ${
                  !isExpanded && "justify-center"
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 ${isExpanded ? "mr-2" : ""}`}
                  size={20}
                />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
