import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, User, Eye, EyeOff } from "lucide-react";
import { IResponseLogin } from "../../types";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

const Login: React.FC<{ onLogin: (user: IResponseLogin) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "warning" | "success">("error");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  function showNotify(type: "error" | "warning" | "success", message: string) {
    setType(type);
    setMessage(message);
    setOpen(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      showNotify("warning", "Email é obrigatório");
      return;
    }

    if (!password) {
      showNotify("warning", "Senha é obrigatória");
    }

    try {
      const response = await fetch("http://localhost:3333/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showNotify(
          "warning",
          errorData.message ||
            "Erro ao fazer login. Verifique suas credenciais."
        );
        return;
      }

      const userData = await response.json();
      onLogin(userData.data);
      navigate("/home");
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
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
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-text focus:outline-none focus:border-primary"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary">
                {showPassword ? (
                  <Eye
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
