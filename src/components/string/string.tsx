import styles from "./string.module.css"
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { TArrStringElement } from "../../types/t-arr-element";

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

  const swapElements = (arrForWork: TArrStringElement[], start: number, end: number) => {
    const tempItem = arrForWork[start];
    arrForWork[start] = arrForWork[end];
    arrForWork[start].type = ElementStates.Modified;
    arrForWork[end] = tempItem;
    arrForWork[end].type = ElementStates.Modified;
  }

  const sortArr = (arrForWork: TArrStringElement[], start: number, end: number) => {
    const tempArr = arrForWork.slice(0);
    swapElements(tempArr, start, end);
    tempArr[++start].type = ElementStates.Changing;
    tempArr[--end].type = ElementStates.Changing;
    if(start!==end&&start<end){
      setRenderArray(tempArr);
      setTimeout(()=>{sortArr(tempArr, start, end)}, DELAY_IN_MS);
    }else{
      tempArr[end].type = ElementStates.Modified;
      tempArr[start].type = ElementStates.Modified;
      setRenderArray(tempArr);
      setStart(false);
    }
  }

  const startAlgorithm = () => {
    setStart(true);
    const arrForWork = convertStrToArr();
    if(arrForWork.length===1){
      arrForWork[0].type = ElementStates.Modified;
      setStart(false);
    }else{
      arrForWork[0].type = ElementStates.Changing;
      arrForWork[arrForWork.length-1].type = ElementStates.Changing;
      setTimeout(()=>sortArr(arrForWork, 0, arrForWork.length-1), DELAY_IN_MS);
    }
    setRenderArray(arrForWork);
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
