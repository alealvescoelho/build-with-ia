import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { ICotacao, IEquipamentoDropdown, IUsuario, Options } from "../../types";
import {
  Alert,
  Autocomplete,
  Box,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { BarChartBig } from "lucide-react";

const INITIAL_OPTION: Options = {
  label: "",
  value: "",
};

export default function Dashboard() {
  const [equipamento, setEquipamento] = useState<Options>(INITIAL_OPTION);
  const [equipamentos, setEquipamentos] = useState<IEquipamentoDropdown[]>([]);
  const [cotacoes, setCotacoes] = useState<ICotacao[]>([]);
  const [diaria, setDiaria] = useState<number[]>([]);
  const [quinzenal, setQuinzenal] = useState<number[]>([]);
  const [mensal, setMensal] = useState<number[]>([]);
  const [outros, setOutros] = useState<number[]>([]);
  const [xData, setXData] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "warning" | "success">("error");
  const stringtoken = localStorage.getItem("token");
  const stringuser = localStorage.getItem("user");
  const token = stringtoken && JSON.parse(stringtoken);
  const user: IUsuario = stringuser && JSON.parse(stringuser);

  function applyValues() {
    if (!equipamento || equipamento.value === "") {
      setDiaria([]);
      setQuinzenal([]);
      setMensal([]);
      setOutros([]);
      setXData([]);
      return;
    }

    const newDiaria: number[] = [];
    const newQuinzenal: number[] = [];
    const newMensal: number[] = [];
    const newOutros: number[] = [];
    const newXData: string[] = [];

    cotacoes.forEach((cotacao) => {
      if (cotacao.idEquipamento === equipamento.value) {
        newDiaria.push(cotacao.valorDiario ?? 0);
        newQuinzenal.push(cotacao.valorQuinzenal ?? 0);
        newMensal.push(cotacao.valorMensal ?? 0);
        newOutros.push(cotacao.valorOutros ?? 0);
        newXData.push(cotacao.descricaoFornecedor);
      }
    });

    setDiaria(newDiaria);
    setQuinzenal(newQuinzenal);
    setMensal(newMensal);
    setOutros(newOutros);
    setXData(newXData);
  }

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

  async function getEquipamentosDropdown() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/equipamentos/dropdown`,
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

  useEffect(() => {
    getEquipamentosDropdown();
    getCotacoes();
  }, []);

  useEffect(() => {
    applyValues();
  }, [equipamento]);

  return (
    <div>
      <Typography variant="h5">Dashboard</Typography>
      <Box className="bg-surface p-6 rounded-xl w-2/5 shadow-xl border border-border overflow-hidden animate-fade-in-up mt-4">
        <Typography variant="h6">Valor por Equipamento</Typography>
        <div className="h-96 p-2 border-2 rounded-md mt-2">
          <Autocomplete
            options={getOptions()}
            renderInput={(params) => (
              <TextField {...params} label="Equipamento" />
            )}
            value={equipamento}
            onChange={(event, newValue) =>
              setEquipamento(newValue ?? INITIAL_OPTION)
            }
          />
          {equipamento.value === "" ? (
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
              <BarChartBig size={100} color="#a7a7a8" />
              <Typography variant="h4" color="#a7a7a8">
                Selecione um equipamento...
              </Typography>
            </div>
          ) : (
            <div>
              <BarChart
                height={300}
                series={[
                  { data: diaria, label: "Diária", id: "diariaId" },
                  { data: quinzenal, label: "Quinzenal", id: "quinzenalId" },
                  { data: mensal, label: "Mensal", id: "mensalId" },
                  { data: outros, label: "Outros", id: "outrosId" },
                ]}
                xAxis={[{ data: xData }]}
              />
              <div></div>
            </div>
          )}
        </div>
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
    </div>
  );
}
