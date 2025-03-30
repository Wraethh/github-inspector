import styles from "./GithubUserRepos.module.css";

export default function GithubUserRepos({ repos }) {
  return (
    <div className={styles.repos}>
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
  );
}
