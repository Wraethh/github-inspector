import styles from "./GithubUsersList.module.css";
import GithubUserItem from "./GithubUserItem/GithubUserItem";
import Loader from "../Loader/Loader";
import { useState } from "react";

export default function GithubUsersList({
  userList,
  loading,
  handleClickItem,
  headerHeight,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (e) => {
    handleClickItem(e);
    setSelectedItem(e.target.textContent);
  };

  if (loading) return <Loader />;
  if (!userList) return <p>Waiting for your input...</p>;

  return userList?.items.length ? (
    <div
      className={styles.list}
      style={{ maxHeight: `calc(100% - ${headerHeight}px)` }}
    >
      <p>Results : {userList.total_count}</p>
      {userList.total_count > 30 && <p>Best profiles :</p>}
      <ul>
        {userList.items.map((user) => (
          <GithubUserItem
            key={user.id}
            username={user.login}
            handleClickItem={handleClick}
            selected={selectedItem === user.login}
          />
        ))}
      </ul>
    </div>
  ) : (
    <p>No hacker match that name</p>
  );
}
