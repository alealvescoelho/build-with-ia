import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { equipamentos } from "../../mocks/data";
import { Button, TextField, Typography } from "@mui/material";
import { Plus } from "lucide-react";

export default function Equipamentos() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "descricaoEquipamento",
      headerName: "Equipamento",
      width: 350,
    },
    {
      field: "marca",
      headerName: "Marca",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex gap-2">
      <div className="w-2/4">
        <Typography variant="h5">Equipamentos cadastrados</Typography>
        <DataGrid
          columns={columns}
          rows={equipamentos}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 2, borderColor: "#E4E6EA" }}
        />
      </div>
      <div className="w-2/4">
        <Typography variant="h5">Novos equipamentos</Typography>
        <div className="border-2 h-24 rounded-md gap-2 p-2 flex">
          <div className="p-2 w-3/5">
            <TextField label="Descrição do equipamento" fullWidth />
          </div>
          <div className="p-2 w-44">
            <TextField label="Marca" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="m-2">
            <Button variant="contained"> Salvar </Button>
          </div>
          <div className="m-2">
            <Button>
              <div className="flex align-middle gap-1">
                <Plus /> Adicionar mais equipamento
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
