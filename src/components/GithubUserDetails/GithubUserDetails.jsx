import { Fragment } from "react";
import styles from "./GitHubuserDetails.module.css";
import Loader from "../Loader/Loader";
import GithubUserProfile from "../GithubUserDetails/GithubUserProfile/GithubUserProfile";
import GithubUserRepos from "../GithubUserDetails/GithubUserRepos/GithubUserRepos";

export default function GithubUserDetails({
  userInfos,
  loading,
  powerOff,
  searchedOnce,
}) {
  if (loading)
    return (
      <div className={styles.computer}>
        <Loader />
      </div>
    );

  if (!powerOff && !searchedOnce)
    return (
      <div className={styles.computer}>
        <p>Start by entering something in the input :)</p>
      </div>
    );

  return (
    <div
      className={styles.computer}
      style={
        !userInfos || powerOff ? { backgroundColor: "var(--darker-color)" } : {}
      }
    >
      {userInfos && !powerOff ? (
        <Fragment>
          <GithubUserProfile profile={userInfos.profile} />
          <GithubUserRepos repos={userInfos.repos} />
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
