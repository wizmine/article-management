import React from "react";
import { Button, Checkbox, Form, type FormProps, Input, Flex } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchRegister } from "../redux/slices/auth";

type FieldType = {
  login: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!values.isAdmin) {
      values.isAdmin = false;
    }
    const data = await dispatch(fetchRegister(values));
    console.log(values);

    if (!data.payload) {
      return alert("Failed to registration!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log(errorInfo);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Flex align="center" justify="center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ adminPanel: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Login"
          name="login"
          rules={[{ required: true, message: "Please input your login!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!", type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="isAdmin"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>Access to admin panel</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Link to="/login">Login</Link>
      </Form>
    </Flex>
  );
};

export default Registration;
