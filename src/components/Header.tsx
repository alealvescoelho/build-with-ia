import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-surface p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-textSecondary">My App</span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-textSecondary hover:text-primary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-textSecondary hover:text-primary">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-textSecondary hover:text-primary">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
