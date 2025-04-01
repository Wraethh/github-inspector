import { useEffect, useState } from "react";
import styles from "./GithubUsersList.module.css";
import GithubUserItem from "./GithubUserItem/GithubUserItem";
import Loader from "../Loader/Loader";

export default function GithubUsersList({
  userList,
  loading,
  handleClickItem,
}) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];

    var ro = new ResizeObserver((entries) => {
      for (const _ of entries) {
        setHeaderHeight(header.getBoundingClientRect().height);
      }
    });
    ro.observe(header);

    return () => {
      ro.unobserve(header);
      ro.disconnect();
    };
  }, []);

  if (loading) return <Loader />;
  if (!userList) return <p>Waiting for your input...</p>;

  return userList?.items.length ? (
    <div
      className={styles.list}
      style={{ maxHeight: `calc(100% - ${headerHeight}px)` }}
    >
      <p>Results : {userList.total_count}</p>
      <p>Best profiles :</p>
      <ul>
        {userList.items.map((user) => (
          <GithubUserItem
            key={user.id}
            username={user.login}
            handleClickItem={handleClickItem}
          />
        ))}
      </ul>
    </div>
  ) : (
    <p>No hacker match that name</p>
  );
}
