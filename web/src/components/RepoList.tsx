import { useState, useEffect } from 'react';
import { RepoListHeader } from './ReposListHeader';

const sortReposInDescendingOrder = (repos: any) =>
  repos.sort((a: any, b: any) => {
    return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();
  });

export function RepoList() {
  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    const response = await fetch('http://localhost:4000/repos');
    const jsonData = await response.json();
    const sortedData = sortReposInDescendingOrder(jsonData);
    setRepos(sortedData);
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    repos && (
      <table style={{ marginTop: 20 }}>
        <RepoListHeader />
        <tbody>
          {repos.map(
            ({
              id,
              name,
              description,
              language,
              forks_count: forksCount,
            }: any) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{language}</td>
                <td>{forksCount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    )
  );
}
