import { useRef } from "react";
import styles from "./GithubUserProfile.module.css";
import useTypingRender from "../../../hooks/useTypingRender";

export default function GithubUserProfile({ profile }) {
  const elements = useRef({
    name: null,
    bio: null,
    location: null,
  });

  const texts = {
    name: profile.username,
    bio: `📝 ${profile.error ? "ERROR: AGENT DISCONTINUED" : profile.bio}`,
    location: `🌎 ${
      profile.error ? "ERROR: AGENT DISCONTINUED" : profile.location
    }`,
  };

  useTypingRender(elements, texts);

  return (
    <div className={styles.profile}>
      <div className={styles.picture}>
        <a href={profile.link} target="_blank" rel="noreferrer">
          <img src={profile.avatar} alt={`${profile.username}'s avatar`} />
        </a>
      </div>
      <div className={styles.details}>
        <h2 title={profile.username} ref={(el) => (elements.current.name = el)}>
          {texts.name}
        </h2>
        <div>
          <p
            className={profile.error ? styles.error : undefined}
            ref={(el) => (elements.current.bio = el)}
          >
            {texts.bio}
          </p>
          <p
            className={profile.error ? styles.error : undefined}
            ref={(el) => (elements.current.location = el)}
          >
            {texts.location}
          </p>
        </div>
      </div>
    </div>
  );
}
