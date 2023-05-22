import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  type TArrayElement = {
    letter: string,
    state: ElementStates,
  }

  const [inputedText, setText] = useState("Холодильник");
  const [workArray, setWorkArray] = useState<TArrayElement[]>([]);
  const [isStart, setStart] = useState(false);

  const convertStrToArr = () => {
    const arr = inputedText.split('');
    const arrToWork: TArrayElement[] = [];
    arr.forEach(element => {
      arrToWork.push({letter: element, state: ElementStates.Default});
    });
    console.log(arrToWork);
    setWorkArray(arrToWork);
  }

  const swapElements = (start: number, end: number) => {
    const tempItem = workArray[start];
    workArray[start] = workArray[end];
    workArray[end] = tempItem;
  }

  const sortArr = (start: number, end: number) => {

  }

  const startAlgorithm = () => {
    setStart(true);
    convertStrToArr();
    sortArr(0, workArray.length - 1);
    setStart(false);
  }

  return (
    <SolutionLayout title="Строка">
      <Input isLimitText maxLength={11} value={inputedText} onChange={e => setText(e.currentTarget.value)}/>
      <Button text="Развернуть" onClick={startAlgorithm} isLoader={isStart} disabled={isStart||inputedText.length===0}/>
      <div className={styles.flex}>
        {
          workArray.map((element, index)=><Circle letter={element.letter} key={index} state={element.state}/>)
        }
      </div>
    </SolutionLayout>
  );
};
