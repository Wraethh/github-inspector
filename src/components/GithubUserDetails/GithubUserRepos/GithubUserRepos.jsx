import styles from "./GithubUserRepos.module.css";

export default function GithubUserRepos({ repos }) {
  return (
    <div className={styles.repos}>
      <h3>Repositories ({repos.length})</h3>
      <ul>
        {!repos.length ? (
          <li>Nothing to see here</li>
        ) : (
          repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.link} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              <p>{repo.desc}</p>
              <ul className={styles.langList}>
                {repo.langs.map((lang) => (
                  <li key={crypto.randomUUID()}>{lang}</li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
