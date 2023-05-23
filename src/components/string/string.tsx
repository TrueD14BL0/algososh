import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {

  type TArrayElement = {
    letter: string,
    state: ElementStates,
  }

  const [inputedText, setText] = useState("");
  const [renderArray, setRenderArray] = useState<TArrayElement[]>([]);
  const [isStart, setStart] = useState(false);

  const convertStrToArr = (): TArrayElement[] => {
    const arr = inputedText.split('');
    const arrToWork: TArrayElement[] = [];
    arr.forEach(element => {
      arrToWork.push({letter: element, state: ElementStates.Default});
    });
    return arrToWork;
  }

  const swapElements = (arrForWork: TArrayElement[], start: number, end: number) => {
    const tempItem = arrForWork[start];
    arrForWork[start] = arrForWork[end];
    arrForWork[start].state = ElementStates.Modified;
    arrForWork[end] = tempItem;
    arrForWork[end].state = ElementStates.Modified;
  }

  const sortArr = (arrForWork: TArrayElement[], start: number, end: number) => {
    const tempArr = arrForWork.slice(0);
    swapElements(tempArr, start, end);
    tempArr[++start].state = ElementStates.Changing;
    tempArr[--end].state = ElementStates.Changing;
    if(start!==end){
      setRenderArray(tempArr);
      setTimeout(()=>{sortArr(tempArr, start, end)}, DELAY_IN_MS);
    }else{
      tempArr[end].state = ElementStates.Modified;
      setRenderArray(tempArr);
      setStart(false);
    }
  }

  const startAlgorithm = () => {
    setStart(true);
    const arrForWork = convertStrToArr();
    if(arrForWork.length===1){
      arrForWork[0].state = ElementStates.Modified;
      setStart(false);
    }else{
      arrForWork[0].state = ElementStates.Changing;
      arrForWork[arrForWork.length-1].state = ElementStates.Changing;
      setTimeout(()=>sortArr(arrForWork, 0, arrForWork.length-1), DELAY_IN_MS);
    }
    setRenderArray(arrForWork);
  }

  return (
    <SolutionLayout title="Строка">
      <Input isLimitText maxLength={11} value={inputedText} onChange={e => setText(e.currentTarget.value)}/>
      <Button text="Развернуть" onClick={startAlgorithm} isLoader={isStart} disabled={isStart||inputedText.length===0}/>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Circle letter={element.letter} key={index} state={element.state}/>)
        }
      </div>
    </SolutionLayout>
  );
};
