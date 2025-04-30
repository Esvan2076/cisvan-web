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

const ContentCarousel: React.FC<ContentCarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(900);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const scrollWithLock = (direction: "left" | "right") => {
    if (isScrolling) return;
    const container = containerRef.current;
    if (!container) return;

    setIsScrolling(true);
    const start = container.scrollLeft;
    const change = direction === "left" ? -scrollAmount : scrollAmount;
    const target = start + change;

    container.scrollTo({
      left: target,
      behavior: "smooth",
    });

    const checkScrollEnd = () => {
      const current = container.scrollLeft;
      if (Math.abs(current - target) < 5 || 
          (direction === "left" && current <= 0) || 
          (direction === "right" && current + container.clientWidth >= container.scrollWidth)) {
        setIsScrolling(false);
        updateArrowVisibility();
        return;
      }
      requestAnimationFrame(checkScrollEnd);
    };

    requestAnimationFrame(checkScrollEnd);
  };

  const updateArrowVisibility = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollLeft, clientWidth, scrollWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setScrollAmount(getScrollAmount());
    updateArrowVisibility();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        onScroll={updateArrowVisibility}
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
          onClick={() => scrollWithLock("left")}
          icon={<FaChevronLeft size={20} />}
          position="left"
        />
      )}
      {showRight && (
        <ArrowButton
          onClick={() => scrollWithLock("right")}
          icon={<FaChevronRight size={20} />}
          position="right"
        />
      )}
    </div>
  );
};

export default ContentCarousel;
