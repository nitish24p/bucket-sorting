/**
 * Each Bucket has minimum value
 * 0 - 99
 * 100 - 199
 * 200 - 299
 * 300 - 399
 *
 * 900 - 999
 */

const Tree = require('./tree');
const UserMap = require('./use-map');

const BUCKET_SIZE = 40;

function BucketHashTree(bucketSize) {
  this.bucketSize = bucketSize;
  this.bucketTree = {};
  this.userStepMap = new UserMap();

  for (let index = 0; index <= 1000000; index = index + this.bucketSize) {
    //console.log(index);
    this.bucketTree[index] = new Tree();
  }
}

BucketHashTree.prototype.addUser = function(user, steps) {
  //console.log(this.bucketTree);
  let currentUserSteps = this.userStepMap.findUserSteps(user) || steps;
  let minBucketIndex = Math.floor(currentUserSteps / this.bucketSize);
  //console.log(minBucketIndex, currentUserSteps, steps, user.id);
  let foundTree = this.bucketTree[minBucketIndex * this.bucketSize];
  const userNode = foundTree.findNode(currentUserSteps);
  //console.log('==FOUND NODE  ', userNode);
  if (userNode === null) {
    foundTree.addUserNode(user, steps);
    this.userStepMap.addUser(user, steps);
  } else {
    userNode.removeUser(user);
    const newSteps = currentUserSteps + steps;
    minBucketIndex = Math.floor(newSteps / this.bucketSize);
    foundTree = this.bucketTree[minBucketIndex * this.bucketSize];
    foundTree.addUserNode(user, newSteps);
    this.userStepMap.addUser(user, newSteps);
    // Remove user from existing node
    // add user to new bucket
  }
  //console.log(foundTree);
  // Find User in tree,
  // Remove User from Tree
  // Add user to new bucket
  // Update usermap
  // new steps = currentSteps + steps
};

BucketHashTree.prototype.printBucketTree = function() {
  console.log(JSON.stringify(this));
};

const user1 = {
  id: 1,
  name: 'Nitish'
};

const user2 = {
  id: 2,
  name: 'Ravi'
};

const user3 = {
  id: 3,
  name: 'Vikas'
};

const user4 = {
  id: 4,
  name: 'Rahul'
};

const start = new Date().getTime();
const hashBucketTree = new BucketHashTree(BUCKET_SIZE);
for (let index = 0; index < 100000; index++) {
  hashBucketTree.addUser(user1, Math.floor(Math.random() * 10) + 1);
  hashBucketTree.addUser(user2, Math.floor(Math.random() * 10) + 1);
  hashBucketTree.addUser(user3, Math.floor(Math.random() * 10) + 1);
  hashBucketTree.addUser(user4, Math.floor(Math.random() * 10) + 1);
}
// hashBucketTree.addUser(user1, 150);
// hashBucketTree.addUser(user2, 20);
// hashBucketTree.addUser(user1, 25);

// hashBucketTree.addUser(user1, 200);
// hashBucketTree.addUser(user2, 122);
// hashBucketTree.addUser(user1, 33);
// hashBucketTree.addUser(user2, 43);
// hashBucketTree.addUser(user1, 25);
console.log(`FINISHED IN ${new Date().getTime() - start}ms`);

const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}

//hashBucketTree.printBucketTree();
