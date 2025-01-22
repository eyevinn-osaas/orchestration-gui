'use client';

import {
  PropsWithChildren,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import Image from 'next/image';
import { IconExclamationCircle } from '@tabler/icons-react';
import { Loader } from '../loader/Loader';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Type } from '../../interfaces/Source';
interface ImageComponentProps extends PropsWithChildren {
  src?: string;
  alt?: string;
  type?: Type;
  className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = (props) => {
  const { src, alt = 'Image', children, type, className } = props;
  const { imageRefetchKey } = useContext(GlobalContext);
  const [imgSrc, setImgSrc] = useState<string>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event>>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const refetchImage = () => {
    setImgSrc(`${src}?${imageRefetchKey}`);
    setError(undefined);
    setLoading(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setLoading(false), 500);
  };
  useEffect(() => {
    refetchImage();
  }, [imageRefetchKey]);

  useEffect(() => {
    setError(undefined);
    setImgSrc(`${src}?${imageRefetchKey}`);
  }, [src]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);
  return (
    <>
      {(!type || type === 'ingest_source') && src && (
        <div
          className={`${className} relative z-10 aspect-video min-w-full overflow-hidden border rounded-lg bg-zinc-700`}
        >
          {((!imgSrc || error) && (
            <IconExclamationCircle className="text-error fill-white w-full h-full" />
          )) || (
            <>
              <Image
                alt={alt}
                className={`transition-opacity opacity-0 ${
                  loaded && !loading ? 'opacity-100' : ''
                }`}
                src={imgSrc!}
                onLoad={() => {
                  setError(undefined);
                  setLoaded(false);
                }}
                onLoadingComplete={() => {
                  setLoaded(true);
                }}
                onError={(err) => {
                  setError(err);
                }}
                placeholder="empty"
                width={0}
                height={0}
                sizes="20vh"
                style={{
                  width: 'auto',
                  height: '100%'
                }}
              />
              <Loader
                className={`absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-0 ${
                  loading || !loaded ? 'opacity-100' : ''
                }`}
              />
            </>
          )}
          {children}
        </div>
      )}
      {(type === 'html' || type === 'mediaplayer') && (
        <span
          className={`${
            type === 'html' ? 'bg-sky-600' : 'bg-green-600'
          } flex justify-center items-center w-full h-full`}
        >
          <p className="text-black text-xl">
            {type === 'html' ? 'HTML' : 'Media Player'}
          </p>
        </span>
      )}
    </>
  );
};
export default ImageComponent;
