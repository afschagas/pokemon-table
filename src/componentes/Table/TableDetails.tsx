import { useEffect, useState } from "react";
import { Table, Button, Image, Pagination, Spin, Input, Tabs } from "antd";
import { DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import "../Table/TableDetails.css";

const { Search } = Input;
const { TabPane } = Tabs;

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  type: string;
  photo: string;
}

const TableDetails = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchPokemons = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

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
      setTotalPokemons(response.data.count);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const offset = (currentPage - 1) * 12;
    fetchPokemons(offset, 12);
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addToFavorites = (pokemon: Pokemon) => {
    const updatedFavorites = [...favorites, pokemon];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter((poke) => poke.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const deletePokemon = (id: number) => {
    setPokemons(pokemons.filter((poke) => poke.id !== id));
  };

  // Filtragem de Pokémon pelo nome ou tipo
  const filteredPokemons = (pokemonsToFilter: Pokemon[]) =>
    pokemonsToFilter.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    {
      title: "Tipos",
      dataIndex: "types",
      key: "types",
      render: (types: string[]) => types.join(", "),
    },
    { title: "Tipo Principal", dataIndex: "type", key: "type" },
    {
      title: "Imagem",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => <Image src={photo} alt="Pokemon" width={50} />,
    },
    {
      title: "Ação",
      key: "action",
      render: (_: any, record: Pokemon) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deletePokemon(record.id)}
          />
          {favorites.some((fav) => fav.id === record.id) ? (
            <Button
              type="dashed"
              icon={<HeartFilled />}
              onClick={() => removeFromFavorites(record.id)}
            />
          ) : (
            <Button
              type="default"
              icon={<HeartOutlined />}
              onClick={() => addToFavorites(record)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Search
          placeholder="Pesquisar por nome ou tipo..."
          allowClear
          enterButton="Buscar"
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Spin spinning={loading} tip="Carregando...">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pokémons" key="1">
            <Table
              className="transparent-table"
              dataSource={filteredPokemons(pokemons)}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                current={currentPage}
                total={totalPokemons}
                pageSize={12}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          </TabPane>
          <TabPane tab="Favoritos" key="2">
            <Table
              className="transparent-table"
              dataSource={filteredPokemons(favorites)}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default TableDetails;
