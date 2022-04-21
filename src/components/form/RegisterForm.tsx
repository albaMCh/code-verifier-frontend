import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/authService";
import { AxiosResponse } from "axios";

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Login Component
const RegisterForm = () => {
  // We define the initial credentials
  const initialCredentials = {
    name: "",
    age: "",
    email: "",
    password: "",
    password2: "",
  };

  const validateConfirmPassword = (pass: string, value: string) => {
    let error = "";
    if (pass && value) {
      if (pass !== value) {
        error = "Password not matched";
      }
    }
    return error;
  };

  return (
    <div>
      <h4>Register Form</h4>
      {/* Formik to encapsulate a Form */}
      <Formik
        initialValues={initialCredentials}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          login(values.email, values.password)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                if (response.data.token) {
                  sessionStorage.setItem(
                    "sessionJWTToken",
                    response.data.token
                  );
                } else {
                  throw new Error("Error generating Login Token");
                }
              } else {
                throw new Error("Invalid Credentials");
              }
            })
            .catch((error) =>
              console.error(`[LOGIN ERROR]: Something went wrong: ${error}`)
            );
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          isValid,
        }) => (
          <Form>
            {/* Name Field */}
            <label htmlFor="name">Name</label>
            <Field id="name" type="name" name="name" placeholder="name" />
            {/* Name Errors */}
            {errors.name && touched.name && (
              <ErrorMessage name="name" component="div"></ErrorMessage>
            )}

            {/* Age Field */}
            <label htmlFor="">Age</label>
            <Field id="age" type="age" name="age" placeholder="age" />

            {/* Name Errors */}
            {errors.age && touched.age && (
              <ErrorMessage name="age" component="div"></ErrorMessage>
            )}

            {/* Email Field */}
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
            />

            {/* Email Errors */}
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            {/* Password Field */}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="example"
            />

            {/* Password Errors */}
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div"></ErrorMessage>
            )}

            {/* Password Field */}
            <label htmlFor="password2">Password2</label>
            <Field
              id="password2"
              type="password"
              name="password2"
              placeholder="example"
              validate={(value: any) =>
                validateConfirmPassword(values.password, value)
              }
            />

            {/* Password 2 Errors */}
            {errors.password2 && touched.password2 && (
              <ErrorMessage name="password2" component="div"></ErrorMessage>
            )}

            {/* SUBMIT FORM */}
            <button type="submit" disabled={!isValid}>
              Register
            </button>

            {/* Message if the form is submitting */}
            {isSubmitting ? <p>Checking credentials...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
