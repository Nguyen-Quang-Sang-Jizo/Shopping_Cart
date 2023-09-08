import React, { useState } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item 1', price: 10, quantity: 10 },
    { id: 2, name: 'Item 2', price: 15, quantity: 3 },
    { id: 3, name: 'Item 3', price: 20, quantity: 8 },
    { id: 4, name: 'Item 4', price: 50, quantity: 23 },
    { id: 5, name: 'Item 5', price: 34, quantity: 4 },
    { id: 6, name: 'Item 6', price: 54, quantity: 7 },
    { id: 7, name: 'Item 7', price: 23, quantity: 9 },
    { id: 8, name: 'Item 8', price: 27, quantity: 12 },
    { id: 9, name: 'Item 9', price: 65, quantity: 17 },

  ]);

  const [cart, setCart] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: Item) => {
    const updatedItems = [...items];
    const updatedCart = [...cart];

    const selectedItem = updatedItems.find((i) => i.id === item.id);

    if (selectedItem && selectedItem.quantity > 0) {
      selectedItem.quantity--;
      const existingCartItem = updatedCart.find((i) => i.id === item.id);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      setItems(updatedItems);
      setCart(updatedCart);
      setTotal(total + item.price);
    }
  };

  const removeFromCart = (item: Item) => {
    const updatedItems = [...items];
    const updatedCart = [...cart];

    const selectedItem = updatedItems.find((i) => i.id === item.id);

    if (selectedItem) {
      selectedItem.quantity++;
      const existingCartItemIndex = updatedCart.findIndex((i) => i.id === item.id);

      if (existingCartItemIndex !== -1) {
        const existingCartItem = updatedCart[existingCartItemIndex];
        if (existingCartItem.quantity === 1) {
          updatedCart.splice(existingCartItemIndex, 1); // Remove item if quantity is 1
        } else {
          existingCartItem.quantity--;
        }

        setItems(updatedItems);
        setCart(updatedCart);
        setTotal(total - item.price);
      }
    }
  };

  return (
    <div className="App">
      <div className="item-list">
        <h2>Item List</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              Name: {item.name} - Price: {item.price} - Quantity: {item.quantity}
              <button onClick={() => addToCart(item)} disabled={item.quantity === 0}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              Name: {item.name} - price: {item.price} - Quantity: {item.quantity}
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default App;
