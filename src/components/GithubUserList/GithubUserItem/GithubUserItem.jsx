import styles from "./GithubUserItem.module.css";
import PropTypes from "prop-types";
export default function GithubUserItem({ username, handleClickItem }) {
  return (
    <li className={styles.item}>
      <button onClick={handleClickItem}>{username}</button>
    </li>
  );
}

GithubUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  handleClickItem: PropTypes.func.isRequired,
};
