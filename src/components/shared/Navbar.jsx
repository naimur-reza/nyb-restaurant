import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navItems = [
    { label: "Info", path: "/info" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const authItems = user
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Logout", onClick: handleLogout },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  return (
    <>
      <nav className="h-24 hidden md:flex items-center bg-black text-gray-200 font-babas-neue">
        <div className="flex w-full justify-between px-8 items-center">
          <Link to={"/"}>
            <img className="w-18" src={assets.logo} alt="logo" />
          </Link>
          <ul className="flex max-w-7xl font-semibold text-2xl space-x-5 uppercase justify-between">
            {navItems.map((item) => (
              <li key={item.label} className="hover:underline">
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
            {authItems.map((item) => (
              <li key={item.label} className="hover:underline">
                {item.onClick ? (
                  <button onClick={item.onClick}>{item.label}</button>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <nav className="relative w-full md:hidden items-center bg-black text-gray-200 font-babas-neue">
        <div className="flex w-full justify-between px-8 flex-col absolute top-0 bg-black py-4">
          <div className="flex justify-between items-center">
            <Link to={"/"}>
              <img className="w-14" src={assets.logo} alt="logo" />
            </Link>

            {!showNav ? (
              <button
                onClick={() => setShowNav(!showNav)}
                className="space-y-1 cursor-pointer flex flex-col"
              >
                <span className="w-5 border " />
                <span className="w-5 border " />
                <span className="w-5 border " />
              </button>
            ) : (
              <button
                onClick={() => setShowNav(!showNav)}
                className="flex flex-col cursor-pointer"
              >
                <span className="w-5 border rotate-45 "></span>
                <span className="w-5 border -rotate-45 "></span>
              </button>
            )}
          </div>
          {showNav && (
            <ul className="flex top-20 bg-black fixed w-full font-semibold text-xl flex-col space-y-3 uppercase justify-between left-0 px-8 py-3">
              {navItems.map((item) => (
                <li
                  onClick={() => setShowNav(!showNav)}
                  key={item.label}
                  className="hover:underline"
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
              {authItems.map((item) => (
                <li
                  onClick={() => {
                    setShowNav(!showNav);
                    if (item.onClick) item.onClick();
                  }}
                  key={item.label}
                  className="hover:underline"
                >
                  {item.onClick ? (
                    <button>{item.label}</button>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
