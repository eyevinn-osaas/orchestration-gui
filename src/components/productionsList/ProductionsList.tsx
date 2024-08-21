import React from 'react';
import { getProductions } from '../../api/manager/productions';
import { ProductionsListItem } from './ProductionsListItem';

async function ProductionsList() {
  const productions = (await getProductions())
    .sort((a, b) => {
      return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
    })
    .map((production) => ({ ...production, _id: production._id.toString() }));
  return (
    <ul className="w-full">
      {productions.map((production) => (
        <ProductionsListItem
          key={`${production._id}`}
          production={production}
        />
      ))}
    </ul>
  );
}

export default ProductionsList;
