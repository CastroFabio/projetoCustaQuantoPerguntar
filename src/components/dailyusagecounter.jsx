import { useEffect } from "react";

export function DailyUsageCounter({ tab }) {
  const DAILY_WATER_LITERS = 500000;
  const DAILY_ELECTRICITY_KWH = 350000;
  const DAILY_CARBON_KG = 200000;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const secondsSinceStartOfDay = Math.floor((now - startOfDay) / 1000);
    const rate =
      tab === "Água"
        ? DAILY_WATER_LITERS / 86400
        : tab === "Carbono"
        ? DAILY_CARBON_KG / 86400
        : DAILY_ELECTRICITY_KWH / 86400;
    setCount(rate * secondsSinceStartOfDay);

    const interval = setInterval(() => {
      setCount((prev) => prev + rate / 10);
    }, 100);

    return () => clearInterval(interval);
  }, [tab]);

  const formatted = new Intl.NumberFormat("pt-BR").format(Math.floor(count));

  const frases = {
    Água: "Equivale a mais de 1.500 garrafas de água",
    Eletricidade: "O mesmo que 10 banhos de chuveiro",
    Carbono: "Emissão comparável a 200 carros por hora",
  };

  return (
    <div className="text-center text-gray-800">
      <div className="text-3xl font-semibold">
        {tab === "Água"
          ? `${formatted} litros usados hoje`
          : tab === "Carbono"
          ? `${formatted} kg de CO₂ emitidos hoje`
          : `${formatted} kWh consumidos hoje`}
      </div>
      <p className="text-sm text-gray-600 mt-2 italic">{frases[tab]}</p>
    </div>
  );
}
