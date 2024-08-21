type DropDownItemProps = {
  label: string;
};
export default function DropDownItem({ label }: DropDownItemProps) {
  return (
    <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
      {label}
    </p>
  );
}
