"use client";

// SearchBar.jsx
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Searchbar = ({ searchProducts }: any) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Function to toggle the visibility of the search bar
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    resetTimer();
  };

  // Reset the timer whenever there is activity
  const resetTimer = () => {
    if (timerId) clearTimeout(timerId);
    setTimerId(
      setTimeout(() => {
        if (!isTyping) {
          setIsSearchOpen(false);
        }
      }, 2000) // Close the search bar after 2 seconds of inactivity
    );
  };

  // Close the search bar when the component unmounts
  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  // Event handler for typing activity
  const handleTyping = () => {
    setIsTyping(true);
    resetTimer();
  };

  // Event handler for stopping typing activity
  const handleStopTyping = () => {
    setIsTyping(false);
    resetTimer();
  };

  return (
    <div className="relative">
      {/* Search icon */}
      <motion.button
        onClick={toggleSearch}
        className={`mr-2 text-gray-300 focus:outline-none ${
          isSearchOpen ? "hidden" : ""
        }`}
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: isSearchOpen ? 200 : 0, // Adjust the value according to your design
          opacity: isSearchOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Search className="h-6 w-6 mt-2" stroke="white" />
      </motion.button>

      {/* Search bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4"
          >
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                searchProducts(new FormData(e.currentTarget));
                resetTimer();
              }}
              className="flex items-center border border-zinc-400 gap-2 bg-white px-2 py-1 rounded-lg shadow-md sm:w-fit w-56"
            >
              <Search size="20" />
              <input
                name="searchQuery"
                placeholder="Search"
                className="flex-grow outline-none bg-transparent font-medium px-2 py-1"
                autoFocus={true}
                onInput={handleTyping}
                onBlur={handleStopTyping}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
