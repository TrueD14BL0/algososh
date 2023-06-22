import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sortByBubble } from "./sorting-page";

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

jest.setTimeout(30*DELAY_IN_MS);

describe("Sort unit test", ()=>{

  test('sort bubble asc', async () => {
    const data = await sortByBubble(initialArr, true);
    expect(data).toEqual(resultArrAsc);
  });

  test('sort bubble desc', async () => {
    const data = await sortByBubble(initialArr, false);
    expect(data).toEqual(resultArrDesc);
  });

})
