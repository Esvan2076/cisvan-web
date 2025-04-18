interface ColoredBoxProps {
  color?: string;
  className?: string;
}

const ColoredBox: React.FC<ColoredBoxProps> = ({
  color = "bg-purple-500",
  className = "",
}) => {
  return <div className={`${color} w-full h-full ${className}`} />;
};

export default ColoredBox;
