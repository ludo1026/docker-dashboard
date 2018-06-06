const groupEnvironnements = require('./groups/environnements');

module.exports = __ => {
  const environnements = groupEnvironnements(__);
  __.environnements = environnements;
}