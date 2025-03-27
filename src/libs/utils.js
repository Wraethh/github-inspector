import { githubToken } from "../server/env";

export const githubRequest = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  return response.json();
};
