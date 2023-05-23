import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  const [renderArray, setRenderArray] = useState<number[]>([]);
  const [isStart, setStart] = useState(false);
  const [sortType, setSortType] = useState('Выбор');

  const generateNewArr = (): number[] => {
    const qtyEl = Math.floor(Math.random() * 14+3);
    const arrToRender: number[] = [];
    for (let index = 0; index < qtyEl; index++) {
      arrToRender.push(Math.floor(Math.random() * 100));
    }
    return arrToRender;
  }

  useEffect(()=>{
    renderNewArr();
  },[])

  const renderNewArr = () => {
    setStart(true);
    setRenderArray(generateNewArr);
    setStart(false);
  }
  const sortByAsc = () => {
    setStart(true);
  }

  const sortByDesc = () => {
    setStart(true);
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
          renderArray.map((element, index)=><Column index={element} key={index}/>)
        }
      </div>
    </SolutionLayout>
  );
};
