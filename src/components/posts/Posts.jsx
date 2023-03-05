import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL, POSTS_PATH } from "../../api";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Posts() {
  const [posts, setPosts] = React.useState();

  async function handleDelete(postId) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${POSTS_PATH}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts((posts) => posts.filter((post) => post.id !== postId));
        toast.success("Success");
      }
    } catch (error) {
      toast.error("You cannot delete posts that are not yours");
    }
  }

  async function handleLike(postId) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${POSTS_PATH}/${postId}/react/❤️`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts((previousState) =>
          previousState.map((post) => {
            if (post.id === postId) {
              return { ...post, likeCount: response.data.count };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPosts() {
    try {
      const response = await axios.get(`${BASE_URL}/${POSTS_PATH}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={styles.postsContainer}>
      <PostForm />
      <hr />
      <div className={styles.container}>
        <h3>All Posts</h3>
        <ul className={styles.container}>
          {posts?.map((post) => (
            <li key={post.id} className={styles.linkContainer}>
              <Link to={`/posts/${post.id}`} className={styles.link}>
                {post.title}
              </Link>
              <br />
              <Link to={`/posts/${post.id}`} className={styles.linkBody}>
                {post.body}
              </Link>
              <div className={styles.btnDelLike}>
                <button
                  onClick={() => handleLike(post.id)}
                  className={styles.btnLike}
                >
                  <FavoriteIcon />
                  {post.likeCount ? `(${post.likeCount})` : ""}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className={styles.btnDelete}
                >
                  <DeleteIcon />
                </button>
                <Link to={`/posts/${post.id}`} className={styles.editBtn}>
                  <EditIcon />
                </Link>
              </div>
              <hr />
              <CommentForm postId={post.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
