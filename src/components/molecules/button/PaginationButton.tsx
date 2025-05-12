interface PaginationButtonProps {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
  disabled?: boolean;  // Añadido el atributo disabled
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  onClick,
  isPrimary = false,
  disabled = false,  // Valor predeterminado
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}  // Aplicar el estado deshabilitado
      className={`px-4 py-2 text-white rounded transition select-none ${
        isPrimary
          ? "bg-red-600 hover:bg-red-700"
          : "bg-neutral-600 hover:bg-neutral-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}  // Estilo para botón deshabilitado
    >
      {label}
    </button>
  );
};

export default PaginationButton;
