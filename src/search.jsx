/* eslint-disable no-unused-vars */
import * as React from 'react';


//Create a search component using arrow function expression
const Search = ({id, value, type='text', onInputChange, isFocused, children}) => {

      //children in react means that the component will display whatever 
      //is included in between the opening and closing tags while invoking the component.
      
      //useRef is a React Hook that lets you reference a value that’s 
      //not needed for rendering.
      const inputRef = React.useRef();
      React.useEffect(() => {
        if (isFocused && inputRef.current) {
           inputRef.current.focus();
        }
      }, [isFocused]);

    return(
      <>
      <label htmlFor={id}>{children}</label>
       &nbsp;
      <input ref={inputRef} id={id} type={type} value={value}  onChange={onInputChange}
      />
    </> 
    );
};

export default Search 