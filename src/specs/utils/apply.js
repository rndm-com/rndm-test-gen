const apply = (Subject = () => ({}), args = [], context) => {
  try {
    return Subject.bind(context)(...args);
  } catch (_) {
    return new Subject(...args);
  }
};

export default apply;
