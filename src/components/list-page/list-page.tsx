import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css"
import { TListArrStringElement } from "../../types/t-arr-element";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import LinkedList from "./linked-list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ListPageElements } from "../../constants/element-names";

export const ListPage: React.FC = () => {

  const MAX_LIST_LENGHT = 6;

  const [renderArray, setRenderArray] = useState<TListArrStringElement[]>([]);
  const [list, ] = useState(new LinkedList<string>(MAX_LIST_LENGHT));
  const [isStart, setStart] = useState(false);
  const [inputedText, setText] = useState("");
  const [inputedIndex, setIndex] = useState("");
  const [loaderBtn, setLoaderBtn] = useState('');

  const getArrFromList = (): TListArrStringElement[] => {
    const arrFromList = list.toArray();
    const arrForReturn: TListArrStringElement[] = arrFromList.map(element=>{return {
      value: element, 
      type: ElementStates.Default,
      head: null,
      tail: null,
    }});
    if(arrForReturn.length>0){
      arrForReturn[0].head='head';
      arrForReturn[arrForReturn.length-1].tail='tail';
    }
    return arrForReturn;
  }

  const randomArr = (): string[] => {
    const qtyEl = Math.floor(Math.random() * 5+1);
    const arrToRender: string[] = [];
    for (let index = 0; index < qtyEl; index++) {
      const val = Math.floor(Math.random() * 9999);
      arrToRender.push(val.toString());
    }
    return arrToRender;
  }

  const animateAddIndex = (index: number) => {
    const arrForRender = renderArray.slice(0);
    arrForRender[index].head = null;
    arrForRender.splice(index,0,{
      value: inputedText, 
      type: ElementStates.Modified,
      head: index?null:'head',
      tail: index===arrForRender.length-1?'tail':null,
    });
    setRenderArray(arrForRender);
    setTimeout(()=>{
      const arrForRender: TListArrStringElement[] = getArrFromList();
      setRenderArray(arrForRender);
      setStart(false);
      setLoaderBtn('');
      setText('');
      setIndex('');
    },SHORT_DELAY_IN_MS);
  }

  const addHeadBtnClickHandler = () => {
    if(!inputedText&&inputedText!==''){
      return;
    }
    setStart(true);
    setLoaderBtn(ListPageElements.ADD_HEAD);
    const arrFromList = list.toArray();
    const success = list.prepend(inputedText);
    if(!success){
      setStart(false);
      setLoaderBtn('');
      setText('');
      return;
    }
    const arrForRender: TListArrStringElement[] = arrFromList.map(element=>{return {
      value: element, 
      type: ElementStates.Default,
      head: null,
      tail: null,
    }});
    if(arrForRender.length===0){
      arrForRender.push(
        {
          value: '', 
          type: ElementStates.Default,
          head: <Circle isSmall={true} state={ElementStates.Changing} letter={inputedText}/>,
          tail: 'tail',
        }
      )
    }else{
      arrForRender[0].head=<Circle isSmall={true} state={ElementStates.Changing} letter={inputedText}/>;
      arrForRender[arrForRender.length-1].tail='tail';
    }
    setRenderArray(arrForRender);
    setTimeout(()=>{
      const arrForRender: TListArrStringElement[] = getArrFromList();
      arrForRender[0].type = ElementStates.Modified;
      setRenderArray(arrForRender);
      setTimeout(()=>{
        const arrForRender: TListArrStringElement[] = getArrFromList();
        setRenderArray(arrForRender);
        setLoaderBtn('');
        setStart(false);
        setText('');
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const addTailBtnClickHandler = () => {
    if(!inputedText&&inputedText!==''){
      return;
    }
    setStart(true);
    setLoaderBtn(ListPageElements.ADD_TAIL);
    const arrFromList = list.toArray();
    const success = list.append(inputedText);
    if(!success){
      setStart(false);
      setLoaderBtn('');
      setText('');
      return;
    }
    const arrForRender: TListArrStringElement[] = arrFromList.map(element=>{return {
      value: element, 
      type: ElementStates.Default,
      head: null,
      tail: null,
    }});
    if(arrForRender.length===0){
      arrForRender.push(
        {
          value: '', 
          type: ElementStates.Default,
          head: <Circle isSmall={true} state={ElementStates.Changing} letter={inputedText}/>,
          tail: 'tail',
        }
      )
    }else{
      arrForRender[arrForRender.length-1].head=<Circle isSmall={true} state={ElementStates.Changing} letter={inputedText}/>;
      arrForRender[arrForRender.length-1].tail = 'tail';
    }
    setRenderArray(arrForRender);
    setTimeout(()=>{
      const arrForRender: TListArrStringElement[] = getArrFromList();
      arrForRender[arrForRender.length-1].type = ElementStates.Modified;
      setRenderArray(arrForRender);
      setTimeout(()=>{
        const arrForRender: TListArrStringElement[] = getArrFromList();
        setRenderArray(arrForRender);
        setStart(false);
        setLoaderBtn('');
        setText('');
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const recurseAnimateAdding = (indexToDel: number, currIndex: number = 0) => {
    const arrFromList = renderArray.slice(0);
    if(currIndex>=arrFromList.length||currIndex>indexToDel){
      animateAddIndex(indexToDel);
      return;
    }
    arrFromList[currIndex].head = <Circle isSmall={true} state={ElementStates.Changing} letter={inputedText}/>;
    if(currIndex>0){
      arrFromList[currIndex-1].type = ElementStates.Changing;
      arrFromList[currIndex-1].head = '';
      arrFromList[0].head = 'head';
    }
    setRenderArray(arrFromList);
    setTimeout(()=>{
      recurseAnimateAdding(indexToDel,++currIndex);
    },SHORT_DELAY_IN_MS);
  }

  const addIndexBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(ListPageElements.ADD_IND);
    let indexForAdding = parseInt(inputedIndex);
    indexForAdding = indexForAdding>renderArray.length-1?renderArray.length-1:indexForAdding;
    const success = list.addByIndex(inputedText,indexForAdding);
    if(!success){
      const arrForRender: TListArrStringElement[] = getArrFromList();
      setRenderArray(arrForRender);
      setText('');
      setIndex('');
      return;
    }
    recurseAnimateAdding(indexForAdding);
  }

  const animateDelIndex = (index: number) => {
    const arrForRender = renderArray.slice(0);
    arrForRender[index].type = ElementStates.Default;
    arrForRender[index].tail = <Circle isSmall={true} state={ElementStates.Changing} letter={arrForRender[index].value||''}/>;
    arrForRender[index].value = null;
    setRenderArray(arrForRender);
    list.deleteByIndex(index);
    setTimeout(()=>{
      const arrForRender: TListArrStringElement[] = getArrFromList();
      setRenderArray(arrForRender);
      setStart(false);
      setLoaderBtn('');
    },SHORT_DELAY_IN_MS);
  }

  const delHeadBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(ListPageElements.DEL_HEAD);
    animateDelIndex(0);
  }

  const delTailBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(ListPageElements.DEL_TAIL);
    animateDelIndex(renderArray.length-1);
  }

  const recurseAnimateDeletion = (indexToDel: number, currIndex: number = 0) => {
    const arrFromList = renderArray.slice(0);
    if(currIndex>=arrFromList.length||currIndex>indexToDel){
      animateDelIndex(indexToDel);
      return;
    }
    arrFromList[currIndex].type = ElementStates.Changing;
    setRenderArray(arrFromList);
    setTimeout(()=>{
      recurseAnimateDeletion(indexToDel,++currIndex);
    },SHORT_DELAY_IN_MS);
  }

  const delIndexBtnClickHandler = () => {
    setStart(true);
    setLoaderBtn(ListPageElements.DEL_IND);
    let indexForDel = parseInt(inputedIndex);
    indexForDel = indexForDel&&indexForDel>renderArray.length-1?renderArray.length-1:indexForDel;
    recurseAnimateDeletion(indexForDel);
  }

  useEffect(()=>{
    const randomArrToRender = randomArr();
    randomArrToRender.forEach(element => {
      list.append(element);
    });
    const arrForRender: TListArrStringElement[] = getArrFromList();
    setRenderArray(arrForRender);
  },[]);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.head}>
        <div className={`${styles.head} ${styles.control1}`}>
          <Input isLimitText maxLength={4} value={inputedText} onChange={e => setText(e.currentTarget.value)} placeholder="Введите значение" key={1}/>
          <Button text="Добавить в head" isLoader={loaderBtn===ListPageElements.ADD_HEAD} disabled={isStart||!inputedText} onClick={addHeadBtnClickHandler} key={2}/>
          <Button text="Добавить в tail" isLoader={loaderBtn===ListPageElements.ADD_TAIL} disabled={isStart||!inputedText} onClick={addTailBtnClickHandler} key={3}/>
          <Button text="Удалить из head" isLoader={loaderBtn===ListPageElements.DEL_HEAD} disabled={isStart||!list.getLength()} onClick={delHeadBtnClickHandler} key={4}/>
          <Button text="Удалить из tail" isLoader={loaderBtn===ListPageElements.DEL_TAIL} disabled={isStart||!list.getLength()} onClick={delTailBtnClickHandler} key={5}/>
        </div>
        <div className={`${styles.head} ${styles.control2}`}>
          <Input isLimitText type='number' maxLength={1} max={list.getLength()-1>=0?list.getLength()-1:0} min={0} value={inputedIndex} onChange={e => setIndex(e.currentTarget.value)} placeholder="Введите индекс"/>
          <Button text="Добавить по индексу" isLoader={loaderBtn===ListPageElements.ADD_IND} disabled={isStart||
            !(inputedIndex&&inputedText!=='')||
            !list.getLength()||
            parseInt(inputedIndex)<0||
            parseInt(inputedIndex)>list.getLength()-1
          } onClick={addIndexBtnClickHandler} />
          <Button text="Удалить по индексу" isLoader={loaderBtn===ListPageElements.DEL_IND} disabled={isStart||
            !list.getLength()||
            !inputedIndex||
            parseInt(inputedIndex)<0||
            parseInt(inputedIndex)>list.getLength()-1
          } onClick={delIndexBtnClickHandler} />
        </div>
      </div>
      <div className={`${styles.flex}`}>
        {
          renderArray.map((element, index)=>{
            return (
              <div key={index}  className={`${styles.flex} ${styles.container}`}>
                <Circle letter={element.value||''} index={index} state={element.type||ElementStates.Default} head={element.head} tail={element.tail} />
                {(index<renderArray.length-1)&&<ArrowIcon />}
              </div>
            );
          })
        }
      </div>
    </SolutionLayout>
  );
};
