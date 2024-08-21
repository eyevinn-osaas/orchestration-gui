type Props = {
  description: string;
  value: number | boolean | undefined;
  isTracked?: boolean;
  hasError?: boolean;
};

export function MonitoringListItem({
  description,
  value,
  isTracked,
  hasError
}: Props) {
  let color = 'text-p';
  if (isTracked && hasError) {
    color = 'text-indicatorRed';
  }
  if (isTracked && !hasError) {
    color = 'text-indicatorGreen';
  }
  return (
    <div className="cursor-help">
      <span className={`${color}`}>{`${description}: `}</span>
      {typeof value == 'boolean' ? (
        value ? (
          <span>Yes</span>
        ) : (
          <span>No</span>
        )
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
