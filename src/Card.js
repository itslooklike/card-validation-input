import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';

import cardType from './cardType';
import fmt from './formatters';
import validator from './validator';

import IconMs from './assets/ms.svg';
import IconVisa from './assets/visa.svg';

const renderIcon = (name) => {
  switch (name) {
    case 'Visa':
      return <IconVisa />;
    case 'Mastercard':
      return <IconMs />;
    default:
      return null;
  }
};

const Container = styled.div`
  position: relative;
  padding-right: 100px;
  padding-bottom: 50px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Row = styled.div`
  margin-bottom: 5px;
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

const scheme = {
  cardNumber: {
    name: 'cardNumber',
    label: 'Номер карты',
  },
  cardHolder: {
    name: 'cardHolder',
    label: 'Фамилия Имя',
  },
  cardMonth: {
    name: 'cardMonth',
    label: 'ММ',
  },
  cardYear: {
    name: 'cardYear',
    label: 'ГГ',
  },
  cardCVV: {
    name: 'cardCVV',
    label: 'CVV',
  },
};

const handleInputChange = (name, value, setFieldValue) => {
  console.log(cardType(value));
  setFieldValue(name, fmt[name](value));
};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const Card = () => {
  const { cardNumber, cardHolder, cardMonth, cardYear, cardCVV } = scheme;

  return (
    <div>
      <Formik
        initialValues={{
          cardNumber: '',
          cardHolder: '',
          cardMonth: '',
          cardYear: '',
          cardCVV: '',
        }}
        validate={validator}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          setFieldValue,
          errors,
          touched,
          handleBlur,
          values,
        }) => {
          const cardNameError =
            touched[cardNumber.name] && errors[cardNumber.name];
          const cardHolderError =
            touched[cardHolder.name] && errors[cardHolder.name];
          const cardMonthError =
            touched[cardMonth.name] && errors[cardMonth.name];
          const cardYearError = touched[cardYear.name] && errors[cardYear.name];
          const cardCVVError = touched[cardCVV.name] && errors[cardCVV.name];

          return (
            <Form>
              <Container>
                <PlasticCard>
                  <PlasticCardInner>
                    <Row>
                      <Input
                        type="text"
                        width="available"
                        name={cardNumber.name}
                        label={cardNumber.label}
                        value={values[cardNumber.name]}
                        error={cardNameError ? cardNameError : null}
                        onBlur={handleBlur}
                        onChange={(evt) =>
                          handleInputChange(cardNumber.name, evt, setFieldValue)
                        }
                      />
                    </Row>

                    <Row>
                      <Input
                        type="text"
                        width="available"
                        name={cardHolder.name}
                        label={cardHolder.label}
                        value={values[cardHolder.name]}
                        error={cardHolderError ? cardHolderError : null}
                        onBlur={handleBlur}
                        onChange={(evt) =>
                          handleInputChange(cardHolder.name, evt, setFieldValue)
                        }
                      />
                    </Row>
                    <SmallInputsContainer>
                      <SmallInputsSlot>
                        <Input
                          type="text"
                          width="available"
                          name={cardMonth.name}
                          label={cardMonth.label}
                          value={values[cardMonth.name]}
                          error={cardMonthError ? cardMonthError : null}
                          onBlur={handleBlur}
                          onChange={(evt) =>
                            handleInputChange(
                              cardMonth.name,
                              evt,
                              setFieldValue
                            )
                          }
                        />
                      </SmallInputsSlot>

                      <SmallInputsSlot>
                        <Input
                          type="text"
                          width="available"
                          name={cardYear.name}
                          label={cardYear.label}
                          value={values[cardYear.name]}
                          error={cardYearError ? cardYearError : null}
                          onBlur={handleBlur}
                          onChange={(evt) =>
                            handleInputChange(cardYear.name, evt, setFieldValue)
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
                        width="available"
                        name={cardCVV.name}
                        label={cardCVV.label}
                        value={values[cardCVV.name]}
                        error={cardCVVError ? cardCVVError : null}
                        onBlur={handleBlur}
                        onChange={(evt) =>
                          handleInputChange(cardCVV.name, evt, setFieldValue)
                        }
                      />
                      <CVVNotice>Три цифры на&nbsp;обороте карты</CVVNotice>
                    </CVVInputsSlot>
                  </CVVContainer>
                </PlasticCardBackdrop>
              </Container>
              <ButtonWrap>
                <Button type="submit" disabled={isSubmitting}>
                  Оплатить
                </Button>
              </ButtonWrap>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Card;
