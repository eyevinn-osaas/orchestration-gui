import { Loader } from './Loader';

export function LoadingCover() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader className="w-20 h-20" />
    </div>
  );
}
