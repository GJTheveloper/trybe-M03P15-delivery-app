import React, { useContext } from 'react';
import DeliveryContext from '../../context/DeliveryContext';
import { updateCartTotal } from '../../utils/checkoutUtils';
import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from '../../utils/localStorage';

export default function CartTable() {
  const {
    cartOnScreen,
    setCartOnScreen,
    cartTotal,
    setcartTotal,
  } = useContext(DeliveryContext);

  const tableTitles = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover'];

  const removeFromCart = async (productName, productSubTotal) => {
    removeLocalStorage(productName, false, true);
    const newCart = getLocalStorage('cart', false);
    setCartOnScreen(newCart);

    // a lógica abaixo deve ser chamada no botão de remover na pagina de produtos
    const newCartTotal = await updateCartTotal(cartTotal, productSubTotal, 'deduct');
    (newCartTotal.toFixed(2));
    saveLocalStorage('total', newCartTotal);
    setcartTotal(newCartTotal);
  };

  return (
    <div className="cart-table-container">
      <table border="1" id="cart-table">
        <thead>
          <tr>
            {tableTitles.map((title) => <th key={ title }>{ title }</th>)}
          </tr>
        </thead>
        <tbody>
          {cartOnScreen.map((item, index) => (
            <tr key={ item.id }>
              <td
                className="cart-product-index-td"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1}
              </td>
              <td
                className="cart-product-name-td"
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                className="cart-product-qtd-td"
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {item.qtd}
              </td>
              <td
                className="cart-product-price-td"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {(item.unitPrice).toString().replace(/\./, ',')}
              </td>
              <td
                className="cart-product-subtotal-td"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {Number(item.subtotal).toFixed(2).toString().replace(/\./, ',')}
              </td>
              <td>
                <button
                  className="cart-remove-button"
                  type="button"
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  onClick={ () => removeFromCart(item.name, item.subtotal) }
                >
                  Remover
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
