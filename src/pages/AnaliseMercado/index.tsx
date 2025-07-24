import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICotacao, IEquipamentoDropdown, IUsuario, Options } from "../../types";
import { useEffect, useState } from "react";

export default function AnaliseMercado() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "warning" | "success">("error");
  const [equipamentos, setEquipamentos] = useState<IEquipamentoDropdown[]>([]);
  const [cotacoes, setCotacoes] = useState<ICotacao[]>([]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function showNotify(type: "error" | "warning" | "success", message: string) {
    setType(type);
    setMessage(message);
    setOpen(true);
  }

  const stringtoken = localStorage.getItem("token");
  const stringuser = localStorage.getItem("user");
  const token = stringtoken && JSON.parse(stringtoken);
  const user: IUsuario = stringuser && JSON.parse(stringuser);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "nomeEquipamento",
      headerName: "Equipamento",
    },
    {
      field: "nomeLoja",
      headerName: "Loja",
    },
    {
      field: "valorDiario",
      headerName: "Diária",
    },
    {
      field: "valorQuinzenal",
      headerName: "Quinzena",
    },
    {
      field: "valorMensal",
      headerName: "Mensalidade",
    },
    {
      field: "valorOutros",
      headerName: "Outros valores",
    },
  ];

  async function getEquipamentosDropdown() {
    try {
      const response = await fetch(
        "http://localhost:3333/api/equipamentos/dropdown",
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

  async function getCotacoes() {
    try {
      const response = await fetch("http://localhost:3333/api/cotacoes", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
          "cod-loja": user.codLoja,
          "cod-grupo-loja": user.grupoLoja,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        showNotify("error", errorData.message || "Erro ao trazer as cotações.");
        return;
      }

      const data = await response.json();
      setCotacoes(data.data);
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      showNotify(
        "error",
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  }

  function getOptions() {
    const options: Options[] = [];
    equipamentos.map((equipamento) => {
      options.push({
        label: equipamento.descricaoEquipamento + " - " + equipamento.nomeMarca,
        value: equipamento.id,
      });
    });
    return options;
  }

  function getData() {
    const data: any[] = [];
    cotacoes.map((cotacao) => {
      data.push({
        id: cotacao.id,
        descricaoEquipamento: cotacao.equipamento.descricaoEquipamento,
        nomeLoja: cotacao.descricaoFornecedor,
        valorDiario: cotacao.valorDiario,
        valorMensal: cotacao.valorMensal,
        valorQuinzenal: cotacao.valorQuinzenal,
        valorOutros: cotacao.valorOutros,
      });
    });
    return data;
  }

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    getCotacoes();
    getEquipamentosDropdown();
  }, []);

  return (
    <div className="flex flex-col-reverse gap-2 md:flex-row">
      <div className="w-full md:w-2/4">
        <Typography variant="h5">Análises cadastradas</Typography>
        <Box className="bg-surface p-6 rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in-up mt-4">
          <DataGrid
            columns={columns}
            rows={getData()}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15]}
            sx={{ border: 2, borderColor: "#E4E6EA" }}
          />
        </Box>
      </div>
      <div className="w-2/4">
        <Typography variant="h5">Novas análises</Typography>
        <Box className="bg-surface p-6 rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in-up mt-4">
          <div className="w-full gap-2 flex">
            <div className="p-2 w-3/5">
              <Autocomplete
                itemProp=""
                options={getOptions()}
                renderInput={(params) => (
                  <TextField {...params} label="Equipamento" />
                )}
              />
            </div>
            <div className="p-2 w-2/5">
              <TextField label="Loja de pesquisa" fullWidth />
            </div>
          </div>
          <div className="flex">
            <div className="p-2 w-1/4">
              <TextField type="number" label="Diária" fullWidth />
            </div>
            <div className="p-2 w-1/4">
              <TextField label="Quizenal" fullWidth />
            </div>
            <div className="p-2 w-1/4">
              <TextField label="Mensal" fullWidth />
            </div>
            <div className="p-2 w-1/4">
              <TextField label="Outros" fullWidth />
            </div>
          </div>
        </Box>
        <div className="flex justify-between">
          <div className="m-2">
            <Button variant="contained"> Salvar </Button>
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
