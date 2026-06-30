import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    'inline-flex items-center gap-1 text-sm font-medium text-yellow-600 transition-all duration-200 hover:text-yellow-800 hover:underline underline-offset-2';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
