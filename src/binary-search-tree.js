const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this._root = null;  
  }
  root() {
    //console.debug("root "+ this._root.data + '' + this._root );
    return this._root;
  }

  add(data) {
    if(!this._root){
      this._root = new Node(data);

      console.debug("root node added "+ data + ' ' + this._root + " =  "+ this._root.data);
      return;
    }
    console.debug("root node before next adding"+ data + '' + this._root.data);
    addNode(this._root, data);
    

    function addNode(node, data){
      //console.debug("try to add new node  "+ data + ' ' + node + node.data );
      if(node.data > data){//go to left
        if (!node.left){   //add to left
          node.left = new Node(data);
          //console.debug("new node added left"+ data + '' + node.left );
        }else {
          addNode(node.left, data); //for new compearing
        }
      }else{
        if (node.data < data){ //go to right
          if (!node.right){   //add to right
            node.right = new Node(data);
           // console.debug("new node added righr"+ data + '' + node.right );
          }else {
            addNode(node.right, data); //for new compearing
          }
        }
      }
    } 

  }

  has(data) {
    let i = 0;
       
    function hasNode(node, data){
      i++;
      if(i>20){
        return false;  ///debug
      }
      //console.debug('----------------------searching ' +data + " in " + node.data);
      if(!node){
        //console.debug('compare last node ' +data +'return false');
        return false;
      }
      //console.debug('----------------------searching ' +data + " in " + node.data);
      console.debug('compare '+node.data + ' and ' +data);
      if(node.data == data){        
        //console.debug('compare '+node.data + ' = ' +data+ 'return true');
        return true;
      }else if(node.data > data){//go to left
        //console.debug('compare '+node.data + ' > ' +data);

        return hasNode(node.left, data); //for new compearing
      }else{  //go to right
        //console.debug('compare '+node.data + ' < ' +data);
        console.debug(node.right);
        return hasNode(node.right, data); //for new compearing
      }  
    }
    let res = hasNode(this._root, data);
    //console.debug('res has '+ data + res);
    return res;
  }

  find(data) {
    function findNode(node, data){
      //console.debug('----------------------searching ' +data + " in " + node.data);
      if(!node){
        //console.debug('compare last node ' +data +'return null');
        return null;
      }
      //console.debug('----------------------searching ' +data + " in " + node.data);
      //console.debug('compare '+node.data + ' and ' +data);
      if(node.data == data){        
        //console.debug('compare '+node.data + ' = ' +data+ 'return true');
        return node;
      }else if(node.data > data){//go to left
        //console.debug('compare '+node.data + ' > ' +data);
        return findNode(node.left, data); //for new compearing
      }else{  //go to right
        //console.debug('compare '+node.data + ' < ' +data);
        return findNode(node.right, data); //for new compearing
      }  
    }
    let res = findNode(this._root, data);
    console.debug('res found '+ data + res);
    return res;
  }

  remove(data) {
    console.debug("Removing of " + data);
    if (!this._root) {
      return null
    } 
    if (!this.has(data))  {
      console.log('there is no data ' + data);
      return null
    }

    function findNextNode(prevNode, data){
      console.log('checking '+ prevNode.data +" for  " + data)
      if (prevNode.data > data){
        if (!prevNode.left){//no such node
          return null
        }else if (prevNode.left.data == data){
          return prevNode // that's it
        }
        return findNextNode(prevNode.left, data) //continue searching
      }else if(prevNode.data < data){
        if (!prevNode.right){//no such node
          return null
        }else if (prevNode.right.data == data){
          return prevNode // that's it
        }
        return findNextNode(prevNode.right, data) //continue searching
      }else{
        console.log('sometingwrong in searching')
      }     
    }
    function findMin(node){ //returns node 
      console.debug("searchig min step on node = " +node.data)
      if(node.left){    //go to left
        return findMin(node.left)
      }else{
        return node
      }
    }

    let prevNode;
    let sidePrev;
    let nodeToDelete;
    if (this._root.data == data){
      prevNode = null;
      nodeToDelete = this._root;  
    }else{
      prevNode = findNextNode(this._root, data);
      if(prevNode.left && prevNode.left.data == data){
        sidePrev = 'left';
      }else if(prevNode.right && prevNode.right.data == data){
        sidePrev = 'right';
      }else{
        console.log('someting wrong in removing')
      }
      nodeToDelete = prevNode[sidePrev];
    }
    if (!nodeToDelete.left && !nodeToDelete.right){
      if(prevNode){
        console.log('before delete prevnode = ' + prevNode);
        prevNode[sidePrev] = null;
        console.log('after delete prevnode = ' + prevNode);
      }else{
        this._root = null;
      }
      console.debug('prevNode');
      console.debug(prevNode);
      return nodeToDelete;
    }
    if (nodeToDelete.left && !nodeToDelete.right){
      if(prevNode){
        console.log('before delete prevnode = ' + prevNode);
        prevNode[sidePrev] = nodeToDelete.left;
        console.log('after delete prevnode = ' + prevNode);
      }else{
        this._root = nodeToDelete.left;
      }
      console.debug('prevNode');
      console.debug(prevNode);
      return nodeToDelete;
    }
    if (!nodeToDelete.left && nodeToDelete.right){
      if(prevNode){
        console.log('before delete prevnode = ' + prevNode);
        prevNode[sidePrev] = nodeToDelete.right;
        console.log('after delete prevnode = ' + prevNode);
      }else{
        this._root = nodeToDelete.right;
      }
      console.debug('prevNode');
      console.debug(prevNode);
      return nodeToDelete;
    }
    let nodeToReplace = findMin(nodeToDelete.right);
    let newNodeToreplaceRight = nodeToDelete.right;
    let newNodeToreplaceLeft = nodeToDelete.left;
    let minData = nodeToReplace.data;
    let prevMin = findNextNode(nodeToDelete, minData);
    console.debug('------------------------------------------------------------prevMin - for '+ nodeToReplace.data);
    console.debug(prevMin);
    prevMin.left = nodeToReplace.right;   //removing replacing node from previous place
    //this.remove(nodeToReplace); //delete min from the tree
    
    if(prevNode){
      console.log('before delete prevnode = ' + prevNode);
      prevNode[sidePrev] = nodeToReplace;      
      console.log('after delete prevnode = ' + prevNode);
    }else{
      this._root = nodeToReplace;
    }
    nodeToReplace.left = newNodeToreplaceLeft;
      nodeToReplace.right = newNodeToreplaceRight;
    console.debug('prevMin');
    console.debug(prevMin);
    console.debug('prevNode');
    console.debug(prevNode);
    return nodeToDelete;
  }

  min() {
    if (!this._root) {
      return null
    }  

    function findMin(node){ //returns node 
      console.debug("searchig min step on node = " +node.data)
      if(node.left){    //go to left
        return findMin(node.left)
      }else{
        return node
      }
    }
    let res =  findMin(this._root);
    console.debug('found min = ' + res.data);
    return res.data;
  }

  max() {
    if (!this._root) {
      return null
    }  

    function findMax(node){ //returns node 
      console.debug("searchig max step on node = " +node.data)
      if(node.right){    //go to left
        return findMax(node.right)
      }else{
        return node
      }
    }
    let res =  findMax(this._root);
    console.debug('found max = ' + res.data);
    return res.data;
  }
}

/*const bst = new BinarySearchTree;
console.log(bst.root());
bst.add(5);
bst.add(3);
bst.add(4);
bst.add(10);
bst.add(15);
bst.add(7);
bst.add(19);
bst.add(12);
console.log(bst.root());
console.log(bst.find(4));
console.log('has 19 =' + bst.has(19));
console.log(bst.find(7));
console.log('min =' + bst.min());
console.log('removed 3');
console.log(bst.remove(3));
console.log('min =' + bst.min());
console.log(bst.root());
bst.add(10);
console.log('has 10 =' + bst.has(10));
console.log('removed 10');
console.log(bst.remove(10));
console.log('has 10 =' + bst.has(10));
console.log(bst.root());*/

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
console.log(tree.root());
tree.remove(8);
tree.remove(9);
console.log(tree.root());
console.log("has 14 " + tree.has(14));
console.log("has 8 " + tree.has(8));
console.log("has 9 " + tree.has(9));
console.log("has 2 " + tree.has(2));
console.log("has  128 " + tree.has(128));
console.log("has 31 " + tree.has(31));
console.log("has 54 " + tree.has(54));
console.log("has 1 " + tree.has(1));
console.log(tree.root());


module.exports = {
  BinarySearchTree
};