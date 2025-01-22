'use client';

import logoSrc from '../../../public/images/ateliere-logo.png';
import Image from 'next/image';
import SideNavConnections from './SideNavConnections';
import Icons, { PickIconNames } from '../icons/Icons';
import SideNavAccount from './SideNavAccount';
import SideNavLock from './SideNavLock';
import SideNavRefreshThumbnails from './SideNavRefreshThumbnails';
import SideNavItemComponent from './SideNavItemComponent';
import { useEffect, useState } from 'react';
import { useTranslate } from '../../i18n/useTranslate';
import SideNavTeardown from './SideNavTeardown';

export interface SideNavItem {
  label: string;
  id: string;
  link: string;
  icon: PickIconNames;
}

export interface SideNavItemBaseProps {
  open: boolean;
}

const SideNav: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1281
  );
  const t = useTranslate();

  // To create a new Side Nav Menu item just add one to the array
  // Make sure to add the IconName in the components/Icons/Icons file
  const sideNavItems: SideNavItem[] = [
    {
      id: 'productions',
      label: t('production.productions'),
      link: '/',
      icon: 'IconBuildingFactory2'
    },
    {
      id: 'inventory',
      label: t('inventory'),
      link: '/inventory',
      icon: 'IconListDetails'
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (width < 1280) {
      setOpen(false);
    }
  }, [width]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  // Setting open to false will retract the sideNav menu, setting a smaller width, and all the adjustments on the children are made with CSS
  return (
    <div
      className={`flex flex-col bg-container min-w-0 ${
        open ? 'w-[450px] min-w-[450px]' : 'min-w-20 w-20'
      } h-full p-2 pt-4 transition-all duration-500 max-w-[450px]`}
    >
      <div className="flex flex-row-reverse h-16 mb-6 justify-between items-center">
        <div onClick={toggleOpen}>
          <Icons
            name={open ? 'IconMenuDeep' : 'IconMenu2'}
            className="text-white hover:cursor-pointer rounded-xl hover:bg-light min-w-[60px] min-h-16 p-2"
          />
        </div>
        <Image
          src={logoSrc}
          alt="logo"
          className="min-w-[276px] p-2 mr-1"
          style={{
            width: '286px',
            height: '78%'
          }}
        />
      </div>
      <div className={`flex flex-col grow justify-between text-white text-xl`}>
        <div className="mt-6">
          {sideNavItems.map((item) => (
            <SideNavItemComponent
              {...item}
              key={'SideNav' + item.id}
              open={open}
            />
          ))}
        </div>
        <div>
          <SideNavTeardown open={open} />
          <SideNavRefreshThumbnails open={open} />
          <SideNavLock open={open} />
          <SideNavConnections />
          <SideNavAccount open={open} />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
