const validationEmpty = (value: string): boolean => {
  if (value === "") {
    return false;
  } else {
    return true;
  }
};

export default validationEmpty;
