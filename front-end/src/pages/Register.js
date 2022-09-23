import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../JOI/emailJoi';
// import { wrongEmailOrPassword } from '../utils/toast';
import { getLocalStorage, saveLocalStorage } from '../utils/localStorage';

export default function Register() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: '', password: '', name: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const validationRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;
    const TWELVE = 12;
    return (validationRegEx.test(userLogin.email)
      && (userLogin.password.length >= passwordMinLength)
      && (userLogin.name.length >= TWELVE));
  };

  const enableButton = () => {
    if (validateForm()) {
      setIsDisable(false);
    }
    if (!validateForm()) {
      setIsDisable(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => enableButton(), [
    isDisable,
    userLogin.password,
    userLogin.email,
    userLogin.name,
  ]);
  const registerUser = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/register',
      data: {
        name: userLogin.name,
        email: userLogin.email,
        password: userLogin.password,
      },
    }).then(
      (response) => {
        saveLocalStorage('user', response.data);
        setLoggedUser(response.data);
      },
    ).catch((error) => {
      setErrorMessage(error.response.data.message);
    });
  };

  const handleClick = () => {
    const { error } = loginSchema.validate(userLogin);

    // ------valida com JOI os campos de login----//
    if (error) {
      setErrorMessage(error.message);
      // wrongEmailOrPassword(error.message);
    } else if (!error) {
      registerUser();
    }
  };

  const enterUser = () => {
    const { role } = getLocalStorage('user');// mudar para verificar o banco
    if (role === 'customer') navigate('/customer/products');
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'admin') navigate('/admin/manage');
  };

  useEffect(() => {
    enterUser();
  }, [loggedUser]);

  const renderError = (
    <div>
      <span
        data-testid="common_register__element-invalid_register"
      >
        {errorMessage}
      </span>
      <button
        type="button"
        onClick={ (e) => {
          e.preventDefault();
          navigate('/');
        } }
      >
        voltar
      </button>
    </div>
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div>
      {
        errorMessage
          ? renderError
          : (
            <>

              <form>
                <input
                  id="name"
                  name="name"
                  onChange={ handleChange }
                  placeholder="Digite seu nome"
                  data-testid="common_register__input-name"
                />
                <input
                  id="email"
                  name="email"
                  onChange={ handleChange }
                  placeholder="Digite seu email"
                  data-testid="common_register__input-email"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={ handleChange }
                  placeholder="Digite sua senha"
                  data-testid="common_register__input-password"
                />
              </form>
              <button
                name="Cadastrar"
                type="submit"
                disabled={ isDisable }
                onClick={ handleClick }
                data-testid="common_register__button-register"
              >
                Cadastrar
              </button>
            </>)
      }
    </div>
  );
}
