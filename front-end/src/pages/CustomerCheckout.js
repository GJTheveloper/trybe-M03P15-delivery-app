import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTable from '../components/cartTable/cartTable';
import CartTotalPrice from '../components/CartTotalPrice';
import DeliveryContext from '../context/DeliveryContext';
import { getLocalStorage, removeKeyLocalStorage } from '../utils/localStorage';

export default function CustomerCheckout() {
  const {
    cartOnScreen,
    setCartOnScreen,
    cartTotal,
    setcartTotal,
  } = useContext(DeliveryContext);
  const [userData, setUserData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const navigate = useNavigate();

  // Função para retornar usuário não autorizado para a página da login
  // Também limpa local storage
  async function handleNavigateLogin() {
    removeKeyLocalStorage('cart');
    removeKeyLocalStorage('user');
    navigate('/login', { replace: false });
  }

  // Função para fazer fetch no endpoit GET /products e salvar os produtos no estado products
  // Caso retorne QUALQUER erro, retireciona para página de Login
  const postOrder = async (token) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/checkout',
      headers: { Authorization: token },
      data: {
        userId: userData.id,
        sellerId: 2,
        totalPrice: cartTotal,
        deliveryAddress,
        deliveryNumber,
        status: 'Pendente',
        products: cartOnScreen.map((item) => (
          { id: item.id, quantity: item.qtd, price: item.unitPrice }
        )),
      },
    }).then(
      (response) => {
        removeKeyLocalStorage('cart');
        navigate(`/customer/orders/${response.data.id}`, { replace: false });
      },
    ).catch((error) => {
      console.log(error);
    });
  };

  const order = {
    totalPrice: cartTotal,
  };

  const addKeyToOrder = (key, value) => {
    order[key] = value;
  };

  const cartForTable = () => {
    const cartFromStorage = getLocalStorage('cart', false);
    setCartOnScreen(cartFromStorage);
  };

  const getTotalCart = () => {
    const total = getLocalStorage('total');
    setcartTotal(total);
  };

  useEffect(() => {
    getTotalCart();
    cartForTable();
  }, []);

  // UseEffect!
  useEffect(() => {
    // Resgata dados do usuário do local storage na chave 'user'
    const data = getLocalStorage('user');
    // Caso não haja token armazenado, redireciona para página de login
    if (!data.token) {
      handleNavigateLogin();
    } else {
      setUserData(data);
    }
  }, []);
  // IGNORAR AVISO DO LINT

  return (
    <>
      <h1>
        Página de Checkout
      </h1>
      <CartTotalPrice />
      <div className="cart-table-container">
        <h3>Finalizar Pedido</h3>
        {cartOnScreen.length > 0
          ? (
            <CartTable />)
          : (
            <h2>Seu carrinho está Vazio!</h2>
          )}
      </div>
      <div className="checkout-form-container">
        <h3>Detalhes e Endereço para Entrega</h3>
        <form>
          <select
            name="saler"
            id="saler"
            onChange={ ({ target }) => addKeyToOrder('sellerId', target.value) }
            data-testid="customer_checkout__select-seller"
          >
            <option value="saler 1" id="saler-1">Vendedor 1</option>
            <option value="saler 2" id="saler-2">Vendedor 2</option>
            <option value="saler 3" id="saler-3">Vendedor 3</option>
            <option value="saler 4" id="saler-4">Vendedor 4</option>
          </select>
          <input
            type="text"
            placeholder="Informe seu endereço"
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
          />
          <input
            type="number"
            placeholder="Número"
            data-testid="customer_checkout__input-addressNumber"
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
          />
          <button
            type="button"
            className="checkout-form-button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => postOrder(userData.token) }
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}
