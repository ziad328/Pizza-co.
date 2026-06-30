import { motion } from 'framer-motion';
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <motion.div
      className="px-2 py-6 sm:px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <h2 className="mb-6 text-xl font-bold tracking-tight text-stone-900">
        Ready to order? Let&apos;s go! 🚀
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="space-y-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-stone-600 sm:basis-40">
            First Name
          </label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-stone-600 sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 ring-1 ring-red-200">
                ⚠️ {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="relative flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-stone-600 sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 ring-1 ring-red-200">
                ⚠️ {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoadingAddress ? '...' : '📍 Locate me'}
              </Button>
            </span>
          )}
        </div>

        {/* Priority toggle */}
        <div className="flex items-center gap-4 rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-200">
          <input
            className="h-5 w-5 cursor-pointer accent-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <div>
            <label htmlFor="priority" className="cursor-pointer font-semibold text-stone-800">
              Priority delivery (+20%)
            </label>
            <p className="text-xs text-stone-500">
              Move your order to the front of the queue
            </p>
          </div>
          {withPriority && (
            <span className="ml-auto text-sm font-bold text-yellow-600">
              +{formatCurrency(priorityPrice)}
            </span>
          )}
        </div>

        {/* Order summary + submit */}
        <div className="rounded-2xl bg-stone-900 px-5 py-4 text-stone-100">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-stone-400 uppercase tracking-widest">
              Order total
            </span>
            <span className="text-lg font-bold text-yellow-400">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
