import styles from "./GithubUsersList.module.css";
import GithubUserItem from "./GithubUserItem/GithubUserItem";
import Loader from "../Loader/Loader";
import { useCallback, useEffect, useRef, useState } from "react";

export default function GithubUsersList({
  userList,
  loading,
  handleClickItem,
  headerHeight,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  // const [showListItem, setShowListItem] = useState([]);
  const listRef = useRef(null);
  const timeoutId = useRef({});

  const handleClick = (e) => {
    handleClickItem(e);
    setSelectedItem(e.target.textContent);
  };

  const addClassToListItems = useCallback(() => {
    const items = Array.from(listRef.current.children);

    items.forEach((item) => {
      item.classList.remove("appear");
    });
    items.forEach((item, i) => {
      timeoutId.current[`item${i}`] = setTimeout(() => {
        item.classList.add("appear");
      }, i * 50);
    });
  }, []);

  useEffect(() => {
    timeoutId.current = {};

    if (listRef.current) {
      addClassToListItems();
    }

    return () => {
      Object.values(timeoutId.current).forEach((id) => clearTimeout(id));
    };
  }, [timeoutId, addClassToListItems, userList]);

  if (loading) return <Loader />;
  if (!userList) return <p>Waiting for your input...</p>;

  return userList?.items.length ? (
    <div
      className={styles.list}
      style={{ maxHeight: `calc(100% - ${headerHeight}px)` }}
    >
      <p>Results : {userList.total_count}</p>
      {userList.total_count > 30 && <p>Best profiles :</p>}
      <ul ref={listRef}>
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
