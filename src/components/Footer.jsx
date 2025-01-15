import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
    marginTop: "auto",
  };

  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Price Tag Pro™. All rights reserved.
      </p>
    </footer>
  );
}
