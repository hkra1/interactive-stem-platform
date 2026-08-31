"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function IntroPythonPage() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string>("Loading Pyodide...");
  const [code, setCode] = useState(
    `# Welcome to Interactive STEM Python\nimport sys\nprint("Python", sys.version)\n\n# Try some math\nprint(2 + 2)\n\n# Lists and loops\nfor i in range(3):\n    print("Hello STEM", i)\n`
  );
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    async function init() {
      try {
        // Official Pyodide CDN (version pinned per docs recommendation)
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.onload = async () => {
          const py = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
          });
          setPyodide(py);
          setOutput("Pyodide ready! Click Run to execute code.");
        };
        document.head.appendChild(script);
      } catch (err) {
        setOutput("Failed to load Pyodide: " + String(err));
      }
    }
    init();
  }, []);

  async function runCode() {
    if (!pyodide) return;
    setOutput("Running...\n");
    try {
      // Capture stdout
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);
      await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout || "(no output)");
    } catch (err: any) {
      setOutput("Error:\n" + (err.message || String(err)));
    }
  }

  return (
    <div className="container px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold">Introduction to Python for STEM</h1>
      <p className="mt-2 text-muted-foreground">
        This lesson runs completely in your browser using{" "}
        <a
          href="https://pyodide.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Pyodide
        </a>{" "}
        (official WebAssembly Python). No backend required for code execution.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium">Code Editor</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 w-full h-64 font-mono text-sm p-4 border rounded-md bg-muted/30"
            spellCheck={false}
          />
        </div>

        <button
          onClick={runCode}
          disabled={!pyodide}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {pyodide ? "Run Code" : "Loading Pyodide..."}
        </button>

        <div>
          <label className="text-sm font-medium">Output</label>
          <pre
            ref={outputRef}
            className="mt-1 w-full min-h-32 p-4 border rounded-md bg-black text-green-400 font-mono text-sm overflow-auto"
          >
            {output}
          </pre>
        </div>
      </div>

      <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">
        <h2>What you just did</h2>
        <p>
          The code executed inside a full CPython interpreter compiled to WebAssembly.
          You can later load scientific packages (NumPy, Matplotlib, etc.) with micropip
          following the official Pyodide documentation.
        </p>
        <h3>Next steps in this module</h3>
        <ul>
          <li>Variables and data types</li>
          <li>Control flow</li>
          <li>Functions</li>
          <li>Introduction to NumPy arrays</li>
          <li>Simple plotting</li>
        </ul>
      </div>
    </div>
  );
}
