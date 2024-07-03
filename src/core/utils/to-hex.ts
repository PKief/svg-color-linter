import chroma from 'chroma-js';

const toHexColor = (color: string) => {
  return chroma(color).hex();
};

export { toHexColor };
