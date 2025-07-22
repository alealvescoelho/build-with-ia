import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, User } from 'lucide-react';

const Login: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate successful login
    onLogin(username);
    navigate('/home');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div className="bg-surface rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-semibold text-textSecondary mb-4">Login</h2>
        {error && <p className="text-error text-sm mb-4" aria-live="assertive">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-textSecondary text-sm font-bold mb-2">
              Username/Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" size={20} />
              <input
                type="text"
                id="username"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-text focus:outline-none focus:border-primary"
                placeholder="Username/Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="username-error"
              />
            </div>
            {error && <p id="username-error" className="text-error text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-textSecondary text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" size={20} />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-text focus:outline-none focus:border-primary"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
              />
            </div>
            {error && <p id="password-error" className="text-error text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-text py-2 rounded-md hover:bg-secondary transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
