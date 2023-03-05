import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { BASE_URL, POSTS_PATH } from "../../api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";

import styles from "./Posts.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import TocIcon from "@mui/icons-material/Toc";

const schema = yup.object().shape({
  title: yup.string().required("Please enter title"),
  body: yup.string(),
  media: yup.string().nullable(),
});

// ************ ADD TAGS AND MEDIA FIELDS **********************
function PostForm(props) {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(props.post);
  }, [props.post]);

  async function handleCreatePost() {
    try {
      const response = await axios.post(
        `${BASE_URL}/${POSTS_PATH}`,
        getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        toast.success("You have created a post");
        navigate("/posts");
      }
    } catch (error) {}
  }
  console.log(errors);

  async function handleEditPost() {
    try {
      const response = await axios.put(
        `${BASE_URL}/${POSTS_PATH}/${params.id}`,
        getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        toast.success("Your post is edited");
        navigate("/posts");
      }
    } catch (error) {
      toast.error("Your can't edit posts created by other users");
    }
  }

  const onSubmit = props.edit ? handleEditPost : handleCreatePost;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h2>{props.edit ? "Edit Post" : "Create Post"}</h2>
        <div className={styles.linkContainer}>
          <Form.Control
            className={styles.input}
            placeholder="Type in title"
            {...register("title")}
          />
          {errors.title && <div>{errors.title.message}</div>}

          <Form.Control
            as="textarea"
            rows={3}
            className={styles.input}
            placeholder="Write some text"
            {...register("body")}
          />
          {errors.body && <div>{errors.body.message}</div>}
          <hr />
          <div className={styles.postIcons}>
            <span>
              <AddAPhotoIcon
                sx={{
                  marginRight: "2.5rem",
                  "@media screen and (max-width: 680px)": {
                    marginRight: "1rem",
                  },
                }}
              />
              <TocIcon
                sx={{
                  marginRight: "2.5rem",
                  "@media screen and (max-width: 680px)": {
                    marginRight: "1rem",
                  },
                }}
              />
              <AddLocationAltIcon />
            </span>
            <span>
              <button type="submit" className={styles.btn}>
                {props.edit ? "Edit Post" : "Create Post"}
              </button>
            </span>
          </div>
        </div>
      </Form>
    </>
  );
}

export default PostForm;
