const format = {
  todoDate: (str: string) => {
    return str.replace(/T.*$/, "");
  },
};

export default format;
