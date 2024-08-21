type TooltipProps = {
  children: React.ReactNode | React.ReactNode[];
  description: string;
};

const Tooltip = ({ children, description }: TooltipProps) => {
  return (
    <div className="group relative mr-2">
      {children}
      <div className="absolute z-50 invisible top-[-2px] left-[110%] group-hover:visible bg-black text-p px-2 max-w-[330px] min-w-full text-sm rounded-md">
        <div className="leading-2 pt-2 pb-2">
          <p className="text-p">{description}</p>
        </div>
        <svg
          className="absolute z-40 rotate-90 top-[10px] left-[-12px]"
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="black" />
        </svg>
      </div>
    </div>
  );
};

export default Tooltip;
