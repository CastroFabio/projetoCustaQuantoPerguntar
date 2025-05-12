import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const waterData = [
  { day: "Seg", uso: 120000 },
  { day: "Ter", uso: 98000 },
  { day: "Qua", uso: 105000 },
  { day: "Qui", uso: 95000 },
  { day: "Sex", uso: 113000 },
];

const electricityData = [
  { day: "Seg", uso: 85000 },
  { day: "Ter", uso: 91000 },
  { day: "Qua", uso: 87000 },
  { day: "Qui", uso: 89000 },
  { day: "Sex", uso: 94000 },
];

const COLORS = {
  primary: "#1B998B",
  secondary: "#2D3047",
  highlight: "#FFFD82",
  background: "#F0F4EF",
  text: "#1C1C1C",
  card: "#FFFFFF",
};

function DailyUsageCounter({ tab }) {
  const DAILY_WATER_LITERS = 500000;
  const DAILY_ELECTRICITY_KWH = 350000;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const secondsSinceStartOfDay = Math.floor((now - startOfDay) / 1000);
    const rate =
      tab === "agua"
        ? DAILY_WATER_LITERS / 86400
        : DAILY_ELECTRICITY_KWH / 86400;
    setCount(rate * secondsSinceStartOfDay);

    const interval = setInterval(() => {
      setCount((prev) => prev + rate / 10);
    }, 100);

    return () => clearInterval(interval);
  }, [tab]);

  const formatted = new Intl.NumberFormat("pt-BR").format(Math.floor(count));

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-2xl mx-auto">
      <div className="text-3xl font-semibold text-center">
        {tab === "agua"
          ? `${formatted} litros usados hoje`
          : `${formatted} kWh consumidos hoje`}
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Dados referentes ao período entre 01/jan/2024 e 31/dez/2024
      </p>
    </div>
  );
}

function Tabs({ tab, setTab }) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
          tab === "agua"
            ? "bg-[#1B998B] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setTab("agua")}
      >
        Água
      </button>
      <button
        className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
          tab === "eletricidade"
            ? "bg-[#1B998B] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setTab("eletricidade")}
      >
        Eletricidade
      </button>
    </div>
  );
}

function NewsSection() {
  return (
    <div className="md:col-span-2 bg-white p-4 rounded shadow space-y-4">
      <a href="#" className="block relative rounded overflow-hidden">
        <img
          src="https://digitalinfranetwork.com/wp-content/uploads/2024/02/Google-1024x621.jpg"
          alt="Water wars"
          className="w-full h-60 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
          <h3 className="text-lg font-semibold">
            Water wars: Court halts Google data center in Chile amid climate
            controversy
          </h3>
        </div>
      </a>
      <div className="grid grid-cols-1 gap-2">
        <a
          href="#"
          className="bg-gray-100 p-2 rounded text-sm hover:bg-gray-200 transition"
        >
          Nova tecnologia promete economia de energia em residências
        </a>
        <a
          href="#"
          className="bg-gray-100 p-2 rounded text-sm hover:bg-gray-200 transition"
        >
          Brasil avança em políticas de uso sustentável de recursos hídricos
        </a>
      </div>
    </div>
  );
}

function CountryRanking() {
  const countries = [
    "Estados Unidos",
    "Índia",
    "Brasil",
    "Reino Unido",
    "Alemanha",
    "Canadá",
    "China",
    "Japão",
    "França",
    "Coreia do Sul",
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">
        Ranking de países que mais usam AI
      </h3>
      <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
        {countries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ol>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("agua");

  const carouselItems = {
    agua: [
      "Equivale a 1.500 copos de água",
      "O mesmo que 10 banhos de chuveiro",
      "Suficiente para irrigar 3m² de lavoura por dia",
    ],
    eletricidade: [
      "Equivale ao consumo diário de 5 casas",
      "O mesmo que 3 horas de ar-condicionado",
      "Pode alimentar uma geladeira por 2 dias",
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-2xl font-bold text-[${COLORS.primary}]">
          Quanto Custa Perguntar
        </h1>
      </nav>

      <main className="p-4 max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded shadow">
          <Tabs tab={tab} setTab={setTab} />
          <DailyUsageCounter tab={tab} />
          <div className="mt-6">
            <Slider {...settings}>
              {(carouselItems[tab] || []).map((item, index) => (
                <div key={index} className="text-center text-sm text-gray-700">
                  <p>{item}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <NewsSection />
          <CountryRanking />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Consumo de Água (últimos dias)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={waterData}>
                <Line type="monotone" dataKey="uso" stroke={COLORS.primary} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Consumo de Eletricidade (últimos dias)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={electricityData}>
                <Line type="monotone" dataKey="uso" stroke={COLORS.secondary} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-600 py-4">
        Desenvolvido pelo grupo de Computação Ambiental
      </footer>
    </div>
  );
}
