import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { HttpRequestTester } from './HttpRequestTester';

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { CodeBlock } from './CodeBlock';

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
      <div className='flex flex-col items-center justify-center'>
        <h1 className='center text-3xl font-bold mt-10 mb-10 p-5'>Integrate mockforme in your application with just two lines of code</h1>

        <CodeBlock code={`
  import { mockforme } from 'mockforme';

  mockforme().run();
            `}
        />
      </div>
      <div className='http-tester'>
        <HttpRequestTester />
      </div>
    </div>
  );
}

export default App;
