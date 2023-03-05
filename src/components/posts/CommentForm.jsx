import { Form } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, POSTS_PATH } from "../../api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./CommentForm.module.css";
import CommentIcon from "@mui/icons-material/Comment";

const schema = yup.object().shape({
  body: yup.string().required("Please write a comment"),
});

function CommentForm(props) {
  const [unsuccessfulComment, setUnsuccessfulComment] = useState(null);
  const [successfulComment, setSuccessfulComment] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleComment(data) {
    setUnsuccessfulComment(null);
    setSuccessfulComment(null);
    try {
      const response = await axios.post(
        `${BASE_URL}/${POSTS_PATH}/${props.postId}/comment`,
        {
          body: data.body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status > 199 && response.status < 300) {
        reset();
        setSuccessfulComment("Your comment is posted.");
      }
    } catch (error) {
      setUnsuccessfulComment("Type in comment.");
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(handleComment)}>
        {errors.body && <div>{errors.body.message}</div>}
        <Form.Control
          placeholder="Write a comment..."
          {...register("body")}
          className={styles.comment}
        />
        <div className={styles.form}>
          <CommentIcon className={styles.btn} />
          <button type="Submit" className={styles.commentBtn}>
            Comment
          </button>
        </div>
      </Form>
      <div>{successfulComment}</div>
      <div>{unsuccessfulComment}</div>
    </div>
  );
}

export default CommentForm;
