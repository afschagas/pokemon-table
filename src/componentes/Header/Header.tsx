
import { Layout } from "antd";


const { Header: AntHeader } = Layout;

const Header = () => {
 
  return (
    <AntHeader className="fixed top-0 w-full z-10 shadow-md px-6 flex items-center justify-between bg-white dark:bg-gray-950  text-[#1f3760] dark:text-white">
      <h1 className="text-3xl font-bold">Pokémon</h1>
    </AntHeader>
  );
};

export default Header;
