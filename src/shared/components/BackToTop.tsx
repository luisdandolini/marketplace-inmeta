import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;

    const handleScroll = () => setVisible(scrollContainer.scrollTop > 300);
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="cursor-pointer fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110"
    >
      <ArrowUp size={18} />
    </button>
  );
};
