import { useState } from "react";

interface ImageBoxProps {
  src: string;
  className?: string;
  alt?: string;
  loadingText?: string;
  showSkeleton?: boolean; // true por defecto
}

const ImageBox: React.FC<ImageBoxProps> = ({
  src,
  className = "",
  alt = "Image",
  loadingText,
  showSkeleton = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded" />
      )}

      <img
        loading="lazy"
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        draggable="false"
        className={`w-full h-full object-cover select-none pointer-events-none ${
          showSkeleton && !isLoaded ? "invisible" : "visible"
        }`}
      />

      {loadingText && <span className="sr-only">{loadingText}</span>}
    </div>
  );
};

export default ImageBox;
