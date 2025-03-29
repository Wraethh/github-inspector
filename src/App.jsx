import { Fragment, useState } from "react";
import { githubRequest } from "./libs/utils";
import "./App.css";
import SearchAccountForm from "./components/SearchAccountForm/SearchAccountForm";
import GithubUsersList from "./components/GithubUserList/GithubUsersList";
import GithubUserDetails from "./components/GitHubuserDetails/GithubUserDetails";

function App() {
  const [searchParams, setSearchParams] = useState({
    loading: false,
    prevSearch: null,
  });
  const [githubUsers, setGithubUsers] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const fetchGithubUsers = (e) => {
    e.preventDefault();
    const request = e.target.search.value;

    if (request && request !== searchParams.prevSearch) {
      setSearchParams((prev) => ({ ...prev, loading: true }));
      githubRequest(`https://api.github.com/search/users?q=${request}`).then(
        (data) => {
          setGithubUsers(data);
          setSearchParams({ prevSearch: request, loading: false });
        }
      );
    }
  };

  const fetchUserInfos = (e) => {
    const username = e.target.textContent;
    Promise.all([
      githubRequest(`https://api.github.com/users/${username}`),
      githubRequest(`https://api.github.com/users/${username}/repos`),
    ]).then((data) => {
      console.log(data[1]);
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
    });
  };

  return (
    <Fragment>
      <div>
        <header>
          <h1>Trouve ton hacker</h1>
          <SearchAccountForm handleSubmit={fetchGithubUsers} />
        </header>
        <GithubUsersList
          userList={githubUsers}
          loading={searchParams.loading}
          handleClickItem={fetchUserInfos}
        />
      </div>
      <div>
        <GithubUserDetails userInfos={userInfos} />
      </div>
    </Fragment>
  );
}

export default App;
