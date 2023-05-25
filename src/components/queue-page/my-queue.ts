export default class MyQueue<T> {
  private queueArr: Array<T|null> = [];
  private headIndex: number = -1;
  private tailIndex: number = -1;

  constructor (queueLength: number) {
    this.queueArr = Array<T|null>(queueLength);
    if(Object.seal) {
      this.queueArr.fill(null);
      Object.seal(this.queueArr);
    }
  }

  public elements = (): Array<T|null> => {
    return this.queueArr;
  }

  public enqueue = (item: T) => {

  }

  public dequeue = (): T => {
    return <T>this.queueArr[0];
  }

  public clear = () => {
    this.queueArr.fill(null);
  }

  public head = (): number => {
    return this.headIndex;
  }

  public tail = (): number => {
    return this.tailIndex;
  }

  public isEmpty = (): boolean => {
    return this.queueArr.find(el=>el!=null)!==undefined;
  }

}
