import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { useState } from "react";
import Search from "./Search";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todo")));

  const [newItemText, setNewItemText] = useState("");

  const [searchItem, setSearchItem] = useState("");

  const handleClick = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem("todo", JSON.stringify(updatedItems));
  };

  const handleDel = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("todo", JSON.stringify(updatedItems));
  };

  const handleAdd = () => {
    if (newItemText.trim() !== "") {
      const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        checked: false,
        text: newItemText.trim(),
      };
      const newListItems = [...items, newItem];
      setItems(newListItems);
      localStorage.setItem("todo", JSON.stringify(newListItems));
      setNewItemText("");
    }
  };

  return (
    <div className="App">
      <Header />
      <Search searchItem={searchItem} setSearchItem={setSearchItem} />
      <Content
        items={items}
        handleClick={handleClick}
        handleAdd={handleAdd}
        handleDel={handleDel}
        newItemText={newItemText}
        setNewItemText={setNewItemText}
      />
      <Footer />
    </div>
  );
}

export default App;
