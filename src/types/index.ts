import React from "react";

interface AnaliseData {
  id: number;
  idEquipamento: number;
  nomeLoja: string;
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

interface AnaliseGridData {
  id: number;
  descricaoEquipamento: string;
  nomeLoja: string;
  valorDiario: number;
  valorMensal: number;
  valorQuinzenal: number;
  valorOutros: number;
}

interface EquipmentData {
  id: number;
  descricaoEquipamento: string;
  marca: string;
  dataInclusao: Date;
  dataAlteracao: Date | null;
}

interface Options {
  label: string | React.ReactNode;
  value: number | string;
}

interface UserData {
  id: number;
  codigoLoja: number | string;
  grupoLoja: number | string;
  nome: string;
  idPerfil: number;
  dataInclusao: Date;
  dataAlteracao: Date | null;
  email: string;
  senha: string;
}

interface PerfilData {
  id: number;
  descricao: string;
}

export type {
  AnaliseData,
  EquipmentData,
  Options,
  UserData,
  AnaliseGridData,
  PerfilData,
};
