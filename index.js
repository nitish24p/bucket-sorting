function BucketTree() {
  this.root = null;
}

BucketTree.prototype.add = function(value) {
  if (this.root === null) {
    const node = new Node(value);
    this.root = node;
    return;
  }

  const currentRoot = this.root;
};

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.users = [];
}

Node.prototype.addUser = function(user) {
  this.users.push(user);
};

Node.prototype.removeUser = function(user) {
  this.users = this.users.filter(u => u.id !== user.id);
};
