export function NewsHighlight() {
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
