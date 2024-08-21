import { Loader } from './Loader';

export function LoadingOverlay() {
  return (
    <div className="absolute bg-black/70 top-0 left-0 w-full h-full flex justify-center items-center">
      <Loader className="w-20 h-20" />
    </div>
  );
}
