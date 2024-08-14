import React from "react";

const Footer = () => {
  const year = new Date();
  return (
    <footer className="footer">
      <p>&copy; Copyright {year.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
