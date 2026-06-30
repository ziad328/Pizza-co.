import { motion } from 'framer-motion';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <motion.div
      className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-4 text-6xl">🛒</div>
      <h2 className="mb-2 text-xl font-bold text-stone-900">
        Your cart is empty
      </h2>
      <p className="mb-6 text-sm text-stone-500">
        Looks like you haven&apos;t added anything yet. Go explore our menu!
      </p>
      <LinkButton to="/menu">← Browse the menu</LinkButton>
    </motion.div>
  );
}

export default EmptyCart;
