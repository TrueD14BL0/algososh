import { getFibonacciNumbers } from './fibonacci-page'

const result = [1,1,2,3,5,8]

describe("Fibonacci test", ()=>{
    it("generate row", ()=>{
        expect(getFibonacciNumbers(5)).toEqual(result)
    })
})
