import { useRef } from "react";
import styles from "./GithubUserRepos.module.css";
import useTypingRender from "../../../hooks/useTypingRender";

export default function GithubUserRepos({ repos }) {
  const elements = useRef({
    title: null,
  });

  let texts = {
    title: `Repositories (${repos.length})`,
    empty: "Nothing to see here",
  };
  repos.forEach((repo, i) => {
    texts = {
      ...texts,
      [`repoName${i}`]: repo.name,
      [`repoDesc${i}`]: repo.desc,
    };
    repo.langs.forEach((lang, j) => {
      texts = {
        ...texts,
        [`repo${i}Lang${j}`]: lang,
      };
    });
  });

  useTypingRender(elements, texts);

  const assign = (element, refName) => {
    elements.current = { ...elements.current, [refName]: element };
  };

  return (
    <div className={styles.repos}>
      <h3 ref={(el) => assign(el, "title")}>{texts.title}</h3>
      <ul>
        {!repos.length ? (
          <li ref={(el) => assign(el, "empty")}>{texts.empty}</li>
        ) : (
          repos.map((repo, i) => (
            <li key={repo.id}>
              <a
                href={repo.link}
                target="_blank"
                rel="noreferrer"
                ref={(el) => assign(el, `repoName${i}`)}
              >
                {texts[`repoName${i}`]}
              </a>

              <p ref={(el) => assign(el, `repoDesc${i}`)}>
                {texts[`repoDesc${i}`]}
              </p>

              <ul className={styles.langList}>
                {repo.langs.map((_, j) => (
                  <li
                    key={crypto.randomUUID()}
                    ref={(el) => assign(el, `repo${i}Lang${j}`)}
                  >
                    {texts[`repo${i}Lang${j}`]}
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
