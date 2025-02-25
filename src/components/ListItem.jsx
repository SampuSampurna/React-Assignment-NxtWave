import React from "react";
import "../styles/ListItem.css";

const ListItem = ({ name, description, onMoveLeft, onMoveRight, showArrows }) => {
  // Check if the item data is valid, otherwise display an error message
  if (!name || !description) {
    return <p className="error-text">Invalid item</p>;
  }

  return (
    <div className="list-item">
      {/* Display item name and description */}
      <p>{name}</p>
      <p>{description}</p>

      {/* Display move buttons only if showArrows is true */}
      {showArrows && (
        <div className="list-item-buttons">
          {/* Left arrow button - Moves the item to the previous list */}
          {onMoveLeft && (
            <button className="arrow-btn left-arrow" onClick={onMoveLeft}>⬅</button>
          )}

          {/* Right arrow button - Moves the item to the next list */}
          {onMoveRight && (
            <button className="arrow-btn right-arrow" onClick={onMoveRight}>➡</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListItem;
