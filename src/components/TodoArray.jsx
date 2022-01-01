import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { fakeItems } from "../../data";

const TodoArray = () => {
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState({});

  const [value, setValue] = useState("");
  const inputRef = useRef();
  const updateRef = useRef();

  useEffect(() => {
    const getItemsLocalStorage = () => {
      const data = localStorage.getItem("items");
      return data ? JSON.parse(data) : fakeItems;
    };
    const data = getItemsLocalStorage();
    setItems(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    // items.length > 0 && console.log(items);
  }, [items]);

  const updateItem = (i) => {
    const newItems = [...items];

    if (!isEditItem.text.trim()) {
      setIsEditItem({});
      // updateRef.current.value = "";
      // updateRef.current.focus();
      return;
    }
    newItems[i] = isEditItem.text.trim();
    setItems(newItems);
    setIsEditItem({});
  };

  const editItem = (id) => {
    const newItems = [...items];
    const findItem = newItems.find((_, i) => i === id);
    setIsEditItem({ id, text: findItem, edit: true });
    // console.log("types:", typeof id, id, findItem);
    // console.log("FIND ITEM:", id, findItem);
  };

  const deleteItem = (idx, item) => {
    // const newItems = [...items];
    // newItems.splice(idx, 1);
    // setItems(newItems);

    setItems((prevItems) => {
      prevItems.splice(idx, 1);
      return [...prevItems];
    });

    // console.log("DELETED:", item);
  };

  const addItem = (item) => {
    // setItems((prevItems) => [item, ...prevItems]);

    setItems([item, ...items]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = value.trim();

    if (!item) {
      setValue("");
      inputRef.current.focus();
      return;
    }

    addItem(item);
    setValue("");
    inputRef.current.focus();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type here.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          disabled={isEditItem?.edit}
        />
        <button type="submit" disabled={isEditItem?.edit}>
          add
        </button>
      </form>

      <ul>
        {items?.map((item, idx) => {
          return (
            <div key={idx}>
              {isEditItem?.edit && isEditItem?.id === idx ? (
                <input
                  value={isEditItem.text}
                  onChange={(e) =>
                    setIsEditItem({
                      id: idx,
                      text: e.target.value,
                      edit: true,
                    })
                  }
                  autoFocus
                  placeholder={"edit item..."}
                  ref={updateRef}
                  style={{ width: "100%" }}
                />
              ) : (
                <li>{`${item}`}</li>
              )}

              <div>
                <button
                  onClick={() => deleteItem(idx, item)}
                  disabled={isEditItem?.edit}
                >
                  deletar
                </button>
                {isEditItem?.edit && isEditItem?.id === idx ? (
                  <button onClick={() => updateItem(idx)}>salvar</button>
                ) : (
                  <button
                    onClick={() => editItem(idx)}
                    disabled={isEditItem?.edit}
                  >
                    editar
                  </button>
                )}
                <button
                  onClick={() => console.log("COMPLETE:", idx, item)}
                  disabled={isEditItem?.edit}
                >
                  comprado
                </button>
              </div>
            </div>
          );
        })}
      </ul>

      {items?.length < 1 && <p>Nenhum item... 👀</p>}
    </Container>
  );
};

export default TodoArray;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  ul {
    width: 100%;
    margin-top: 1rem;
    overflow-y: auto;
    @media screen and (min-width: 768px) {
      max-width: 600px;
    }
  }
  ul > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: lightcyan;
    padding: 10px;

    &:nth-child(even) {
      background: whitesmoke;
    }
    &:hover {
      background: lightgoldenrodyellow;
    }
  }

  ul li {
    display: flex;
    list-style: none;
    overflow-x: auto;
  }
  ul div > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  div > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    margin: 2px 0;
    border-radius: 2px;
    border: 1px solid #333;
    background: transparent;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      color: white;
      background: #333;
    }
    &:disabled {
      color: #ddd;
      background: transparent;
      border-color: #ddd;
      cursor: default;
    }
  }
`;
