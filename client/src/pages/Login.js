import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message, Button } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:3000/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    // <div className="form-container ">
    //   <Form
    //     layout="vertical"
    //     onFinish={onfinishHandler}
    //     className="register-form"
    //   >
    //     <h3 className="text-center">Login From</h3>

    //     <Form.Item label="Email" name="email">
    //       <Input type="email" required />
    //     </Form.Item>
    //     <Form.Item label="Password" name="password">
    //       <Input type="password" required />
    //     </Form.Item>
    //     <Link to="/register" className="m-2">
    //       Not a user Register here
    //     </Link>
    //     <button className="btn btn-primary" type="submit">
    //       Login
    //     </button>
    //   </Form>
    // </div>

    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Welcome Back</h1>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >

          <Form.Item label='Email' name="email">
          <Input type="email" required />
          </Form.Item>

          <Form.Item label='Password' name="password" type='password'>
            <Input type="password" required />
          </Form.Item>

          <Button className="primary-button" htmlType="submit">login</Button>

          <Link className="ancker" to='/register'>CLICK HERE TO REGISTER</Link>

        </Form>
      </div>
    </div>
  );
};

export default Login;
