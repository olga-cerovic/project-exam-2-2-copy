import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BASE_URL, PROFILE_PATH } from "../../api";
import styles from "./Profiles.module.css";

function Profiles(props) {
  const [profiles, setProfiles] = React.useState();
  const { title } = props;

  async function getAllProfiles() {
    try {
      const response = await axios.get(`${BASE_URL}/${PROFILE_PATH}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div>
      <h3 className={styles.allProfiles}>{title ?? "All Profiles"}</h3>
      <ul>
        {profiles?.map((profile) => (
          <li key={profile.name}>
            <AccountCircleIcon
              sx={{
                marginRight: "1.4rem",
                fontSize: "3.5rem",
              }}
            />
            <Link to={`/profiles/${profile.name}`} className={styles.link}>
              {profile.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;
