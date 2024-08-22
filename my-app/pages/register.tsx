import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '../interface/User';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Validator from "../validator/validator";
import { useState } from 'react';


const Register = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (values: Omit<User, 'id'>) => {
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3001/users/register', values);
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div  style={{ maxWidth: '600px',  paddingLeft: '400px', paddingBottom:"50px",border: '5px solid #ddd', borderRadius: '50px',marginLeft:"200px",marginTop:"50px" }} >
      <h1>Register</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
                  password: '',
        
        }}
        validationSchema={Validator}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <br />

            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <br />

            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
<br />
            <div>
              <Field type="password" name="password" placeholder="Enter the password" />
              <ErrorMessage name="password" component="div"  />
            </div>
<br />
            <div>
              <Field type="number" name="age" placeholder="Age" />
              <ErrorMessage name="age" component="div" />
            </div>
<br />
            <div>
                <Field type="text" name="city" placeholder="Enter the city name" />
                <ErrorMessage name="city" component="div" />
            </div>
<br />
            <button type="submit" disabled={isSubmitting}  style={{border:"1px solid",  marginLeft:"50px"}}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
