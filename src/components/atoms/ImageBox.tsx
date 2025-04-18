import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ImageBoxProps {
  src: string;
  className?: string;
  alt?: string;
  loadingText?: string;
  showSkeleton?: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
  src,
  className = "",
  alt = "Image",
  loadingText,
  showSkeleton = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const finalLoadingText = loadingText ?? t("loading_image");

  return (
    <div className={`relative w-full h-full ${className}`}>
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded" />
      )}

      <img
        loading="lazy"
        src={hasError ? "/default-actor.png" : src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)} // <-- maneja error
        draggable="false"
        className={`w-full h-full object-cover select-none pointer-events-none ${
          showSkeleton && !isLoaded ? "invisible" : "visible"
        }`}
      />

      {finalLoadingText && <span className="sr-only">{finalLoadingText}</span>}
    </div>
  );
};

export default ImageBox;
