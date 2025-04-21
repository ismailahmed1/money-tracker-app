import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const[datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    
    // Extract price from name (e.g., "+200 new samsung tv" -> "+200")
    const price = name.split(' ')[0];
    const transactionName = name.substring(price.length + 1).trim();
    
    const requestBody = {
        name: transactionName,
        description,
        datetime,
        price: price
    };
    console.log('Sending request with body:', requestBody);
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(json => {
      console.log('result', json);
      // Clear the form after successful submission
      setName('');
      setDescription('');
      setDatetime('');
      // Refresh transactions
      getTransactions().then(transactions => {
        setTransactions(transactions);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance += Number(transaction.price);
  }

  return (
    <main>
      <h1>${balance.toFixed(2)}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                 placeholder={"+200 new samsung tv"}/>
          <input value={datetime}
                 onChange={ev => setDatetime(ev.target.value)}
                 type="datetime-local"/>
      </div>
      <div className="description">
        <input type="text" 
                     value={description} 
                     onChange={ev => setDescription(ev.target.value)}
                     placeholder={"description"}/>
      </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => 
          <div className="transaction">
          <div className='left'>
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className='right'>
            <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>{transaction.price}</div>
            <div className="datetime">2025-04-20 6:41</div>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}

export default App;

