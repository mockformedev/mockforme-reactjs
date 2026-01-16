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
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Heading on top */}
      <header className='w-full bg-white border-b border-gray-200 py-10 px-4 mb-10 shadow-sm'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 text-center leading-tight'>
            Integrate <span className='text-blue-600'>mockforme</span> in your application with just two lines of code
          </h1>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4'>
        {/* Since HttpRequestTester already has a 2-column grid internally, I'll modify App.js to wrap it better or modify HttpRequestTester again. */}
        {/* Let's modify App.js to just render HttpRequestTester, but I'll update HttpRequestTester to accept Children for the left column. */}
        <HttpRequestTester>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-4'>Integration Code</h3>
            <CodeBlock code={`import { mockforme } from 'mockforme';

mockforme().run();`}
            />
          </div>
        </HttpRequestTester>
      </main>
    </div>
  );
}

export default App;
