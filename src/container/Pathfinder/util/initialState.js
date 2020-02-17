const numberOfRows = Math.floor((window.innerHeight / 27) * 0.65);
const numberOfColums = Math.floor((window.innerWidth / 27) * 0.9);

const initialState = () => {
  return {
    startingRow: Math.floor(numberOfRows / 2),
    startingCol: Math.floor((numberOfColums / 2) - (numberOfColums / 4)),
    finishingRow: Math.floor(numberOfRows / 2),
    finishingCol: Math.floor((numberOfColums / 2) + (numberOfColums / 4)),
  };
};

export { numberOfRows, numberOfColums, initialState };
