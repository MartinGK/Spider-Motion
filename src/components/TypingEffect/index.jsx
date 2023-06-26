import { useState, useEffect } from "react";

const TypingEffect = ({ text }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 25); // Ajusta la velocidad de tipeo según tus necesidades

    return () => clearTimeout(typingTimer);
  }, [currentIndex, text]);

  return <span>{typedText}</span>;
};

export default TypingEffect;
