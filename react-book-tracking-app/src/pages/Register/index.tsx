import { FC, useState } from "react";
import { Card, Form, Row, Space, Typography } from "antd";

import { CustomInput } from "../../components/UI/CustomInput";
import { PasswordInput } from "../../components/UI/PasswordInput";
import { FormButton } from "../../components/UI/FormButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/authApi";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { User } from "../../types";
import { ErrorMessage } from "../../components/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");

  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message);
      } else {
        setError("Error");
      }
    }
  };

  return (
    <>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <FormButton type="primary" htmlType="submit">
              Sign up
            </FormButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already have an account? <Link to="/login">Sign in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </>
  );
};
