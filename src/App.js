import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const[datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('')
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    const transactionName = name.substring(price.length + 1);
    
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
    .then(response => response.json())
    .then(json => {
      console.log('result', json);
    });
  }
  return (
    <main>
      <h1>$400<span>.00</span></h1>
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
        <div className="transaction">
          <div className='left'>
            <div className="name">New Samsung TV</div>
            <div className="description">It was time for a new tv</div>
          </div>
          <div className='right'>
            <div className="price red">-$500</div>
            <div className="datetime">2025-04-20 6:41</div>
          </div>
        </div>
        <div className="transaction">
          <div className='left'>
            <div className="name">Gig job new website</div>
            <div className="description">It was time for a new tv</div>
          </div>
          <div className='right'>
            <div className="price green">+$500</div>
            <div className="datetime">2025-04-20 6:41</div>
          </div>
        </div>
        <div className="transaction">
          <div className='left'>
            <div className="name">iPhone</div>
            <div className="description">It was time for a new tv</div>
          </div>
          <div className='right'>
            <div className="price red">-$900</div>
            <div className="datetime">2025-04-20 6:41</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

