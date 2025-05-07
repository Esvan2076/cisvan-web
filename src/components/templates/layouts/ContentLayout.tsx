import { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

const ContentLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-4 lg:pt-6">
      <div className="w-full lg:w-2/3">{left}</div>
      <div className="w-full lg:w-1/3">{right}</div>
    </div>
  );
};

export default ContentLayout;
