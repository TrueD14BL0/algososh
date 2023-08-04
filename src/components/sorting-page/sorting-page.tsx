import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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

const swapArrElements = (arrayToWork: TArrNumberElement[], indexOne: number, indexTwo: number) => {
  const tempEl = arrayToWork.splice(indexTwo,1);
  arrayToWork.splice(indexOne,0,tempEl[0]);
}

export const sortByBubble = async (arr: TArrNumberElement[], asc: boolean, renderFunc?: Dispatch<SetStateAction<TArrNumberElement[]>>) => {
  if(arr.length===0){
    return [];
  }
  let arrayToWork = arr.slice(0);
  if(arr.length===1){
    arrayToWork[0].type = ElementStates.Modified;
    renderFunc&&renderFunc(arrayToWork);
    return arrayToWork;
  }
  for (let i = 0; i < arrayToWork.length; i++) {
    for (let j = 0; j < arrayToWork.length - 1 - i; j++) {
      arrayToWork = arrayToWork.slice(0);
      arrayToWork[j].type = ElementStates.Changing;
      arrayToWork[j+1].type = ElementStates.Changing;
      if (asc?
        arrayToWork[j].value > arrayToWork[j + 1].value:
        arrayToWork[j].value < arrayToWork[j + 1].value) {
        swapArrElements(arrayToWork, j + 1, j);
      }
      renderFunc&&renderFunc(arrayToWork);
      await sleep(SHORT_DELAY_IN_MS);
      arrayToWork = arrayToWork.slice(0);
      arrayToWork[j].type = ElementStates.Default;
      arrayToWork[j+1].type = ElementStates.Default;
      renderFunc&&renderFunc(arrayToWork);
    }
    arrayToWork = arrayToWork.slice(0);
    arrayToWork[arrayToWork.length-1-i].type = ElementStates.Modified;
    renderFunc&&renderFunc(arrayToWork);
  }
  return arrayToWork;
}

export const sortByChoise = async (arrayToSort: TArrNumberElement[], asc: boolean, renderFunc?: Dispatch<SetStateAction<TArrNumberElement[]>>) => {
  if(arrayToSort.length===0){
    return [];
  }
  let arrayToWork = arrayToSort.slice(0);
  if(arrayToWork.length===1){
    arrayToWork[0].type = ElementStates.Modified;
    renderFunc&&renderFunc(arrayToWork);
    return arrayToWork;
  }
  for (let i = 0; i < arrayToSort.length; i++) {
    arrayToWork = arrayToWork.slice(0);
    let currentChosenIndex = i;
    arrayToWork[i].type = ElementStates.Changing;
    for (let j = i; j < arrayToSort.length; j++) {
      arrayToWork = arrayToWork.slice(0);
      arrayToWork[j].type = ElementStates.Changing;
      renderFunc&&renderFunc(arrayToWork);
      await sleep(SHORT_DELAY_IN_MS);
      arrayToWork = arrayToWork.slice(0);
      if(i!==j){
        arrayToWork[j].type = ElementStates.Default;
      }
      if(asc?
          arrayToWork[currentChosenIndex].value>arrayToWork[j].value:
          arrayToWork[currentChosenIndex].value<arrayToWork[j].value){
        currentChosenIndex = j;
      }
    }
    arrayToWork[i].type = ElementStates.Default;
    swapArrElements(arrayToWork, i, currentChosenIndex);
    arrayToWork[i].type = ElementStates.Modified;
    renderFunc&&renderFunc(arrayToWork);
    await sleep(SHORT_DELAY_IN_MS);
  }
  return arrayToWork;
}

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

  const sortByAsc = async () => {
    setStart(true);
    setLoaderBtn(SortingPageElements.ASC);
    if(sortType==='Выбор'){
      const newArr = await sortByChoise(renderArray, true, setRenderArray);
      setLoaderBtn('');
      setStart(false);
    }else if(sortType==='Пузырёк'){
      await sortByBubble(renderArray, true, setRenderArray);
      setLoaderBtn('');
      setStart(false);
    }
  }

  const sortByDesc = async () => {
    setStart(true);
    setLoaderBtn(SortingPageElements.DESC);
    if(sortType==='Выбор'){
      await sortByChoise(renderArray, false, setRenderArray);
      setLoaderBtn('');
      setStart(false);
    }else if(sortType==='Пузырёк'){
      await sortByBubble(renderArray, false, setRenderArray);
      setLoaderBtn('');
      setStart(false);
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
