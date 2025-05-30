interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = "" }) => {
  return (
    <hr
      className={`my-2 sm:my-2 border-t-1 sm:border-t-2 md:border-t-3 border-white ${className}`}
    />
  );
};

export default Divider;
