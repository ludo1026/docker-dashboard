module.exports = __ => {
  const {container} = __;
  let name = '';
  for(const Name of container.Names) {
    if(name !== '') {
      name += ', ';
    }
    if(Name.charAt(0) === '/') {
      name += Name.substring(1);
    } else {
      name += Name;
    }
  }
  container.name = name;
}