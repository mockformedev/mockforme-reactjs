import React, { useState } from "react";

import './Request.css';
import { CodeBlock } from "./CodeBlock";

function formatJsonIfPossible(text) {
  if (!text || typeof text !== "string") return text;

  try {
    const parsed = JSON.parse(text);
    return {
      isJson: true,
      formattedBody: JSON.stringify(parsed, null, 2)
    }
  } catch (err) {
    console.error("Not json", err);
    return {
      isJson: false,
      formattedBody: text
    }
  }
}

export function HttpRequestTester({ children }) {
  const [url, setUrl] = useState("https://www.google.com/test");
  const [method, setMethod] = useState("GET");
  const [transport, setTransport] = useState("fetch"); // fetch | xhr
  const [bodyType, setBodyType] = useState("none"); // none | json | form
  const [headersText, setHeadersText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseHeaders = () => {
    const headers = {};
    headersText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key) {
          headers[key.trim()] = rest.join(":").trim();
        }
      });
    return headers;
  };

  const buildBody = () => {
    if (method === "GET" || bodyType === "none") return undefined;

    if (bodyType === "json") {
      return bodyText;
    }

    if (bodyType === "form") {
      const params = new URLSearchParams();
      bodyText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((line) => {
          const [key, value] = line.split("=");
          if (key) {
            params.append(key, value);
          }
        });
      return params.toString();
    }
  };

  const executeFetch = async () => {
    const headers = parseHeaders();

    if (bodyType === "json") {
      headers["Content-Type"] = "application/json";
    }
    if (bodyType === "form") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    const res = await fetch(url, {
      method,
      headers,
      body: buildBody(),
    });

    const text = await res.text();
    return { status: res.status, body: text };
  };

  const executeXHR = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      const headers = parseHeaders();
      Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));

      xhr.onload = () => {
        resolve({ status: xhr.status, body: xhr.responseText });
      };
      xhr.onerror = () => reject(new Error("XHR request failed"));

      xhr.send(buildBody());
    });
  };

  const executeRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result =
        transport === "fetch" ? await executeFetch() : await executeXHR();

      const { formattedBody, isJson } = formatJsonIfPossible(result.body);

      setResponse({
        status: result.status,
        rawBody: result.body,
        formattedBody,
        isJson
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6c37]" />
              <h2 className="text-sm font-semibold text-slate-800">Http Request</h2>
            </div>
            <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold uppercase text-slate-500">
              {transport}
            </span>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                className="h-10 min-h-10 rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-[#0c8f47] outline-none focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100 sm:w-28"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                <option>OPTIONS</option>
              </select>
              <input
                className="h-10 min-h-10 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none transition-all focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100"
                placeholder="https://api.example.com/data"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className={`h-10 min-h-10 rounded-md px-5 text-sm font-semibold text-white transition-all sm:w-28 ${loading ? "cursor-not-allowed bg-orange-300" : "bg-[#ff6c37] hover:bg-[#e05320] active:scale-[0.99]"}`}
                onClick={executeRequest}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>

            <div className="mt-4 border-b border-slate-200 pb-2">
              <h3 className="text-sm font-semibold text-slate-800">Request Options</h3>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Transport</label>
                <select
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                >
                  <option value="fetch">fetch</option>
                  <option value="xhr">XHR</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Body Type</label>
                <select
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100"
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  <option value="none">No Body</option>
                  <option value="json">JSON</option>
                  <option value="form">Form</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-500">Headers</label>
              <textarea
                className="h-24 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100"
                placeholder="Key: Value (one per line)"
                value={headersText}
                onChange={(e) => setHeadersText(e.target.value)}
              />
            </div>

            {bodyType !== "none" && (
              <div className="mt-3 space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-500">Body</label>
                <textarea
                  className="h-28 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-[#ff6c37] focus:ring-2 focus:ring-orange-100"
                  placeholder={
                    bodyType === "json"
                      ? '{ "key": "value" }'
                      : "key=value (one per line)"
                  }
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                />
              </div>
            )}

            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>

        {children}
      </div>

      <div className="flex min-h-[480px] flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <div className="flex items-center gap-5 text-sm font-medium">
            <span className="border-b-2 border-[#ff6c37] pb-2 text-[#ff6c37]">Response</span>
            {/* <span className="pb-2 text-slate-500">Console</span> */}
          </div>
          {response && (
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-1 text-xs font-bold ${response.status >= 200 && response.status < 300 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {response.status}
              </span>
              {response.isJson && (
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                  JSON
                </span>
              )}
            </div>
          )}
        </div>

        <div className="custom-scrollbar flex-1 overflow-auto bg-[#1f1f1f] p-3">
          {!response && !loading && (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-slate-400">
              <svg className="h-11 w-11 text-[#ff6c37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm">Send a request to inspect the response</p>
            </div>
          )}

          {loading && (
            <div className="flex h-full items-center justify-center">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[#ff6c37] [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[#ff6c37] [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[#ff6c37]"></div>
              </div>
            </div>
          )}

          {response && (
            <CodeBlock
              language={response.isJson ? "json" : "text"}
              code={response.formattedBody}
            />
          )}
        </div>
      </div>
    </div>
  );
}
