import styles from './loader.module.scss';

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${styles.loader}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
