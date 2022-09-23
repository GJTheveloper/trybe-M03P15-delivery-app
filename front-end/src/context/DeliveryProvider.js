import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeliveryContext from './DeliveryContext';

const INITIAL_STATE_USER = {
  name: '', email: '', role: 'customer', token: 'TOKEN' };

function DeliveryProvider({ children }) {
  // Estado -> Se precisar exportar, adicionar no Provider value o estado;

  const [state, setState] = useState(0);
  const [userData, setUserData] = useState(INITIAL_STATE_USER);
  const [cartOnScreen, setCartOnScreen] = useState([]);
  const [cartTotal, setcartTotal] = useState(0.0);

  const { Provider } = DeliveryContext;
  return (
    <Provider
      // Adicionar aqui os estados que precisar usar;
      value={ {
        setState,
        cartOnScreen,
        setCartOnScreen,
        cartTotal,
        setcartTotal,
        state,
        setUserData,
        userData,
      } }
    >
      {children}
    </Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DeliveryProvider;
