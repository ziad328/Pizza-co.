import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <motion.li
      variants={itemVariants}
      className={`group flex gap-4 rounded-2xl bg-white p-3 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-4 ${soldOut ? 'opacity-75' : ''}`}
    >
      {/* Pizza image */}
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className={`h-24 w-24 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-28 ${
            soldOut ? 'grayscale' : ''
          }`}
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-stone-900/40">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="mb-0.5 font-semibold text-stone-900">{name}</p>
        <p className="mb-auto text-xs capitalize leading-relaxed text-stone-400 italic">
          {ingredients.join(', ')}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {!soldOut ? (
            <p className="text-sm font-bold text-stone-700">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Unavailable
            </p>
          )}

          <div className="flex items-center gap-2">
            {isInCart && (
              <div className="flex items-center gap-2 sm:gap-3">
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </div>
            )}

            {!soldOut && !isInCart && (
              <Button type="small" onClick={handleAddToCart}>
                + Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default MenuItem;
