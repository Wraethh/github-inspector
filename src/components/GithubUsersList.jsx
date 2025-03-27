export default function GithubUsersList({ userList, loading }) {
  if (loading) return <p>loading...</p>;
  if (!userList) return <p>Commencer ma recherche</p>;

  return userList?.length ? (
    <ul>
      {userList.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  ) : (
    <p>Aucun utilisateur trouvé</p>
  );
}
