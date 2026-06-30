import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full border border-yellow-500/40 bg-yellow-300/60 px-4 py-2 text-xs font-medium text-stone-800 backdrop-blur-sm transition-all duration-300 placeholder:text-stone-500 focus:w-40 focus:border-yellow-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 sm:w-52 sm:focus:w-64"
      />
    </form>
  );
}

export default SearchOrder;
