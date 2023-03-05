import { Avatar, Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, PROFILE_PATH } from "../../api";
import ImageUpload from "../imageUpload/ImageUpload";
import axios from "axios";
import { AuthenticationContext } from "../../App";
import Posts from "../posts/Posts";

const imageUrls = [
  "https://th-thumbnailer.cdn-si-edu.com/LlpzsawSAkSUDonNwEd0zQrQaR4=/fit-in/1600x0/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
  "https://www.countrysideveterinaryclinic.org/sites/default/files/interesting-cat-facts.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9P7FiFeJyCDOxdmCG2qeOnjCeRzPYj3v8FA&usqp=CAU",
  "https://beta.cp24.com/content/dam/ctvnews/images/2022/7/8/1_5978274.jpg?cache_timestamp=1657295157447",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReLDHsAIhgLgFpupyZg0CtevFcI2NY9WkoOQ&usqp=CAU",
  "https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/pallas-cat-001-dsc02194-skip-brown.jpg?itok=s2uY0DW3",
];

function MyProfile() {
  const { user, setUser } = useContext(AuthenticationContext);
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);
  const [selectedBanner, setSelectedBanner] = React.useState(null);

  const [, setPreview] = useState();

  useEffect(() => {
    if (!selectedAvatar) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreview(objectUrl);
    handleUploadImage("avatar");
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  useEffect(() => {
    if (!selectedBanner) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedBanner);
    setPreview(objectUrl);
    handleUploadImage("banner");
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedBanner]);

  async function handleUploadImage(key) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${PROFILE_PATH}${user?.name}/media`,
        {
          [key]: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        setUser({
          avatar: response.data.avatar,
          name: response.data.name,
          banner: response.data.banner,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(user);

  return (
    <div>
      <Box
        sx={{
          margin: "auto",
          maxWidth: 1050,
          position: "relative",
          backgroundColor: "violet",
          maxHeight: 320,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          borderRadius: 3,
        }}
      >
        <Box
          src={user?.banner}
          component="img"
          sx={{ width: "100%", height: "100%", borderRadius: 3 }}
        />{" "}
        <Avatar
          sx={{
            position: "absolute",
            border: 5,
            borderColor: "white",
            top: "75%",
            width: 150,
            height: 150,
          }}
          src={user?.avatar}
        />
        <ImageUpload setSelectedFile={setSelectedAvatar} />
        <ImageUpload setSelectedFile={setSelectedBanner} banner />
      </Box>
      <Typography
        align="center"
        sx={{
          fontWeight: "600",
          fontSize: "2rem",
          position: "relative",
          marginTop: "5rem",
          marginBottom: "3rem",
          "@media screen and (max-width: 900px)": {
            marginTop: "5.3rem",
          },
          "@media screen and (max-width: 800px)": {
            marginTop: "5.9rem",
          },
          "@media screen and (max-width: 710px)": {
            marginTop: "6.5rem",
          },
          "@media screen and (max-width: 600px)": {
            marginTop: "5.8rem",
          },
          "@media screen and (max-width: 500px)": {
            marginTop: "6.6rem",
          },
          "@media screen and (max-width: 420px)": {
            marginTop: "7rem",
          },
        }}
      >
        {user?.name}
      </Typography>
      <Posts />
    </div>
  );
}

export default MyProfile;
