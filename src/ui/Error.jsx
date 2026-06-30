import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-6xl">😢</div>
      <h1 className="mb-2 text-2xl font-bold text-stone-900">
        Something went wrong
      </h1>
      <p className="mb-6 max-w-sm text-sm text-stone-500">
        {error.data || error.message}
      </p>
      <LinkButton to="-1">← Go back</LinkButton>
    </div>
  );
}

export default Error;
