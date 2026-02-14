import { useState } from "react";

export default function GreetingGenerator() {
  const [recipientName, setRecipientName] = useState("Naveen");
  const [occasion, setOccasion] = useState("Birthday");
  const [tone, setTone] = useState("Friendly");
  const [relationship, setRelationship] = useState("Friend");
  const [length, setLength] = useState("Long");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

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

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    mainWrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "550px 1fr",
      gap: "24px",
      alignItems: "start",
    },
    card: {
      background: "white",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      height: "fit-content",
    },
    resultCard: {
      background: "white",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      minHeight: "600px",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#7c3aed",
      marginBottom: "8px",
    },
    subtitle: {
      textAlign: "center",
      color: "#666",
      marginBottom: "24px",
      fontSize: "14px",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#333",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "15px",
      marginBottom: "20px",
      boxSizing: "border-box",
    },
    occasionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px",
      marginBottom: "20px",
    },
    occasionBtn: (isSelected) => ({
      padding: "12px 6px",
      border: `2px solid ${isSelected ? "#7c3aed" : "#e5e7eb"}`,
      background: isSelected ? "#f5f3ff" : "white",
      borderRadius: "8px",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "12px",
      fontWeight: isSelected ? "600" : "normal",
      transition: "all 0.2s",
    }),
    icon: {
      fontSize: "24px",
      marginBottom: "4px",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "20px",
    },
    select: {
      width: "100%",
      padding: "10px 14px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "15px",
      background: "white",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    lengthGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      marginBottom: "20px",
    },
    lengthBtn: (isSelected) => ({
      padding: "12px",
      border: `2px solid ${isSelected ? "#7c3aed" : "#e5e7eb"}`,
      background: isSelected ? "#f5f3ff" : "white",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: isSelected ? "600" : "normal",
      fontSize: "15px",
      transition: "all 0.2s",
    }),
    generateBtn: {
      width: "100%",
      padding: "14px",
      background: loading ? "#ccc" : "#7c3aed",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.3s",
    },
    resultTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#7c3aed",
      marginBottom: "20px",
      textAlign: "center",
    },
    emptyState: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "16px",
      opacity: 0.5,
    },
    emptyText: {
      fontSize: "18px",
      fontWeight: "500",
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
      border: "5px solid #f3f4f6",
      borderTop: "5px solid #7c3aed",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    loadingText: {
      marginTop: "20px",
      color: "#666",
      fontSize: "16px",
    },
    greetingContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    greetingText: {
      flex: 1,
      lineHeight: "1.8",
      color: "#333",
      whiteSpace: "pre-wrap",
      fontSize: "16px",
      padding: "20px",
      background: "#f9fafb",
      borderRadius: "10px",
      border: "2px solid #e5e7eb",
      marginBottom: "20px",
    },
    copyBtn: {
      padding: "14px 24px",
      background: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      transition: "background 0.3s",
      width: "100%",
    },
    mobileNote: {
      display: "none",
      textAlign: "center",
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      marginBottom: "20px",
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

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (max-width: 1200px) {
            .main-wrapper {
              grid-template-columns: 1fr !important;
            }
            .mobile-note {
              display: block !important;
            }
          }
        `}
      </style>

      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✨ AI Greeting Generator ✨
      </h1>

      <div style={styles.mainWrapper} className="main-wrapper">
        {/* Left Side - Form */}
        <div style={styles.card}>
          <h2 style={{ ...styles.title, fontSize: "1.5rem" }}>
            Create Your Greeting
          </h2>
          <p style={styles.subtitle}>Fill in the details below</p>

          <div>
            <label style={styles.label}>Recipient Name *</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              style={styles.input}
              placeholder="Enter name..."
            />
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
                  <div style={styles.icon}>{occ.icon}</div>
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
                <option>Friendly</option>
                <option>Formal</option>
                <option>Funny</option>
                <option>Heartfelt</option>
                <option>Professional</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                style={styles.select}
              >
                <option>Friend</option>
                <option>Family</option>
                <option>Colleague</option>
                <option>Partner</option>
                <option>Boss</option>
                <option>Acquaintance</option>
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
            {loading ? "Generating..." : "Generate Greeting"}
          </button>
        </div>

        {/* Right Side - Result */}
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>Your Personalized Greeting</h2>

          {!showResult && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>✉️</div>
              <p style={styles.emptyText}>Your greeting will appear here</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
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
