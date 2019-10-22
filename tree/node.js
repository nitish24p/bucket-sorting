function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.users = {};
}

Node.prototype.addUser = function(user) {
  this.users[user.id] = user;
};

Node.prototype.removeUser = function(user) {
  //console.log('DELETEING', this);
  delete this.users[user.id];
};

module.exports = Node;
