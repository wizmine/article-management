import { Button, Form, type FormProps, Input, Flex } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchAuth } from "../redux/slices/auth";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(data);

    if (!data.payload) {
      return alert("Failed to login!");
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Link to="/register">Register</Link>
      </Form>
    </Flex>
  );
};

export default Login;
