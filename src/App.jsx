import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch movies using Axios and useEffect
  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        console.log("Movie data:", response.data);

        // Make sure the received data is an array
        if (Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          console.error("Movie data is not an array");
          setMovies([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
        setLoading(false);
      });
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((previousWatchlist) => {
      // Prevent duplicate movies
      const alreadyAdded = previousWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadyAdded) {
        return previousWatchlist;
      }

      return [...previousWatchlist, movie];
    });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist((previousWatchlist) =>
      previousWatchlist.filter((movie) => movie.id !== movieId)
    );
  };

  // Check whether movie is already added
  const isMovieAdded = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  // Get unique genres
  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  // Filter movies according to selected genre
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>🎬 Movie Watchlist</h1>

          <p>
            Discover movies and create your personal watchlist
          </p>
        </div>
      </header>

      <main className="container">

        {/* Genre Filter */}
        <section className="filter-section">
          <h2>Browse Movies</h2>

          <div className="genre-buttons">
            {genres.map((genre) => (
              <button
                key={genre}
                className={
                  selectedGenre === genre
                    ? "genre-btn active"
                    : "genre-btn"
                }
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {/* Loading */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>

            <p>Loading movies...</p>
          </div>
        ) : (
          <>
            {/* Movies */}
            {filteredMovies.length === 0 ? (
              <div className="no-movies">
                <div className="no-movies-icon">🔍</div>

                <h2>No movies found</h2>

                <p>
                  There are no movies available for this genre.
                </p>
              </div>
            ) : (
              <section className="movies-section">
                <div className="movies-grid">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onAddToWatchlist={addToWatchlist}
                      isAdded={isMovieAdded(movie.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Watchlist */}
        <Watchlist
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
        />

      </main>
    </div>
  );
}

export default App;