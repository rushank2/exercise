import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const getCommitWithMostRecentCommitDate = (commitsData: any) =>
  commitsData.reduce((a: any, b: any) => {
    return new Date(a.author.date) > new Date(b.author.date) ? a : b;
  });

export function RepoDetails() {
  const navigate = useNavigate();
  const {
    state: { commitsUrl, fullName },
  } = useLocation();

  const [commits, setCommits] = useState([]);
  const [readmeContent, setReadmeContent] = useState<string | undefined>();

  const urlWithCommits = commitsUrl.split('{')[0];
  const latestCommit =
    commits.length && getCommitWithMostRecentCommitDate(commits);
  const README_URL = `https://raw.githubusercontent.com/${fullName}/master/README.md`;

  const getCommits = useCallback(async () => {
    try {
      const response = await fetch(urlWithCommits);
      const jsonData = await response.json();
      setCommits(jsonData);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }, [urlWithCommits]);

  const getReadmeContent = useCallback(async () => {
    try {
      const response = await fetch(README_URL);
      const readme = await response.text();
      setReadmeContent(readme);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  }, [README_URL]);

  useEffect(() => {
    getCommits();
    getReadmeContent();
  }, [getCommits, getReadmeContent]);

  const latestCommitDetails = latestCommit && (
    <>
      <h3>Repository details</h3>
      <div>
        The most recent commit date:{' '}
        {new Date(latestCommit.commit.author.date).toDateString()}
      </div>
      <div>Author: {latestCommit.commit.author.name}</div>
      <div style={{ marginBottom: 20 }}>
        Message: {latestCommit.commit.message}
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => navigate('/')}>Go back to the main list</button>
      {latestCommitDetails}
      {readmeContent && <div>{readmeContent}</div>}
    </>
  );
}
