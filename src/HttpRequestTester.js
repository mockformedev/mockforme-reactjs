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

export function HttpRequestTester() {
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
        headers[key.trim()] = rest.join(":").trim();
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
          params.append(key, value);
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
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">HTTP Request Tester</h2>

      <input
        className="w-full border p-2"
        placeholder="Request URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        >
          <option value="fetch">fetch</option>
          <option value="xhr">XMLHttpRequest</option>
        </select>

        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
          <option value="none">No Body</option>
          <option value="json">JSON</option>
          <option value="form">Form URL Encoded</option>
        </select>
      </div>

      <textarea
        className="w-full border p-2"
        rows={4}
        placeholder="Headers (one per line: Key: Value)"
        value={headersText}
        onChange={(e) => setHeadersText(e.target.value)}
      />

      {bodyType !== "none" && (
        <textarea
          className="w-full border p-2"
          rows={4}
          placeholder={
            bodyType === "json"
              ? '{ "key": "value" }'
              : "key=value (one per line)"
          }
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
        />
      )}

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={executeRequest}
        disabled={loading}
      >
        {loading ? "Executing..." : "Execute"}
      </button>

      {error && <div className="text-red-600">Error: {error}</div>}

      {response && (
        <div className="response">
          <div className="status">
            Status: {response.status}
            {response.isJson && (
              <span className="ml-2 text-green-600 font-medium">
                JSON
              </span>
            )}
          </div>

          <CodeBlock
            language={response.isJson ? "json" : "text"}
            code={response.formattedBody}
          />
        </div>
      )}
    </div>
  );
}