import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <p className="text-sm text-stone-500 md:text-base">
        👋 What&apos;s your name? We&apos;ll get your order ready.
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-72 text-center"
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering →</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
