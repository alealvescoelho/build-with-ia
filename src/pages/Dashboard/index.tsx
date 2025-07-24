import { BarChart } from "@mui/x-charts";
import { analises, equipamentos } from "../../mocks/data";
import { useEffect, useState } from "react";
import { Options } from "../../types";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { BarChartBig } from "lucide-react";

const INITIAL_OPTION: Options = {
  label: "",
  value: 0,
};

export default function Dashboard() {
  const [equipamento, setEquipamento] = useState<Options>(INITIAL_OPTION);

  const [diaria, setDiaria] = useState<number[]>([]);
  const [quinzenal, setQuinzenal] = useState<number[]>([]);
  const [mensal, setMensal] = useState<number[]>([]);
  const [outros, setOutros] = useState<number[]>([]);
  const [xData, setXData] = useState<string[]>([]);

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

    analises.forEach((analise) => {
      if (analise.idEquipamento === equipamento.value) {
        newDiaria.push(analise.valorDiario ?? 0);
        newQuinzenal.push(analise.valorQuinzenal ?? 0);
        newMensal.push(analise.valorMensal ?? 0);
        newOutros.push(analise.valorOutros ?? 0);
        newXData.push(analise.nomeLoja);
      }
    });

    setDiaria(newDiaria);
    setQuinzenal(newQuinzenal);
    setMensal(newMensal);
    setOutros(newOutros);
    setXData(newXData);
  }

  function getOptions() {
    const options: Options[] = [];
    equipamentos.map((equipamento) => {
      options.push({
        label: equipamento.descricaoEquipamento,
        value: equipamento.id,
      });
    });
    return options;
  }

  useEffect(() => {
    applyValues();
    console.log("xData: ", xData);
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
          {equipamento.value === 0 ? (
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
    </div>
  );
}
