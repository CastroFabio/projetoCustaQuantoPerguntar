import { DailyUsageCounter } from "./dailyusagecounter";

export function Banner({ tab }) {
  const backgroundImages = {
    Água: "/agua.webp",
    Eletricidade: "/eletricidade.webp",
    Carbono: "/carbon.webp",
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
