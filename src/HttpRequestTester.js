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
  const [url, setUrl] = useState("");
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto p-4">
      {/* Left Side: Form */}
      <div className="space-y-6">
        {children}

        <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">HTTP Request Tester</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Request URL</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="https://api.example.com/data"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Method</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Transport</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
              >
                <option value="fetch">fetch</option>
                <option value="xhr">XHR</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Body Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="none">No Body</option>
                <option value="json">JSON</option>
                <option value="form">Form</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Headers</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 font-mono text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Key: Value (one per line)"
              value={headersText}
              onChange={(e) => setHeadersText(e.target.value)}
            />
          </div>

          {bodyType !== "none" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Body</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 font-mono text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none"
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

          <button
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
            onClick={executeRequest}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executing...
              </span>
            ) : "Execute Request"}
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Response */}
      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden flex flex-col min-h-[500px]">
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <span className="text-gray-300 font-medium text-sm">Response</span>
          {response && (
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${response.status >= 200 && response.status < 300 ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}`}>
                Status: {response.status}
              </span>
              {response.isJson && (
                <span className="bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">
                  JSON
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          {!response && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
              <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p>Execute a request to see the response</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
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