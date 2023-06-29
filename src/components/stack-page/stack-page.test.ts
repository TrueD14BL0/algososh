import MyStack from "./my-stack";

describe("Stack test", ()=>{

  test('stack add element', async () => {
    const stack = new MyStack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect(stack.elements()).toEqual([1,2,3,4,5]);
  });

  test('stack del element', async () => {
    const stack = new MyStack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    stack.pop();
    expect(stack.elements()).toEqual([1,2,3,4]);
    stack.pop();
    expect(stack.elements()).toEqual([1,2,3]);
    stack.pop();
    expect(stack.elements()).toEqual([1,2]);
    stack.pop();
    expect(stack.elements()).toEqual([1]);
    stack.pop();
    expect(stack.elements()).toEqual([]);
  });

  test('stack clear element', async () => {
    const stack = new MyStack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    stack.clear();
    expect(stack.elements()).toEqual([]);
  });

})
