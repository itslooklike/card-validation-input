import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import isCreditCard from 'validator/lib/isCreditCard';
import Input from 'arui-feather/input';

const Container = styled.div`
  position: relative;
  padding-right: 100px;
  padding-bottom: 50px;
`;

const PlasticCard = styled.div`
  position: relative;
  z-index: 1;
  width: 400px;
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
  width: 400px;
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
        let errors = {};
        if (!values.cardNumber) {
          errors.cardNumber = 'Необходимо заполнить номер карты';
        } else if (!isCreditCard(values.cardNumber)) {
          errors.email = 'Неверный номер карты';
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
      {({ isSubmitting }) => (
        <Form>
          <Container>
            <PlasticCard>
              <PlasticCardInner>
                <div>
                  <Field
                    type="text"
                    name="cardNumber"
                    placeholder="Введите номер карты"
                    label="Номер карты"
                    width="available"
                    component={Input}
                  />
                  <ErrorMessage name="cardNumber" component="div" />
                </div>

                <div>
                  <Field
                    type="text"
                    name="cardHolder"
                    placeholder="Введите Фамилию и Имя"
                    label="Фамилия Имя"
                    width="available"
                    component={Input}
                  />
                  <ErrorMessage name="cardHolder" component="div" />
                </div>
                <SmallInputsContainer>
                  <SmallInputsSlot>
                    <Field
                      type="text"
                      name="cardMonth"
                      label="MM"
                      width="available"
                      component={Input}
                    />
                    <ErrorMessage name="cardMonth" component="div" />
                  </SmallInputsSlot>

                  <SmallInputsSlot>
                    <Field
                      type="text"
                      name="cardYear"
                      label="YY"
                      width="available"
                      component={Input}
                    />
                    <ErrorMessage name="cardYear" component="div" />
                  </SmallInputsSlot>
                </SmallInputsContainer>
              </PlasticCardInner>
            </PlasticCard>

            <PlasticCardBackdrop>
              <CVVContainer>
                <CVVInputsSlot>
                  <Field
                    type="text"
                    name="cardCVV"
                    label="CVV"
                    width="available"
                    component={Input}
                  />
                  <ErrorMessage name="cardCVV" component="div" />
                  <CVVNotice>Три цифры на&nbsp;обороте карты</CVVNotice>
                </CVVInputsSlot>
              </CVVContainer>
            </PlasticCardBackdrop>
          </Container>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Card;
