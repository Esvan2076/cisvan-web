import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArrowButton from "../atoms/ArrowButton";
import ContentCard from "../organisms/ContentCard";

interface ContentItem {
  imageUrl: string;
  title: string;
  rating: number;
  inUserList: boolean;
  tconst: string;
}

interface ContentCarouselProps {
  items: ContentItem[];
}

const EPSILON = 4;

const ContentCarousel: React.FC<ContentCarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(900);

  const getScrollAmount = () => {
    const width = window.innerWidth;
    if (width < 640) return 300;
    if (width < 1024) return 600;
    if (width < 1536) return 900;
    return 1200;
  };

  const handleResize = () => {
    setScrollAmount(getScrollAmount());
    updateArrowVisibility();
  };

  const updateArrowVisibility = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollLeft, clientWidth, scrollWidth } = container;

    setShowLeft(scrollLeft > EPSILON);
    setShowRight(scrollLeft + clientWidth < scrollWidth - EPSILON);
  };

  const scrollToDirection = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Forcibly update arrow visibility after slight delay to give scroll time to apply
    setTimeout(updateArrowVisibility, 400);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setScrollAmount(getScrollAmount());
    updateArrowVisibility();

    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", updateArrowVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("scroll", updateArrowVisibility);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide py-4 w-full"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, index) => (
          <ContentCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            rating={item.rating}
            inUserList={item.inUserList}
            tconst={item.tconst}
          />
        ))}
      </div>

      {showLeft && (
        <ArrowButton
          onClick={() => scrollToDirection("left")}
          icon={<FaChevronLeft size={20} />}
          position="left"
        />
      )}
      {showRight && (
        <ArrowButton
          onClick={() => scrollToDirection("right")}
          icon={<FaChevronRight size={20} />}
          position="right"
        />
      )}
    </div>
  );
};

export default ContentCarousel;