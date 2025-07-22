import React, { useState } from 'react';
import { Home, LayoutDashboard, BarChart2, Drill } from 'lucide-react';

const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      name: 'Home',
      icon: Home,
      link: '#'
    },
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      link: '#'
    },
    {
      name: 'Análises de Mercado',
      icon: BarChart2,
      link: '#'
    },
    {
      name: 'Equipamentos',
      icon: Drill,
      link: '#'
    },
  ];

  return (
    <aside
      className={`bg-surface p-4 rounded-md shadow-md transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href={item.link}
                className={`flex items-center text-textSecondary hover:text-primary ${
                  !isExpanded && 'justify-center'
                }`}
              >
                <item.icon className={`flex-shrink-0 ${isExpanded ? 'mr-2' : ''}`} size={20} />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
