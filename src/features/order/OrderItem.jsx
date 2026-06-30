import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 px-5 py-4">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-medium text-stone-800">
          <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-stone-900">
            {quantity}
          </span>
          {name}
        </p>
        <p className="font-bold text-stone-700">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="pl-7 text-xs capitalize italic leading-relaxed text-stone-400">
        {isLoadingIngredients ? (
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 delay-75"></span>
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 delay-150"></span>
            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 delay-300"></span>
          </span>
        ) : (
          ingredients.join(', ')
        )}
      </p>
    </li>
  );
}

export default OrderItem;
