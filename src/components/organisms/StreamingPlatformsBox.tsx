import { useState, JSX } from "react";
import TextAtom from "../atoms/TextAtom";
import PlatformLink from "../molecules/PlatformLink";

interface Platform {
  nombre: string;
  color: string;
  url: string;
}

interface StreamingPlatformsBoxProps {
  platforms: Platform[];
  className?: string;
}

const StreamingPlatformsBox: React.FC<StreamingPlatformsBoxProps> = ({
  platforms = [],
  className = "",
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (platforms.length === 0) return null;

  const getDisplayMode = (index: number) => {
    if (platforms.length <= 2) return true;
    return hoverIndex === index;
  };

  return (
    <div
      className={`flex flex-col items-center w-full rounded-md bg-neutral-900 ${className}`}
    >
      <TextAtom className="text-white font-semibold select-none">
        STREAMING
      </TextAtom>

      <div className="flex gap-2 whitespace-nowrap">
        {platforms
          .map((platform, index) => (
            <PlatformLink
              key={index}
              nombre={platform.nombre}
              url={platform.url}
              color={platform.color}
              isHovered={hoverIndex === index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              showFullName={getDisplayMode(index)}
            />
          ))
          .reduce<JSX.Element[]>(
            (acc, curr, idx) =>
              idx === 0
                ? [curr]
                : [
                    ...acc,
                    <TextAtom
                      key={`separator-${idx}`}
                      className="whitespace-nowrap text-white select-none"
                    >
                      {" "}
                      -{" "}
                    </TextAtom>,
                    curr,
                  ],
            []
          )}
      </div>
    </div>
  );
};

export default StreamingPlatformsBox;
