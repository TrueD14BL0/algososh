import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css"
import { TArrNumberElement } from "../../types/t-arr-element";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [renderArray, setRenderArray] = useState<TArrNumberElement[]>([]);
  const [list, ] = useState();
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");
  const [inputedIndex, setIndex] = useState("");

  const randomArr = (): TArrNumberElement[] => {
    const qtyEl = Math.floor(Math.random() * 5+1);
    const arrToRender: TArrNumberElement[] = [];
    for (let index = 0; index < qtyEl; index++) {
      const val = Math.floor(Math.random() * 9999);
      arrToRender.push({
        value: val,
        type: ElementStates.Default,
      });
    }
    return arrToRender;
  }

  const addBtnClickHandler = () => {

  }

  const delBtnClickHandler = () => {

  }

  useEffect(()=>{
    const randomArrToRender = randomArr();
    console.log(randomArrToRender);
    setRenderArray(randomArrToRender);
  },[]);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.flex}>
        <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение" type='number'/>
        <Button text="Добавить в head" isLoader={isStart} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
        <Button text="Добавить в tail" isLoader={isStart} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
        <Button text="Удалить из head" isLoader={isStart} disabled={isStart} onClick={delBtnClickHandler} />
        <Button text="Удалить из tail" isLoader={isStart} disabled={isStart} onClick={delBtnClickHandler} />
      </div>
      <div className={styles.flex}>
        <Input isLimitText maxLength={1} max="9999" min="-999" value={inputedIndex} onChange={e => setIndex(e.currentTarget.value)} placeholder="Введите индекс"/>
        <Button text="Добавить по индексу" isLoader={isStart} disabled={isStart||!inputedText} onClick={addBtnClickHandler} />
        <Button text="Удалить по индексу" isLoader={isStart} disabled={isStart} onClick={delBtnClickHandler} />
      </div>
      <div className={styles.flexContainer}>
        {
          renderArray.map((element, index)=>{
            return (
              <>
                <Circle letter={element.value.toString()||''} key={index} index={index} state={element.type||ElementStates.Default} />
                {(index<renderArray.length-1)&&<ArrowIcon key={'a'+index}/>}
              </>
            );
          })
        }
      </div>
    </SolutionLayout>
  );
};
