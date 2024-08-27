import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { setCredentials } from "../slices/authslice";
import { useRegisterMutation } from "../slices/usersapislice";
import Loader from "../components/Loader";
const RegisterScreen = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register,{isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate, userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!=confirmpassword){
            toast.error('Passwords do not match');
        }
        else
        {
            try {
                const res = await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}))
                toast.success('User signed up')
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Enter email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label>Enter password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="confirmpassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Enter confirm password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}></Form.Control>
            </Form.Group>
            {isLoading && <Loader/>}
            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
            <Row className="py-3">
                <Col>
                Already have an account?
                <Link to='/login'>Sign In</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen