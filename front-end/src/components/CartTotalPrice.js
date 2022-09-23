import React, { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

export default function CartTotalPrice() {
  const {
    cartTotal,
  } = useContext(DeliveryContext);

  const total = () => {
    if (Number(cartTotal) === 0) {
      return 0;
    }
    return Number(cartTotal);
  };

  return (
    <div>
      <h1>
        Total: R$
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {total().toFixed(2).toString().replace(/\./, ',')}
        </span>
      </h1>
    </div>
  );
}
