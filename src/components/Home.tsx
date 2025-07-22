import React from "react";
import Table from "./Table";
import { analises } from "../mocks/data";

const Home: React.FC<{ username: string; onLogout: () => void }> = () => {
  return (
    <div>
      <section className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-textSecondary mb-3 md:mb-4">
          Equipment Management
        </h3>
        <div className="bg-surface rounded-lg shadow-lg overflow-hidden border border-border">
          <Table list={analises} />
        </div>
      </section>
    </div>
  );
};

export default Home;
