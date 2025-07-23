import React, { useState, useEffect } from "react";
import { UserData } from "../../types";
import {
  usuarios as mockUsuarios,
  perfis as mockPerfis,
} from "../../mocks/data";

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
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "lucide-react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

export default function Usuarios() {
  const [users, setUsers] = useState<UserData[]>(mockUsuarios);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigoLoja, setCodigoLoja] = useState<string | number>("");
  const [grupoLoja, setGrupoLoja] = useState<string | number>("");
  const [idPerfil, setIdPerfil] = useState<number>(0);

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.nome);
      setEmail(editingUser.email);
      setSenha(editingUser.senha); // In a real app, never pre-fill password
      setCodigoLoja(editingUser.codigoLoja);
      setGrupoLoja(editingUser.grupoLoja);
      setIdPerfil(editingUser.idPerfil);
    } else {
      // Reset form fields when not editing
      setNome("");
      setEmail("");
      setSenha("");
      setCodigoLoja("");
      setGrupoLoja("");
      setIdPerfil(0);
    }
  }, [editingUser]);

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUserClick = (user: UserData) => {
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
      idPerfil === 0
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newOrUpdatedUser: UserData = {
      id: editingUser
        ? editingUser.id
        : Math.max(...users.map((u) => u.id), 0) + 1,
      nome,
      email,
      senha,
      codigoLoja,
      grupoLoja,
      idPerfil,
      dataInclusao: editingUser ? editingUser.dataInclusao : new Date(),
      dataAlteracao: new Date(),
    };

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === newOrUpdatedUser.id ? newOrUpdatedUser : user
        )
      );
    } else {
      setUsers([...users, newOrUpdatedUser]);
    }

    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const getPerfilDescription = (id: number) => {
    const perfil = mockPerfis.find((p) => p.id === id);
    return perfil ? perfil.descricao : "Desconhecido";
  };

  // DataGrid Columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "codigoLoja", headerName: "Código Loja", width: 130 },
    { field: "grupoLoja", headerName: "Grupo Loja", width: 130 },
    {
      field: "perfil",
      headerName: "Perfil",
      width: 150,
      //valueGetter: (params) => getPerfilDescription(params.row.idPerfil ?? 0),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="secondary"
            onClick={() => handleEditUserClick(params.row as UserData)}
            aria-label="editar"
          >
            <Pencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
            aria-label="excluir"
          >
            <Trash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="p-8 bg-background min-h-screen text-text">
      <Typography
        variant="h4"
        component="h1"
        className="text-4xl font-extrabold text-primary mb-8 text-center animate-fade-in-down"
        sx={{ color: "primary.main" }}
      >
        Gerenciamento de Usuários
      </Typography>

      <Box className="flex justify-end mb-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserClick}
        >
          Adicionar Novo Usuário
        </Button>
      </Box>

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
            color: "primary.main",
            textAlign: "center",
            pb: 2,
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
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
                onChange={(e) => setIdPerfil(Number(e.target.value))}
                label="Perfil"
              >
                <MenuItem value={0} disabled>
                  Selecione um perfil
                </MenuItem>
                {mockPerfis.map((perfil) => (
                  <MenuItem key={perfil.id} value={perfil.id}>
                    {perfil.descricao}
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
            rows={users}
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
    </Box>
  );
}
