import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import DeliveryContext from '../../context/DeliveryContext';
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
  updateCartQtd,
} from '../../utils/localStorage';

export default function ProductCard({
  product,
}) {
  const noProductIndex = -1;
  const [qtd, setQtd] = useState(0);
  const { setcartTotal } = useContext(DeliveryContext);

  const calculateTotalCart = () => {
    const cartData = getLocalStorage('cart');
    let total = 0;
    if (cartData.length > 0) {
      cartData.forEach((item) => {
        total += +(parseFloat(item.subtotal));
      });
    }
    saveLocalStorage('total', Number(total.toFixed(2)));
    setcartTotal(total.toFixed(2));
  };

  const checkLocalCart = () => {
    const localCart = getLocalStorage('cart', false);
    const productIndex = localCart.map((item) => item.id).indexOf(product.id);
    if (productIndex !== noProductIndex) {
      const localQtd = localCart[productIndex].qtd;
      setQtd(localQtd);
    } else {
      setQtd(0);
    }
  };

  const minusQtd = () => {
    if (qtd === 0 || qtd === 1) {
      setQtd(0);
      removeLocalStorage(product.name, false, true);
      calculateTotalCart();
    } else {
      setQtd(qtd - 1);
      removeLocalStorage(product.name, false, false);
      calculateTotalCart();
    }
  };

  const plusQtd = () => {
    setQtd(qtd + 1);
    addLocalStorage(product);
    calculateTotalCart();
  };

  useEffect(() => {
    checkLocalCart();
    calculateTotalCart();
  }, []);
  // IGNORAR AVISO DO LINT

  const handleChangeQtd = (value) => {
    setQtd(value);
  };

  useEffect(() => {
    updateCartQtd(product, +(Number(qtd)));
    calculateTotalCart();
  }, [qtd]);

  // Função de remover ou diminuir do carrinho;
  return (
    <div>
      <img
        src={ product.urlImage }
        alt={ product.name }
        width="200"
        height="200"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        {product.name}
      </p>
      <p>
        R$
        <span
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          {parseFloat(product.price).toFixed(2).replace(/\./, ',')}
        </span>
      </p>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        onClick={ () => minusQtd() }
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        value={ qtd }
        onChange={ ({ target: { value } }) => {
          handleChangeQtd(Number(value));
        } }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        onClick={ () => plusQtd() }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};
