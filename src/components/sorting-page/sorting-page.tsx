import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/sleep";
import { TArrNumberElement } from "../../types/t-arr-element";
import { SortingPageElements } from "../../constants/element-names";

export const SortingPage: React.FC = () => {

  const [renderArray, setRenderArray] = useState<TArrNumberElement[]>([]);
  const [isStart, setStart] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState('');
  const [sortType, setSortType] = useState('Выбор');
  const randomArr = (): TArrNumberElement[] => {
    const qtyEl = Math.floor(Math.random() * 14+3);
    const arrToRender: TArrNumberElement[] = [];
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
    setLoaderBtn(SortingPageElements.NEW);
    setRenderArray(randomArr);
    setLoaderBtn('');
    setStart(false);
  }

  const sortByBubble = async (asc: boolean) => {
    let arrayToWork = renderArray.slice(0);
    for (let i = 0; i < arrayToWork.length; i++) {
      for (let j = 0; j < arrayToWork.length - 1 - i; j++) {
        arrayToWork = arrayToWork.slice(0);
        arrayToWork[j].type = ElementStates.Changing;
        arrayToWork[j+1].type = ElementStates.Changing;
        if (asc?
          arrayToWork[j].value > arrayToWork[j + 1].value:
          arrayToWork[j].value < arrayToWork[j + 1].value) {
          const tempEl = arrayToWork.splice(j + 1,1);
          arrayToWork.splice(j,0,tempEl[0]);
        }
        setRenderArray(arrayToWork);
        await sleep(SHORT_DELAY_IN_MS);
        arrayToWork = arrayToWork.slice(0);
        arrayToWork[j].type = ElementStates.Default;
        arrayToWork[j+1].type = ElementStates.Default;
        setRenderArray(arrayToWork);
      }
      arrayToWork = arrayToWork.slice(0);
      arrayToWork[arrayToWork.length-1-i].type = ElementStates.Modified;
      setRenderArray(arrayToWork);
    }
    setLoaderBtn('');
    setStart(false);
  }

  const sortByChoise = (arrayToSort: TArrNumberElement[] ,positionForSortedEl: number, sortedElIndex: number, compareElIndex: number, asc: boolean) => {
    const arrayToWork = arrayToSort.slice(0);
    if(positionForSortedEl>=renderArray.length-1){
      arrayToWork[renderArray.length-1].type = ElementStates.Modified;
      setRenderArray(arrayToWork);
      setLoaderBtn('');
      setStart(false);
      return;
    }

    if(compareElIndex===renderArray.length-1){
      arrayToWork[compareElIndex].type = ElementStates.Default;
      const movedArr = arrayToWork.splice(sortedElIndex,1);
      const movedEl = movedArr[0];
      movedEl.type = ElementStates.Modified;
      arrayToWork.splice(positionForSortedEl, 0, movedEl);
      positionForSortedEl++;
      sortedElIndex = compareElIndex = positionForSortedEl;
    }else if(positionForSortedEl===compareElIndex){
      compareElIndex++;
    }else{
      arrayToWork[compareElIndex].type = ElementStates.Default;
      compareElIndex++;
    }

    if(asc?
      arrayToWork[sortedElIndex].value>arrayToWork[compareElIndex].value:
      arrayToWork[sortedElIndex].value<arrayToWork[compareElIndex].value)
      {
      sortedElIndex = compareElIndex;
    }

    arrayToWork[positionForSortedEl].type = ElementStates.Changing;
    arrayToWork[compareElIndex].type = ElementStates.Changing;
    setRenderArray(arrayToWork);
    setTimeout(() => sortByChoise(arrayToWork, positionForSortedEl, sortedElIndex, compareElIndex, asc), SHORT_DELAY_IN_MS);
  }

  const sortByAsc = () => {
    setStart(true);
    setLoaderBtn(SortingPageElements.ASC);
    if(sortType==='Выбор'){
      sortByChoise(renderArray, 0, 0, 0, true);
    }else if(sortType==='Пузырёк'){
      sortByBubble(true);
    }
  }

  const sortByDesc = () => {
    setStart(true);
    setLoaderBtn(SortingPageElements.DESC);
    if(sortType==='Выбор'){
      sortByChoise(renderArray, 0, 0, 0, false);
    }else if(sortType==='Пузырёк'){
      sortByBubble(false);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.flex}>
        <div className={`${styles.flex} ${styles.radioGroup}`}>
          <RadioInput name="type" label="Выбор" checked={sortType==='Выбор'} onChange={()=>setSortType('Выбор')} disabled={isStart} />
          <RadioInput name="type" label="Пузырёк" checked={sortType==='Пузырёк'} onChange={()=>setSortType('Пузырёк')} disabled={isStart} />
        </div>
        <div className={`${styles.flex} ${styles.btnGroup}`}>
          <Button text="По возрастанию" onClick={sortByAsc} isLoader={loaderBtn===SortingPageElements.ASC} disabled={isStart} sorting={Direction.Ascending} />
          <Button text="По убыванию" onClick={sortByDesc} isLoader={loaderBtn===SortingPageElements.DESC} disabled={isStart} sorting={Direction.Descending} />
        </div>
        <div className={styles.flex}>
          <Button text="Новый массив" onClick={renderNewArr} isLoader={loaderBtn===SortingPageElements.NEW} disabled={isStart} extraClass="ml-12" />
        </div>
      </div>
      <div className={`${styles.flex} ${styles.container}`}>
        {
          renderArray.map((element, index)=><Column index={element.value} key={index} state={element.type} />)
        }
      </div>
    </SolutionLayout>
  );
};
