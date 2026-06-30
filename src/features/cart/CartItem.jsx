import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-medium text-stone-800">
        <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-stone-900">
          {quantity}
        </span>
        {name}
      </p>
      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <p className="text-sm font-bold text-stone-700">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
