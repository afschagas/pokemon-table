import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/b8/83/fc/b883fc84b57235e6fe57f409716ae68d.gif')",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center bg-opacity-80 p-8 ">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white">
            Bem-vindo ao Mundo Pokémon
          </h1>

          <Link to="/detalhes">
            <button className="mt-6 px-6 py-2 bg-orange-300 text-white rounded-lg shadow-md hover:bg-orange-400 transition">
              Vamos Começar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
