const validator = {
  isEmail: (email: string) => {
    return /^\S+@\S+$/.test(email);
  },
  isLength: (
    password: string,
    { min, max }: { min?: number; max?: number }
  ) => {
    if (min && max) {
      return password.length >= min && password.length <= max;
    }
    return password.length >= (min || 0);
  },
};

export default validator;
