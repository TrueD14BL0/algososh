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
import { StackPageElements } from "../../constants/element-names";

export const StackPage: React.FC = () => {

  const [renderArray, setRenderArray] = useState<TArrStringElement[]>([]);
  const [stack, ] = useState(new MyStack<TArrStringElement>());
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");
  const [loaderBtn, setLoaderBtn] = useState('');

  const clearInputText = () => {
    setText('');
  }

  const refreshArray = () => {
    const newArr = stack.elements().slice(0);
    setRenderArray(newArr);
    setLoaderBtn('');
    setStart(false);
  }

  const addBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(StackPageElements.ADD);
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
    setLoaderBtn(StackPageElements.DEL);
    const newArr = stack.elements().map(el=>{return {...el}});
    const lastIndex = newArr.length-1;
    newArr[lastIndex].type = ElementStates.Changing;
    setRenderArray(newArr);
    setTimeout(()=>{stack.pop(); refreshArray();}, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.flex} ${styles.head}`}>
        <div className={`${styles.flex} ${styles.firstGrp}`}>
          <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение"/>
          <Button text="Добавить" isLoader={loaderBtn===StackPageElements.ADD} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
          <Button text="Удалить" isLoader={loaderBtn===StackPageElements.DEL} disabled={isStart||stack.size()===0} onClick={delBtnClickHandler} />
        </div>
        <Button text="Очистить" isLoader={loaderBtn===StackPageElements.CLR} disabled={isStart||stack.size()===0} onClick={()=>{setStart(true);setLoaderBtn(StackPageElements.CLR); stack.clear(); refreshArray();}}/>
      </div>
      <div className={`${styles.flex} ${styles.container}`}>
        {
          renderArray.map((element, index)=><Circle letter={element.value} key={index} index={index} state={element.type} head={index===renderArray.length-1?"top":""}/>)
        }
      </div>
    </SolutionLayout>
  );
};
