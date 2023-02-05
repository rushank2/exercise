import { Dispatch } from 'react';

interface ButtonsProps {
  repos: any;
  setFilteredRepos: Dispatch<any>;
}

const getUniqueLanguages = (repos: any) =>
  repos
    .map((repo: any) => repo.language)
    .filter(
      (value: string, index: number, arr: any) => arr.indexOf(value) === index
    );

export function Buttons({ repos, setFilteredRepos }: ButtonsProps) {
  const uniqueLanguages = getUniqueLanguages(repos);

  const handleClick = (language: string) => () => {
    const filteredRepos = repos.filter(
      (repo: any) => repo.language === language
    );
    setFilteredRepos(filteredRepos);
  };

  const buttons = uniqueLanguages.map((language: string) => (
    <button
      key={language}
      onClick={handleClick(language)}
      style={{ marginRight: 20, cursor: 'pointer' }}
    >
      {language}
    </button>
  ));

  return (
    <>
      {buttons}
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setFilteredRepos(repos)}
      >
        Remove filter
      </button>
    </>
  );
}
