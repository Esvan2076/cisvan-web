import TextAtom from "../atoms/TextAtom";

interface PlatformLinkProps {
  nombre: string;
  url: string;
  color: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showFullName: boolean;
}

const PlatformLink: React.FC<PlatformLinkProps> = ({
  nombre,
  url,
  color,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  showFullName
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition duration-200 whitespace-nowrap"
      style={{ color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TextAtom className={isHovered ? "underline select-none" : "select-none"}>
        {showFullName ? nombre : nombre.charAt(0).toUpperCase()}
      </TextAtom>
    </a>
  );
};

export default PlatformLink;
