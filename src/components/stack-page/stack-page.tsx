import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import MyStack from "./my-stack";
import { TArrStringElement } from "../../types/t-arr-element";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {

  const [renderArray, setRenderArray] = useState<TArrStringElement[]>([]);
  const [stack, ] = useState(new MyStack<TArrStringElement>());
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");

  const clearInputText = () => {
    setText('');
  }

  const refreshArray = () => {
    const newArr = stack.elements().slice(0);
    setRenderArray(newArr);
    setStart(false);
  }

  const addBtnClickHandler = () => {
    setStart(true);
    stack.push({value: inputedText, type: ElementStates.Default});
    clearInputText();
    const newArr = stack.elements().map(el=>{return {...el}});
    const lastIndex = newArr.length-1;
    newArr[lastIndex].type = ElementStates.Changing;
    setRenderArray(newArr);
    setTimeout(()=>refreshArray(), SHORT_DELAY_IN_MS);
  }

  const delBtnClickHandler = () => {
    setStart(true);
    const newArr = stack.elements().map(el=>{return {...el}});
    const lastIndex = newArr.length-1;
    newArr[lastIndex].type = ElementStates.Changing;
    setRenderArray(newArr);
    setTimeout(()=>{stack.pop(); refreshArray();}, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.flex}>
      <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение"/>
        <div className={styles.flex}>
          <Button text="Добавить" isLoader={isStart} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
          <Button text="Удалить" isLoader={isStart} disabled={isStart||stack.size()===0} onClick={delBtnClickHandler} />
        </div>
        <Button text="Очистить" isLoader={isStart} disabled={isStart||stack.size()===0} onClick={()=>{setStart(true); stack.clear(); refreshArray();}}/>
      </div>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Circle letter={element.value} key={index} index={index} state={element.type} head={index===renderArray.length-1?"top":""}/>)
        }
      </div>
    </SolutionLayout>
  );
};
