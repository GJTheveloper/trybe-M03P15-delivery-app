import PropTypes from 'prop-types';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { removeKeyLocalStorage } from '../../utils/localStorage';

export default function LinkButton({
  linkTo, buttonId, buttonName, logout,
}) {
  const navigate = useNavigate();

  async function handleNavigate() {
    // CASO seja botão de logout, apaga dados do usuário e carrinho de compras.
    if (logout) {
      removeKeyLocalStorage('user');
      removeKeyLocalStorage('cart');
    }
    navigate(linkTo, { replace: false });
  }
  return (
    <button
      type="button"
      data-testid={ buttonId }
      onClick={ () => handleNavigate() }
    >
      {buttonName}
    </button>

  );
}

LinkButton.defaultProps = {
  logout: false,
};

LinkButton.propTypes = {
  linkTo: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  logout: PropTypes.bool,
};
