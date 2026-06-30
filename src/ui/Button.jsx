import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-all duration-200 hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-pizza active:scale-95 active:translate-y-0 focus:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none shadow-sm';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm font-bold',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-500 transition-all duration-200 hover:bg-stone-800 hover:border-stone-800 hover:text-white hover:-translate-y-0.5 active:scale-95 active:translate-y-0 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
