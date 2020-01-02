export function isBetween (val, lower, upper) {
  return val >= lower && val <= upper;
}

export function uniqueByProperty (array = [], selector) {
  const values = [];
  const distinct = [];

  // loop over array
  array.forEach((item, index) => {
    const value = selector(item);
    if (values.includes(value)) return;

    // item has not yet been found add to distinct array
    values.push(value);
    distinct.push(array[index]);
  });

  return distinct;
}
