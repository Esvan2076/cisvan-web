// components/atoms/Box.tsx
import React from "react";

interface BoxProps {
  color: string;
}

const Box: React.FC<BoxProps> = ({ color }) => {
  return (
    <div
      className="w-40 h-40 flex-shrink-0 rounded-md"
      style={{ backgroundColor: color }}
    />
  );
};

export default Box;
