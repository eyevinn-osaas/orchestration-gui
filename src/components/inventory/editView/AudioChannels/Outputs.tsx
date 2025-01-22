import { getEnabledValue } from './utils';
import NumberInput from './NumberInput';
import styles from './checkbox.module.scss';

interface IContents {
  value: string;
  id: string;
}

interface IEvent {
  target: {
    value: string;
  };
}
interface IOutput {
  contents: IContents[];
  outputRows: IContents[][];
  rowIndex: number;
  max: number;
  small?: boolean;
  locked: boolean;
  updateRows?: (e: IEvent, rowIndex: number, index: number, id: string) => void;
}

export default function Outputs({
  contents,
  outputRows,
  rowIndex,
  max,
  small = false,
  locked,
  updateRows
}: IOutput) {
  const findDuplicateValues = () => {
    const duplicateOutputIndices: number[] = [];
    const seenOutputs = new Set();

    contents.forEach((output, index) => {
      if (seenOutputs.has(output.value) && output.value !== '') {
        duplicateOutputIndices.push(index);

        // Also include the first occurrence if it's not already included
        const firstIndex = contents.findIndex(
          (item) => item.value === output.value
        );
        if (!duplicateOutputIndices.includes(firstIndex)) {
          duplicateOutputIndices.push(firstIndex);
        }
      } else if (output.value !== '') {
        seenOutputs.add(output.value);
      }
    });

    return {
      duplicateOutputIndices
    };
  };

  const { duplicateOutputIndices } = findDuplicateValues();

  return (
    <div className="flex">
      {contents.map(({ value, id }, index) => {
        const arraysInObject = {
          outputRows,
          contents
        };
        const indexes = {
          rowIndex,
          index
        };

        const isEnabled = getEnabledValue(arraysInObject, indexes);
        return (
          <div
            key={rowIndex + id}
            className={`${
              small ? 'mr-2 w-4 h-3 mb-1' : 'mr-5 w-5 h-5'
            } relative ${styles.checkbox}`}
          >
            <NumberInput
              isDisabled={small || !isEnabled || locked}
              max={max}
              value={value}
              duplicateError={duplicateOutputIndices.includes(index)}
              updateRows={(e: IEvent) =>
                updateRows && updateRows(e, rowIndex, index, id)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
