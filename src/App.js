import './App.css';
import { HttpRequestTester } from './HttpRequestTester';

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { CodeBlock } from './CodeBlock';

function App() {
  return (
    <div className='min-h-screen bg-[#f6f6f6] pb-8 text-slate-900'>
      <header className='header w-full border-b border-slate-200 bg-white px-4 py-2 shadow-sm'>
        <div className='header-section mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 md:flex-row'>
          <div className='flex items-center gap-3'>
            <img src="https://www.mockforme.com/assets/images/logo.png" alt="MockForMe Logo" className="logo" />
            <span className='hidden h-6 w-px bg-slate-200 md:block' />
            <h3 className='text-center text-sm font-semibold leading-snug text-slate-700 md:text-left'>
              Integrate <span className='text-[#ff6c37]'>mockforme</span> in your application with just two lines of code
            </h3>
          </div>
          <div className='hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 md:flex'>
            Mock API Playground
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-3 py-4 sm:px-4'>
        <HttpRequestTester>
          <div className='code-block-container rounded-md border border-slate-200 bg-white p-4'>
            <div className='mb-3 flex items-center justify-between border-b border-slate-100 pb-2'>
              <h3 className='text-xs font-bold uppercase text-slate-600'>Integration Code NPM</h3>
              <span className='rounded bg-orange-50 px-2 py-1 text-[11px] font-semibold text-[#c94918]'>2 lines</span>
            </div>
            <CodeBlock code={`import { mockforme } from 'mockforme';

mockforme().run();`}
            />
          </div>

          <div className='mt-3 rounded-md border border-orange-100 bg-orange-50/70 p-4 text-sm leading-6 text-slate-700'>
            <p>
              Just add two lines of code to your application, and MockForMe will start intercepting your enabled APIs.
            </p>
            <div className='mt-3 flex items-center gap-3'>
              <img src="https://ik.imagekit.io/mfm/static-collection/android_devtools_widget.png?updatedAt=1766860455244" alt="MockForMe Widget" className="h-10 shrink-0" />
              <p>
              You will see the above widget at bottom right corner of your application once you add the code.
              </p>
            </div>
          </div>
        </HttpRequestTester>
      </main>
    </div >
  );
}

export default App;
