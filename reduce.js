const a = [1, 2, 3, 4, 5];
const total = a.reduce((prev, curr, index) => {
  console.log(index);
  return (prev += curr);
}, 0);
