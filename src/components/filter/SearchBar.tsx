import React from 'react';
import { ChangeEvent } from 'react';
import { useTranslate } from '../../i18n/useTranslate';

function SearchBar({
  isFilterHidden,
  setIsFilterHidden,
  setIsTypeHidden,
  setIsLocationHidden,
  setSearchString
}: {
  isFilterHidden: boolean;
  setIsFilterHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTypeHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLocationHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(
      event.currentTarget?.value ? event.currentTarget?.value : ''
    );
  };

  const handleFilterHidden = () => {
    setIsFilterHidden(!isFilterHidden);
    if (isFilterHidden) {
      setIsTypeHidden(true);
      setIsLocationHidden(true);
    }
  };

  const t = useTranslate();
  return (
    <div className="flex items-center">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5  text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id="search"
          type="text"
          name="search"
          className=" border  text-sm rounded-lg  block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={t('inventory_list.search')}
          onChange={handleSearch}
          required
        />
        <button
          type="button"
          onClick={handleFilterHidden}
          id="dropdownCheckboxButton"
          data-dropdown-toggle="dropdownDefaultCheckbox"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4  text-gray-400  hover:text-white"
            fill="#2EB454"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
