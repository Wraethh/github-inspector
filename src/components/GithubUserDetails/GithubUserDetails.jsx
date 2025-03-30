export default function GithubUserDetails({ userInfos, loading }) {
  const [profile, repos] = userInfos ?? [];

  if (loading) return <p>loading...</p>;

  return userInfos ? (
    <div className="computer">
      <div className="profile">
        <div className="details">
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <p>{profile.location}</p>
        </div>
        <div className="picture">
          <a href={profile.link} target="_blank" rel="noreferrer">
            <img src={profile.avatar} alt={`${profile.username}'s avatar`} />
          </a>
        </div>
      </div>

      <div className="repos">
        <h3>Repositories ({repos.length})</h3>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.link} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              <p>{repo.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    ""
  );
}
