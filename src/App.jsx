import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/Card";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("/api/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Quotes:", data); // 👈 Check this in dev console
        setQuotes(data.slice(0, 10));
      })
      .catch((err) => {
        console.error("Failed to fetch quotes:", err);
        setQuotes([]);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const speakQuote = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const addToFavorites = (quote) => {
    if (!favorites.some((q) => q.q === quote.q)) {
      setFavorites([...favorites, quote]);
    }
  };

  const removeFavorite = (quoteText) => {
    setFavorites(favorites.filter((q) => q.q !== quoteText));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">QuoteHub</h1>

      {quotes.map((quote, idx) => (
        <Card key={idx} className="mb-4">
          <CardContent>
            <h3 className="text-indigo-600 font-semibold mb-2">Motivational Quote</h3>
            <p className="italic text-lg text-gray-800">
              {quote.q ? `"${quote.q}"` : "Quote not available"}
            </p>
            <p className="text-right mt-2 text-sm text-gray-600">— {quote.a || "Unknown"}</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => speakQuote(quote.q)}>Speak 🔊</Button>
              <Button onClick={() => addToFavorites(quote)}>❤️ Favorite</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((quote, idx) => (
          <Card key={idx} className="mb-4 w-full max-w-md mx-auto">

            <CardContent>
              <h3 className="text-indigo-600 font-semibold mb-2">Motivational Quote</h3>
              <p className="italic text-lg text-gray-800">"{quote.q}"</p>
              <p className="text-right text-sm text-gray-600">— {quote.a}</p>
              <Button className="mt-2" onClick={() => removeFavorite(quote.q)}>
                ❌ Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default App;
