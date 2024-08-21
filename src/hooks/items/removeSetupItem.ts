import { SourceReference } from '../../interfaces/Source';
import { Production } from '../../interfaces/production';

export function removeSetupItem(
  source: SourceReference,
  productionSetup: Production
) {
  const tempItems = productionSetup.sources.filter(
    (tempItem) => tempItem._id !== source._id
  );

  const updatedSetup = {
    ...productionSetup,
    sources: tempItems
  };

  return updatedSetup;
}
