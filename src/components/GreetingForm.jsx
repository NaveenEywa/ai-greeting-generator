import React, { useState } from "react";
import { Sparkles, Copy, Check, Loader2, RefreshCw, Heart } from "lucide-react";

export default function GreetingGenerator() {
  const [occasion, setOccasion] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [tone, setTone] = useState("friendly");
  const [relationship, setRelationship] = useState("friend");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateGreeting = async () => {
    if (!occasion.trim()) {
      setError("Please enter an occasion");
      return;
    }

    setLoading(true);
    setError("");
    setGreeting("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a ${tone} greeting message for ${
                recipientName.trim() || "someone"
              } for the occasion: ${occasion}. The relationship is: ${relationship}. Make it heartfelt and personalized. Just provide the greeting text, no additional explanation.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.content && data.content[0] && data.content[0].text) {
        setGreeting(data.content[0].text);
      } else {
        setError("Failed to generate greeting. Please try again.");
      }
    } catch (err) {
      setError(
        "An error occurred. Please check your connection and try again.",
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      generateGreeting();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h1 className="text-4xl font-bold text-white">
              Greeting Generator
            </h1>
          </div>
          <p className="text-xl text-white/90 font-medium">Powered by AI ✨</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="space-y-6">
            {/* Occasion Input */}
            <div>
              <label className="flex items-center gap-2 text-base font-bold text-gray-800 mb-3">
                <Heart className="w-5 h-5 text-rose-500" />
                Occasion *
              </label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Birthday, Wedding, Anniversary..."
                className="w-full px-5 py-4 bg-gray-50 border-3 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition text-lg"
              />
            </div>

            {/* Recipient Name Input */}
            <div>
              <label className="block text-base font-bold text-gray-800 mb-3">
                Recipient Name (Optional)
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Sarah, John, Mom..."
                className="w-full px-5 py-4 bg-gray-50 border-3 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition text-lg"
              />
            </div>

            {/* Tone and Relationship Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-bold text-gray-800 mb-3">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-3 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition text-lg font-semibold text-gray-800 cursor-pointer"
                >
                  <option value="friendly">😊 Friendly</option>
                  <option value="formal">🎩 Formal</option>
                  <option value="humorous">😄 Humorous</option>
                  <option value="heartfelt">💝 Heartfelt</option>
                  <option value="professional">💼 Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-3">
                  Relationship
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-5 py-4 bg-gradient-to-r from-pink-50 to-rose-50 border-3 border-pink-200 rounded-2xl focus:border-pink-500 focus:outline-none transition text-lg font-semibold text-gray-800 cursor-pointer"
                >
                  <option value="friend">👥 Friend</option>
                  <option value="family">👨‍👩‍👧‍👦 Family</option>
                  <option value="colleague">💻 Colleague</option>
                  <option value="partner">💑 Partner</option>
                  <option value="acquaintance">🤝 Acquaintance</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-2xl font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateGreeting}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-lg py-5 px-8 rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Generate Greeting
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Card */}
        {greeting && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Perfect Greeting ✨
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={generateGreeting}
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                  title="Generate a new variation"
                >
                  <RefreshCw className="w-5 h-5" />
                  Regenerate
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all shadow-lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 rounded-2xl p-8 border-4 border-purple-200 shadow-inner">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {greeting}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">Made with ❤️ using Claude AI</p>
        </div>
      </div>
    </div>
  );
}
