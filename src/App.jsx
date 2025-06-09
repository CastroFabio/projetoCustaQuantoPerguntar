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

const cardDetails = [
  {
    value: "1500",
    label: "Garrafas d'água",
    text: `A IA generativa é capaz de produzir textos, imagens, músicas e códigos. Está presente em ferramentas como o ChatGPT, usando redes neurais profundas (deep learning). Os chamados foundation models incluem modelos de texto (LLMs), imagem, vídeo e áudio. Eles aprendem com grandes volumes de dados e geram conteúdo a partir de padrões aprendidos.`,
  },
  {
    value: "10",
    label: "Banhos",
    text: `Enquanto uma busca no Google consome cerca de 0,3 Wh, uma resposta gerada por IA pode gastar até 10 vezes mais energia. Esse alto consumo está ligado à necessidade de GPUs em data centers. O impacto ambiental cresce com o uso contínuo, causando aumento de emissões de CO₂ e uso de água para resfriamento.`,
  },
  {
    value: "3m²",
    label: "Irrigação",
    text: `Treinar modelos como o GPT-3 pode gerar centenas de toneladas de CO₂. O modelo Bloom, por exemplo, emite o equivalente a dirigir cinco vezes ao redor do planeta. Apesar disso, a IA também ajuda o meio ambiente ao mapear desmatamento, monitorar icebergues e prever o clima de forma eficiente.`,
  },
  {
    value: "5",
    label: "Casas abastecidas",
    text: `Você digita uma pergunta no Chat GPT e recebe a resposta num piscar de olhos. Mas essa "magia" esconde um exército de data centers 24/7. Cada ciclo do GPT-3 consome energia equivalente a 705 casas por ano e evapora até 700.000 L de água potável. A IA consome até 33x mais energia que uma IA tradicional e libera calor suficiente para aumentar 2 °C em grandes cidades.`,
  },
];

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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isTop ? "bg-white/70 backdrop-blur-md" : "bg-white shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-6">
          <img
            src="/QuantoCustaPerguntarLogo3.png"
            alt="Logo"
            className="h-10"
          />
          {["água", "carbono", "eletricidade"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`font-medium ${
                tab === item
                  ? "text-[#1B998B]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {capitalize(item)}
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

function Banner({ tab }) {
  const backgroundImages = {
    água: "/Água.webp",
    eletricidade: "/Eletricidade.webp",
    carbono: "/Carbono.webp",
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
          Um tribunal chileno concedeu aos ambientalistas uma vitória parcial ao
          determinar que o Google deve revisar seu pedido de construção de um
          data center de US$ 200 milhões em Santiago para levar em conta o
          impacto das mudanças climáticas.
        </p>
      </div>
    </section>
  );
}

function InfoCards() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: COLORS.sectionBg }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Impacto Diário</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cardDetails.map((card, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-lg shadow transition cursor-pointer ${
              activeIndex !== null && activeIndex !== i
                ? "scale-95 opacity-50"
                : "hover:shadow-lg"
            }`}
            onClick={() => toggleCard(i)}
          >
            <div className="text-4xl font-bold text-center text-[#1B998B]">
              {card.value}
            </div>
            <div className="text-center text-gray-600 mt-2 mb-2">
              {card.label}
            </div>
            {activeIndex === i && (
              <div className="mt-4 text-sm text-gray-700 border-t pt-4">
                {card.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function QuizSection() {
  const questions = [
    {
      question:
        "Quanto de energia uma resposta gerada por IA pode consumir em comparação com uma busca no Google?",
      options: ["O mesmo", "2 vezes mais", "10 vezes mais", "100 vezes mais"],
      answer: 2,
    },
    {
      question:
        "O que é necessário para manter os data centers que operam IAs?",
      options: [
        "Apenas eletricidade",
        "Eletricidade, água e sistemas de refrigeração",
        "Somente refrigeração",
        "Nada específico",
      ],
      answer: 1,
    },
    {
      question: "Qual a equivalência energética de treinar o GPT-3?",
      options: [
        "Energia de 10 casas por ano",
        "Energia de 100 casas por ano",
        "Energia de 705 casas por ano",
        "Energia de uma cidade inteira por ano",
      ],
      answer: 2,
    },
    {
      question: "Quanta água um ciclo de treinamento do GPT-3 pode evaporar?",
      options: [
        "700 litros",
        "7 mil litros",
        "70 mil litros",
        "700 mil litros",
      ],
      answer: 3,
    },
    {
      question: "Qual impacto térmico pode ser causado por data centers de IA?",
      options: [
        "Nenhum impacto",
        "Redução de temperatura urbana",
        "+2 °C nas cidades e aumento de ar-condicionado",
        "Apenas aumento do barulho urbano",
      ],
      answer: 2,
    },
  ];

  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    let points = 0;
    questions.forEach((q, i) => {
      const selected = document.querySelector(
        `input[name=question-${i}]:checked`
      );
      if (
        selected &&
        q.options.indexOf(selected.nextSibling.textContent) === q.answer
      ) {
        points++;
      }
    });
    setScore(points);
  };

  return (
    <section
      id="quiz"
      className="py-16 px-4"
      style={{ backgroundColor: COLORS.sectionBg }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Quiz</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {questions.map((q, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <p className="font-semibold mb-4">
              {i + 1}. {q.question}
            </p>
            <ul className="space-y-2">
              {q.options.map((option, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`q${i}-opt${idx}`}
                  />
                  <label htmlFor={`q${i}-opt${idx}`} className="text-sm">
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-[#1B998B] text-white px-6 py-2 rounded hover:bg-[#168476]"
          >
            Confirmar Respostas
          </button>
          {score !== null && (
            <p className="mt-4 text-lg font-semibold">
              Você acertou {score} de {questions.length} perguntas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [tab, setTab] = useState("água");
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
