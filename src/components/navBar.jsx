import { useEffect, useState } from "react";

export function Navbar({ tab, setTab, scrollToQuiz }) {
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
            src="/QuantoCustaPerguntarLogo3-removebg-preview.png"
            alt="Logo"
            className="h-10"
          />
          {["Água", "Carbono", "Eletricidade"].map((item) => (
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
