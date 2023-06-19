import { ReactElement } from "react"
import { ElementStates } from "./element-states"

export type TArrNumberElement ={
  value: number,
  type: ElementStates,
}

export type TArrStringElement ={
  value: string,
  type: ElementStates,
}

export type TListArrStringElement = {
  value: string|null,
  type: ElementStates,
  head: string|ReactElement|null,
  tail: string|ReactElement|null,
}