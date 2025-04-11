interface PaginationButtonProps {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  onClick,
  isPrimary = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded transition select-none ${
        isPrimary
          ? "bg-red-600 hover:bg-red-700"
          : "bg-neutral-600 hover:bg-neutral-700"
      }`}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
