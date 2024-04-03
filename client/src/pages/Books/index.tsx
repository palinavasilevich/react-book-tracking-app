import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import {
  useAddBookMutation,
  useGetAllBooksQuery,
  useLazyGetAllBooksQuery,
} from "../../app/services/booksApi";
import { ColumnsType } from "antd/es/table";
import { Book } from "../../types";

import { formatToDate } from "../../utils/formatToDate";

import { selectUser } from "../../features/auth/authSlice";

import { BookForm } from "../../components/BookForm";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

import { useModal } from "../../hooks/useModal";

import { useNotificationAntd } from "../../hooks/useNotificationAntd";

const columns: ColumnsType<Book> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },

  {
    title: "Date",
    dataIndex: "readDate",
    key: "readDate",
    render: date => formatToDate(date),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
];

export const Books = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState("");

  const { isModalOpen, showModal, closeModal } = useModal();

  const [addBook] = useAddBookMutation();
  const [triggerAllBooks] = useLazyGetAllBooksQuery();

  const { data: books, isLoading } = useGetAllBooksQuery();

  const { contextHolder, openNotificationWithIcon } = useNotificationAntd();

  const handleAddBook = async (data: Book) => {
    setConfirmLoading(true);
    try {
      await addBook(data).unwrap();
      await triggerAllBooks().unwrap();
      openNotificationWithIcon("success", {
        message: "Book successfully created",
      });
    } catch (error) {
      if (isErrorWithMessage(error)) {
        // setError(error.data.message);
        openNotificationWithIcon("error", { message: error.data.message });
      } else {
        setError("Unknown error");
      }
    } finally {
      closeModal();
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: "1.5rem" }}
      >
        Add book
      </Button>

      <Table
        dataSource={books}
        loading={isLoading}
        pagination={false}
        columns={columns}
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: () => navigate(`/books/${record.id}`),
          };
        }}
      />

      <Modal
        title="Add book"
        open={isModalOpen}
        confirmLoading={confirmLoading}
        onCancel={closeModal}
        footer={null}
      >
        <BookForm onFinish={handleAddBook} btnText="Add book" error={error} />
      </Modal>
    </>
  );
};
