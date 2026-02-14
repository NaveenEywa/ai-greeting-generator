import { useState } from "react";

export default function GreetingGenerator() {
  const [recipientName, setRecipientName] = useState("Naveen");
  const [occasion, setOccasion] = useState("Birthday");
  const [tone, setTone] = useState("Friendly");
  const [relationship, setRelationship] = useState("Friend");
  const [length, setLength] = useState("Long");
  const [language, setLanguage] = useState("English");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const occasions = [
    { name: "Birthday", icon: "🎂" },
    { name: "Wedding", icon: "💍" },
    { name: "Graduation", icon: "🎓" },
    { name: "Anniversary", icon: "🎁" },
    { name: "Thank You", icon: "❤️" },
    { name: "Congratulations", icon: "⭐" },
    { name: "Get Well Soon", icon: "💐" },
    { name: "New Job", icon: "💼" },
  ];

  const languages = [
    { code: "English", name: "English", flag: "🇬🇧" },
    { code: "Kannada", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
    { code: "Hindi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
    { code: "Tamil", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "Telugu", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "Malayalam", name: "മലയാളം (Malayalam)", flag: "🇮🇳" },
    { code: "Spanish", name: "Español (Spanish)", flag: "🇪🇸" },
    { code: "French", name: "Français (French)", flag: "🇫🇷" },
    { code: "German", name: "Deutsch (German)", flag: "🇩🇪" },
    { code: "Japanese", name: "日本語 (Japanese)", flag: "🇯🇵" },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    mainWrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "520px 1fr",
      gap: "32px",
      alignItems: "stretch",
    },
    card: {
      background: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "36px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      display: "flex",
      flexDirection: "column",
    },
    resultCard: {
      background: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "36px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      display: "flex",
      flexDirection: "column",
      minHeight: "700px",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "700",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "8px",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      textAlign: "center",
      color: "#64748b",
      marginBottom: "32px",
      fontSize: "14px",
      fontWeight: "500",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#1e293b",
      fontSize: "14px",
      letterSpacing: "-0.01em",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      marginBottom: "24px",
      boxSizing: "border-box",
      color: "#1e293b",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "500",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundColor: "#ffffff",
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
    occasionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px",
      marginBottom: "24px",
    },
    occasionBtn: (isSelected) => ({
      padding: "16px 8px",
      border: `2px solid ${isSelected ? "#667eea" : "#e2e8f0"}`,
      background: isSelected
        ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
        : "#ffffff",
      borderRadius: "12px",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: isSelected ? "600" : "500",
      transition: "all 0.2s ease",
      color: isSelected ? "#667eea" : "#64748b",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
      boxShadow: isSelected ? "0 4px 12px rgba(102, 126, 234, 0.15)" : "none",
    }),
    icon: {
      fontSize: "28px",
      marginBottom: "6px",
      display: "block",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "24px",
    },
    select: {
      width: "100%",
      padding: "14px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      background: "#ffffff",
      cursor: "pointer",
      boxSizing: "border-box",
      color: "#1e293b",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "500",
      appearance: "none",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
      backgroundSize: "18px",
      paddingRight: "40px",
      transition: "all 0.2s ease",
      outline: "none",
    },
    lengthGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      marginBottom: "28px",
    },
    lengthBtn: (isSelected) => ({
      padding: "14px",
      border: `2px solid ${isSelected ? "#667eea" : "#e2e8f0"}`,
      background: isSelected
        ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
        : "#ffffff",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: isSelected ? "600" : "500",
      fontSize: "15px",
      transition: "all 0.2s ease",
      color: isSelected ? "#667eea" : "#64748b",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
      boxShadow: isSelected ? "0 4px 12px rgba(102, 126, 234, 0.15)" : "none",
    }),
    generateBtn: {
      width: "100%",
      padding: "16px",
      background: loading
        ? "#cbd5e1"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      boxShadow: loading ? "none" : "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
      letterSpacing: "0.01em",
    },
    resultTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "20px",
      textAlign: "center",
      letterSpacing: "-0.02em",
    },
    emptyState: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#94a3b8",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "72px",
      marginBottom: "20px",
      opacity: 0.6,
    },
    emptyText: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#64748b",
      marginBottom: "8px",
    },
    loading: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #667eea",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    },
    loadingText: {
      marginTop: "24px",
      color: "#64748b",
      fontSize: "16px",
      fontWeight: "500",
    },
    greetingContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    greetingText: {
      flex: 1,
      lineHeight: "1.8",
      color: "#1e293b",
      whiteSpace: "pre-wrap",
      fontSize: "16px",
      padding: "24px",
      background: "#f8fafc",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      marginBottom: "20px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "400",
    },
    copyBtn: {
      padding: "16px 24px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      transition: "all 0.3s ease",
      width: "100%",
      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
      letterSpacing: "0.01em",
    },
    playBtn: {
      padding: "16px 24px",
      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      transition: "all 0.3s ease",
      width: "100%",
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
      letterSpacing: "0.01em",
      marginBottom: "12px",
    },
    languageBadge: {
      display: "inline-block",
      padding: "6px 16px",
      background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
      borderRadius: "20px",
      fontSize: "13px",
      color: "#667eea",
      fontWeight: "600",
      marginTop: "8px",
      border: "1px solid #667eea30",
    },
  };

  const generateGreeting = async () => {
    if (!recipientName.trim()) {
      alert("Please enter a recipient name");
      return;
    }

    setLoading(true);
    setShowResult(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-greeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientName,
            occasion,
            tone,
            relationship,
            length,
            language,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate greeting");
      }

      const data = await response.json();
      setGreeting(data.greeting);
      setShowResult(true);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to generate greeting. Make sure the server is running on port 5000!",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(greeting);
    alert("Copied to clipboard!");
  };

  const playAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(greeting);

    // Set language based on selected language
    const languageCodes = {
      English: "en-US",
      Kannada: "kn-IN",
      Hindi: "hi-IN",
      Tamil: "ta-IN",
      Telugu: "te-IN",
      Malayalam: "ml-IN",
      Spanish: "es-ES",
      French: "fr-FR",
      German: "de-DE",
      Japanese: "ja-JP",
    };

    utterance.lang = languageCodes[language] || "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          input:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          }
          
          select:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          }
          
          button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px -5px rgba(102, 126, 234, 0.35);
          }
          
          @media (max-width: 1200px) {
            .main-wrapper {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "800",
          textAlign: "center",
          color: "#ffffff",
          marginBottom: "16px",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          letterSpacing: "-0.03em",
        }}
      >
        ✨ AI Greeting Generator
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: "18px",
          marginBottom: "48px",
          fontWeight: "500",
        }}
      >
        Create personalized greetings powered by AI
      </p>

      <div style={styles.mainWrapper} className="main-wrapper">
        {/* Left Side - Form */}
        <div style={styles.card}>
          <h2 style={styles.title}>Create Your Greeting</h2>
          <p style={styles.subtitle}>Fill in the details below</p>

          <div>
            <label style={styles.label}>Recipient Name *</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              style={styles.input}
              placeholder="Enter recipient's name..."
            />
          </div>

          <div>
            <label style={styles.label}>Language 🌍</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ ...styles.select, marginBottom: "24px" }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Occasion</label>
            <div style={styles.occasionGrid}>
              {occasions.map((occ) => (
                <button
                  key={occ.name}
                  onClick={() => setOccasion(occ.name)}
                  style={styles.occasionBtn(occasion === occ.name)}
                >
                  <span style={styles.icon}>{occ.icon}</span>
                  <div>{occ.name.split(" ")[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.row}>
            <div>
              <label style={styles.label}>Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={styles.select}
              >
                <option value="Friendly">Friendly</option>
                <option value="Formal">Formal</option>
                <option value="Funny">Funny</option>
                <option value="Heartfelt">Heartfelt</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                style={styles.select}
              >
                <option value="Friend">Friend</option>
                <option value="Family">Family</option>
                <option value="Colleague">Colleague</option>
                <option value="Partner">Partner</option>
                <option value="Boss">Boss</option>
                <option value="Acquaintance">Acquaintance</option>
              </select>
            </div>
          </div>

          <div>
            <label style={styles.label}>Length</label>
            <div style={styles.lengthGrid}>
              {["Short", "Medium", "Long"].map((len) => (
                <button
                  key={len}
                  onClick={() => setLength(len)}
                  style={styles.lengthBtn(length === len)}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateGreeting}
            disabled={loading}
            style={styles.generateBtn}
          >
            {loading ? "Generating..." : "✨ Generate Greeting"}
          </button>
        </div>

        {/* Right Side - Result */}
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>Your Personalized Greeting</h2>

          {language !== "English" && (
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={styles.languageBadge}>
                {languages.find((l) => l.code === language)?.flag} Generated in{" "}
                {language}
              </span>
            </div>
          )}

          {!showResult && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>✉️</div>
              <p style={styles.emptyText}>Your greeting will appear here</p>
              <p
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                  color: "#94a3b8",
                  fontWeight: "400",
                }}
              >
                Fill in the form and click "Generate Greeting"
              </p>
            </div>
          )}

          {loading && (
            <div style={styles.loading}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>
                Crafting your perfect greeting...
              </p>
            </div>
          )}

          {showResult && (
            <div style={styles.greetingContainer}>
              <div style={styles.greetingText}>{greeting}</div>
              <button onClick={playAudio} style={styles.playBtn}>
                {isPlaying ? "⏸️ Stop Audio" : "🔊 Play Audio"}
              </button>
              <button onClick={copyToClipboard} style={styles.copyBtn}>
                📋 Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
