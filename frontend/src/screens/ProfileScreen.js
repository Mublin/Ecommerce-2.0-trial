import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state,  action) => {
    switch (action.type){
      case "UPDATE_REQUEST":
        return {...state, loadingUpdate: true}
      case "UPDATE_SUCCESS":
        return {...state, loadingUpdate: false}
      case "UPDATE_FAIL":
        return {...state, loadingUpdate: false}
      default:
        return state
    }
  }

export default function ProfileScreen() {
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_REQUEST"})
        try {
            if (password === confirmPassword){
            const {data} = await axios.put(`http://localhost:5090/api/users/profile`, {
                name,
                email,
                password
            },{
                headers: { Authorization: `Bearer ${userInfo.token}`}
            })
            dispatch({type: "UPDATE_SUCCESS"})
            ctxDispatch({ type: "USER_SIGNIN", payload: data})
            localStorage.setItem("userInfo", JSON.stringify(data))
            toast.success("User Updated successfully")} else{
                toast.error("Password do not match")
            }
        } catch (error) {
            dispatch({type: "UPDATE_FAIL"})
            toast.error(getError(error))
        }
    }

    return(
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name}
                    onChange={(e)=> setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control value={email} type="email"
                    onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type="password"
                    onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={confirmPassword} type="password"
                    onChange={(e)=> setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </Form>
        </div>
    )
}