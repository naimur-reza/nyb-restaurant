import { assets } from "../assets";

const Hero = () => {
  return (
    <section className="image-container">
      {assets.heroImages.map((img, idx) => (
        <img  className="w-full h-full object-cover"  key={idx} src={img} />
      ))}
    </section>
  );
};

export default Hero;
