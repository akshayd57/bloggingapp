
import * as Yup from 'yup';

const validator = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required')
});

export default validator;
