import VMasker from 'vanilla-masker';

export default {
  cardNumber: (value) => VMasker.toPattern(value, '9999 9999 9999 9999'),
  cardHolder: (value) =>
    value
      .trimStart()
      .toUpperCase()
      .replace(/\d/g, '') // убираем цифры
      .replace(/[^A-Z\s]+/g, '') // убираем НЕ латиницу
      .replace(/\s{2,}/g, ' ') // заменяем два пробела на один
      .substring(0, 20), // только первые 20 символов
  cardMonth: (value) => VMasker.toPattern(value, '99'),
  cardYear: (value) => VMasker.toPattern(value, '99'),
  cardCVV: (value) => VMasker.toPattern(value, '999'),
};
