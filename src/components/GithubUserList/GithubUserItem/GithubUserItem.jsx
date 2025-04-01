import styles from "./GithubUserItem.module.css";
import PropTypes from "prop-types";
export default function GithubUserItem({
  username,
  handleClickItem,
  selected,
}) {
  return (
    <li className={styles.item} onMouseOver={(e) => e.target.blur()}>
      <button
        onClick={handleClickItem}
        className={selected ? styles.selected : ""}
        title={username}
      >
        {username}
      </button>
    </li>
  );
}

GithubUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  handleClickItem: PropTypes.func.isRequired,
};
