import React from "react";

interface ImageBoxProps {
  src: string;
  className?: string;
  alt?: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ src, className = "", alt = "Image" }) => {
  return (
    <img
      src={src}
      alt={alt}
      draggable="false" // Evita que se pueda arrastrar
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`} // Bloquea selección
    />
  );
};

export default ImageBox;
