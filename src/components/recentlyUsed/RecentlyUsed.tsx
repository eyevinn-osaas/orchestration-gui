import React from 'react';

function RecentlyUsed() {
  return (
    <div>
      <div className="text-p text-xl">Recently used configurations </div>
      <ul className="max-w-md space-y-1 list-inside mt-2 text-p text-sm font-medium">
        <li className="flex items-center">Svenska Nyheter</li>
        <li className="flex items-center">Älgvandringen</li>
      </ul>
    </div>
  );
}

export default RecentlyUsed;
