import React from "react";
import { Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import styles from "./ImageUpload.module.css";

function ImageUpload(props) {
  const { setSelectedFile } = props;

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        minWidth: 45,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 1.3,
        paddingBottom: 1.3,
        position: "absolute",
        left: props.banner ? "90%" : "55%",
        top: props.banner ? "85%" : "112%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#DEDEDE",
        borderRadius: "100%",
        boxShadow: "none",
        border: "none",
        "&:hover": {
          backgroundColor: "#DEDEDE",
        },
        "@media screen and (max-width: 1100px)": {
          left: props.banner ? "90%" : "57%",
        },
        "@media screen and (max-width: 900px)": {
          top: props.banner ? "85%" : "115%",
          left: props.banner ? "90%" : "60%",
        },
        "@media screen and (max-width: 790px)": {
          top: props.banner ? "85%" : "118%",
          left: props.banner ? "90%" : "63%",
        },
        "@media screen and (max-width: 720px)": {
          top: props.banner ? "85%" : "121%",
          left: props.banner ? "90%" : "66%",
        },
        "@media screen and (max-width: 670px)": {
          top: props.banner ? "85%" : "127%",
          left: props.banner ? "90%" : "68%",
        },
        "@media screen and (max-width: 650px)": {
          top: props.banner ? "85%" : "133%",
        },
        "@media screen and (max-width: 600px)": {
          top: props.banner ? "85%" : "118%",
          left: props.banner ? "90%" : "60%",
        },
        "@media screen and (max-width: 550px)": {
          top: props.banner ? "85%" : "121%",
          left: props.banner ? "90%" : "62%",
        },
        "@media screen and (max-width: 490px)": {
          top: props.banner ? "85%" : "124%",
          left: props.banner ? "90%" : "65%",
        },
        "@media screen and (max-width: 440px)": {
          top: props.banner ? "85%" : "128%",
          left: props.banner ? "90%" : "67%",
        },
        "@media screen and (max-width: 420px)": {
          top: props.banner ? "85%" : "130%",
        },
        "@media screen and (max-width: 420px)": {
          top: props.banner ? "85%" : "132%",
          left: props.banner ? "90%" : "69%",
        },
      }}
    >
      <PhotoCameraIcon className={styles.icon} />
      <input onChange={handleCapture} hidden accept="image/*" type="file" />
    </Button>
  );
}

export default ImageUpload;
