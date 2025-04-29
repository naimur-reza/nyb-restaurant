import { assets } from "../assets";

const Hero = () => {
  return (
    <section className="grid grid-cols-2 ">
      {assets.heroImages.map((img, idx) => (
        <img className="h-full" key={idx} src={img} />
      ))}
    </section>
  );
};

export default Hero;
