import React from "react";

interface Props {
  list: any;
}

export default function Table({ list }: Props) {
  return (
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Descrição de Equipamento
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Nome Loja
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Valor Diário
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Valor Mensal
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Valor Quinzenal
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Valor Outros
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            ID Usuário
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Data de Inclusão
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Data Alteração
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Código da Loja
          </th>
          <th
            scope="col"
            className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
          >
            Grupo de Loja
          </th>
        </tr>
      </thead>
      <tbody className="bg-surface divide-y divide-border">
        {list.map((item: any) => (
          <tr
            key={item.id}
            className="hover:bg-gray-700 transition-colors duration-200"
          >
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-textSecondary">
              {item.id}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.descricaoEquipamento}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.nomeLoja}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.valorDiario.toFixed(2)}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.valorMensal.toFixed(2)}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.valorQuinzenal.toFixed(2)}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.valorOutros.toFixed(2)}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.idUsuario}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.dataInclusao}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.dataAlteracao}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.codigoLoja}
            </td>
            <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">
              {item.grupoLoja}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
