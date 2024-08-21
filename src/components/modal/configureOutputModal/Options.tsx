type optionTypes = string;

interface IOPtions {
  label: string;
  options: optionTypes[];
  value: string;
  update: (value: string) => void;
}

export default function Options({ label, options, value, update }: IOPtions) {
  return (
    <div className="flex mb-5 justify-between w-full px-2">
      <label className="flex items-center">{label}</label>
      <select
        onChange={(e) => {
          update(e.target.value);
        }}
        value={value}
        className="cursor-pointer px-2 border justify-center text-sm rounded-lg w-6/12 pt-1 pb-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-gray-400 focus:outline-none"
      >
        {options.map((value, i) => (
          <option value={value} key={value + i}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
