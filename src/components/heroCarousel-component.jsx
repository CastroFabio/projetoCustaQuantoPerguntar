import Carousel from "react-bootstrap/Carousel";

function HeroCarousel() {
  const carouselItensNews = [
    {
      idImage: 1,
      sourceImage:
        "https://digitalinfranetwork.com/wp-content/uploads/2024/02/Google-1024x621.jpg",
      titleImage:
        "Water wars: Court halts Google data center in Chile amid climate controversy",
      bodyImage:
        "A Chilean court granted environmentalists a partial victory by ruling that Google must revise its application for constructing a $200 million data center in Santiago to factor in the impact of climate change.",
    },
    {
      idImage: 2,
      sourceImage:
        "https://digitalinfranetwork.com/wp-content/uploads/2024/02/Google-1024x621.jpg",
      titleImage:
        "Water wars: Court halts Google data center in Chile amid climate controversy",
      bodyImage:
        "A Chilean court granted environmentalists a partial victory by ruling that Google must revise its application for constructing a $200 million data center in Santiago to factor in the impact of climate change.",
    },
    {
      idImage: 3,
      sourceImage:
        "https://digitalinfranetwork.com/wp-content/uploads/2024/02/Google-1024x621.jpg",
      titleImage:
        "Water wars: Court halts Google data center in Chile amid climate controversy",
      bodyImage:
        "A Chilean court granted environmentalists a partial victory by ruling that Google must revise its application for constructing a $200 million data center in Santiago to factor in the impact of climate change.",
    },
  ];

  return (
    <Carousel pause="hover" variant="dark">
      {carouselItensNews.map(
        ({ idImage, sourceImage, titleImage, bodyImage }) => (
          <Carousel.Item key={idImage}>
            <img
              src={sourceImage}
              className="d-block w-100 image-carousel"
              alt="..."
            />
            <Carousel.Caption>
              <h3 style={{ background: "hsla(0, 0.00%, 87.50%, 0.75)" }}>
                {titleImage}
              </h3>
              <p style={{ background: "hsla(0, 0.00%, 87.50%, 0.75)" }}>
                {bodyImage}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      )}
    </Carousel>
  );
}

export default HeroCarousel;
