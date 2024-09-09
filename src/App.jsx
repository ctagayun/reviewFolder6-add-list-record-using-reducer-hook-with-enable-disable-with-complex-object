/*
  Task:
    Incorporate bootstrap 

  Setup: 
    npm install bootstrap
    Once the installation is complete, we can include it in our app’s 
    entry file in main.jsx :
    --  Bootstrap CSS
    import "bootstrap/dist/css/bootstrap.min.css";
    -- Bootstrap Bundle JS
    import "bootstrap/dist/js/bootstrap.bundle.min";

    Now since we created the project with Vite, we can rely 
    on Vite's plugins to integrate ESLint properly. Run the 
    following command
       npm install vite-plugin-eslint --save-dev

    install uuid node package 
       npm install uuid

   ToRead:
      https://www.robinwieruch.de/conditional-rendering-react/
       
    */

      import * as React from 'react';
      import Search from './search.jsx';
      import './App.css'
      import { v4 as uuidv4 } from 'uuid';
      
      import RenderListUsingArrowFunction from "./renderListUsingArrowFunction.jsx";
      
      
      const initialList = [
        {
          title: 'React',
          objectID: 0,
        },
        {
          title: 'Redux',
          objectID: 1,
        },
      ];
      
      ///React Advance State Reducer Hook
      // see: https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/
      
      //How to useReducer in React: https://www.robinwieruch.de/react-usereducer-hook/
      
      //useReducer is best to use if multiple states are dependent on each other.
      //For stories, boolean is Loading, and error are all related to data fetching. 
      //All three properties/state could be a part of one complex object (example data, isLoading, error)
      //managed by a reducer
      
      //Again the first thing to do when using React.useReducer hook
      //is to define a reducer FUNCTION outside of the component.
      //A reducer function always receives a state and an action. 
      //Based on these two arguments, returns a new state.
      
      //A reducer function always receives a state and an action (A). 
      //Based on these two arguments, a reducer always returns a new state:
      //  1. 'action' is always associated with a type (B) and payload (B)
      //  2. If the type matches a condition in the reducer (B), return a new state (C) 
      //    based on incoming state and action.
      
      
      //In the following example: 
      //The listReducer function covers "one type" and then returns the 
      //payload of the incoming action without using the current state to 
      //compute the new state. The new state is therefore simply the payload.
      
      //Define a reducer function. It always receives state and action
      //   1.'action' is always associated with a type. In this example
      //     there are 2 types: 'ADD_ITEM' and 'DELETE_ITEM' 
      //     each type returns appropriate action.payload.
      //
      //   2. If the type matches a condition  in this case 'ADD_ITEM' 
      //      and 'DELETE_ITEM' the reducer return a new state based on 
      //       incoming state and action.
      //   3. Based on these two arguments the reducer always returns 
      //     a new state
      
      
      const listReducer = (state, action) =>{
        switch (action.type) { //(A)
          //based on the action type implement the business logic
          case 'ADD_ITEM':
            //We could set both, the new list and the boolean flag isDisable and isShowlist 
            //explicitly -- which didn't change
            //but in this case we are using JavaScript's spread operator to spread all 
            //key/value pairs from the state object into the new "state" object, 
            //while overriding the list property (the only property that was changed)
            //with the new list.
            return {
              ...state,
              list: state.list.concat({ title: action.title, objectID: action.objectID }),  //list: points to initialList OBJECT
            };
            
          case 'DELETE_ITEM':
             console.log (`Delete  Action Type is = ${action.type}`)
             console.log (`Item to be deleted by the reducer is ${action.payload.objectID}`)
           
             //Return a new state but filter the state first. In this case objectID. 
             //Filter generates a new array from the 'state' an call it "story"
             return {
              ...state,
              list: state.list.filter(   
                (story) => action.payload.objectID !== story.objectID   //list: points to initialList OBJECT
               ) 
             }
             
          case 'ENABLE_DISABLE_BTN':
             console.log(`ENABLE_DISABLE_BTN is executing: isDisable= ${action.isDisable} isShowlist=${action.isShowList}`)
        
             return {
                ...state, isDisable: action.isDisable, isShowList: action.isShowlist //list property was not changed. Only the boolean flags
              };

          default:
             console.log(`Unhandled TYPE: ${action.type}`);
             throw new Error(); 
        }
      
      };
      
       //Create a custom hook called "useStorageState". We will use two hooks 
        //to create it:
        //    1. useState
        //    2. useEffect 
      
        //The purpose of this custom hook is to save and fetch from the localtorage
        //the values that were inputted in the search box.
        //The actual return value of our custom hook will be displayed in the 
        //search box.
      
        const useStorageState = (searchKeyParam, deafaultStateParam) => {
          const [theState, stateSetter] = React.useState(
             localStorage.getItem(searchKeyParam) || deafaultStateParam //provides an initial value to the hook.
          );
      
          //https://react.dev/reference/react/useEffect#useeffect
          //Since the key comes from outside, the custom hook assumes that it could change,
          //so it needs to be included in the dependency array of the useEffect hook as well.
          React.useEffect(() => {
              localStorage.setItem(searchKeyParam, theState);
             },
             [theState, stateSetter] );
      
          //Custom hooks return values are returned as an array
          return [theState, stateSetter]; 
      
       } //EOF create custom hook
      
      
      
      //Declaration of App component
      function App() {
      
        const welcome = {
           greeting: 'Demo',
           title: "Add Item To List In a Complex Object Using Reducer",
        };
        
        let searchKey= 'search';
        let defaultState = 'React'
      
        //now call our custom hook useLocalStorage to initialize our state 
        //called "searchTerm". The actual return value of our custom hook is:
        //return [theState, stateSetter]. But we can rename it. In this case
        //searchTerm, setSearchTerm respectively
        const [searchTerm, setSearchTerm] = useStorageState(searchKey, defaultState)
      
        //We start off with a complex state object which has the list as one of its properties.
        //Wherever we want to use the list (or the boolean flag), we need to access the 
        //property from the object first: Example:
        //       updatedList.list
        //       updatedList.isShowList
        //       updateList.isDisable
          const [updatedList, dispatchListData] = React.useReducer(listReducer,{
                list: initialList,
                isShowlist: true,
                isDisable: true,
        } );
        //Before we can add an item, we need to track the "input field's" state, 
        //because without the value from the input field, we don't have any text 
        //to give the item which we want to add to our list. So let's add some 
        //state management to this first:
        const [title, setTitle] = React.useState('');
      
        //Track changes to the input text box
        //we are using JavaScript's spread 
        //operator  (...) to spread all key/value pairs from the state object into 
        //the new state object, while overriding the isShowList and isDisable properties 
        //with the new values. Note we are not overriding "list" property
        const handleChange = (event) => {
          console.log(`Value of title input field: ${event.target.value} `)
          setTitle(event.target.value);
      
          if (!event.target.value.length)
          {
             dispatchListData({type: 'ENABLE_DISABLE_BTN',  isDisable: true,  isShowList: true});  
          }else{
             dispatchListData({type: 'ENABLE_DISABLE_BTN', isDisable: false,  isShowList: true});
          };
      
       };
      
        //Function to delete a a record from the initialList list
        //we need to access the property from the object (e.g. updatedList.list) first. 
        //updatedList is the useState state variable
        //list: is the property name of the complex object
        const handleDeleteRecord = (item) => {
          console.log(`Item being deleted =  ${item.objectID} ${item.title}`);
          dispatchListData({type: 'DELETE_ITEM', payload: item,}); 
        };
        
        //Function to handle add a record
        //Next, whenever someone clicks the Add button in renderListUsingArrowFunction.jsx , 
        //we can add the title entered into the input field as a new item to the list:
       
        const handleAddRecord = () => {
          console.log(`Item being Added: ${title}`);
         
          //We could set both, the new list and the boolean flags isDisable and isShowList
          // -- which didn't change explicitly. We are using JavaScript's spread operator 
          //to spread all key/value pairs from the state object into the new state object, 
          //while overriding the list property with the new list which is the only property
          //that changed.
          dispatchListData({type: 'ADD_ITEM', title, objectID: uuidv4()}); 
          setTitle('');  
        };
      
       
        const searchedList = updatedList.list.filter((story) =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        
        const handleSearch = (event) => {
          setSearchTerm(event.target.value); //update state hook variable in this case "searchTerm"
        }
      
        return (
          <div>
             <h1> 
                {welcome.greeting} {welcome.title}
            </h1>
             
             
             {/* searchTerm is the return value from useStorageState custom hook. */}
            <Search id="search" value={searchTerm}  isFocused  onInputChange={handleSearch} >
               <strong>Search:</strong>
            </Search>
      
             <hr/>
             <div>
               <input type="text" value={title} onChange={handleChange} />
                 <button type="button" disabled={updatedList.isDisable} className="btn btn-primary" onClick={handleAddRecord}>
                   Add
                 </button>
              </div>
      
             {/*We have made the input field "title" a controlled element, because 
               it receives its internal value from React's state now. 
               cheat sheet on conditional rendering: https://www.robinwieruch.de/conditional-rendering-react/
                    updatedList = is a state
                    isShowlist = boolean flag to either show or hide the list
                                 with conditional rendering
              */}
      
              
              {updatedList.isShowlist && 
               <RenderListUsingArrowFunction list={searchedList} 
                                    onRemoveItem={handleDeleteRecord}
                                    title={title} />}
      
          
              
          </div>
        )
      }
      
      export default App