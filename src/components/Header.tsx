import { DoorOpen } from "lucide-react";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const user = JSON.parse(localStorage.getItem("user") || "");

  return (
    <header className="bg-slate-950 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-white">AppConsulta</span>
      </div>
      <nav>
        <ul className="flex h-full items-center space-x-4 gap-3">
          <li>
            <span className=" text-white">{user.nome}</span>
          </li>
          <li>
            <div className="border-2 h-6 border-white " />
          </li>
          <li>
            <a
              href="/"
              className="flex w-20 ali text-white hover:text-primary"
              onClick={handleLogout}
            >
              <div className="flex align-middle w-20 gap-1">
                <DoorOpen />
                Sair
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
