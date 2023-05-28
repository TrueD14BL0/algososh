import LinkedListNode from "./linked-list-node";

export default class LinkedList<T> {

  private maxLength: number;
  private head: LinkedListNode<T>|null;
  private length: number = 0;

  constructor (maxLength: number){
    this.maxLength = maxLength;
    this.head = null;
  }

  public prepend = (item: T): boolean => {
    if(this.length >= this.maxLength){
      return false;
    }
    const newHead = new LinkedListNode(item, this.head);
    this.head = newHead;
    this.length++;
    return true;
  }

  public append = (item: T): boolean => {
    if(this.length >= this.maxLength){
      return false;
    }
    if(!this.head){
      return this.prepend(item);
    }
    let currItem: LinkedListNode<T>|null = this.head;
    while (currItem&&currItem.getNext()) {
      currItem = currItem.getNext();
    }
    if(currItem){
      currItem.setNext(new LinkedListNode(item, null));
    }
    this.length++;
    return true;
  }

  public addByIndex = (item: T, index: number): boolean => {
    if(!this.head||index===0){
      return this.prepend(item);
    }
    let curr = this.head;
    let currIndex = 0;
    while(curr!.getNext()&&currIndex!==index-1){
      curr = curr!.getNext() as LinkedListNode<T>;
      currIndex++;
    }
    const newEl = new LinkedListNode(item, curr!.getNext());
    curr!.setNext(newEl);
    this.length++;
    return true;
  }

  public deleteByIndex = (index: number) => {
    if(!this.head||index>this.length-1){
      return;
    }
    if(index===0){
      this.deleteHead();
      return;
    }
    if(index===this.length-1){
      this.deleteTail();
      return;
    }
    let curr: LinkedListNode<T> = this.head;
    let currIndex = 0;
    while(currIndex<index-1){
      if(!curr.getNext()){
        this.length = currIndex+1;
        return;
      }
      curr = curr.getNext() as LinkedListNode<T>;
      currIndex++;
    }
    const nextNode = curr.getNext()?.getNext()||null;
    curr.setNext(nextNode);
    this.length--;
  }

  public deleteHead = () => {
    if(!this.head){
      return;
    }
    this.head = this.head.getNext();
    this.length--;
  }

  public deleteTail = () => {
    if(!this.head){
      return;
    }
    if(!this.head.getNext()){
      this.head=null;
      this.length = 0;
      return;
    }
    let curr: LinkedListNode<T> = this.head;
    for(let i = 1; i< this.length-1; i++){
      curr = curr.getNext() as LinkedListNode<T>;
    }
    curr.setNext(null);
    this.length--;
  }

  public toArray = (): T[] => {
    if(!this.head){
      return [];
    }
    const arrForReturn: Array<T> = [];

    let curr: LinkedListNode<T> | null = this.head;
    arrForReturn.push(curr!.getValue());
    while (curr?.getNext()) {
      curr=curr!.getNext();
      arrForReturn.push(curr!.getValue());
    }
    
    return arrForReturn;
  }

  public getLength = (): number => {
    return this.length;
  }

}
