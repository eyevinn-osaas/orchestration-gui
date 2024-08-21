type StatusTooltipProps = {
  children: React.ReactNode | React.ReactNode[];
  description: string;
};

const StatusTooltip = ({ children, description }: StatusTooltipProps) => {
  return (
    <div className="group relative mr-2">
      {children}
      <div className="absolute z-50 invisible top-[-2px] left-[150%] group-hover:visible bg-gray-700 w-96 text-p px-2  text-sm rounded-md shadow-md">
        <div className="leading-2 p-4">
          <p className="text-p">{description}</p>
        </div>
        <svg
          className="absolute z-40 rotate-90 top-[-10px] left-[-24px] p-2 w-12 h-14"
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="#374151" />
        </svg>
      </div>
    </div>
  );
};

export default StatusTooltip;
