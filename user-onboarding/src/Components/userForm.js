import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import UserCard from './UserCard';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './userForm.css'

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  media: {
    height: 200
  }
});
const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    // status sometimes comes through as undefined
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <>
    <div classname= "container2">
    <Card className = {classes.card}>
      <h2>New User Form</h2>
      <Form className = "formCon" render={formikProps => <UserCard {...formikProps} />}>
        <Field type="text" name="name" placeholder="Name..." />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="text" name="email" placeholder="email..." />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="password.." />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Do you accept the terms of service?
          <Field type="checkbox" name="terms" checked={values.terms} />
          {errors.terms && <p className="error">{errors.terms}</p>}
          <span className="checkmark" />
        </label>

        <button type="submit">Create Account</button>
    </Form>
    </Card>
</div>


    <div className ="userCardCon">
    {users.map(user => (<UserCard key = {user.id} props ={user}/>  ))}
    </div>
    </>


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
    terms: Yup.bool().oneOf([true], 'Please accept the terms of serivce')
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        console.log(res);
        console.log(values);
        setStatus(res.data);
         resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
