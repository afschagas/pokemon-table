const AppFooter = () => {
    const currentYear = new Date().getFullYear(); // Pega o ano atual
  
    return (
      <footer className="bg-[#f2f2f2] text-[#3e3e3e] p-4 text-center  dark:bg-gray-950  dark:text-white">
        <p>Desenvolvido por Alexandre Chagas - {currentYear}</p>
      </footer>
    );
  };
  
  export default AppFooter;