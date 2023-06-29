import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sortByBubble, sortByChoise } from "./sorting-page";

const initialArr = [
  {value: 666, type: ElementStates.Default},
  {value: 13, type: ElementStates.Default},
  {value: 1, type: ElementStates.Default},
  {value: 60, type: ElementStates.Default},
  {value: 10, type: ElementStates.Default},
  {value: 100, type: ElementStates.Default},
  {value: 30, type: ElementStates.Default},
  {value: 42, type: ElementStates.Default},
  {value: 90, type: ElementStates.Default},
  {value: 999, type: ElementStates.Default},
];

const resultArrAsc = [
  {value: 1, type: ElementStates.Modified},
  {value: 10, type: ElementStates.Modified},
  {value: 13, type: ElementStates.Modified},
  {value: 30, type: ElementStates.Modified},
  {value: 42, type: ElementStates.Modified},
  {value: 60, type: ElementStates.Modified},
  {value: 90, type: ElementStates.Modified},
  {value: 100, type: ElementStates.Modified},
  {value: 666, type: ElementStates.Modified},
  {value: 999, type: ElementStates.Modified},
];

const resultArrDesc = [
  {value: 999, type: ElementStates.Modified},
  {value: 666, type: ElementStates.Modified},
  {value: 100, type: ElementStates.Modified},
  {value: 90, type: ElementStates.Modified},
  {value: 60, type: ElementStates.Modified},
  {value: 42, type: ElementStates.Modified},
  {value: 30, type: ElementStates.Modified},
  {value: 13, type: ElementStates.Modified},
  {value: 10, type: ElementStates.Modified},
  {value: 1, type: ElementStates.Modified},
];

jest.setTimeout(40*DELAY_IN_MS);

describe("Sort unit test", ()=>{

  test('sort bubble asc', async () => {
    const data = await sortByBubble(initialArr, true);
    expect(data).toEqual(resultArrAsc);
  });

  test('sort bubble desc', async () => {
    const data = await sortByBubble(initialArr, false);
    expect(data).toEqual(resultArrDesc);
  });

  test('sort empty bubble asc', async () => {
    const data = await sortByBubble([], true);
    expect(data).toEqual([]);
  });

  test('sort empty bubble desc', async () => {
    const data = await sortByBubble([], false);
    expect(data).toEqual([]);
  });

  test('sort single bubble asc', async () => {
    const data = await sortByBubble([], true);
    expect(data).toEqual([]);
  });

  test('sort single bubble desc', async () => {
    const data = await sortByBubble([{value: 1, type: ElementStates.Default}], false);
    expect(data).toEqual([{value: 1, type: ElementStates.Modified}]);
  });

  test('sort shoise asc', async () => {
    const data = await sortByChoise(initialArr, true);
    expect(data).toEqual(resultArrAsc);
  });

  test('sort shoise desc', async () => {
    const data = await sortByChoise(initialArr, false);
    expect(data).toEqual(resultArrDesc);
  });

  test('sort shoise bubble asc', async () => {
    const data = await sortByChoise([], true);
    expect(data).toEqual([]);
  });

  test('sort shoise bubble desc', async () => {
    const data = await sortByChoise([], false);
    expect(data).toEqual([]);
  });

  test('sort single shoise asc', async () => {
    const data = await sortByChoise([], true);
    expect(data).toEqual([]);
  });

  test('sort single shoise desc', async () => {
    const data = await sortByChoise([{value: 1, type: ElementStates.Default}], false);
    expect(data).toEqual([{value: 1, type: ElementStates.Modified}]);
  });
  
})
