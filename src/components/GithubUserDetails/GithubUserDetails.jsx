import { Fragment } from "react";
import styles from "./GithubUserDetails.module.css";
import Loader from "../Loader/Loader";
import GithubUserProfile from "../GithubUserDetails/GithubUserProfile/GithubUserProfile";
import GithubUserRepos from "../GithubUserDetails/GithubUserRepos/GithubUserRepos";

export default function GithubUserDetails({
  userInfos,
  loading,
  terminalTurnedOn,
  usersList,
}) {
  if (loading)
    return (
      <div className={styles.computer}>
        <Loader />
      </div>
    );

  if (terminalTurnedOn && !userInfos)
    return (
      <div className={styles.computer}>
        <p className={styles.textCursor}>
          {!usersList && "Try typing something in the search bar first"}
          {usersList?.total_count === 0 && "Better luck next time"}
          {usersList?.total_count > 0 &&
            "Select a profile in the list to see more details"}
        </p>
      </div>
    );

  return (
    <div
      className={styles.computer}
      style={
        !userInfos || !terminalTurnedOn
          ? { backgroundColor: "var(--darker-color)" }
          : {}
      }
    >
      {userInfos && terminalTurnedOn ? (
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
