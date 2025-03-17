import Header from "./organism/Header";

const Movie: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-neutral-900 min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header />


    </div>
  );
};

export default Movie;
