import { FC } from "react";
import { Card, Form, Row, Space, Typography } from "antd";

import { CustomInput } from "../../components/UI/CustomInput";
import { PasswordInput } from "../../components/UI/PasswordInput";
import { FormButton } from "../../components/UI/FormButton";
import { Link } from "react-router-dom";

export const Register: FC = () => {
  return (
    <>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
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
          </Space>
        </Card>
      </Row>
    </>
  );
};
