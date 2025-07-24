import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IEquipamento } from "../../types";

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamento, setEquipamento] = useState<IEquipamento>({
    id: "",
    descricaoEquipamento: "",
    nomeMarca: "",
    inStatus: true,
    dataCadastro: "",
    dataAtualizacao: "",
  });

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

  function fillNomeEquipamento(value: string) {
    const equipamentoAtual = { ...equipamento };
    equipamentoAtual.descricaoEquipamento = value;
    setEquipamento(equipamentoAtual);
  }

  function fillMarcaEquipamento(value: string) {
    const equipamentoAtual = { ...equipamento };
    equipamentoAtual.nomeMarca = value;
    setEquipamento(equipamentoAtual);
  }

  const columns: GridColDef[] = [
    {
      field: "descricaoEquipamento",
      headerName: "Equipamento",
      width: 350,
    },
    {
      field: "nomeMarca",
      headerName: "Marca",
    },
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
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  function showNotify(type: "error" | "warning" | "success", message: string) {
    setType(type);
    setMessage(message);
    setOpen(true);
  }

  function emptyForm() {
    setEquipamento({
      id: "",
      descricaoEquipamento: "",
      nomeMarca: "",
      inStatus: true,
      dataCadastro: "",
      dataAtualizacao: "",
    });
  }

  async function saveEquipamentos() {
    if (
      equipamento.descricaoEquipamento === "" ||
      equipamento.nomeMarca === ""
    ) {
      showNotify("warning", "Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/api/equipamentos", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipamento),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showNotify(
          "error",
          errorData.message || "Erro ao salvar/editar equipamento."
        );
        return;
      }

      const data = await response.json();
      showNotify("success", data.message || "Equipamento salvo com sucesso.");
      emptyForm();
      getEquipamentos();
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  async function getEquipamentos() {
    try {
      const response = await fetch(
        "http://localhost:3333/api/equipamentos?records=99999",
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
        showNotify(
          "error",
          errorData.message || "Erro ao trazer os equipamentos."
        );
        return;
      }

      const data = await response.json();
      setEquipamentos(data.data);
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  useEffect(() => {
    getEquipamentos();
  }, []);

  return (
    <div className="flex gap-2">
      <div className="w-2/4">
        <Typography variant="h5">Equipamentos cadastrados</Typography>
        <Box className="bg-surface p-6 rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in-up mt-4">
          <DataGrid
            columns={columns}
            rows={equipamentos}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 2, borderColor: "#E4E6EA" }}
          />
        </Box>
      </div>
      <div className="w-2/4">
        <Typography variant="h5">Novos equipamentos</Typography>
        <Box className="flex bg-surface p-2 rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in-up mt-4">
          <div className="p-2 w-3/5">
            <TextField
              onChange={(e) => fillNomeEquipamento(e.target.value)}
              label="Descrição do equipamento"
              value={equipamento.descricaoEquipamento}
              fullWidth
            />
          </div>
          <div className="p-2 w-44">
            <TextField
              onChange={(e) => fillMarcaEquipamento(e.target.value)}
              label="Marca"
              value={equipamento.nomeMarca}
            />
          </div>
        </Box>
        <div className="flex justify-between">
          <div className="m-2">
            <Button onClick={() => saveEquipamentos()} variant="contained">
              {" "}
              Salvar{" "}
            </Button>
          </div>
        </div>
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
}
