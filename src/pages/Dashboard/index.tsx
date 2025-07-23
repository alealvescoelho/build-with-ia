import { BarChart } from "@mui/x-charts";
import { analises, equipamentos } from "../../mocks/data";
import { useEffect, useState } from "react";
import { Options } from "../../types";
import { Autocomplete, TextField, Typography } from "@mui/material";
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
    // diaria.length = 0;
    // quinzenal.length = 0;
    // mensal.length = 0;
    // outros.length = 0;
    // analises.map((analise) => {
    //   if (analise.idEquipamento === equipamento.value) {
    //     diaria.push(analise.valorDiario ?? 0);
    //     quinzenal.push(analise.valorQuinzenal ?? 0);
    //     mensal.push(analise.valorMensal ?? 0);
    //     outros.push(analise.valorOutros ?? 0);
    //     xData.push(analise.nomeLoja);
    //   }
    // });

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
    <div className="w-2/4 h-96 p-2 border-2 rounded-md">
      <Autocomplete
        options={getOptions()}
        renderInput={(params) => <TextField {...params} label="Equipamento" />}
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
      )}
    </div>
  );
}
