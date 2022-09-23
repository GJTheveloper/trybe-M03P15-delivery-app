import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/localStorage';

export default function OrderCard({
  order,
}) {
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`${order.id}`, { replace: false });
  }

  useEffect(() => {
    const userData = getLocalStorage('user');
    setRole(userData.role || 'customer');
  }, []);

  const sellerCards = (
    <Link to={ `/seller/orders/${order.id}` }>
      <button
        type="button"
        data-testid={ `seller_orders__element-order-id-${order.id}` }
      >
        {`Pedido ${order.id}`}
      </button>
      <p data-testid={ `seller_orders__element-delivery-status-${order.id}` }>
        {order.status}
      </p>
      <p data-testid={ `seller_orders__element-order-date-${order.id}` }>
        {new Date(order.saleDate).toLocaleDateString(['pt-br'])}
      </p>
      <p
        data-testid={ `seller_orders__element-card-price-${order.id}` }
      >
        {Number(order.totalPrice).toFixed(2).replace(/\./, ',')}
      </p>
      <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
        {
          `${order.deliveryAddress}, ${order.deliveryNumber}`
        }
      </p>
    </Link>
  );

  const customerCards = (
    <div>
      <button
        type="button"
        data-testid={ `customer_orders__element-order-id-${order.id}` }
        onClick={ () => handleNavigate() }
      >
        {`Pedido ${order.id}`}
      </button>
      <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
        {order.status}
      </p>
      <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
        {new Date(order.saleDate).toLocaleDateString(['pt-br'])}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
        {Number(order.totalPrice).toFixed(2).replace(/\./, ',')}
      </p>
    </div>
  );

  const defineOrders = () => {
    if (role === 'seller') {
      return sellerCards;
    }
    return customerCards;
  };

  return (
    defineOrders()
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
