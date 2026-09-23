function Watchlist({ watchlist, onRemove }) {
  return (
    <section className="watchlist-section">
      <div className="watchlist-header">
        <h2>🎥 My Watchlist</h2>

        <span className="watchlist-count">
          {watchlist.length}
        </span>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <div className="empty-icon">🍿</div>

          <h3>Your watchlist is empty</h3>

          <p>
            Add movies you want to watch.
          </p>
        </div>
      ) : (
        <div className="watchlist-items">
          {watchlist.map((movie) => (
            <div className="watchlist-item" key={movie.id}>
              <div>
                <h3>{movie.title}</h3>

                <p>
                  {movie.genre} • {movie.year} • ⭐ {movie.rating}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Watchlist;