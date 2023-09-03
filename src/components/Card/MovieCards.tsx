export const MovieCards = ({ title = "", poster_path = "", alt = "" }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={alt}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};
