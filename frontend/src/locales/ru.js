const ru = {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      logout: 'Выйти',
    },
    modal: {
      add: {
        title: 'Добавить канал',
        inputPlaceholder: 'Введите название',
        submit: 'Отправить',
      },
      delete: {
        title: 'Удалить канал',
        bodyText: 'Уверены?',
        submit: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        inputPlaceholder: 'Введите название',
        submit: 'Отправить',
      },
      cancel: 'Отменить',
    },
    channels: {
      title: 'Каналы',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    chatHeader: {
      fallbackChannelTitle: 'Выберите канал',
    },
    msgForm: {
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
      profanity: 'Бранные слова запрещены',
      network: 'Ошибка сети',
    },
    toastify: {
      channelAdded: 'Канал создан',
      channelDeleted: 'Канал удалён',
      channelRenamed: 'Канал переименован',
      network: 'Проверьте соединение',
    },
  },
};
export default ru;
