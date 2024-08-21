type Props = {
  children?: React.ReactNode | React.ReactNode[];
  showBorder: boolean;
};

export function MonitoringList({ children, showBorder }: Props) {
  return (
    <div
      className={`${
        showBorder ? 'border-l-2 border-l-monitoringBorder p-4 ' : 'p-4'
      } inline-flex flex-col`}
    >
      {children}
    </div>
  );
}
