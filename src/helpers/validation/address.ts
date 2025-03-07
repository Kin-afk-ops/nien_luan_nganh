export const validationEmpty = (value: string): boolean => {
  if (value === "") {
    return false;
  } else {
    return true;
  }
};

export const validationPhoneAddress = (value: string): boolean => {
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(value)) {
    return false;
  } else {
    return true;
  }
};
