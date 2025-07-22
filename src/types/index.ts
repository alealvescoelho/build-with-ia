interface EquipmentData {
  id: number;
  descricaoEquipamento: string; // Renamed from idEquipamento
  nomeLoja: string; // Renamed from descricaoFornecedor
  valorDiario: number;
  valorMensal: number;
  valorQuinzenal: number;
  valorOutros: number;
  idUsuario: number;
  dataInclusao: string;
  dataAlteracao: string;
  codigoLoja: string;
  grupoLoja: string;
}

export type { EquipmentData };
