import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import { analises, equipamentos } from "../../mocks/data";
import { AnaliseGridData, EquipmentData, Options } from "../../types";

export default function AnaliseMercado() {
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

  function getData() {
    const data: AnaliseGridData[] = [];
    analises.map((analise) => {
      const equipment: EquipmentData = equipamentos.filter(
        (equipamento) => equipamento.id === analise.idEquipamento
      )[0];
      data.push({
        id: analise.id,
        descricaoEquipamento: equipment.descricaoEquipamento,
        nomeLoja: analise.nomeLoja,
        valorDiario: analise.valorDiario,
        valorMensal: analise.valorMensal,
        valorQuinzenal: analise.valorQuinzenal,
        valorOutros: analise.valorOutros,
      });
    });
    return data;
  }

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex gap-2">
      <div className="w-2/4">
        <Typography variant="h5">Análises cadastradas</Typography>
        <DataGrid
          columns={columns}
          rows={getData()}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15]}
          sx={{ border: 2, borderColor: "#E4E6EA" }}
        />
      </div>
      <div className="w-2/4">
        <Typography variant="h5">Novas análises</Typography>
        <div className="border-2 h-48 rounded-md gap-2 p-2 flex flex-col">
          <div className="w-full gap-2 flex">
            <div className="p-2 w-2/5">
              <Autocomplete
                itemProp=""
                options={getOptions()}
                renderInput={(params) => (
                  <TextField {...params} label="Análide de Mercado" />
                )}
              />
            </div>
            <div className="p-2 w-3/5">
              <TextField label="Loja de pesquisa" fullWidth />
            </div>
          </div>
          <div className="flex">
            <div className="p-2 w-1/4">
              <TextField label="Diária" fullWidth />
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
        </div>
        <div className="flex justify-between">
          <div className="m-2">
            <Button variant="contained"> Salvar </Button>
          </div>
          <div className="m-2">
            <Button>
              <div className="flex align-middle gap-1">
                <Plus /> Adicionar mais análises
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
