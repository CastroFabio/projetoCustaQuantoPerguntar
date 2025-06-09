import { useEffect, useRef, useState } from "react";
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

const COLORS = {
  primary: "#1B998B",
  secondary: "#70AE6E",
  tertiary: "#7F95D1",
  background: "#F0F4EF",
  sectionBg: "#F7FAF5",
  text: "#1C1C1C",
  card: "#FFFFFF",
};

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

function Navbar({ tab, setTab, scrollToQuiz }) {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isTop ? "bg-white/70 backdrop-blur-md" : "bg-white shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-6">
          <img
            src="../public/QuantoCustaPerguntarLogo2.png"
            alt="Logo"
            className="h-10"
          />
          {["agua", "carbono", "eletricidade"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`font-medium capitalize ${
                tab === item
                  ? "text-[#1B998B]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={scrollToQuiz}
          className="bg-[#1B998B] text-white px-4 py-2 rounded-full hover:bg-[#168476] transition"
        >
          Quiz
        </button>
      </div>
    </nav>
  );
}

function DailyUsageCounter({ tab }) {
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
      tab === "agua"
        ? DAILY_WATER_LITERS / 86400
        : tab === "carbono"
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
    agua: "Equivale a mais de 1.500 garrafas de água",
    eletricidade: "O mesmo que 10 banhos de chuveiro",
    carbono: "Emissão comparável a 200 carros por hora",
  };

  return (
    <div className="text-center text-gray-800">
      <div className="text-3xl font-semibold">
        {tab === "agua"
          ? `${formatted} litros usados hoje`
          : tab === "carbono"
          ? `${formatted} kg de CO₂ emitidos hoje`
          : `${formatted} kWh consumidos hoje`}
      </div>
      <p className="text-sm text-gray-600 mt-2 italic">{frases[tab]}</p>
    </div>
  );
}

function Banner({ tab }) {
  const backgroundImages = {
    agua: "/agua.jpg",
    eletricidade: "/energia.jpg",
    carbono: "/carbono.jpg",
  };

  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImages[tab]})` }}
    >
      <div className="bg-white/90 p-8 rounded shadow-xl">
        <DailyUsageCounter tab={tab} />
      </div>
    </section>
  );
}

function NewsHighlight() {
  return (
    <section
      className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-6"
      style={{ backgroundColor: COLORS.sectionBg }}
    >
      <img
        src="https://digitalinfranetwork.com/wp-content/uploads/2024/02/Google-1024x621.jpg"
        className="w-full h-64 object-cover rounded"
        alt="Notícia"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">
          <a
            href="https://digitalinfranetwork.com/news/water-wars-court-halts-google-data-center-in-chile-amid-climate-controversy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Water wars: Court halts Google data center in Chile amid climate
            controversy
          </a>
        </h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc gravida.
        </p>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  );
}

function InfoCards() {
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

function QuizSection() {
  return (
    <section
      id="quiz"
      className="bg-white py-16 px-6"
      style={{ backgroundColor: COLORS.sectionBg }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Quiz</h2>
      <p className="text-center text-gray-700">Perguntas e alternativas...</p>
    </section>
  );
}

export default function App() {
  const [tab, setTab] = useState("agua");
  const quizRef = useRef(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
      <Navbar tab={tab} setTab={setTab} scrollToQuiz={scrollToQuiz} />
      <main className="pt-20">
        <Banner tab={tab} />
        <NewsHighlight />
        <InfoCards />
        <div ref={quizRef}>
          <QuizSection />
        </div>
      </main>
      <footer className="bg-[#2D3047] text-white text-center py-6 mt-16">
        <p className="font-semibold">Grupo 6</p>
        <p className="text-sm mt-1">Computação Ambiental</p>
      </footer>
    </div>
  );
}
