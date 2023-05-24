export default class MyStack<T> {
  private stackArr: Array<T> = [];

  public push = (item: any) => {
    this.stackArr.push(item);
  }

  public pop = (): T|undefined => {
    return this.stackArr.pop();
  }

  public clear = () => {
    this.stackArr = [];
  }

  public elements = (): Array<T> => {
    return this.stackArr;
  }

  public size = (): number => {
    return this.stackArr.length;
  }

}
