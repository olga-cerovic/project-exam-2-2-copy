import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL, PROFILE_PATH } from "../../api";
import { Link } from "react-router-dom";
import styles from "./Profiles.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Profiles() {
  const [profiles, setProfiles] = React.useState();

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
      <h3 className={styles.allProfiles}>All Profiles</h3>
      <ul>
        {profiles?.map((profile) => (
          <li key={profile.name}>
            <AccountCircleIcon sx={{ marginRight: "2rem" }} />
            <Link to={`/profiles/${profile.name}`} className={styles.link}>
              {profile.name}
            </Link>
            {/* <button onClick={() => handleDelete(profile.id)}>DELETE</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;
