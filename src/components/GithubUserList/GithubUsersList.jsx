import Loader from "../Loader/Loader";
import GithubUserItem from "./GithubUserItem/GithubUserItem";

export default function GithubUsersList({
  userList,
  loading,
  handleClickItem,
}) {
  if (loading) return <Loader />;
  if (!userList) return <p>Commencer ma recherche</p>;

  return userList?.items.length ? (
    <div>
      <p>Résultats : {userList.total_count}</p>
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
    <p>Aucun utilisateur trouvé</p>
  );
}
