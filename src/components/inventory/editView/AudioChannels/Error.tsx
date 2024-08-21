interface IError {
  error: string;
}

export default function Error({ error }: IError) {
  return (
    <div>
      {error && (
        <div className="z-10 bg-button-delete relative top-10 rounded-sm whitespace-nowrap inline">
          {error}
        </div>
      )}
    </div>
  );
}
