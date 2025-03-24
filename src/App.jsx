import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  const searchLyrics = async () => {
    if (artist === "" || song === "") return;
    setLoading(true);
    try {
      const res = await Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      setLyrics(res.data.lyrics || "No lyrics found.");
    } catch (error) {
      setLyrics(`${error.message}. Please try again.`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Lyrics Fetcher 🎵</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Artist name"
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Song name"
          onChange={(e) => setSong(e.target.value)}
        />
      </div>
      <button className="button" onClick={searchLyrics} disabled={loading}>
        {loading && <span className="loader">⏳</span>}
        {loading ? "Searching..." : "Search"}
      </button>
      {lyrics && (
        <div className="lyrics-container">
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
