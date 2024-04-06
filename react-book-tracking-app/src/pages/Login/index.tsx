import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";

import { CustomInput } from "../../components/UI/CustomInput";
import { PasswordInput } from "../../components/UI/PasswordInput";
import { FormButton } from "../../components/UI/FormButton";

import { UserData, useLoginMutation } from "../../app/services/authApi";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/ErrorMessage";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");

  const onSubmit = async (data: UserData) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <>
      <Row align="middle" justify="center">
        <Card title="Sign in" style={{ width: "30rem" }}>
          <Form onFinish={onSubmit}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <FormButton type="primary" htmlType="submit">
              Sign in
            </FormButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </>
  );
};
