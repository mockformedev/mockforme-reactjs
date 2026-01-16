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
      <header className='header w-full bg-white border-b border-gray-200 py-10 px-4 mb-10 shadow-sm'>
        <div className='header-section'>
          <img src="https://www.mockforme.com/assets/images/logo.png" alt="MockForMe Logo" className="mx-auto mb-4 logo" />
          <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 text-center leading-tight'>
            Integrate <span className='text-blue-600'>mockforme</span> in your application with just two lines of code
          </h1>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4'>
        {/* Since HttpRequestTester already has a 2-column grid internally, I'll modify App.js to wrap it better or modify HttpRequestTester again. */}
        {/* Let's modify App.js to just render HttpRequestTester, but I'll update HttpRequestTester to accept Children for the left column. */}
        <HttpRequestTester>
          <div className='bg-white p-6 rounded-xl border border-gray-100 code-block-container'>
            <h3 className='text-sm font-bold text-black-600 uppercase tracking-wider mb-4'>Integration Code</h3>
            <CodeBlock code={`import { mockforme } from 'mockforme';

mockforme().run();`}
            />
          </div>

          <div className='text-base p-4 text-black-600 mt-4 italic bg-[#f0f5f2]'>
            Just add two lines of code to your application, and MockForMe will start intercepting your enabled APIs.

            <img src="https://ik.imagekit.io/mfm/static-collection/android_devtools_widget.png?updatedAt=1766860455244" alt="MockForMe Widget" className="h-12 mx-auto m-4" />
            <div>
              You will see the above widget at bottom right corner of your application once you add the code.
            </div>
          </div>
        </HttpRequestTester>
      </main>
    </div >
  );
}

export default App;
