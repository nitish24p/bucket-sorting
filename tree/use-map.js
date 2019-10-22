function UserMap() {
  this.userStepCount = {};
}

UserMap.prototype.addUser = function(user, steps) {
  this.userStepCount[user.id] = steps;
};

UserMap.prototype.findUserSteps = function(user) {
  return this.userStepCount[user.id];
};

module.exports = UserMap;
