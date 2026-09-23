function MovieCard({ movie, onAddToWatchlist, isAdded }) {
  return (
    <div className="movie-card">
      <img
        src={movie.image}
        alt={movie.title}
        className="movie-image"
      />
      <div className="movie-content">
        <h3>{movie.title}</h3>

        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>

        <p>
          <strong>Year:</strong> {movie.year}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {movie.rating}
        </p>

        <button
          className={isAdded ? "added-btn" : "add-btn"}
          disabled={isAdded}
          onClick={() => onAddToWatchlist(movie)}
        >
          {isAdded ? "✓ Added" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;