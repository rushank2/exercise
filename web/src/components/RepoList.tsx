import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RepoListHeader } from './ReposListHeader';
import { Buttons } from './Buttons';

const sortReposInDescendingOrder = (repos: any) =>
  repos.sort((a: any, b: any) => {
    return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();
  });

export function RepoList() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState(repos);
  const navigate = useNavigate();

  const getRepos = async () => {
    const response = await fetch('http://localhost:4000/repos');
    const jsonData = await response.json();
    const sortedData = sortReposInDescendingOrder(jsonData);
    setRepos(sortedData);
  };

  useEffect(() => {
    getRepos();
  }, []);

  const goToRouteDetails = (
    id: string,
    commitsUrl: string,
    fullName: string
  ) => {
    navigate(`repo-details/${id}`, { state: { commitsUrl, fullName } });
  };

  return (
    filteredRepos && (
      <>
        <Buttons repos={repos} setFilteredRepos={setFilteredRepos} />
        <table style={{ marginTop: 20 }}>
          <RepoListHeader />
          <tbody>
            {filteredRepos.map(
              ({
                id,
                name,
                description,
                language,
                forks_count: forksCount,
                commits_url: commitsUrl,
                full_name: fullName,
              }: any) => (
                <tr
                  key={id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => goToRouteDetails(id, commitsUrl, fullName)}
                >
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{language}</td>
                  <td>{forksCount}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </>
    )
  );
}
