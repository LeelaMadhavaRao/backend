import { createHash } from 'crypto';
import { CODEFORCES_API_KEY, CODEFORCES_API_SECRET } from '../../config';


export interface Params {
  [key: string]: string | number;
}


export const leetCodeAPI = (username: string) => {
  return `https://leetcode.com/graphql`
}

export const hackerRankAPI = (username: string, method: string) => {

  if (method === 'user-info') {
    return `https://www.hackerrank.com/rest/contests/master/hackers/${username}/profile`
  }
  if (method === 'algorithms') {
    return `https://www.hackerrank.com/rest/contests/master/tracks/algorithms/leaderboard/find_hacker?type=practice&hacker=${username}`
  }
  if (method === 'data-structures') {
    return `https://www.hackerrank.com/rest/contests/master/tracks/data-structures/leaderboard/find_hacker?type=practice&hacker=${username}`
  }
  return `https://www.hackerrank.com/rest/contests/master/tracks/${method}/leaderboard/find_hacker?type=practice&hacker=${username}`
}

export const getQueryLeetCode = (username: string) => {
  return `{ matchedUser(username: "${username}") {
    username
    submitStats: submitStatsGlobal {
    acSubmissionNum {
    difficulty
    count
    submissions}
  }
}
}`
}

export const codeChefAPI = (username: string) => {
  return `https://www.codechef.com/users/${username}`
}

export const codeForcesAPI = (username: string, method: string) => {
  const rand = Math.random().toString(36).substring(2, 8); // Random 6-character string
  const time = getUnixTime();
  const params: Params = {
    handles: username,
    apiKey: CODEFORCES_API_KEY,
    time: time,
  };

  const apiSig = generateApiSig(rand, method, params, CODEFORCES_API_SECRET);
  let url = `https://codeforces.com/api/${method}?handle=${username}&apiKey=${CODEFORCES_API_KEY}&time=${time}&apiSig=${apiSig}`;
  if (method === 'user.status') {
    return `https://codeforces.com/api/${method}?handle=${username}`;
  }
  return `https://codeforces.com/api/user.info?handles=${username}`
}

export const codeForcesRatingAPI = (username: string) => {
  return `https://codeforces.com/api/user.rating?handle=${username}`
}



// Function to generate the current time in Unix format
export const getUnixTime = () => Math.floor(Date.now() / 1000);

// Function to generate the API signature
export const generateApiSig = (rand: string, methodName: string, params: Params, secret: string): string => {
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const stringToHash = `${rand}/${methodName}?${paramString}#${secret}`;
  return rand + createHash('sha512').update(stringToHash).digest('hex');
};

export const greekforgreeksAPI = (username: string) => {
  return `https://www.geeksforgeeks.org/user/${username}`
}