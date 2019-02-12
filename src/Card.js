import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import isCreditCard from 'validator/lib/isCreditCard';
import Input from 'arui-feather/input';

const PlasticCard = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background: #f0f0ee;
`;

const PlasticCardInner = styled.div`
  padding: 30px;
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

              <div>
                <Field
                  type="text"
                  name="cardMonth"
                  label="MM"
                  width="available"
                  component={Input}
                />
                <ErrorMessage name="cardMonth" component="div" />
              </div>

              <div>
                <Field
                  type="text"
                  name="cardYear"
                  label="YY"
                  width="available"
                  component={Input}
                />
                <ErrorMessage name="cardYear" component="div" />
              </div>

              <div>
                <Field
                  type="text"
                  name="cardCVV"
                  label="CVV"
                  width="available"
                  component={Input}
                />
                <ErrorMessage name="cardCVV" component="div" />
              </div>
            </PlasticCardInner>
          </PlasticCard>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Card;
