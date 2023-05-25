import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TArrStringElement } from "../../types/t-arr-element";
import { Circle } from "../ui/circle/circle";
import MyQueue from "./my-queue";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {

  const MAX_QUEUE_LENGHT = 7;

  const [renderArray, setRenderArray] = useState<(TArrStringElement | null)[]>([]);
  const [queue, ] = useState(new MyQueue<TArrStringElement>(MAX_QUEUE_LENGHT));
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");

  const addBtnClickHandler = () => {

  }

  const delBtnClickHandler = () => {

  }

  useEffect(()=>{
    const newArr = queue.elements();
    setRenderArray(newArr);
  },[])

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.flex}>
      <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение"/>
        <div className={styles.flex}>
          <Button text="Добавить" isLoader={isStart} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
          <Button text="Удалить" isLoader={isStart} disabled={isStart} onClick={delBtnClickHandler} />
        </div>
        <Button text="Очистить" isLoader={isStart} disabled={isStart} onClick={()=>{//setStart(true); stack.clear(); refreshArray();
        }}/>
      </div>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Circle letter={element&&element.value||''} key={index} index={index} state={element&&element.type||ElementStates.Default} tail={'tail'} head={'null'}/>)
        }
      </div>
    </SolutionLayout>
  );
};
