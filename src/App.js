import React from 'react';
import logo from './logo.svg';
import './App.css';

// importar botón
import PaypalCheckoutButton from './components/PaypalCheckoutButton';

function App() {

  const order = {
    customer: '123456',
    total: '550.00',
    items: [
      {
        sku: '112',
        name: 'Camisa ReactJS',
        price: '300.00',
        quantity: 1,
        currency: 'USD'
      },
      {
        sku: '99',
        name: 'Camisa JS',
        price: '125.00',
        quantity: 2,
        currency: 'USD'
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PaypalCheckoutButton order={order} />
      </header>
    </div>
  );
}

export default App;
