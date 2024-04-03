import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
import { FC } from "react";

type Props = {
  name: string;
  placeholder?: string;
  dependencies?: NamePath[];
};

export const PasswordInput: FC<Props> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback={true}
      rules={[
        { required: true, message: "Required field" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Passwords must be same"));
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Password must be more than 6 characters"),
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
