import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, User } from "lucide-react";
import { usuarios } from "../../mocks/data";
import { UserData } from "../../types";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

const Login: React.FC<{ onLogin: (user: UserData) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Email é obrigatório");
      setOpen(true);
      return;
    }

    if (!password) {
      setError("Senha é obrigatória");
      setOpen(true);
      return;
    }

    const userLogin = usuarios.find(
      (usuario) => usuario.senha == password && usuario.email == username
    );

    console.log("username: ", username);
    console.log("password: ", password);
    console.log("userLogin: ", userLogin);
    console.log("usuarios: ", usuarios);

    if (userLogin === undefined || userLogin === null) {
      setError("Usuario e/ou senha não encontrados ou não conferem.");
      setOpen(true);
      return;
    }

    // Simulate successful login
    onLogin(userLogin);
    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div className="bg-surface rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-semibold text-textSecondary mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-textSecondary text-sm font-bold mb-2"
            >
              Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary"
                size={20}
              />
              <input
                type="text"
                id="username"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-text focus:outline-none focus:border-primary"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="username-error"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-textSecondary text-sm font-bold mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary"
                size={20}
              />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-text focus:outline-none focus:border-primary"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-text py-2 rounded-md hover:bg-secondary transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      {/* {error && (
        <p className="text-error text-red-700 text-sm" aria-live="assertive">
          {error}
        </p>
      )} */}
    </div>
  );
};

export default Login;
