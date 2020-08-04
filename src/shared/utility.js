export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
};

export const dollarFormatter = (value) => {
  if (value % 1 === 0) {
    return '$' + value.toLocaleString();
  } else {
    return '$' + value.toFixed(2).toLocaleString();
  }
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}