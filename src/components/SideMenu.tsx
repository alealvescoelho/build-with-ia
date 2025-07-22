import React, { useState } from 'react';
import { Home, Users, Settings } from 'lucide-react';

const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded by default

  return (
    <aside
      className={`bg-surface p-4 rounded-md shadow-md transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20' // Adjust width based on state
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className={`flex items-center text-textSecondary hover:text-primary ${
                !isExpanded && 'justify-center' // Center icon when collapsed
              }`}
            >
              <Home className={`flex-shrink-0 ${isExpanded ? 'mr-2' : ''}`} size={20} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0' // Fade and collapse text
                }`}
              >
                Home
              </span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className={`flex items-center text-textSecondary hover:text-primary ${
                !isExpanded && 'justify-center'
              }`}
            >
              <Users className={`flex-shrink-0 ${isExpanded ? 'mr-2' : ''}`} size={20} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                Users
              </span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className={`flex items-center text-textSecondary hover:text-primary ${
                !isExpanded && 'justify-center'
              }`}
            >
              <Settings className={`flex-shrink-0 ${isExpanded ? 'mr-2' : ''}`} size={20} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                Settings
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
