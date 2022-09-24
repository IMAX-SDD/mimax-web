import { React, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  const reset = () => {
    setCount(0);
  }

  return (
    <div class="App">
      <h1>AWESOME BUTTON CLICKER</h1>
      <h2>{count}</h2>
      <button class="btn" onClick={increment}>CLICK ME</button> <br/>
      <button class="btn" style={{marginTop: '20px'}} onClick={reset}>RESET</button>
    </div>
  );
}
export default App;