const ru = {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      logout: 'Выйти',
    },
    modal: {
      add: {
        title: 'Добавить канал',
        inputLabel: 'Имя канала',
        submit: 'Отправить',
      },
      delete: {
        title: 'Удалить канал',
        bodyText: 'Уверены?',
        submit: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        inputLabel: 'Имя канала',
        submit: 'Отправить',
      },
      cancel: 'Отменить',
    },
    channels: {
      title: 'Каналы',
      manage: 'Управление каналом',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    chatHeader: {
      fallbackChannelTitle: 'Выберите канал',
    },
    msgForm: {
      inputLabel: 'Новое сообщение',
      inputPlaceholder: 'Введите сообщение...',
      submit: 'Отправить',
    },
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      signup: 'Регистрация',
    },
    signup: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
    },
    errors: {
      minmax: 'От 3 до 20 символов',
      repeat: 'Должно быть уникальным',
      required: 'Обязательное поле',
      passwordMin: 'Не менее 6 символов',
      confirmPass: 'Пароли должны совпадать',
      channelRepeat: 'Канал уже существует',
      auth: 'Неверные имя пользователя или пароль',
      userExists: 'Такой пользователь уже существует',
      network: 'Ошибка сети',
    },
    toastify: {
      channelAdded: 'Канал создан',
      channelDeleted: 'Канал удалён',
      channelRenamed: 'Канал переименован',
      network: 'Проверьте соединение',
    },
    spinnerLabel: 'Визуализатор загрузки',
    pageNotFound: 'Страница не найдена',
  },
};
export default ru;
