import { Numbers } from '../../../../interfaces/Source';

interface IObject {
  value: string;
}
interface IContents {
  value: string;
  id: string;
}
interface Arrays {
  outputRows: IContents[][];
  contents: IContents[];
}

export const getValue = (array: IObject[], index: number) => {
  return array && array[index] && array[index].value;
};

export const getEnabledValue = (
  { outputRows, contents }: Arrays,
  { rowIndex, index }: { rowIndex: number; index: number }
) => {
  const prevIndex = index - 1;
  const bottom = outputRows[rowIndex + 1];
  const top = outputRows[rowIndex - 1];
  const previousValue = getValue(contents, prevIndex);
  const bottomValue = getValue(bottom, index);
  const bottomPrevious = getValue(bottom, prevIndex);
  const topValue = getValue(top, index);
  const topPrevious = getValue(top, prevIndex);
  const nextValue = getValue(contents, index + 1);

  if (rowIndex && nextValue) {
    return false;
  }
  if (
    (index && !rowIndex && !bottomValue && (previousValue || bottomPrevious)) ||
    (!topValue && topPrevious)
  ) {
    return true;
  }

  return !rowIndex && !index;
};

export const oneBased = (audioMap: Numbers[]) => {
  return audioMap.map((numberOrArray) => {
    if (typeof numberOrArray === 'object') {
      return numberOrArray.map((number) => number + 1);
    }
    return numberOrArray + 1;
  });
};

export const zeroBased = (audioMap: Numbers[]) => {
  return audioMap.map((numberOrArray) => {
    if (typeof numberOrArray === 'object') {
      return numberOrArray.map((number) => number - 1);
    }
    return numberOrArray - 1;
  });
};
