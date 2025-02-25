import React from "react";
import ListItem from "./ListItem";
import "../styles/ListContainer.css";

const ListContainer = ({ 
  lists, 
  onCheckboxChange, 
  selectedLists, 
  showEmptyList, 
  moveItem 
}) => {
  // If lists are empty or not an array, display a message
  if (!Array.isArray(lists) || lists.length === 0) {
    return <p>No lists available.</p>;
  }

  // Grouping items based on their list_number
  const groupedLists = lists.reduce((acc, item) => {
    const { list_number } = item;
    if (!acc[list_number]) {
      acc[list_number] = [];
    }
    acc[list_number].push(item);
    return acc;
  }, {});

  return (
    <div className="list-container">
      {/* Loop through each list group and render its items */}
      {Object.keys(groupedLists).map((listNum, index, array) => (
        <React.Fragment key={listNum}>
          {/* Render List 1 and List 2 normally, excluding the "new" list */}
          {listNum !== "new" && (
            <div className="list-box">
              <div className="list-header">
                {/* Checkbox for selecting lists */}
                <input 
                  type="checkbox" 
                  className="list-checkbox" 
                  checked={selectedLists.includes(parseInt(listNum))} 
                  onChange={() => onCheckboxChange(parseInt(listNum))}
                />
                <h3>List {listNum}</h3>
              </div>
              
              <div className="list-items">
                {groupedLists[listNum].map(({ id, name, description }) => (
                  <ListItem 
                    key={id} 
                    name={name} 
                    description={description} 
                    showArrows={showEmptyList} // Show arrows only if the new list is active
                    onMoveLeft={
                      showEmptyList && listNum === "2" // Move from List 2 to "New List"
                        ? () => moveItem(id, "new")
                        : showEmptyList && listNum === "new" // Move from "New List" to List 1
                        ? () => moveItem(id, "1")
                        : null
                    }
                    onMoveRight={
                      showEmptyList && listNum === "1" // Move from List 1 to "New List"
                        ? () => moveItem(id, "new")
                        : showEmptyList && listNum === "new" // Move from "New List" to List 2
                        ? () => moveItem(id, "2")
                        : null
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show the "New List" only ONCE between List 1 and List 2 */}
          {showEmptyList && listNum === "1" && (
            <div className="list-box"> 
              <div className="list-header">
                <h3>New List</h3> 
              </div>
              <div className="list-items">
                {/* Render items inside the "New List" */}
                {groupedLists["new"]?.map(({ id, name, description }) => (
                  <ListItem 
                    key={id} 
                    name={name} 
                    description={description} 
                    showArrows={true} // Always show move buttons for "New List"
                    onMoveLeft={() => moveItem(id, "1")} // Move item back to List 1
                    onMoveRight={() => moveItem(id, "2")} // Move item back to List 2
                  />
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListContainer;
