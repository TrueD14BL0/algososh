import MyQueue from "./my-queue";

describe("Queue unit test", ()=>{
  test('queue enqueue element', async () => {
    const queue = new MyQueue(5);
    queue.enqueue(5);
    queue.enqueue(3);
    queue.enqueue(7);
    expect(queue.elements()).toEqual([5,3,7,null,null]);
    expect(queue.head()).toEqual(0);
    expect(queue.tail()).toEqual(2);
  });

  test('queue dequeue element', async () => {
    const queue = new MyQueue(5);
    queue.enqueue(5);
    queue.enqueue(3);
    queue.enqueue(7);
    queue.enqueue(1);
    queue.dequeue();
    queue.dequeue();
    expect(queue.elements()).toEqual([null,null,7,1,null]);
    expect(queue.head()).toEqual(2);
    expect(queue.tail()).toEqual(3);
  });

  test('queue dequeue element', async () => {
    const queue = new MyQueue(5);
    queue.enqueue(5);
    queue.enqueue(3);
    queue.enqueue(7);
    queue.enqueue(1);
    queue.clear();
    expect(queue.elements()).toEqual([null,null,null,null,null]);
    expect(queue.head()).toEqual(-1);
    expect(queue.tail()).toEqual(-1);
  });

  test('queue is empty', async () => {
    const queue = new MyQueue(5);
    queue.enqueue(5);
    queue.enqueue(3);
    queue.enqueue(7);
    queue.enqueue(1);
    queue.clear();
    expect(queue.elements()).toEqual([null,null,null,null,null]);
    expect(queue.isEmpty()).toEqual(true);
  });

  test('adding overlimit', async () => {
    const queue = new MyQueue(5);
    queue.enqueue(5);
    queue.enqueue(3);
    queue.enqueue(7);
    queue.enqueue(1);
    queue.enqueue(13);
    queue.enqueue(66);
    queue.enqueue(27);
    queue.enqueue(100);
    expect(queue.elements()).toEqual([5,3,7,1,13]);
    expect(queue.head()).toEqual(0);
    expect(queue.tail()).toEqual(4);
  });

})