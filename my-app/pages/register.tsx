
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import validator from "../validator/validator"

const Register = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            role: '', 
            status: ''
        },
        validationSchema: validator,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('role', values.role || ''); 
            formData.append('status', values.status || '');
            if (file) {
                formData.append('file', file);
            }

            try {
                const response = await axios.post('http://localhost:3001/users/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error registering user');
            }
        }
    });

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username ? <div>{formik.errors.username}</div> : null}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                </div>

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
