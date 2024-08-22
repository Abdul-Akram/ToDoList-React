import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { useState, useEffect } from "react";
import Search from "./Search";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3501/items";
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Data Not Received");
        }
        const data = await response.json();
        setItems(data);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchItems, 2000);
  }, []);

  const handleClick = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);

    const myItem = updatedItems.find((item) => item.id === id);
    // console.log(myItem);
    const CheckOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: myItem.checked }),
    };
    const patchUrl = `${API_URL}/${id}`;
    const result = await apiRequest(patchUrl, CheckOptions);
    if (result) setFetchError(result);
  };

  const handleDel = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const DelOptions = {
      method: "DELETE",
    };

    const deleteUrl = `${API_URL}/${id}`;
    const result = await apiRequest(deleteUrl, DelOptions);
    if (result) setFetchError(result);
  };

  const handleAdd = async () => {
    if (newItemText.trim() !== "") {
      const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        checked: false,
        text: newItemText.trim(),
      };
      const newListItems = [...items, newItem];
      setItems(newListItems);
      setNewItemText("");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      };

      const result = await apiRequest(API_URL, requestOptions);
      if (result) setFetchError(result);
    }
  };

  return (
    <div className="App">
      <Header />
      <Search searchItem={searchItem} setSearchItem={setSearchItem} />
      {loading && <p>Loading...</p>}
      {fetchError && <p>{`Error: ${fetchError}`}</p>}
      {!loading && !fetchError && (
        <Content
          items={items.filter((item) =>
            item.text.toLowerCase().includes(searchItem.toLowerCase())
          )}
          handleClick={handleClick}
          handleAdd={handleAdd}
          handleDel={handleDel}
          newItemText={newItemText}
          setNewItemText={setNewItemText}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
