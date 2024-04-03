import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  Descriptions,
  Divider,
  Flex,
  Image,
  Modal,
  Rate,
  Skeleton,
  Space,
  Spin,
  Typography,
  notification,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useLazyGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../app/services/booksApi";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

import { formatToDate } from "../../utils/formatToDate";

import { ErrorMessage } from "../../components/ErrorMessage";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { useModal } from "../../hooks/useModal";
import { BookForm } from "../../components/BookForm";
import { Book } from "../../types";

import axios from "axios";
import dayjs from "dayjs";
import { useNotificationAntd } from "../../hooks/useNotificationAntd";

export const BookPage: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetBookByIdQuery(params.id || "");
  const [deleteBook] = useDeleteBookMutation();
  const [triggerBookById] = useLazyGetBookByIdQuery();

  const { contextHolder, openNotificationWithIcon } = useNotificationAntd();

  const {
    isModalOpen: isEditBookModalOpen,
    showModal: showEditBookModal,
    closeModal: closeEditBookModal,
  } = useModal();

  const {
    isModalOpen: isDeleteBookModalOpen,
    showModal: showDeleteBookModal,
    closeModal: closeDeleteBookModal,
  } = useModal();

  const user = useSelector(selectUser);

  const [updateBook] = useUpdateBookMutation();

  const [bookCoverISBN, setBookCoverISBN] = useState("");
  const [isLoadingBookCover, setIsLoadingBookCover] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     getBookCover(data.title, data.author);
  //   }
  // }, [data]);

  if (isLoading || isLoadingBookCover) {
    return <Spin size="large" />;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const handleDeleteBook = async () => {
    closeDeleteBookModal();

    try {
      await deleteBook(data.id).unwrap();
      openNotificationWithIcon("success", {
        message: "The book was successfully deleted",
      });
      navigate("/");
    } catch (error) {
      if (isErrorWithMessage(error)) {
        // setError(error.data.message);
        openNotificationWithIcon("error", { message: error.data.message });
      } else {
        setError("Unknown error");
      }
    }
  };

  const handleUpdateBook = async (book: Book) => {
    closeEditBookModal();

    try {
      const editedBook = {
        ...data,
        ...book,
      };

      await updateBook(editedBook).unwrap();
      await triggerBookById(editedBook.id).unwrap();
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  const getBookCover = async (bookTitle: string, authorName: string) => {
    setIsLoadingBookCover(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${bookTitle}&author=${authorName}`,
      );

      setBookCoverISBN(response.data.docs[0].isbn[0]);
    } catch (error) {
    } finally {
      setIsLoadingBookCover(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Typography.Title>{data.title}</Typography.Title>
        {/* <Flex align="center" gap="large" wrap="wrap"> */}
        {/* <Image
            width={250}
            src={`https://covers.openlibrary.org/b/isbn/${bookCoverISBN}-L.jpg`}
          /> */}

        <Descriptions bordered>
          <Descriptions.Item label="Author" span={3}>
            {data.author}
          </Descriptions.Item>

          <Descriptions.Item label="Read date" span={3}>
            {formatToDate(data.readDate)}
          </Descriptions.Item>

          <Descriptions.Item label="Rating" span={3}>
            <Rate disabled defaultValue={data.rating} />
          </Descriptions.Item>
        </Descriptions>
        {/* </Flex> */}
        {user?.id === data.userId && (
          <>
            <Divider orientation="left"></Divider>
            <Space>
              <Button
                shape="round"
                type="default"
                onClick={showEditBookModal}
                icon={<EditOutlined />}
              >
                Edit
              </Button>

              <Button
                shape="round"
                danger
                onClick={showDeleteBookModal}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Space>
          </>
        )}
        <ErrorMessage message={error} />
      </Card>

      <Modal
        title="Confirm deletion"
        open={isDeleteBookModalOpen}
        onOk={handleDeleteBook}
        onCancel={closeDeleteBookModal}
        okText="Confirm"
      >
        Are you sure you want to delete this book?
      </Modal>
      <Modal
        title="Edit book"
        open={isEditBookModalOpen}
        onCancel={closeEditBookModal}
        footer={null}
      >
        <BookForm
          onFinish={handleUpdateBook}
          btnText="Edit"
          formType="edit"
          error={error}
          book={{ ...data, readDate: dayjs(data.readDate) }}
        />
      </Modal>
    </>
  );
};
