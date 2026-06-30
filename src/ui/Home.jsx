import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <motion.div
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center sm:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Hero text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-10"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-700 ring-1 ring-yellow-300">
          🔥 Fresh out of the oven
        </div>
        <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl">
          The best pizza.
          <br />
          <span className="text-yellow-500">
            Straight to your door.
          </span>
        </h1>
        <p className="mx-auto max-w-sm text-sm text-stone-500 md:text-base">
          Handcrafted with love, delivered fast. Order in seconds.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {username === '' ? (
          <CreateUser />
        ) : (
          <Button to="/menu" type="primary">
            Continue ordering, {username} →
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Home;
