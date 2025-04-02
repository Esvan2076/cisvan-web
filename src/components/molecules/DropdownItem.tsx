interface DropdownItemProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
  }
  
const DropdownItem: React.FC<DropdownItemProps> = ({ text, isSelected, onClick }) => {
    return (
    <button
        onClick={onClick}
        className="flex justify-between items-center w-full px-4 py-2 text-white rounded-md hover:bg-neutral-700 transition-colors"
    >
        <span className="select-none">{text}</span>
        {/* Contenedor del círculo con margen interno */}
        <div className="w-4 h-4 flex items-center justify-center rounded-full border border-white">
        <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-red-500" : ""}`} />
        </div>
    </button>
    );
};

export default DropdownItem;
