import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <AnimatePresence>
      {totalCartQuantity > 0 && (
        <motion.div
          key="cart-overview"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="flex items-center justify-between bg-stone-900 px-4 py-4 text-stone-100 sm:px-6"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-stone-900">
              {totalCartQuantity}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Total
              </p>
              <p className="text-sm font-bold text-white">
                {formatCurrency(totalCartPrice)}
              </p>
            </div>
          </div>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-all duration-200 hover:bg-yellow-300 hover:-translate-y-0.5 active:scale-95 shadow-pizza"
          >
            View cart →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartOverview;
