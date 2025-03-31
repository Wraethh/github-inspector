import styles from "./GithubUserProfile.module.css";

export default function GithubUserProfile({ profile }) {
  return (
    <div className={styles.profile}>
      <div className={styles.picture}>
        <a href={profile.link} target="_blank" rel="noreferrer">
          <img src={profile.avatar} alt={`${profile.username}'s avatar`} />
        </a>
      </div>
      <div className={styles.details}>
        <h2 title={profile.username}>{profile.username}</h2>
        <div>
          <p>📝 {profile.bio ? profile.bio : "Aucune information"}</p>
          <p>🌎 {profile.location ? profile.location : "???"}</p>
        </div>
      </div>
    </div>
  );
}
