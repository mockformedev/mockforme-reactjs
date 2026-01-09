import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('/user/me').then((res) => res.json()).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <div className='center-container'>
      <h1 className='center'>Integrate mockforme in your application with just two lines of code</h1>

      <code className='code'>
        <pre>
          {`
import { mockforme } from 'mockforme';

mockforme().run();
          `}
        </pre>
      </code>
    </div>
  );
}

export default App;
