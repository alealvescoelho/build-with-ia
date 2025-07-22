import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#38bdf8] p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-white">AppConsulta</span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-primary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-primary">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-primary">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
