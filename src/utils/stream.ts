const getHertz = (rate: number) => {
  const isMega = rate > 999999;
  const isKilo = rate > 999;

  if (isMega) {
    return `${rate / 1000000} MHz`;
  } else if (isKilo) {
    return `${rate / 1000} kHz`;
  }

  return `${rate} Hz`;
};

export { getHertz };
