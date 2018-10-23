const apply = (Subject = () => ({}), args = []) => {
  try {
    return Subject(...args)
  } catch (_) {
    return new Subject(...args);
  }
};

export default apply;
