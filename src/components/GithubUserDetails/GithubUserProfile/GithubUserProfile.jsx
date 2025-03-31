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
          <p className={profile.error ? styles.error : ""}>
            📝 {profile.error ? "ERROR: AGENT DISCONTINUED" : profile.bio}
          </p>
          <p className={profile.error ? styles.error : ""}>
            🌎 {profile.error ? "ERROR: AGENT DISCONTINUED" : profile.location}
          </p>
        </div>
      </div>
    </div>
  );
}
