import { Fragment, useState } from "react";
import { githubRequest } from "./libs/utils";
import "./App.css";
import SearchAccountForm from "./components/SearchAccountForm/SearchAccountForm";
import GithubUsersList from "./components/GithubUserList/GithubUsersList";
import GithubUserDetails from "./components/GitHubuserDetails/GithubUserDetails";

function App() {
  const [searchParams, setSearchParams] = useState({
    loading: {
      list: false,
      details: false,
    },
    prevSearch: null,
    showDetails: false,
    powerOff: true,
  });
  const [githubUsers, setGithubUsers] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

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
            prevSearch: request,
            loading: { ...prev.loading, list: false },
          }));
        }
      );
    }
  };

  const fetchUserInfos = (e) => {
    const username = e.target.textContent;

    if (!userInfos || username !== userInfos[0].username) {
      setSearchParams((prev) => ({
        ...prev,
        loading: { ...prev.loading, details: true },
        powerOff: false,
      }));

      Promise.all([
        githubRequest(`https://api.github.com/users/${username}`),
        githubRequest(`https://api.github.com/users/${username}/repos`),
      ]).then((data) => {
        const profile = {
          avatar: data[0].avatar_url,
          username: username,
          bio: data[0].bio,
          location: data[0].location,
          link: `https://github.com/${username}`,
        };
        const repos = data[1].map((repo) => ({
          id: repo.id,
          name: repo.name,
          desc: repo.description,
          link: `https://github.com/${username}/${repo.name}`,
        }));
        setUserInfos([profile, repos]);
        updateLoadingState("details", false);
      });
      setSearchParams((prev) => ({ ...prev, showDetails: true }));
    }
  };

  return (
    <Fragment>
      <div className="search">
        <header>
          <h1>Trouve ton hacker</h1>
          <SearchAccountForm handleSubmit={fetchGithubUsers} />
        </header>
        <GithubUsersList
          userList={githubUsers}
          loading={searchParams.loading.list}
          handleClickItem={fetchUserInfos}
        />
      </div>
      <div
        className={`results ${searchParams.showDetails ? "show-details" : ""}`}
      >
        <GithubUserDetails
          userInfos={userInfos}
          loading={searchParams.loading.details}
          powerOff={searchParams.powerOff}
        />
        <button
          onClick={() =>
            setSearchParams((prev) => ({ ...prev, powerOff: !prev.powerOff }))
          }
        ></button>
      </div>
    </Fragment>
  );
}

export default App;
