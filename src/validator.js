import isCreditCard from 'validator/lib/isCreditCard';

export default (values) => {
  let errors = {};
  const { cardNumber, cardHolder, cardMonth, cardYear, cardCVV } = values;

  // Валидация номера карты
  if (!cardNumber) {
    errors.cardNumber = 'Заполните номер карты';
  } else if (!isCreditCard(cardNumber)) {
    errors.cardNumber = 'Неверный номер карты';
  }

  // Валидация ФИО
  const MIN_NAME_LENGTH = 3;
  const trimmedCardHolder = cardHolder.trim();

  if (!trimmedCardHolder) {
    errors.cardHolder = 'Введите Фамилию и Имя';
  } else if (trimmedCardHolder.length < MIN_NAME_LENGTH) {
    errors.cardHolder = `Не короче ${MIN_NAME_LENGTH} символов`;
  }

  // Валидация месяца
  const MAX_MONTH_VALID = 12;

  if (!cardMonth) {
    errors.cardMonth = 'Введите месяц';
  } else if (parseInt(cardMonth, 10) > MAX_MONTH_VALID) {
    errors.cardMonth = 'Неверно указан месяц';
  }

  // Валидация года
  const MAX_YEAR_VALID = 18; // нужно фетчить дату с бека, в браузере может быть сбитая дата

  if (!cardYear) {
    errors.cardYear = 'Введите год';
  } else if (parseInt(cardYear, 10) < MAX_YEAR_VALID) {
    errors.cardYear = 'Карта уже истекла';
  }

  // Валидация CVV
  if (!cardCVV) {
    errors.cardCVV = 'Введите CVV код';
  } else if (cardCVV.length < 3) {
    errors.cardCVV = 'Введите код полностью';
  }

  return errors;
};
