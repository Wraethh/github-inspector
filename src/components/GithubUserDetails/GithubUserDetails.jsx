import { Fragment } from "react";
import styles from "./GitHubuserDetails.module.css";
import Loader from "../Loader/Loader";
import GithubUserProfile from "../GithubUserDetails/GithubUserProfile/GithubUserProfile";
import GithubUserRepos from "../GithubUserDetails/GithubUserRepos/GithubUserRepos";

export default function GithubUserDetails({ userInfos, loading, powerOff }) {
  const [profile, repos] = userInfos ?? [];

  if (loading)
    return (
      <div className={styles.computer}>
        <Loader />
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
          <GithubUserProfile profile={profile} />
          <GithubUserRepos repos={repos} />
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
