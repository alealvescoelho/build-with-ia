export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  return (
    <div>
      <section className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-textSecondary mb-3 md:mb-4">
          Seja bem vindo, {user.nome}!
        </h3>
      </section>
    </div>
  );
}
