import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const getFibonacciNumbers = (qtyNumbers: number): number[] =>{
  const arrForReturn = [1];
  const nextNumber = (numberOne: number, numberTwo: number): number =>{
    return numberOne + numberTwo;
  }

  for (let index = 0; index < qtyNumbers; index++) {
    const firstNumber: number = index!==0?arrForReturn[index-1]:0;
    const secondNumber: number = arrForReturn[index];
    arrForReturn.push(nextNumber(firstNumber, secondNumber));
  }

  return arrForReturn;
}

export const FibonacciPage: React.FC = () => {

  const [inputedText, setText] = useState('');
  const [isStart, setStart] = useState(false);
  const [renderArray, setRenderArray] = useState<number[]>([]);

  const startAlgorithm = () => {
    setStart(true);
    const curNum = parseInt(inputedText);
    const arrToWork = getFibonacciNumbers(curNum);
    const recurse = (qtyEl:number) => {
      if (qtyEl!==curNum+1) {
        const arrToRender = arrToWork.slice(0, qtyEl+1);
        setRenderArray(arrToRender);
        qtyEl++;
        setTimeout(()=>recurse(qtyEl),SHORT_DELAY_IN_MS);
      }else{
        setStart(false);
      }
    }
    recurse(0);
  }

  useEffect(()=>{
    const curNum = parseInt(inputedText);
    if(curNum>19){
      setText('19');
    }else if(curNum<1){
      setText('1');
    }
  }, [inputedText]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.head}>
        <Input data-testid='input_count' isLimitText min={1} max={19} value={inputedText} disabled={isStart} onChange={e => setText(e.currentTarget.value)} type="number" placeholder="Введите число элементов"/>
        <Button  data-testid='start' text="Рассчитать" onClick={startAlgorithm} isLoader={isStart} disabled={isStart||inputedText.length===0}/>
      </div>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Circle letter={element.toString()} key={index} index={index}/>)
        }
      </div>
    </SolutionLayout>
  );
};
