interface SplitPanelLayoutProps {
  imageComponent: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const SplitPanelLayout: React.FC<SplitPanelLayoutProps> = ({
  imageComponent,
  leftContent,
  rightContent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-full h-auto bg-neutral-900 text-white sm:pt-4 pt-10">
      <div className="flex flex-2 min-h-[250px] max-h-[420px] h-[30vw] bg-neutral-800">
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {imageComponent}
          </div>
        </div>
        <div className="flex-2 px-[10px] w-full">{leftContent}</div>
      </div>

      <div className="flex-1 mt-6 sm:mt-0">{rightContent}</div>
    </div>
  );
};

export default SplitPanelLayout;
