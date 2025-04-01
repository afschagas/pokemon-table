import CarouselSlider from "../componentes/Carousel/CarouselSlider";
import Header from "../componentes/Header/Header";
import AppFooter from "../componentes/Footer/AppFooter";
import TableDetails from "../componentes/Table/TableDetails";

const Details = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      <Header />

      <main className="max-w-screen-lg mx-auto py-14 px-4">
        <CarouselSlider />
        <div className="mt-8">
          <TableDetails />
        </div>
       
      </main>
      <AppFooter />
    </div>
  );
};

export default Details;
