import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sortArr } from "./string"

const inititialArr = [
  {value:'х', type: ElementStates.Default},
  {value:'о', type: ElementStates.Default},
  {value:'л', type: ElementStates.Default},
  {value:'о', type: ElementStates.Default},
  {value:'д', type: ElementStates.Default},
  {value:'и', type: ElementStates.Default},
  {value:'л', type: ElementStates.Default},
  {value:'ь', type: ElementStates.Default},
  {value:'н', type: ElementStates.Default},
  {value:'и', type: ElementStates.Default},
  {value:'к', type: ElementStates.Default},
];

const resultArr = [
  {value:'к', type: ElementStates.Modified},
  {value:'и', type: ElementStates.Modified},
  {value:'н', type: ElementStates.Modified},
  {value:'ь', type: ElementStates.Modified},
  {value:'л', type: ElementStates.Modified},
  {value:'и', type: ElementStates.Modified},
  {value:'д', type: ElementStates.Modified},
  {value:'о', type: ElementStates.Modified},
  {value:'л', type: ElementStates.Modified},
  {value:'о', type: ElementStates.Modified},
  {value:'х', type: ElementStates.Modified},
];

jest.setTimeout((Math.ceil(resultArr.length/2) + 2)*DELAY_IN_MS);

describe("String test", ()=>{

  test('reverse even-numbered string', async () => {
    const data = await sortArr(inititialArr);
    expect(data).toEqual(resultArr);
  });
  test('reverse odd-numbered string', async () => {
    const data = await sortArr(inititialArr.slice(1));
    expect(data).toEqual(resultArr.slice(0, resultArr.length-1));
  });

  test('reverse empty string', async () => {
    const data = await sortArr([]);
    expect(data).toEqual([]);
  });

  test('reverse one symbol string', async () => {
    const data = await sortArr(inititialArr.slice(0,1));
    expect(data).toEqual(resultArr.slice(resultArr.length-1));
  });

})
