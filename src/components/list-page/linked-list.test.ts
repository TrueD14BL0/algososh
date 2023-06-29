import LinkedList from "./linked-list";
import LinkedListNode from "./linked-list-node";

describe("list unit test", ()=>{
  test('list add tail element', async () => {
    const list = new LinkedList(5);
    expect(list.append(5)).toEqual(true);
    expect(list.append(6)).toEqual(true);
    expect(list.append(7)).toEqual(true);
    expect(list.toArray()).toEqual([5, 6, 7]);
  });
  
  test('list del tail element', async () => {
    const list = new LinkedList(5);
    expect(list.append(5)).toEqual(true);
    expect(list.append(6)).toEqual(true);
    expect(list.append(7)).toEqual(true);
    list.deleteTail();
    expect(list.toArray()).toEqual([5, 6]);
  });

  test('list add head element', async () => {
    const list = new LinkedList(5);
    expect(list.prepend(5)).toEqual(true);
    expect(list.prepend(6)).toEqual(true);
    expect(list.prepend(7)).toEqual(true);
    expect(list.toArray()).toEqual([7, 6, 5]);
  });

  test('list del head element', async () => {
    const list = new LinkedList(5);
    expect(list.prepend(5)).toEqual(true);
    expect(list.prepend(6)).toEqual(true);
    expect(list.prepend(7)).toEqual(true);
    list.deleteHead();
    expect(list.toArray()).toEqual([6, 5]);
  });

  test('list add to index element', async () => {
    const list = new LinkedList(5);
    expect(list.prepend(5)).toEqual(true);
    expect(list.prepend(6)).toEqual(true);
    expect(list.prepend(7)).toEqual(true);
    expect(list.addByIndex(13, 1)).toEqual(true);
    expect(list.addByIndex(666, 3)).toEqual(true);
    expect(list.toArray()).toEqual([7, 13, 6, 666, 5]);
  });

  test('list del from index element', async () => {
    const list = new LinkedList(5);
    expect(list.prepend(5)).toEqual(true);
    expect(list.prepend(6)).toEqual(true);
    expect(list.prepend(7)).toEqual(true);
    list.deleteByIndex(1);
    list.deleteByIndex(1);
    expect(list.toArray()).toEqual([7]);
  });

  test('list size', async () => {
    const list = new LinkedList(5);
    expect(list.prepend(5)).toEqual(true);
    expect(list.prepend(6)).toEqual(true);
    expect(list.prepend(7)).toEqual(true);
    expect(list.addByIndex(13, 1)).toEqual(true);
    expect(list.addByIndex(666, 3)).toEqual(true);
    expect(list.getLength()).toEqual(5);
  });

  test('list add overlimit', async () => {
    const list = new LinkedList(5);
    expect(list.append(5)).toEqual(true);
    expect(list.append(6)).toEqual(true);
    expect(list.append(7)).toEqual(true);
    expect(list.append(8)).toEqual(true);
    expect(list.append(9)).toEqual(true);
    expect(list.append(10)).toEqual(false);
    expect(list.append(7)).toEqual(false);
    expect(list.append(7)).toEqual(false);
    expect(list.toArray()).toEqual([5, 6, 7, 8, 9]);
  });

})