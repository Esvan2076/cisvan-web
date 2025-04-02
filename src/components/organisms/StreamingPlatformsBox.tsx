import { JSX, useState } from "react";
import TextAtom from "../atoms/TextAtomProps";

interface Platform {
  nombre: string;
  color: string;
  url: string;
}

interface StreamingPlatformsBoxProps {
  platforms: Platform[]; // Ahora recibe un array de objetos Platform
  className?: string;  // Estilos adicionales
}

const StreamingPlatformsBox: React.FC<StreamingPlatformsBoxProps> = ({ platforms = [], className = "" }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Si no hay plataformas, no se muestra "STREAMING"
  if (platforms.length === 0) return null;

  return (
    <div className={`flex flex-col items-center w-full rounded-md bg-neutral-900 select-none ${className}`}>
      {/* Texto superior "STREAMING" */}
      <TextAtom className="text-white font-semibold select-none">STREAMING</TextAtom>

      {/* Nombres de plataformas */}
      <div className="flex gap-2 whitespace-nowrap">
        {platforms
          .map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-200 whitespace-nowrap"
              style={{ color: platform.color }} // Aplica el color personalizado
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <TextAtom className={hoverIndex === index ? "underline" : ""}>
                {platforms.length <= 2  
                  ? platform.nombre // Si hay 1 o 2, mostrar completo
                  : hoverIndex === index 
                    ? platform.nombre // Si hay más, expandir en hover
                    : platform.nombre.charAt(0).toUpperCase()} 
              </TextAtom>
            </a>
          ))
          .reduce<JSX.Element[]>((prev, curr, index) => 
            index === 0 ? [curr] : [...prev, 
              <TextAtom key={`separator-${index}`} className="whitespace-nowrap text-white"> - </TextAtom>, 
              curr
            ], 
            []
          )}
      </div>
    </div>
  );
};

export default StreamingPlatformsBox;
