'use client';
import { IconChevronDown, IconSitemap } from '@tabler/icons-react';
import { useState } from 'react';

interface AccordionProps {
  title: string;
  hasError?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export const Accordion = ({ title, children, hasError }: AccordionProps) => {
  const [active, setActive] = useState<boolean>(false);

  function toggleAccordion() {
    setActive((prevState) => !prevState);
  }
  const textColor = hasError ? 'text-indicatorRed' : 'text-p';
  const iconColor = hasError ? 'text-indicatorRed' : 'text-indicatorGreen';
  return (
    <div className="flex flex-col">
      <button
        className={`flex space-x-4 mt-2 p-3 bg-container ${
          active ? 'rounded-t' : 'rounded'
        } shadow-xl items-center`}
        onClick={toggleAccordion}
      >
        <div className="flex flex-1 space-x-4 items-center">
          <IconSitemap className={`w-6 h-6 ${iconColor}`} />
          <div className={`${textColor} font-semibold`}>{title}</div>
        </div>
        <div
          className={`${
            active ? 'transform rotate-180' : 'transform rotate-0'
          }`}
        >
          <IconChevronDown className="w-6 h-6 text-p" />
        </div>
      </button>
      <div className={`${active ? 'block' : 'hidden'}`}>
        <div className="bg-container rounded-b shadow-md pt-3 pb-8 px-10 text-p">
          {children}
        </div>
      </div>
    </div>
  );
};
