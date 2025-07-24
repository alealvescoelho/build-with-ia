import React, { useState, useEffect } from "react";
import { IPerfil, IUsuario, UserData } from "../../types";
import { usuarios as mockUsuarios } from "../../mocks/data";

// Import MUI components
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  SnackbarCloseReason,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "lucide-react";

export default function Usuarios() {
  const [users, setUsers] = useState<UserData[]>(mockUsuarios);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [perfis, setPerfis] = useState<IPerfil[]>([]);
  const [editingUser, setEditingUser] = useState<IUsuario | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigoLoja, setCodigoLoja] = useState<string>("");
  const [grupoLoja, setGrupoLoja] = useState<string>("");
  const [idPerfil, setIdPerfil] = useState<string>("");

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

  const stringtoken = localStorage.getItem("token");
  const token = stringtoken && JSON.parse(stringtoken);

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.nome);
      setEmail(editingUser.email);
      setSenha(editingUser.password || "123456"); // In a real app, never pre-fill password
      setCodigoLoja(editingUser.codLoja);
      setGrupoLoja(editingUser.grupoLoja);
      setIdPerfil(editingUser.idPerfil);
    } else {
      // Reset form fields when not editing
      setNome("");
      setEmail("");
      setSenha("");
      setCodigoLoja("");
      setGrupoLoja("");
      setIdPerfil("");
    }
  }, [editingUser]);

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUserClick = (user: IUsuario) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nome ||
      !email ||
      !senha ||
      !codigoLoja ||
      !grupoLoja ||
      idPerfil === ""
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editingUser) {
      alterUsuario();

      setIsFormOpen(false);
      setEditingUser(null);
      getUsuarios();
      return;
    }

    saveUsuario();

    setIsFormOpen(false);
    setEditingUser(null);
    getUsuarios();
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  async function saveUsuario() {
    try {
      const response = await fetch(
        "http://localhost:3333/api/parametrizacoes/gerenciamento/usuarios",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            password: senha,
            inStatus: true,
            idPerfil: idPerfil,
            codLoja: codigoLoja,
            grupoLoja: grupoLoja,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showNotify("error", errorData.message || "Erro ao salvar Usuário.");
        return;
      }

      const data = await response.json();
      showNotify("success", data.message || "Usuário salvo com sucesso.");
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  async function alterUsuario() {
    try {
      const response = await fetch(
        `http://localhost:3333/api/parametrizacoes/gerenciamento/usuarios/${editingUser?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            inStatus: true,
            idPerfil: idPerfil,
            codLoja: codigoLoja,
            grupoLoja: grupoLoja,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showNotify("error", errorData.message || "Erro ao alterar Usuário.");
        return;
      }

      const data = await response.json();
      showNotify("success", data.message || "Usuário alterado com sucesso.");
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  // DataGrid Columns
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "nomePerfil", headerName: "Perfil", width: 100 },
    { field: "codLoja", headerName: "Código Loja", width: 130 },
    { field: "grupoLoja", headerName: "Grupo Loja", width: 130 },
    {
      field: "inStatus",
      headerName: "Status",
      renderCell: (params) =>
        params.row.inStatus ? (
          <div className="text-green-600">Ativo</div>
        ) : (
          <div className="text-red-600">Inativo</div>
        ),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleEditUserClick(params.row as IUsuario)}
            aria-label="editar"
          >
            <Pencil />
          </IconButton>
          {/* <IconButton
            onClick={() => handleDeleteUser(params.row.id)}
            aria-label="excluir"
          >
            <Trash />
          </IconButton> */}
        </Box>
      ),
    },
  ];

  function showNotify(type: "error" | "warning" | "success", message: string) {
    setType(type);
    setMessage(message);
    setOpen(true);
  }

  async function getUsuarios() {
    try {
      const response = await fetch(
        "http://localhost:3333/api/parametrizacoes/gerenciamento/usuarios",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showNotify("error", errorData.message || "Erro ao trazer os usuários.");
        return;
      }

      const data = await response.json();
      setUsuarios(data.data);
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  async function getPerfisDrowpdown() {
    try {
      const response = await fetch(
        "http://localhost:3333/api/parametrizacoes/gerenciamento/perfis/dropdown",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showNotify("error", errorData.message || "Erro ao trazer os perfis.");
        return;
      }

      const data = await response.json();
      setPerfis(data.data);
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  useEffect(() => {
    getUsuarios();
    getPerfisDrowpdown();
  }, []);

  return (
    <Box className="p-2 bg-background min-h-screen text-text">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Gerenciamento de Usuários</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserClick}
        >
          Adicionar Novo Usuário
        </Button>
      </div>

      <Dialog
        open={isFormOpen}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            bgcolor: "surface.main",
            border: "1px solid",
            borderColor: "border.main",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transform: "scale(0.95)",
            animation: "scaleIn 0.3s ease-out forwards",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "surface.main",
            pb: 2,
          }}
        >
          <Typography variant="h5" component="div">
            {editingUser ? "Editar Usuário" : "Adicionar Usuário"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: "surface.main", pt: 3, pb: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              label="Nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Senha (apenas para novo usuário)"
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              required={!editingUser}
              disabled={!!editingUser}
              variant="outlined"
            />
            <TextField
              label="Código da Loja"
              id="codigoLoja"
              value={codigoLoja}
              onChange={(e) => setCodigoLoja(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Grupo da Loja"
              id="grupoLoja"
              value={grupoLoja}
              onChange={(e) => setGrupoLoja(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <FormControl fullWidth required variant="outlined">
              <InputLabel id="idPerfil-label">Perfil</InputLabel>
              <Select
                labelId="idPerfil-label"
                id="idPerfil"
                value={idPerfil}
                onChange={(e) => setIdPerfil(e.target.value)}
                label="Perfil"
              >
                <MenuItem value={0} disabled>
                  Selecione um perfil
                </MenuItem>
                {perfis.map((perfil) => (
                  <MenuItem key={perfil.id} value={perfil.id}>
                    {perfil.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "surface.main",
            pt: 2,
            pb: 2,
            pr: 3,
            pl: 3,
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        className="bg-surface p-6 rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in-up"
        sx={{ height: 400, width: "100%" }}
      >
        {users.length === 0 ? (
          <Typography
            variant="body1"
            className="text-textSecondary text-center py-8"
          >
            Nenhum usuário cadastrado.
          </Typography>
        ) : (
          <DataGrid
            rows={usuarios}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
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
    </Box>
  );
}
