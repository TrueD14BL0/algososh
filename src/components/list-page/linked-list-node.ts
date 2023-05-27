export default class LinkedListNode<T>{
  private value: T;
  private next: LinkedListNode<T>|null;
  constructor(value: T, next: LinkedListNode<T>|null){
    this.value = value;
    if(next){
      this.next = next;
    }else{
      this.next = null;
    }
  }

  public getNext = (): LinkedListNode<T>|null => {
    return this.next;
  }

  public setNext = (next: LinkedListNode<T>|null) => {
    this.next = next;
  }

  public getValue = (): T => {
    return this.value;
  }

}
