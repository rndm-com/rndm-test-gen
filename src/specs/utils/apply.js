const apply = (Subject = () => ({}), args = [], context) => {
  try {
    return Subject.bind(context)(...args);
  } catch (e) {
    if (e.message !== 'Cannot call a class as a function') throw e;
    return new Subject(...args);
  }
};

export default apply;
