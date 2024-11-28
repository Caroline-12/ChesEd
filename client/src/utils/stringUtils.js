export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const capitalizeFullName = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};
