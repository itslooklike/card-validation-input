import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import isCreditCard from 'validator/lib/isCreditCard';
import VMasker from 'vanilla-masker';
import Input from 'arui-feather/input';

const Container = styled.div`
  position: relative;
  padding-right: 100px;
  padding-bottom: 50px;
`;

const Row = styled.div`
  margin-bottom: 10px;
`;

const PlasticCard = styled.div`
  position: relative;
  z-index: 1;
  width: 380px;
  height: 250px;
  border-radius: 10px;
  background-color: #f0f0ee;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

const PlasticCardBackdrop = styled.div`
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 380px;
  height: 250px;
  border-radius: 10px;
  background-color: #e0ddd7;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);

  ::before {
    content: '';
    position: absolute;
    top: 50px;
    width: 100%;
    height: 50px;
    background-color: #8e8b85;
  }
`;

const PlasticCardInner = styled.div`
  padding: 30px;
`;

const SmallInputsContainer = styled.div`
  display: flex;
`;

const SmallInputsSlot = styled.div`
  width: 50px;
  margin-right: 10px;
`;

const CVVContainer = styled.div`
  position: absolute;
  top: 130px;
  right: 30px;
`;

const CVVInputsSlot = styled.div`
  width: 50px;
`;

const CVVNotice = styled.div`
  margin-top: 5px;
  font-size: 8px;
  opacity: 0.5;
`;

const onCardNumberChange = (value, setFieldValue) => {
  setFieldValue('cardNumber', VMasker.toPattern(value, '9999 9999 9999 9999'));
};

const onCardHolderChange = (value, setFieldValue) => {
  setFieldValue(
    'cardHolder',
    value
      .trimStart()
      .toUpperCase()
      .replace(/\d/g, '') // убираем цифры
      .replace(/[^A-Z\s]+/g, '') // убираем НЕ латиницу
      .replace(/\s{2,}/g, ' ') // заменяем два пробела на один
      .substring(0, 20) // только первые 20 символов
  );
};

const onCardMonthChange = (value, setFieldValue) => {
  setFieldValue('cardMonth', VMasker.toPattern(value, '99'));
};

const onCardYearChange = (value, setFieldValue) => {
  setFieldValue('cardYear', VMasker.toPattern(value, '99'));
};

const onCVVChange = (value, setFieldValue) => {
  setFieldValue('cardCVV', VMasker.toPattern(value, '999'));
};

const Card = () => (
  <div>
    <Formik
      initialValues={{
        cardNumber: '',
        cardHolder: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: '',
      }}
      validate={(values) => {
        console.log('values', values);
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
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        errors,
        touched,
        handleBlur,
        values,
      }) => {
        const cardNameError = touched.cardNumber && errors.cardNumber;
        const cardHolderError = touched.cardHolder && errors.cardHolder;
        const cardMonthError = touched.cardMonth && errors.cardMonth;
        const cardYearError = touched.cardYear && errors.cardYear;
        const cardCVVError = touched.cardCVV && errors.cardCVV;

        return (
          console.log(errors) || (
            <Form>
              <Container>
                <PlasticCard>
                  <PlasticCardInner>
                    <Row>
                      <Input
                        type="text"
                        name="cardNumber"
                        label="Номер карты"
                        width="available"
                        value={values.cardNumber}
                        error={cardNameError ? cardNameError : null}
                        onBlur={handleBlur}
                        onChange={(evt) =>
                          onCardNumberChange(evt, setFieldValue)
                        }
                      />
                    </Row>

                    <Row>
                      <Input
                        type="text"
                        name="cardHolder"
                        label="Фамилия Имя"
                        width="available"
                        value={values.cardHolder}
                        error={cardHolderError ? cardHolderError : null}
                        onBlur={handleBlur}
                        onChange={(evt) =>
                          onCardHolderChange(evt, setFieldValue)
                        }
                      />
                    </Row>
                    <SmallInputsContainer>
                      <SmallInputsSlot>
                        <Input
                          type="text"
                          name="cardMonth"
                          label="MM"
                          width="available"
                          value={values.cardMonth}
                          error={cardMonthError ? cardMonthError : null}
                          onBlur={handleBlur}
                          onChange={(evt) =>
                            onCardMonthChange(evt, setFieldValue)
                          }
                        />
                      </SmallInputsSlot>

                      <SmallInputsSlot>
                        <Input
                          type="text"
                          name="cardYear"
                          label="YY"
                          width="available"
                          value={values.cardYear}
                          error={cardYearError ? cardYearError : null}
                          onBlur={handleBlur}
                          onChange={(evt) =>
                            onCardYearChange(evt, setFieldValue)
                          }
                        />
                      </SmallInputsSlot>
                    </SmallInputsContainer>
                  </PlasticCardInner>
                </PlasticCard>

                <PlasticCardBackdrop>
                  <CVVContainer>
                    <CVVInputsSlot>
                      <Input
                        type="text"
                        name="cardCVV"
                        label="CVV"
                        width="available"
                        value={values.cardCVV}
                        error={cardCVVError ? cardCVVError : null}
                        onBlur={handleBlur}
                        onChange={(evt) => onCVVChange(evt, setFieldValue)}
                      />
                      <CVVNotice>Три цифры на&nbsp;обороте карты</CVVNotice>
                    </CVVInputsSlot>
                  </CVVContainer>
                </PlasticCardBackdrop>
              </Container>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )
        );
      }}
    </Formik>
  </div>
);

export default Card;
