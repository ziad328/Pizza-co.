import { motion } from 'framer-motion';
import { useFetcher, useLoaderData } from 'react-router-dom';

import OrderItem from './OrderItem';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <motion.div
      className="space-y-5 px-2 py-6 sm:px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Order <span className="text-yellow-500">#{id}</span>
        </h2>

        <div className="flex items-center gap-2">
          {priority && (
            <span className="badge bg-red-100 text-red-600 ring-1 ring-red-200">
              🔥 Priority
            </span>
          )}
          <span className="badge bg-green-100 text-green-700 ring-1 ring-green-200">
            {status}
          </span>
        </div>
      </div>

      {/* Delivery ETA */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-stone-900 px-6 py-5 text-stone-100">
        <div>
          <p className="font-semibold">
            {deliveryIn >= 0
              ? `🛵 Arriving in ${calcMinutesLeft(estimatedDelivery)} minutes`
              : '✅ Order should have arrived'}
          </p>
          <p className="mt-0.5 text-xs text-stone-400">
            Estimated: {formatDate(estimatedDelivery)}
          </p>
        </div>
        {deliveryIn >= 0 && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-stone-900">
            {deliveryIn}m
          </div>
        )}
      </div>

      {/* Order items */}
      <div className="rounded-2xl bg-white shadow-card overflow-hidden">
        <ul className="divide-y divide-stone-100">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
            />
          ))}
        </ul>
      </div>

      {/* Price summary */}
      <div className="rounded-2xl bg-stone-100 px-5 py-4 space-y-1.5">
        <div className="flex items-center justify-between text-sm text-stone-600">
          <span>Pizza subtotal</span>
          <span className="font-semibold">{formatCurrency(orderPrice)}</span>
        </div>
        {priority && (
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>Priority fee</span>
            <span className="font-semibold">{formatCurrency(priorityPrice)}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-stone-200 pt-2">
          <span className="font-bold text-stone-900">Total to pay</span>
          <span className="text-lg font-bold text-yellow-600">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </div>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </motion.div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
