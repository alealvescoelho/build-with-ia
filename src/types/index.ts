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

interface ICotacao {
  id: string;
  idEquipamento: string;
  descricaoFornecedor: string;
  valorDiario: number;
  valorMensal: number;
  valorQuinzenal: number;
  valorOutros: number;
  idUsuarioCadastro: string;
  codigoLoja: string;
  codigoGrupoLoja: string;
  dataCadastro: string;
  dataAtualizacao: string;
  equipamento: IEquipamentoDropdown;
  usuarioCadastro: IUsuarioCadastro;
}

interface IEquipamento {
  id: string;
  descricaoEquipamento: string;
  nomeMarca: string;
  inStatus: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
}

interface IEquipamentoDropdown {
  id: string;
  descricaoEquipamento: string;
  nomeMarca: string;
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

interface IUsuario {
  id: string;
  nome: string;
  email: string;
  password?: string;
  inStatus: boolean;
  idPerfil: string;
  nomePerfil: string;
  siglaPerfil: string;
  codLoja: string;
  grupoLoja: string;
  dataCadastro: string;
  dataAtualizacao: string;
}

interface IUsuarioCadastro {
  id: string;
  nome: string;
  email: string;
}
interface IPerfil {
  id: string;
  name: string;
  acronym: string;
}

interface IToken {
  expiresIn: string;
  token: string;
}

interface IResponseLogin {
  accessToken: IToken;
  user: IUsuario;
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
  IUsuario,
  IToken,
  IResponseLogin,
  IEquipamento,
  IEquipamentoDropdown,
  IPerfil,
  ICotacao,
};
