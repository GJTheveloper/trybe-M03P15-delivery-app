import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import { getLocalStorage } from '../utils/localStorage';

export default function OrderDetails(props) {
  if (props) console.log('');
  const TRANSIT = 'Em Trânsito';
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [disabled, setDisabled] = useState();
  const [disabledPrep, setDisabledPrep] = useState();
  const [disabledDel, setDisabledDel] = useState();
  const tableTitles = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total'];

  const updateStatus = async (status) => {
    await axios({
      url: `http://localhost:3001/status/${id}`,
      method: 'PUT',
      headers: { Authorization: token },
      data: { status },
    });
  };

  const getOrders = async (localToken) => {
    const config = {
      headers: { Authorization: localToken },
    };
    axios.get(`http://localhost:3001/sales/${id}`, config).then(
      (response) => setOrder(response.data),
    ).catch((e) => {
      console.log(`erro => ${e}`);
    });
  };

  useEffect(() => {
    if (order.status === TRANSIT) {
      setDisabled(false);
      setDisabledDel(true);
      setDisabledPrep(true);
    } else if (order.status === 'Preparando') {
      setDisabled(true);
      setDisabledDel(false);
      setDisabledPrep(true);
    } else if (order.status === 'Pendente') {
      setDisabled(true);
      setDisabledDel(true);
      setDisabledPrep(false);
    } else {
      setDisabled(true);
      setDisabledDel(true);
      setDisabledPrep(true);
    }
  }, [order]);

  useEffect(() => {
    const userData = getLocalStorage('user');
    if (!userData.token) {
      handleNavigateLogin();
    } else {
      getOrders(userData.token);
      setToken(userData.token);
      setRole(userData.role);
    }
  }, []);

  const btnPrep = (
    <button
      type="button"
      data-testid="seller_order_details__button-preparing-check"
      onClick={ () => {
        setOrder({ ...order, status: 'Preparando' });
        updateStatus('Preparando');
      } }
      disabled={ disabledPrep }
    >
      PREPARAR PEDIDO
    </button>);

  const btnDelivery = (
    <button
      type="button"
      data-testid="seller_order_details__button-dispatch-check"
      onClick={ () => {
        setOrder({ ...order, status: TRANSIT });
        updateStatus(TRANSIT);
      } }
      disabled={ disabledDel }
    >
      SAIU PARA ENTREGA
    </button>
  );

  return (
    <div>
      <NavBar />
      <h1>Pagina de detalhes</h1>
      <p
        data-testid={ `${role}_order_details__element-order-details-label-order-id` }
      >
        Pedido:
        {order.id}
      </p>
      <p
        data-testid={
          `${role}_order_details__element-order-details-label-seller-name`
        }
      >
        Vendedor:
        {order.sellerName}
      </p>
      <p
        data-testid={
          `${role}_order_details__element-order-details-label-order-date`
        }
      >
        {new Date(order.saleDate).toLocaleDateString(['pt-br'])}
      </p>
      <p
        data-testid={
          `${role}_order_details__element-order-details-label-delivery-status`
        }
      >
        {order.status}
      </p>
      <p
        data-testid={ `${role}_order_details__element-order-total-price` }
      >
        Total: $
        {Number(order.totalPrice).toFixed(2).replace(/\./, ',')}
      </p>
      <div className="cart-table-container">
        <table border="1" id="cart-table">
          <thead>
            <tr>
              {tableTitles.map((title) => <th key={ title }>{ title }</th>)}
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.map((item, index) => (
              <tr key={ item.id }>
                <td
                  className="details-product-index-td"
                  data-testid={
                    `${role}_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  className="details-product-name-td"
                  data-testid={
                    `${role}_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  className="details-product-qtd-td"
                  data-testid={
                    `${role}_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  className="details-product-price-td"
                  data-testid={
                    `${role}_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {item.price}
                </td>
                <td
                  className="details-product-subtotal-td"
                  data-testid={
                    `${role}_order_details__element-order-total-price-${index}`
                  }
                >
                  {Number(item.subTotal).toFixed(2)}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `${role}_order_details__button-delivery-check` }
          disabled={ disabled }
          onClick={ () => {
            setOrder({ ...order, status: 'Entregue' });
            updateStatus('Entregue');
          } }
        >
          Marcar como entregue
        </button>
        {role === 'seller' && btnPrep}
        {role === 'seller' && btnDelivery}
      </div>
    </div>
  );
}
