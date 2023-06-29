import styles from "./string.module.css"
import React, { Dispatch, SetStateAction, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { TArrStringElement } from "../../types/t-arr-element";
import { sleep } from "../../utils/sleep";

const swapElements = (arrForWork: TArrStringElement[], start: number, end: number) => {
  const tempItem = arrForWork[start];
  arrForWork[start] = arrForWork[end];
  arrForWork[start].type = ElementStates.Modified;
  arrForWork[end] = tempItem;
  arrForWork[end].type = ElementStates.Modified;
}

export const sortArr = async (arrForWork: TArrStringElement[], renderFunc?: Dispatch<SetStateAction<TArrStringElement[]>>) => {
  await sleep(DELAY_IN_MS);
  let tempArr = arrForWork.slice(0);
  if(!tempArr.length){
    return tempArr;
  };

  let start = 0;
  let end = tempArr.length-1;

  while (start<end) {
    tempArr = tempArr.slice(0);
    tempArr[start].type = ElementStates.Changing;
    tempArr[end].type = ElementStates.Changing;
    renderFunc&&renderFunc(tempArr);
    await sleep(DELAY_IN_MS);
    tempArr = tempArr.slice(0);
    swapElements(tempArr, start, end);
    tempArr[start++].type = ElementStates.Modified;
    tempArr[end--].type = ElementStates.Modified;
    renderFunc&&renderFunc(tempArr);
  }
  if(start===end){
    tempArr = tempArr.slice(0);
    tempArr[start].type = ElementStates.Changing;
    renderFunc&&renderFunc(tempArr);
    await sleep(DELAY_IN_MS);
    tempArr = tempArr.slice(0);
    tempArr[start].type = ElementStates.Modified;
  }
  return tempArr;
}

export const StringComponent: React.FC = () => {

  const [inputedText, setText] = useState("");
  const [renderArray, setRenderArray] = useState<TArrStringElement[]>([]);
  const [isStart, setStart] = useState(false);

  const convertStrToArr = (): TArrStringElement[] => {
    const arr = inputedText.split('');
    const arrToWork: TArrStringElement[] = [];
    arr.forEach(element => {
      arrToWork.push({value: element, type: ElementStates.Default});
    });
    return arrToWork;
  }

  const startAlgorithm = async () => {
    setStart(true);
    const arrForWork = convertStrToArr();
    setRenderArray(arrForWork);
    setRenderArray(await sortArr(arrForWork, setRenderArray));
    setStart(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div  className={styles.head}>
        <Input isLimitText disabled={isStart} maxLength={11} value={inputedText} onChange={e => setText(e.currentTarget.value)}/>
        <Button text="Развернуть" onClick={startAlgorithm} isLoader={isStart} disabled={isStart||inputedText.length===0}/>
      </div>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Circle letter={element.value} key={index} state={element.type}/>)
        }
      </div>
    </SolutionLayout>
  );
};
