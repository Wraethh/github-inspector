import { Fragment, useRef, useState } from "react";
import useResizeObserver from "./hooks/useResizeObserver";
import { githubRequest } from "./libs/utils";
import "./App.css";
import SearchAccountForm from "./components/SearchAccountForm/SearchAccountForm";
import GithubUsersList from "./components/GithubUserList/GithubUsersList";
import GithubUserDetails from "./components/GithubUserDetails/GithubUserDetails";
import anon from "./assets/anon.webp";

function App() {
  const [githubUsers, setGithubUsers] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [searchParams, setSearchParams] = useState({
    loading: {
      list: false,
      details: false,
    },
    prevSearch: null,
    showDetails: false,
    terminalTurnedOn: false,
  });
  const headerRef = useRef(null);
  const headerHeight = useResizeObserver(headerRef, "height");

  const updateLoadingState = (component, state) => {
    setSearchParams((prev) => ({
      ...prev,
      loading: { ...prev.loading, [component]: state },
    }));
  };

  const fetchGithubUsers = (e) => {
    e.preventDefault();
    const request = e.target.search.value;

    if (request && request !== searchParams.prevSearch) {
      updateLoadingState("list", true);
      githubRequest(`https://api.github.com/search/users?q=${request}`).then(
        (data) => {
          setGithubUsers(data);
          setSearchParams((prev) => ({
            ...prev,
            loading: { ...prev.loading, list: false },
            prevSearch: request,
          }));
        }
      );
    }
  };

  const fetchUserInfos = (e) => {
    const username = e.target.textContent;

    if (username === userInfos?.profile.username) {
      /* mobile version needs to be able to reclick on the button to show user details due to layout,
       * so instead of disabling the button, we get a condition terminating the function */
      setSearchParams((prev) => ({
        ...prev,
        showDetails: true,
        terminalTurnedOn: true,
      }));
      return;
    }

    setSearchParams((prev) => ({
      ...prev,
      loading: { ...prev.loading, details: true },
      showDetails: true,
      terminalTurnedOn: true,
    }));

    Promise.all([
      githubRequest(`https://api.github.com/users/${username}`),
      githubRequest(`https://api.github.com/users/${username}/repos`),
    ]).then((data) => {
      const profile = {
        avatar: data[0].avatar_url ?? anon,
        username: data[0].name ?? username,
        bio: data[0].bio ?? "No information available",
        location: data[0].location ?? "???",
        link: data[0].html_url ?? `https://github.com/${username}`,
        error: data[0].status ? true : false,
      };
      const reposPromise = data[1].length
        ? Promise.all(
            data[1].map(async (repo) => {
              const repoLang = await githubRequest(
                `https://api.github.com/repos/${username}/${repo.name}/languages`
              );
              const langs = Object.keys(repoLang);

              return {
                id: repo.id,
                name: repo.name,
                desc: repo.description,
                langs,
                link: `https://github.com/${username}/${repo.name}`,
              };
            })
          )
        : Promise.resolve([]);

      reposPromise.then((repos) => {
        setUserInfos({ profile: profile, repos: repos });
        updateLoadingState("details", false);
      });
    });
  };

  return (
    <Fragment>
      <div className="search">
        <header ref={headerRef}>
          <h1>Find a hacker</h1>
          <SearchAccountForm handleSubmit={fetchGithubUsers} />
        </header>
        <GithubUsersList
          userList={githubUsers}
          loading={searchParams.loading.list}
          handleClickItem={fetchUserInfos}
          headerHeight={headerHeight}
        />
      </div>
      <div
        className={`results ${
          searchParams.showDetails ? "show-details" : "hide-details"
        }`}
      >
        <GithubUserDetails
          userInfos={userInfos}
          loading={searchParams.loading.details}
          terminalTurnedOn={searchParams.terminalTurnedOn}
          usersList={githubUsers}
        />
        <button
          aria-label="power"
          onClick={() =>
            setSearchParams((prev) => ({
              ...prev,
              showDetails: false,
              terminalTurnedOn: !prev.terminalTurnedOn,
            }))
          }
          onMouseUp={(e) => e.target.blur()}
        ></button>
      </div>
    </Fragment>
  );
}

export default App;
