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
      console.debug("try to add new node  "+ data + ' ' + node + node.data );
      if(node.data > data){//go to left
        if (!node.left){   //add to left
          node.left = new Node(data);
          console.debug("new node added left"+ data + '' + node.left );
        }else {
          addNode(node.left, data); //for new compearing
        }
      }else{
        if (node.data < data){ //go to right
          if (!node.right){   //add to right
            node.right = new Node(data);
            console.debug("new node added righr"+ data + '' + node.right );
          }else {
            addNode(node.right, data); //for new compearing
          }
        }
      }
    } 

  }

  has(data) {
       
    function hasNode(node, data){
      //console.debug('----------------------searching ' +data + " in " + node.data);
      if(!node){
        //console.debug('compare last node ' +data +'return false');
        return false;
      }
      //console.debug('----------------------searching ' +data + " in " + node.data);
      //console.debug('compare '+node.data + ' and ' +data);
      if(node.data == data){        
        //console.debug('compare '+node.data + ' = ' +data+ 'return true');
        return true;
      }else if(node.data > data){//go to left
        //console.debug('compare '+node.data + ' > ' +data);
        return hasNode(node.left, data); //for new compearing
      }else{  //go to right
        //console.debug('compare '+node.data + ' < ' +data);
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
        console.debug('compare last node ' +data +'return null');
        return null;
      }
      console.debug('----------------------searching ' +data + " in " + node.data);
      console.debug('compare '+node.data + ' and ' +data);
      if(node.data == data){        
        console.debug('compare '+node.data + ' = ' +data+ 'return true');
        return node;
      }else if(node.data > data){//go to left
        console.debug('compare '+node.data + ' > ' +data);
        return findNode(node.left, data); //for new compearing
      }else{  //go to right
        console.debug('compare '+node.data + ' < ' +data);
        return findNode(node.right, data); //for new compearing
      }  
    }
    let res = findNode(this._root, data);
    console.debug('res has '+ data + res);
    return res;
  }

  remove(/* data */) {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  min() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  max() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }
}

const bst = new BinarySearchTree;
console.log(bst.root());
bst.add(5);
bst.add(3);
bst.add(4);
bst.add(10);
console.log(bst.root());
console.log(bst.find(4));
console.log(bst.find(7));

module.exports = {
  BinarySearchTree
};