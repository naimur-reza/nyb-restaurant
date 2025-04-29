import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { label: "Info", path: "/info" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="h-20 flex items-center  bg-black text-gray-200 font-babas-neue">
      <div className="flex  w-full justify-between px-8">
        <Link className="text-3xl " to={"/"}>
          NYB Restaurant
        </Link>
        <ul className="flex  max-w-7xl font-semibold text-2xl space-x-5 uppercase justify-between">
          {navItems.map((item) => (
            <li key={item.label} className="hover:underline">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
