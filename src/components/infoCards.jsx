export function InfoCards() {
  const cards = [
    { value: "1500", label: "Garrafas d'água" },
    { value: "10", label: "Banhos" },
    { value: "3m²", label: "Irrigação" },
    { value: "5", label: "Casas abastecidas" },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: COLORS.sectionBg }}>
      <h2 className="text-3xl font-bold text-center mb-8">Impacto Diário</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative bg-white p-6 rounded-lg shadow hover:shadow-lg group transition"
          >
            <div className="text-4xl font-bold text-center text-[#1B998B]">
              {card.value}
            </div>
            <div className="text-center text-gray-600 mt-2">{card.label}</div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-black text-white text-sm p-2 rounded hidden group-hover:block">
              Informações adicionais aqui...
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
