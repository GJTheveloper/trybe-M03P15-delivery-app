import toast from 'react-hot-toast';

export const wrongEmailOrPassword = (message) => toast.error(
  message,
  {
    icon: '⛔',
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '#000',
    },
  },
);

export const sucessLogin = () => toast.success(
  'Olá!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  },
);
