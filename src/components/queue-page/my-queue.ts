export default class MyQueue<T> {
  private queueArr: Array<T|null> = [];
  private headIndex: number = -1;
  private tailIndex: number = -1;

  constructor (queueLength: number) {
    this.queueArr = Array<T|null>(queueLength);
    this.queueArr.fill(null);
  }

  public elements = (): Array<T|null> => {
    return this.queueArr;
  }

  public enqueue = (item: T): boolean => {
    if(this.tailIndex=== -1 && this.headIndex!==-1 && this.headIndex+1<=this.queueArr.length-1){
      this.tailIndex = this.headIndex;
    }
    if (this.tailIndex===this.queueArr.length-1||this.headIndex+1>this.queueArr.length-1){
      return false;
    }
    this.tailIndex++;
    this.queueArr.splice(this.tailIndex, 1, item);
    if(this.headIndex===-1||!this.queueArr[this.headIndex]){
      this.headIndex++;
    }
    return true;
  }

  public dequeue = (): T|null => {
    if(!this.queueArr[this.headIndex]){
      return null;
    }
    const elToReturn = this.queueArr.splice(this.headIndex, 1, null)[0];
    if(this.headIndex!==this.tailIndex){
      this.headIndex++;
    }
    if(this.headIndex===this.tailIndex&&!this.queueArr[this.tailIndex]){
      this.tailIndex=-1;
    }
    return elToReturn;
  }

  public clear = () => {
    this.queueArr.fill(null);
    this.headIndex = -1;
    this.tailIndex = -1;
  }

  public head = (): number => {
    return this.headIndex;
  }

  public tail = (): number => {
    return this.tailIndex;
  }

  public isEmpty = (): boolean => {
    return this.queueArr.find(el=>el!=null)===undefined;
  }

}
