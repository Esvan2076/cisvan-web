import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  text: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center lg:gap-2 px-2 lg:px-4 py-2 w-[40px] h-[40px] lg:w-auto lg:h-auto rounded-md 
      bg-neutral-800 text-white transition-all hover:bg-neutral-700 whitespace-nowrap"
    >
      <Icon className="text-xl lg:text-2xl" />
      <span className="hidden lg:inline select-none">{text}</span>
    </button>
  );
};

export default IconButton;
