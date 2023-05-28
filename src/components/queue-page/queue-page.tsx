import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TArrStringElement } from "../../types/t-arr-element";
import { Circle } from "../ui/circle/circle";
import MyQueue from "./my-queue";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QueuePageElements } from "../../constants/element-names";

export const QueuePage: React.FC = () => {

  const MAX_QUEUE_LENGHT = 7;

  const [renderArray, setRenderArray] = useState<(TArrStringElement | null)[]>([]);
  const [queue, ] = useState(new MyQueue<TArrStringElement>(MAX_QUEUE_LENGHT));
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");
  const [loaderBtn, setLoaderBtn] = useState('');

  const refreshArray = () => {
    const newArr = queue.elements().slice(0);
    setRenderArray(newArr);
    setLoaderBtn('');
    setStart(false);
  }

  const addBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(QueuePageElements.ADD);
    const newArr = queue.elements().slice(0);
    if(queue.tail()<newArr.length-1&&queue.head()<newArr.length-1){
      let tail = queue.tail();
      if(queue.tail()===-1&&queue.head()>-1){
        tail = queue.head();
      }
      newArr.splice(tail+1,1, {value: '', type: ElementStates.Changing});
    }
    setRenderArray(newArr);
    setTimeout(()=>{
      queue.enqueue({value: inputedText, type: ElementStates.Default});
      refreshArray();
    }, SHORT_DELAY_IN_MS);
  }

  const delBtnClickHandler = () => {
    const newArr = queue.elements().slice(0);
    if(!newArr[queue.head()]){
      return;
    }
    setStart(true);
    setLoaderBtn(QueuePageElements.DEL);
    newArr.splice(queue.head(),1, {value: newArr[queue.head()]?.value||'', type: ElementStates.Changing});
    setRenderArray(newArr);
    setTimeout(()=>{
      queue.dequeue();
      refreshArray();
    }, SHORT_DELAY_IN_MS);
  }

  useEffect(()=>{
    refreshArray();
  },[])

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.flex} ${styles.head}`}>
        <div className={`${styles.flex} ${styles.firstGrp}`}>
          <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение"/>
          <Button text="Добавить" isLoader={loaderBtn===QueuePageElements.ADD} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
          <Button text="Удалить" isLoader={loaderBtn===QueuePageElements.DEL} disabled={isStart||queue.head()===-1||queue.tail()===-1} onClick={delBtnClickHandler} />
        </div>
        <Button text="Очистить" isLoader={loaderBtn===QueuePageElements.CLR} disabled={isStart||queue.head()===-1} onClick={()=>{
          setStart(true);
          setLoaderBtn(QueuePageElements.CLR);
          queue.clear();
          refreshArray();
          setLoaderBtn('');
          setStart(false);
        }}/>
      </div>
      <div className={`${styles.flex} ${styles.container}`}>
        {
          renderArray.map((element, index)=><Circle letter={(element&&element.value)||''} key={index} index={index} state={(element&&element.type)||ElementStates.Default} tail={queue.tail()===index?'tail':''} head={queue.head()===index?'head':''}/>)
        }
      </div>
    </SolutionLayout>
  );
};
