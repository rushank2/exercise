import axios from 'axios';
import { Router, Request, Response } from 'express';
import reposFromFile from '../../data/repos.json';

export const repos = Router();
const GITHUB_REPOS_URL = 'https://api.github.com/users/silverorange/repos';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  const reposFromGithub = await axios({
    method: 'GET',
    url: GITHUB_REPOS_URL,
  });

  const result = [...reposFromGithub.data, ...reposFromFile].filter(
    ({ fork }) => fork === false
  );

  res.header('Content-Type', 'application/json');
  res.json(result);
});
