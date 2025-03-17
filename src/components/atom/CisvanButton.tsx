interface CisvanButtonProps {
  onClick?: () => void;
}

const CisvanButton: React.FC<CisvanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 px-3 sm:px-6 text-lg font-bold rounded-lg border-2 border-red-500 text-red-500 bg-transparent 
                 transition-all duration-300 hover:bg-red-500 hover:text-neutral-800"
    >
      <span className="hidden sm:block select-none">CISVAN</span>
      <span className="block sm:hidden select-none">C</span>
    </button>
  );
};

export default CisvanButton;
