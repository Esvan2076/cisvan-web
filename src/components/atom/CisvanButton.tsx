interface CisvanButtonProps {
  onClick?: () => void;
}

const CisvanButton: React.FC<CisvanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 lg:h-10 px-3 lg:px-6 text-lg font-bold rounded-lg border-2 border-red-500 text-red-500 bg-transparent 
                 transition-all duration-300 hover:bg-red-500 hover:text-neutral-800 w-[40px] h-[40px] lg:w-auto"
    >
      <span className="hidden lg:inline select-none">CISVAN</span>
      <span className="block lg:hidden select-none">C</span>
    </button>
  );
};

export default CisvanButton;
