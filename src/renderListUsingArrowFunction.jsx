import * as React from "react";
import Item from './item.jsx';

const RenderListUsingArrowFunction = ({list, onRemoveItem}) => {
  //Note: all function components by convention receive "props" even 
  //if the function doesn't have the param "props 
    return (
      <>
          <div className="row mb-2">
            <h5 className="themeFontColor text-center">
               Stories currently in the catalog
            </h5>
          </div>
       
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Url</th>
                <th>Author</th>
                <th>Num-Comments</th>
                <th>Points</th>
                <th>ObjectID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <Item
                      key={item.objectID}
                      objectID={item.objectID} 
                      item={item}
                      onRemoveItem = {onRemoveItem} //contains the onRemoveItem handler
                  />
              ))}
            </tbody>
          </table>
      
      </>

    );

};
export default RenderListUsingArrowFunction;


  
 
