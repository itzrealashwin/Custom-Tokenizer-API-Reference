"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Play,
  Code2,
  BookOpen,
  Settings,
  Terminal,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ApiReferencePage() {
  const [encodeInput, setEncodeInput] = useState(
    "Hello, world! This is a sample text for tokenization."
  );
  const [encodeOutput, setEncodeOutput] = useState<number[] | null>(null);
  const [encodeLoading, setEncodeLoading] = useState(false);

  const [decodeInput, setDecodeInput] = useState(
    "[72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]"
  );
  const [decodeOutput, setDecodeOutput] = useState<string | null>(null);
  const [decodeLoading, setDecodeLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  const handleEncode = async () => {
    setEncodeLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/encode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: encodeInput }),
      });
      const data = await response.json();
      console.log(data);

      setEncodeOutput(data.tokens);
    } catch (error) {
      toast("Failed to Encode Text");
      console.log(error);
      
    } finally {
      setEncodeLoading(false);
    }
  };

  const handleDecode = async () => {
    setDecodeLoading(true);
    try {
      const tokens = JSON.parse(decodeInput);
      const response = await fetch(`${backendUrl}/api/decode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens }),
      });
      const data = await response.json();
      setDecodeOutput(data.text);
    } catch (error) {
      toast("Failed to decode tokens. Please check your input format.");
      console.log(error);
      
    } finally {
      setDecodeLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Code2 className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Custom JS Tokenizer
                </h1>
                <p className="text-sm text-neutral-400 hidden sm:block">
                  API Documentation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-400 border-blue-500/20 hidden sm:inline-flex"
              >
                v1.0.0
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside
          className={`
          fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] 
          bg-neutral-900/95 backdrop-blur-sm border-r border-neutral-800 
          transform transition-transform duration-200 ease-in-out
          ${
            sidebarOpen
              ? "tranneutral-x-0"
              : "-tranneutral-x-full lg:tranneutral-x-0"
          }
        `}
        >
          <nav className="p-4 space-y-1 overflow-y-auto h-full">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Getting Started
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => scrollToSection("overview")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("installation")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Installation
                  </button>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                API Reference
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => scrollToSection("encode-endpoint")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <Terminal className="h-4 w-4" />
                    POST /api/encode
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("decode-endpoint")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <Terminal className="h-4 w-4" />
                    POST /api/decode
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Tools
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => scrollToSection("playground")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    API Playground
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview Section */}
          <section id="overview" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">
                Custom JS Tokenizer
              </h1>
            </div>
            <p className="text-lg text-neutral-300 leading-relaxed mb-6">
              A simple and efficient API service built with Node.js and Express
              that provides endpoints for tokenizing and detokenizing text.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Base URL
              </h3>
              <code className="text-blue-400 bg-neutral-950 px-3 py-2 rounded border border-neutral-700">
                http://localhost:3000
              </code>
            </div>
          </section>

          {/* Installation Section */}
          <section id="installation" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Installation</h2>
            </div>
            <div className="space-y-4">
              <p className="text-neutral-300">
                To get started, you&apos;ll need to have Node.js installed on your
                machine.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">
                    1. Clone the repository:
                  </h4>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                      <span className="text-xs text-neutral-400">bash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            "git clone https://github.com/itzrealashwin/Custom-Tokenizer.git"
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-neutral-300">
                      git clone
                      https://github.com/itzrealashwin/Custom-Tokenizer.git
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">
                    2. Navigate to the project directory:
                  </h4>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                      <span className="text-xs text-neutral-400">bash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("cd Custom-Tokenizer")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-neutral-300">
                      cd Custom-Tokenizer
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">
                    3. Install the dependencies:
                  </h4>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                      <span className="text-xs text-neutral-400">bash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("npm install")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-neutral-300">
                      npm install
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">
                    4. Start the server:
                  </h4>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                      <span className="text-xs text-neutral-400">bash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("npm start")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-neutral-300">
                      npm start
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> Once the server is running, you will
                  see the message: &quot;Server running on port 3000&quot;.
                </p>
              </div>
            </div>
          </section>

          {/* API Reference Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">API Reference</h2>
            </div>
            <p className="text-neutral-300 mb-8">
              The API provides two main endpoints for encoding and decoding
              text.
            </p>

            {/* Encode Endpoint */}
            <div id="encode-endpoint" className="mb-12">
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader className="border-b border-neutral-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-mono">
                      POST
                    </Badge>
                    <code className="text-xl font-mono text-white">
                      /api/encode
                    </code>
                  </div>
                  <CardDescription className="text-neutral-400 text-base">
                    This endpoint converts a string of text into a sequence of
                    numerical tokens.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Body Parameters
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-700">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Parameter
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Type
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-neutral-800">
                              <td className="py-3 px-4 font-mono text-blue-400">
                                text
                              </td>
                              <td className="py-3 px-4 text-neutral-300">
                                string
                              </td>
                              <td className="py-3 px-4 text-neutral-300">
                                Required. The input text to tokenize.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Example Request */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Example Request
                      </h4>
                      <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-400">JSON</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                '{\n    "text": "Example Request"\n}'
                              )
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="p-4 text-sm text-neutral-300">
                          {`{
    "text": "Example Request"
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Example Response */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Example Response
                      </h4>
                      <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-400">JSON</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                '{\n    "tokens": [\n        31, 24, 1, 13, 16, 12, 5, 98, 44, 5, 17, 21, 5, 19, 20\n    ]\n}'
                              )
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="p-4 text-sm text-green-400">
                          {`{
    "tokens": [
        31, 24, 1, 13, 16, 12, 5, 98, 44, 5, 17, 21, 5, 19, 20
    ]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decode Endpoint */}
            <div id="decode-endpoint" className="mb-12">
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader className="border-b border-neutral-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-mono">
                      POST
                    </Badge>
                    <code className="text-xl font-mono text-white">
                      /api/decode
                    </code>
                  </div>
                  <CardDescription className="text-neutral-400 text-base">
                    This endpoint converts a sequence of numerical tokens back
                    into a string of text.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Body Parameters
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-700">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Parameter
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Type
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-200">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-neutral-800">
                              <td className="py-3 px-4 font-mono text-blue-400">
                                tokens
                              </td>
                              <td className="py-3 px-4 text-neutral-300">
                                array
                              </td>
                              <td className="py-3 px-4 text-neutral-300">
                                Required. An array of integer tokens.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Example Request */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Example Request
                      </h4>
                      <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-400">JSON</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                '{\n    "tokens": [\n        31, 24, 1, 13, 16, 12, 5, 98, 44, 5, 17, 21, 5, 19, 20\n    ]\n}'
                              )
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="p-4 text-sm text-neutral-300">
                          {`{
    "tokens": [
        31, 24, 1, 13, 16, 12, 5, 98, 44, 5, 17, 21, 5, 19, 20
    ]
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Example Response */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Example Response
                      </h4>
                      <div className="bg-neutral-950 border border-neutral-800 rounded-lg">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-400">JSON</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                '{\n    "text": "Example Request"\n}'
                              )
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="p-4 text-sm text-green-400">
                          {`{
    "text": "Example Request"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Interactive Playground */}
          <section id="playground">
            <div className="flex items-center gap-3 mb-8">
              <Play className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">API Playground</h2>
            </div>
            <p className="text-neutral-300 mb-6">
              Test the API endpoints directly from your browser.
            </p>

            <Tabs defaultValue="encode" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-neutral-900 border border-neutral-800">
                <TabsTrigger
                  value="encode"
                  className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500"
                >
                  Text → Tokens
                </TabsTrigger>
                <TabsTrigger
                  value="decode"
                  className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500"
                >
                  Tokens → Text
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4">
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Encode Text to Tokens
                    </CardTitle>
                    <CardDescription>
                      Enter text to convert it into numerical tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-200 mb-2 block">
                        Input Text
                      </label>
                      <Textarea
                        value={encodeInput}
                        onChange={(e) => setEncodeInput(e.target.value)}
                        placeholder="Enter text to tokenize..."
                        className="bg-neutral-950 border-neutral-700 text-neutral-100 min-h-[100px] focus:border-blue-500"
                      />
                    </div>

                    <Button
                      onClick={handleEncode}
                      disabled={encodeLoading || !encodeInput.trim()}
                      className="bg-white hover:bg-neutral-200 text-black"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {encodeLoading ? "Encoding..." : "Encode"}
                    </Button>

                    {encodeOutput && (
                      <div>
                        <div className="flex items-start  gap-3">
                          <label className="text-sm font-medium text-neutral-200 mb-2 block">
                            Output Tokens
                          </label>
                          <span>
                            <Copy
                              onClick={() =>
                                copyToClipboard(JSON.stringify(encodeOutput))
                              }
                              size={16}
                              color="white"
                            />
                            </span>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                          <pre className="text-sm text-green-400 whitespace-pre-wrap break-all">
                            {JSON.stringify(encodeOutput)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="decode" className="space-y-4">
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Decode Tokens to Text
                    </CardTitle>
                    <CardDescription>
                      Enter a JSON array of tokens to convert back to text
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-200 mb-2 block">
                        Input Tokens (JSON Array)
                      </label>
                      <Textarea
                        value={decodeInput}
                        onChange={(e) => setDecodeInput(e.target.value)}
                        placeholder="[31, 24, 1, 13, 16, 12, 5, 98, 44, 5, 17, 21, 5, 19, 20]"
                        className="bg-neutral-950 border-neutral-700 text-neutral-100 min-h-[100px] font-mono focus:border-blue-500"
                      />
                    </div>

                    <Button
                      onClick={handleDecode}
                      disabled={decodeLoading || !decodeInput.trim()}
                      className="bg-white hover:bg-neutral-200 text-black"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {decodeLoading ? "Decoding..." : "Decode"}
                    </Button>

                    {decodeOutput && (
                      <div>
                        <label className="text-sm font-medium text-neutral-200 mb-2 block">
                          Output Text
                        </label>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                          <pre className="text-sm text-green-400 whitespace-pre-wrap">
                            {decodeOutput}
                          </pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
