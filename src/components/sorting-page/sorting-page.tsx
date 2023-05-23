import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {

  type TArrElement ={
    value: number,
    type: ElementStates
  }

  const [renderArray, setRenderArray] = useState<TArrElement[]>([]);
  const [isStart, setStart] = useState(false);
  const [sortType, setSortType] = useState('Выбор');
//(Math.floor(Math.random() * 100)
  const randomArr = (): TArrElement[] => {
    const qtyEl = Math.floor(Math.random() * 14+3);
    const arrToRender: TArrElement[] = [];
    for (let index = 0; index < qtyEl; index++) {
      const val = Math.floor(Math.random() * 100);
      arrToRender.push({
        value: val, 
        type: ElementStates.Default,
      });
    }
    return arrToRender;
  }

  useEffect(()=>{
    renderNewArr();
  },[])

  const renderNewArr = () => {
    setStart(true);
    setRenderArray(randomArr);
    setStart(false);
  }

  const sortByChoise = (asc: boolean) => {
    for (let i = 0; i < renderArray.length; i++) {
      let arrForWork = renderArray.slice(0);
      let elToCompare = arrForWork[i];
      elToCompare.type = ElementStates.Changing;
      setRenderArray(arrForWork);
      for (let j = i+1; j < arrForWork.length; j++) {
        let arrForWork = renderArray.slice(0);
        let ecurrentEl = arrForWork[j];
        ecurrentEl.type = ElementStates.Changing;
        setRenderArray(arrForWork);
        if (elToCompare.value > arrForWork[j].value){
          elToCompare = arrForWork[j];
        }
        arrForWork = renderArray.slice(0);
        ecurrentEl = arrForWork[j];
        ecurrentEl.type = ElementStates.Default;
        setRenderArray(arrForWork); 
      }
      arrForWork = arrForWork.slice(0);
      elToCompare.type = ElementStates.Modified;
    }

  }

  const sortByAsc = () => {
    //setStart(true);
    if(sortType==='Выбор'){
      sortByChoise(true);
    }
  }

  const sortByDesc = () => {
    //setStart(true);
    if(sortType==='Выбор'){
      sortByChoise(false);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.flex}>
        <div className={styles.flex}>
          <RadioInput name="type" label="Выбор" checked={sortType==='Выбор'} onChange={()=>setSortType('Выбор')} disabled={isStart} />
          <RadioInput name="type" label="Пузырёк" checked={sortType==='Пузырёк'} onChange={()=>setSortType('Пузырёк')} disabled={isStart} />
        </div>
        <div className={styles.flex}>
          <Button text="По возрастанию" onClick={sortByAsc} isLoader={isStart} disabled={isStart} sorting={Direction.Ascending} />
          <Button text="По возрастанию" onClick={sortByDesc} isLoader={isStart} disabled={isStart} sorting={Direction.Descending} />
        </div>
        <div className={styles.flex}>
          <Button text="Новый массив" onClick={renderNewArr} isLoader={isStart} disabled={isStart} />
        </div>
      </div>
      <div className={styles.flex}>
        {
          renderArray.map((element, index)=><Column index={element.value} key={index} state={element.type} />)
        }
      </div>
    </SolutionLayout>
  );
};
