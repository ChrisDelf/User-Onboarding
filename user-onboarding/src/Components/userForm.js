import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({errors, touched, values}) => {
  return (
    <div>
      <h2>New User Form</h2>
      <Form>
        <Field type="text" name="name" placeholder="Name..." />
        <Field type="text" name="email" placeholder="email..." />
        <Field type="text" name="password" placeholder="password.." />
        <label className="checkbox-container">
          Do you accept the terms of service?
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
        </label>
        <button type="submit">Create Account</button>
      </Form>
    </div>
  );
};

//===== Time to use a Higher Order Component
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    };
  },
  //=== ValidationSchema nice tool to inculde error messages

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    email: Yup.string().required('Enter an email'),
    password: Yup.string().required('Create a password'),
    terms: Yup.boolean().required('Please accept the terms of serivce'),
  }),
 handleSubmit(values) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
