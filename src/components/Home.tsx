import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';

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

const dummyEquipment: EquipmentData[] = [
  {
    id: 1,
    descricaoEquipamento: 'Compactador de Solo Vibratório', // Updated value
    nomeLoja: 'Construtora Soluções', // Updated value
    valorDiario: 150.00,
    valorMensal: 3000.00,
    valorQuinzenal: 1500.00,
    valorOutros: 50.00,
    idUsuario: 101,
    dataInclusao: '2023-01-15',
    dataAlteracao: '2023-01-15',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 2,
    descricaoEquipamento: 'Nível a Laser de Alta Precisão', // Updated value
    nomeLoja: 'Ferramentas Essenciais', // Updated value
    valorDiario: 200.00,
    valorMensal: 4000.00,
    valorQuinzenal: 2000.00,
    valorOutros: 75.00,
    idUsuario: 102,
    dataInclusao: '2023-02-20',
    dataAlteracao: '2023-03-01',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
  {
    id: 3,
    descricaoEquipamento: 'Betoneira de Grande Capacidade', // Updated value
    nomeLoja: 'Materiais Brutos', // Updated value
    valorDiario: 300.00,
    valorMensal: 6000.00,
    valorQuinzenal: 3000.00,
    valorOutros: 100.00,
    idUsuario: 103,
    dataInclusao: '2023-03-10',
    dataAlteracao: '2023-03-10',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 4,
    descricaoEquipamento: 'Serra Mármore Profissional', // Updated value
    nomeLoja: 'Construção Rápida', // Updated value
    valorDiario: 120.00,
    valorMensal: 2500.00,
    valorQuinzenal: 1250.00,
    valorOutros: 40.00,
    idUsuario: 101,
    dataInclusao: '2023-04-05',
    dataAlteracao: '2023-04-05',
    codigoLoja: 'LJ003',
    grupoLoja: 'Leste'
  },
  {
    id: 5,
    descricaoEquipamento: 'Andaimes Modulares Reforçados', // Updated value
    nomeLoja: 'Aluguel de Equipamentos Pro', // Updated value
    valorDiario: 80.00,
    valorMensal: 1600.00,
    valorQuinzenal: 800.00,
    valorOutros: 20.00,
    idUsuario: 104,
    dataInclusao: '2023-05-12',
    dataAlteracao: '2023-05-12',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
  {
    id: 6,
    descricaoEquipamento: 'Furadeira de Impacto Industrial', // Updated value
    nomeLoja: 'Obras Seguras', // Updated value
    valorDiario: 180.00,
    valorMensal: 3500.00,
    valorQuinzenal: 1750.00,
    valorOutros: 60.00,
    idUsuario: 105,
    dataInclusao: '2023-06-01',
    dataAlteracao: '2023-06-01',
    codigoLoja: 'LJ004',
    grupoLoja: 'Oeste'
  },
  {
    id: 7,
    descricaoEquipamento: 'Gerador de Energia Silencioso', // Updated value
    nomeLoja: 'Energia para Construção', // Updated value
    valorDiario: 90.00,
    valorMensal: 1800.00,
    valorQuinzenal: 900.00,
    valorOutros: 25.00,
    idUsuario: 102,
    dataInclusao: '2023-07-18',
    dataAlteracao: '2023-07-18',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 8,
    descricaoEquipamento: 'Máquina de Solda Inversora', // Updated value
    nomeLoja: 'Solda Forte', // Updated value
    valorDiario: 130.00,
    valorMensal: 2600.00,
    valorQuinzenal: 1300.00,
    valorOutros: 45.00,
    idUsuario: 103,
    dataInclusao: '2023-08-25',
    dataAlteracao: '2023-08-25',
    codigoLoja: 'LJ003',
    grupoLoja: 'Leste'
  },
  {
    id: 9,
    descricaoEquipamento: 'Escavadeira Compacta', // Updated value
    nomeLoja: 'Terraplanagem Express', // Updated value
    valorDiario: 70.00,
    valorMensal: 1400.00,
    valorQuinzenal: 700.00,
    valorOutros: 15.00,
    idUsuario: 104,
    dataInclusao: '2023-09-03',
    dataAlteracao: '2023-09-03',
    codigoLoja: 'LJ004',
    grupoLoja: 'Oeste'
  },
  {
    id: 10,
    descricaoEquipamento: 'Plataforma Elevatória Articulada', // Updated value
    nomeLoja: 'Altura Segura', // Updated value
    valorDiario: 400.00,
    valorMensal: 8000.00,
    valorQuinzenal: 4000.00,
    valorOutros: 150.00,
    idUsuario: 105,
    dataInclusao: '2023-10-11',
    dataAlteracao: '2023-10-11',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
	  {
    id: 11,
    descricaoEquipamento: 'Compactador de Solo Vibratório', // Updated value
    nomeLoja: 'Construtora Soluções', // Updated value
    valorDiario: 150.00,
    valorMensal: 3000.00,
    valorQuinzenal: 1500.00,
    valorOutros: 50.00,
    idUsuario: 101,
    dataInclusao: '2023-01-15',
    dataAlteracao: '2023-01-15',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 12,
    descricaoEquipamento: 'Nível a Laser de Alta Precisão', // Updated value
    nomeLoja: 'Ferramentas Essenciais', // Updated value
    valorDiario: 200.00,
    valorMensal: 4000.00,
    valorQuinzenal: 2000.00,
    valorOutros: 75.00,
    idUsuario: 102,
    dataInclusao: '2023-02-20',
    dataAlteracao: '2023-03-01',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
  {
    id: 13,
    descricaoEquipamento: 'Betoneira de Grande Capacidade', // Updated value
    nomeLoja: 'Materiais Brutos', // Updated value
    valorDiario: 300.00,
    valorMensal: 6000.00,
    valorQuinzenal: 3000.00,
    valorOutros: 100.00,
    idUsuario: 103,
    dataInclusao: '2023-03-10',
    dataAlteracao: '2023-03-10',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 14,
    descricaoEquipamento: 'Serra Mármore Profissional', // Updated value
    nomeLoja: 'Construção Rápida', // Updated value
    valorDiario: 120.00,
    valorMensal: 2500.00,
    valorQuinzenal: 1250.00,
    valorOutros: 40.00,
    idUsuario: 101,
    dataInclusao: '2023-04-05',
    dataAlteracao: '2023-04-05',
    codigoLoja: 'LJ003',
    grupoLoja: 'Leste'
  },
  {
    id: 15,
    descricaoEquipamento: 'Andaimes Modulares Reforçados', // Updated value
    nomeLoja: 'Aluguel de Equipamentos Pro', // Updated value
    valorDiario: 80.00,
    valorMensal: 1600.00,
    valorQuinzenal: 800.00,
    valorOutros: 20.00,
    idUsuario: 104,
    dataInclusao: '2023-05-12',
    dataAlteracao: '2023-05-12',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
  {
    id: 16,
    descricaoEquipamento: 'Furadeira de Impacto Industrial', // Updated value
    nomeLoja: 'Obras Seguras', // Updated value
    valorDiario: 180.00,
    valorMensal: 3500.00,
    valorQuinzenal: 1750.00,
    valorOutros: 60.00,
    idUsuario: 105,
    dataInclusao: '2023-06-01',
    dataAlteracao: '2023-06-01',
    codigoLoja: 'LJ004',
    grupoLoja: 'Oeste'
  },
  {
    id: 17,
    descricaoEquipamento: 'Gerador de Energia Silencioso', // Updated value
    nomeLoja: 'Energia para Construção', // Updated value
    valorDiario: 90.00,
    valorMensal: 1800.00,
    valorQuinzenal: 900.00,
    valorOutros: 25.00,
    idUsuario: 102,
    dataInclusao: '2023-07-18',
    dataAlteracao: '2023-07-18',
    codigoLoja: 'LJ001',
    grupoLoja: 'Norte'
  },
  {
    id: 18,
    descricaoEquipamento: 'Máquina de Solda Inversora', // Updated value
    nomeLoja: 'Solda Forte', // Updated value
    valorDiario: 130.00,
    valorMensal: 2600.00,
    valorQuinzenal: 1300.00,
    valorOutros: 45.00,
    idUsuario: 103,
    dataInclusao: '2023-08-25',
    dataAlteracao: '2023-08-25',
    codigoLoja: 'LJ003',
    grupoLoja: 'Leste'
  },
  {
    id: 19,
    descricaoEquipamento: 'Escavadeira Compacta', // Updated value
    nomeLoja: 'Terraplanagem Express', // Updated value
    valorDiario: 70.00,
    valorMensal: 1400.00,
    valorQuinzenal: 700.00,
    valorOutros: 15.00,
    idUsuario: 104,
    dataInclusao: '2023-09-03',
    dataAlteracao: '2023-09-03',
    codigoLoja: 'LJ004',
    grupoLoja: 'Oeste'
  },
  {
    id: 20,
    descricaoEquipamento: 'Plataforma Elevatória Articulada', // Updated value
    nomeLoja: 'Altura Segura', // Updated value
    valorDiario: 400.00,
    valorMensal: 8000.00,
    valorQuinzenal: 4000.00,
    valorOutros: 150.00,
    idUsuario: 105,
    dataInclusao: '2023-10-11',
    dataAlteracao: '2023-10-11',
    codigoLoja: 'LJ002',
    grupoLoja: 'Sul'
  },
];

const Home: React.FC<{ username: string; onLogout: () => void }> = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">Dashboard Overview</h2>
          <p className="text-base md:text-lg text-textSecondary mb-6 md:mb-8">Welcome back, <span className="font-semibold text-primary">{username}</span>! Here's a quick look at your recent activity.</p>

          <section className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-textSecondary mb-3 md:mb-4">Equipment Management</h3>
            <div className="bg-surface rounded-lg shadow-lg overflow-hidden border border-border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Descrição de Equipamento
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Nome Loja
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Valor Diário
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Valor Mensal
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Valor Quinzenal
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Valor Outros
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      ID Usuário
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Data de Inclusão
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Data Alteração
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Código da Loja
                    </th>
                    <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Grupo de Loja
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                  {dummyEquipment.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-textSecondary">{item.id}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.descricaoEquipamento}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.nomeLoja}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.valorDiario.toFixed(2)}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.valorMensal.toFixed(2)}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.valorQuinzenal.toFixed(2)}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.valorOutros.toFixed(2)}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.idUsuario}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.dataInclusao}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.dataAlteracao}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.codigoLoja}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-textSecondary">{item.grupoLoja}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
