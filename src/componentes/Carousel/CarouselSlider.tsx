import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  type: string;
  photo: string;
}

const CarouselSlider = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon: { url: string }) => {
            const detailResponse = await axios.get(pokemon.url);
            const pokeDetail = detailResponse.data;

            return {
              id: pokeDetail.id,
              name: pokeDetail.name,
              types: pokeDetail.types.map((t: any) => t.type.name),
              type: pokeDetail.types[0].type.name,
              photo: pokeDetail.sprites.other.dream_world.front_default,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {pokemons.map((pokemon) => (
          <SwiperSlide key={pokemon.id} className="flex justify-center">
            <div className="relative min-w-96 h-96 rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-950  flex items-center justify-center">
              <img
                src={pokemon.photo}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSlider;
