const Node = require('./node');

function BucketTree() {
  this.root = null;
}

BucketTree.prototype.addUserNode = function(user, data) {
  // create a new Node anyway
  const node = new Node(data);
  if (this.root === null) {
    this.root = node;
    return;
  }

  let currentRoot = this.root;
  while (currentRoot) {
    if (data > currentRoot.value) {
      // insert value to right
      // add user
      if (!currentRoot.right) {
        node.addUser(user);
        currentRoot.right = node;
        break;
      } else {
        currentRoot = currentRoot.right;
      }
    } else if (data < currentRoot.value) {
      // insert value to left
      // add user
      if (!currentRoot.left) {
        node.addUser(user);
        currentRoot.left = node;
        break;
      } else {
        currentRoot = currentRoot.left;
      }
    } else {
      currentRoot.addUser(user);
      break;
    }
  }
};

BucketTree.prototype.findNode = function(steps) {
  let currentRoot = this.root;

  // create a new Node anyway
  if (this.root === null) {
    return null;
  }

  while (currentRoot) {
    if (currentRoot.value === steps) {
      return currentRoot;
    } else {
      if (currentRoot.value < steps) {
        currentRoot = currentRoot.right;
      } else if (currentRoot.value > steps) {
        currentRoot = currentRoot.left;
      }
    }
  }
};

module.exports = BucketTree;
