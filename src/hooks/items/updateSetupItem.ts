import { Production } from '../../interfaces/production';
import { SourceReference } from '../../interfaces/Source';

export function updateSetupItem(
  source: SourceReference,
  productionSetup: Production
) {
  productionSetup.sources.forEach((tempItem, index) => {
    if (tempItem._id === source._id) {
      productionSetup.sources[index].label = source.label;
    }
  });
  return { ...productionSetup };
}
