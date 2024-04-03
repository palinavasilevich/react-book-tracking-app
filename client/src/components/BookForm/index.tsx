import { FC } from "react";
import { Form, Rate, Space, DatePicker } from "antd";

import { Book } from "../../types";
import { CustomInput } from "../UI/CustomInput";
import { FormButton } from "../UI/FormButton";
import { ErrorMessage } from "../ErrorMessage";

import dayjs from "dayjs";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  error?: string;
  book?: T;
  formType?: "create" | "edit";
};

export const BookForm: FC<Props<Book>> = ({
  btnText,
  error,
  book,
  formType = "create",
  onFinish,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: Book) => {
    onFinish(values);
    if (formType === "create") {
      form.resetFields();
    }
  };

  return (
    <Form
      name="book-form"
      form={form}
      onFinish={onSubmit}
      initialValues={{
        ...book,
        readDate: formType === "create" ? dayjs() : book?.readDate,
      }}
    >
      <CustomInput type="text" name="title" placeholder="Title" />
      <CustomInput type="text" name="author" placeholder="Author" />

      <Form.Item name="readDate">
        <DatePicker style={{ width: "100%" }} size="large" />
      </Form.Item>

      <Form.Item name="rating">
        <Rate />
      </Form.Item>
      <Space>
        <ErrorMessage message={error} />
        <FormButton htmlType="submit">{btnText}</FormButton>
      </Space>
    </Form>
  );
};
