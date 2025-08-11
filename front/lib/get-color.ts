const randomRGBA = (border?: string) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(2); // Alpha between 0.00 and 1.00
  return `rgba(${r}, ${g}, ${b}, ${border ? a : 1})`;
};

export default randomRGBA;
