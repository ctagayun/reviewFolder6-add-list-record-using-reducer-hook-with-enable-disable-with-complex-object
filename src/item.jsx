import * as React from 'react';
//Create another component that will display list of stories.
//This component called "Item" encapsulates the task of displaying 
//each 'Item' record

/*
   Finally, the Item component uses the incoming callback handler as a 
   function in a new handler. In this handler, we will pass the specific 
   item to it. Moreover, an additional button element is needed to trigger 
   the actual event:

   One popular solution is to use an inline arrow function, 
   which allows us to sneak in arguments like the item:
   <button type="button" onClick={() => onRemoveItem(item)}> 
        Dismiss
   </button>
 
  */

//If you want to make this more elegant though, you can use an inline handler 
//which allows you to execute the callback handler function in the Item component 
//right in the JSX. There are two solutions using the incoming onRemoveItem function
//in the Item component as an inline handler. 

//First, using JavaScript's bind method:
//Using JavaScript's bind method on a function allows us to bind arguments directly 
//to that function that should be used when executing it.

//The second and more popular solution is to use an inline arrow function, which allows
//us to sneak in arguments like the item:
const Item = ({item, onRemoveItem, handleAdd, onChange }) => (
    <tr>
     <td>{item.title}</td>
     {/* <td>{item.url}</td>
     <td>{item.author}</td>
     <td>{item.num_comments}</td>
     <td>{item.points}</td> */}
     <td>{item.objectID}</td>
     <span>
      {/* <button type="button" onClick={onRemoveItem.bind(null, item)}> */}
        <button className="btn btn-primary" type="button" onClick={() => onRemoveItem(item)}>
          Delete
        </button>
    
      </span>
    </tr>

     
);

export default Item;
