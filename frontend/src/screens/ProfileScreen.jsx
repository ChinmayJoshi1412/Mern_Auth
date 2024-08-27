import { useState, useEffect } from "react";
import {Form, Button,} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { setCredentials } from "../slices/authslice";
import Loader from "../components/Loader";
import {useUpdateUserMutation} from '../slices/usersapislice'
const ProfileScreen = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [updateprofile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
       setname(userInfo.name);
       setemail(userInfo.email); 
    },[userInfo.setname, userInfo.setemail]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!=confirmpassword){
            toast.error('Passwords do not match');
        }
        else
        {
           try {
            const res = await updateprofile({
                _id: userInfo._id,
                name,
                email,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile updated');
           } catch (err) {
            toast.error(err?.data?.message||err.error)
           }
        }
    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>
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
            <Button type="submit" variant="primary" className="mt-3">Update</Button>
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen