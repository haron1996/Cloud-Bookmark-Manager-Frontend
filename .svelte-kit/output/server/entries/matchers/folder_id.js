function match(param) {
  return /^[a-z_-]{33}$/.test(param);
}
export {
  match
};
