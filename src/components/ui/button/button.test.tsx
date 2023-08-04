import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe("Button component tests", ()=>{
  it("empty", ()=>{
      const tree = renderer.create(<Button />).toJSON();
      expect(tree).toMatchSnapshot();
  })

  it("standart", ()=>{
    const tree = renderer.create(<Button text='Click me!'/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("loader", ()=>{
    const tree = renderer.create(<Button isLoader={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("disabled", ()=>{
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Button clicked', () => {
    window.alert = jest.fn();
    render(<Button text='TestButton' onClick={()=>alert('Clicked!')}/>)
    const btn = screen.getByText("TestButton");
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith('Clicked!');
});

})
