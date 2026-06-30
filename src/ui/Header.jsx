import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-yellow-500/30 bg-yellow-400/95 px-4 py-3 shadow-pizza backdrop-blur-md sm:px-6">
      <Link
        to="/"
        className="text-sm font-bold tracking-widest uppercase text-stone-800 transition-opacity duration-200 hover:opacity-70"
      >
        🍕 Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
