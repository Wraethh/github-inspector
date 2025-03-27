import { Fragment, useState } from "react";
import { githubRequest } from "./libs/utils";
import "./App.css";
import SearchAccountForm from "./components/searchAccountForm";
import GithubUsersList from "./components/GithubUsersList";

function App() {
  const [githubUsers, setGithubUsers] = useState(null);
  const [searchParams, setSearchParams] = useState({
    loading: false,
    prevSearch: null,
  });

  const fetchGithubUsers = (e) => {
    e.preventDefault();
    const request = e.target.search.value;

    if (request && request !== searchParams.prevSearch) {
      setSearchParams((prev) => ({ ...prev, loading: true }));
      githubRequest(`https://api.github.com/search/users?q=${request}`).then(
        (data) => {
          setGithubUsers(data.items);
          setSearchParams({ prevSearch: request, loading: false });
        }
      );
    }
  };

  return (
    <Fragment>
      <SearchAccountForm handleSubmit={fetchGithubUsers} />
      <GithubUsersList userList={githubUsers} loading={searchParams.loading} />
    </Fragment>
  );
}

export default App;
