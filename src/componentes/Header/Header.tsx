import { useState, useEffect } from "react";
import { Layout } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verifica se há preferência no localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    // Aplica ou remove a classe "dark" no <html>
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Salva no localStorage
    localStorage.setItem("darkMode", newMode.toString());

    // Aplica ou remove a classe 'dark' no <html>
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <AntHeader className="fixed top-0 w-full z-10 shadow-md px-6 flex items-center justify-between bg-white dark:bg-gray-950  text-[#1f3760] dark:text-white">
      <h1 className="text-3xl font-bold">Pokémon</h1>
      {/* <button 
        onClick={toggleDarkMode} 
        className="p-2   rounded-full hover:scale-110 transition"
      >
        {darkMode ? <BulbFilled className="text-yellow-400 text-xl" /> : <BulbOutlined className="text-gray-600 text-xl" />}
      </button> */}
    </AntHeader>
  );
};

export default Header;
