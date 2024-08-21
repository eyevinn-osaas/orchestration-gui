type Props = {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  hasError?: boolean;
};

export function MonitoringListTitle({ title, children, hasError }: Props) {
  return (
    <>
      <div
        className={`font-semibold mt-2 ${hasError ? 'text-indicatorRed' : ''}`}
      >
        {title}
      </div>
      <>{children}</>
    </>
  );
}
