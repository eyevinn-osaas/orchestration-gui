/**
 * Development function, useful when testing loading ui
 * @param {number} milliseconds
 */
export async function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
