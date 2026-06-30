import { motion } from 'framer-motion';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <motion.div
      className="px-2 py-6 sm:px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <LinkButton to="/menu">← Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-bold tracking-tight text-stone-900">
        Your cart,{' '}
        <span className="text-yellow-500">{username}</span>
      </h2>

      <ul className="mt-4 divide-y divide-stone-100 rounded-2xl bg-white shadow-card">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {/* Price summary */}
      <div className="mt-4 rounded-2xl bg-stone-900 px-5 py-4 text-stone-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-400 uppercase tracking-widest">Order total</span>
          <span className="text-lg font-bold text-yellow-400">
            {formatCurrency(totalCartPrice)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button to="/order/new" type="primary">
          Order now →
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </motion.div>
  );
}

export default Cart;
