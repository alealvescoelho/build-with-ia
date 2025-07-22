import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftFromLine } from 'lucide-react'

const Header: React.FC = () => {
	const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
	
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
					<li>
            <a href="#" className="flex ali text-white hover:text-primary" onClick={handleLogout}>
							<ArrowLeftFromLine size={20} />
              Logout
            </a>
          </li>
					{/* <li>
						          <button
            onClick={handleLogout}
            className="mt-4 md:mt-6 bg-accent text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-secondary transition duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
            aria-label="Logout from the application"
          >
            <ArrowLeftFromLine size={20} />
            Logout
          </button>
					</li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
