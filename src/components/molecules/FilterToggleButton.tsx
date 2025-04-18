interface Props {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const FilterToggleButton: React.FC<Props> = ({ label, isSelected, onClick }) => {
    return (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 border border-white ${
        isSelected
            ? "bg-white text-black"
            : "bg-neutral-800 text-white hover:bg-neutral-700"
        }`}
    >
        {label}
    </button>
    );
};

export default FilterToggleButton;
  