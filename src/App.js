import './App.css';
import { HttpRequestTester } from './HttpRequestTester';

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { CodeBlock } from './CodeBlock';

const frameworkItems = [
  { label: 'React', icon: 'react', color: 'text-sky-500', bg: 'bg-sky-50' },
  { label: 'Next.js', icon: 'next', color: 'text-slate-900', bg: 'bg-slate-100' },
  { label: 'Angular', icon: 'angular', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Vue', icon: 'vue', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Vanilla JS', icon: 'javascript', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Other JS', icon: 'framework', color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

const channelItems = [
  {
    label: 'Chrome Extension',
    icon: 'chrome',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    href: 'https://chromewebstore.google.com/detail/mockforme/jjacifoecglgcnngpjhkckcofiliddei',
  },
  {
    label: 'NPM Package',
    icon: 'npm',
    color: 'text-red-600',
    bg: 'bg-red-50',
    href: 'https://www.npmjs.com/package/mockforme',
  },
  {
    label: 'Android Library',
    icon: 'android',
    color: 'text-green-600',
    bg: 'bg-green-50',
    href: 'https://central.sonatype.com/artifact/com.mockforme/mockforme-android',
  },
  {
    label: 'iOS Library',
    icon: 'ios',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    href: 'https://github.com/mockformedev/mockforme-ios',
  },
];

function IntegrationIcon({ type }) {
  switch (type) {
    case 'react':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="2.4" fill="currentColor" />
          <ellipse cx="16" cy="16" rx="12" ry="4.8" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="16" cy="16" rx="12" ry="4.8" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="4.8" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 16 16)" />
        </svg>
      );
    case 'next':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="12" fill="currentColor" />
          <path d="M10 22V10h2.7l8 12h-2.9l-5.3-8v8H10Z" fill="white" />
          <path d="M21 10h2v12h-2V10Z" fill="white" />
        </svg>
      );
    case 'angular':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M16 3 5 7l1.7 14.5L16 29l9.3-7.5L27 7 16 3Z" fill="currentColor" />
          <path d="M16 8 9.8 22h2.6l1.2-3h4.8l1.2 3h2.6L16 8Zm-1.5 8.8L16 13l1.5 3.8h-3Z" fill="white" />
        </svg>
      );
    case 'vue':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M3 6h6l7 12 7-12h6L16 28 3 6Z" fill="currentColor" />
          <path d="M9 6h4l3 5 3-5h4l-7 12L9 6Z" fill="white" opacity="0.9" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="22" height="22" rx="3" fill="currentColor" />
          <path d="M12 21.5c.6 1 1.3 1.5 2.3 1.5 1.1 0 1.7-.6 1.7-2V12h2.5v9.2c0 2.6-1.5 4-4 4-2 0-3.4-.8-4.3-2.5l1.8-1.2Zm8.1.1c.8 1.1 1.8 1.6 3.1 1.6 1.1 0 1.8-.5 1.8-1.2 0-.9-.7-1.2-2.1-1.8l-.8-.3c-2.1-.9-3.4-2-3.4-4.2 0-2.1 1.6-3.7 4.1-3.7 1.8 0 3.1.6 4 2.2l-1.9 1.2c-.5-.8-1.1-1.2-2.1-1.2s-1.5.6-1.5 1.2c0 .8.5 1.1 1.8 1.7l.8.3c2.4 1 3.8 2.1 3.8 4.4 0 2.5-2 3.9-4.6 3.9-2.6 0-4.2-1.2-5-2.8l2-1.3Z" fill="#1f2937" />
        </svg>
      );
    case 'framework':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="m12 10-6 6 6 6M20 10l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m18 8-4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'chrome':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="12" fill="currentColor" />
          <circle cx="16" cy="16" r="5" fill="white" />
          <path d="M16 4a12 12 0 0 1 10.4 6H16a6 6 0 0 0-5.2 3L7.7 7.6A11.9 11.9 0 0 1 16 4Z" fill="#ea4335" />
          <path d="M26.4 10A12 12 0 0 1 16 28l5.2-9A6 6 0 0 0 22 16c0-1.1-.3-2.1-.8-3h5.2Z" fill="#fbbc05" />
          <path d="M16 28A12 12 0 0 1 7.7 7.6L12.8 16a6 6 0 0 0 8.4 3L16 28Z" fill="#34a853" />
          <circle cx="16" cy="16" r="3.2" fill="#4285f4" />
        </svg>
      );
    case 'npm':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4" y="9" width="24" height="14" rx="2" fill="currentColor" />
          <path d="M8 20v-8h16v8h-3v-5h-2v5h-3v-5h-2v5H8Z" fill="white" />
        </svg>
      );
    case 'android':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M10 13h12v10a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V13Z" fill="currentColor" />
          <path d="M9 12a7 7 0 0 1 14 0H9Z" fill="currentColor" />
          <path d="m11 7-2-3M21 7l2-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="13.5" cy="10.5" r="1" fill="white" />
          <circle cx="18.5" cy="10.5" r="1" fill="white" />
          <path d="M7 14v7M25 14v7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'ios':
      return (
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M20.4 6.2c-1.1.7-2 1.9-1.8 3.2 1.2.1 2.5-.7 3.2-1.6.8-1 1.2-2.2 1-3.4-.9.1-1.8.7-2.4 1.8Z" fill="currentColor" />
          <path d="M23.8 21.2c-.6 1.4-.9 2-1.8 3.2-1.2 1.7-2.8 3.8-4.9 3.8-1.8 0-2.2-1.2-4.6-1.2s-2.9 1.2-4.6 1.2c-2 0-3.6-1.9-4.8-3.6-3.3-4.8-3.7-10.4-1.6-13.4 1.4-2 3.7-3.2 5.8-3.2 2.2 0 3.6 1.2 5.4 1.2 1.7 0 2.8-1.2 5.3-1.2 1.9 0 3.9 1 5.3 2.8-4.7 2.6-3.9 9.2.5 10.4Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function SupportChip({ item }) {
  const chipContent = (
    <>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.bg} ${item.color}`}>
        <IntegrationIcon type={item.icon} />
      </span>
      <span className="text-sm font-semibold text-slate-700">{item.label}</span>
      {item.href && (
        <svg className="ml-auto h-3.5 w-3.5 text-slate-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 5h8v8M15 5 6 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  const className = "flex min-h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors";

  if (item.href) {
    return (
      <a
        className={`${className} hover:border-orange-200 hover:bg-orange-50/50`}
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        {chipContent}
      </a>
    );
  }

  return (
    <div className={className}>
      {chipContent}
    </div>
  );
}

function WorksWithSection() {
  return (
    <div className="mt-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase text-slate-600">Works with</h3>
        <span className="rounded bg-orange-50 px-2 py-1 text-[11px] font-semibold text-[#c94918]">
          Cross-platform
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">JavaScript frameworks</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {frameworkItems.map((item) => (
              <SupportChip key={item.label} item={item} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Available as</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {channelItems.map((item) => (
              <SupportChip key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

          <WorksWithSection />
        </HttpRequestTester>
      </main>
    </div >
  );
}

export default App;
