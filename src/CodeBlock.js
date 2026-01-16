import { useEffect, useRef } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

export function CodeBlock({ code, language = "javascript" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code]);

  return (
    <pre className="rounded-md bg-[#1e1e1e] p-3 overflow-auto text-sm">
      <code
        ref={ref}
        className={`language-${language}`}
      >
        {code}
      </code>
    </pre>
  );
}
