import renderer from 'react-test-renderer';
import { Circle } from "./circle"
import { ElementStates } from '../../../types/element-states';

describe("Circle component tests", ()=>{
  it("empty", ()=>{
      const tree = renderer.create(<Circle />).toJSON();
      expect(tree).toMatchSnapshot();
  })

  it("Default style", ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("Changing style", ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("Modified style", ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("letter", ()=>{
    const tree = renderer.create(<Circle letter='666'/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("small", ()=>{
    const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("head style", ()=>{
    const tree = renderer.create(<Circle head='head'/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("head elem style", ()=>{
    const tree = renderer.create(<Circle head={<Circle/>}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("tail style", ()=>{
    const tree = renderer.create(<Circle tail='tail'/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("tail elem style", ()=>{
    const tree = renderer.create(<Circle tail={<Circle/>}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("index", ()=>{
    const tree = renderer.create(<Circle index={13}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})
