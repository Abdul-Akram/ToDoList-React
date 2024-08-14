import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Content = ({
  items,
  handleClick,
  handleAdd,
  handleDel,
  newItemText,
  setNewItemText,
}) => {
  return (
    <div className="content">
      <p style={{ color: "red", fontWeight: "bolder" }}>
        {items.length === 0 ? "List is Empty" : null}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              onChange={() => handleClick(item.id)}
              type="checkbox"
              checked={item.checked}
            />
            <label
              onDoubleClick={() => handleClick(item.id)}
              style={{
                cursor: "pointer",
                textDecoration: item.checked ? "line-through" : "none",
              }}
            >
              {item.text}
            </label>
            <button>
              <FaRegTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => {
                  handleDel(item.id);
                }}
              />
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <div className="add" role="button" tabIndex="0" onClick={handleAdd}>
        Add
      </div>
    </div>
  );
};

export default Content;
