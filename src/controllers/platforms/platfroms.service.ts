import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "./platform.type";
; import { Params, codeChefAPI, codeForcesAPI, generateApiSig, getQueryLeetCode, getUnixTime, greekforgreeksAPI, hackerRankAPI, leetCodeAPI } from "./platforms.apis";
import { logger } from "../../logger";
import { codeChef, codeForces, greekforgreeks, leetCode } from "./calculations";
import { parse } from 'node-html-parser';
import { get } from "http";
import { CODEFORCES_API_KEY, CODEFORCES_API_SECRET } from "../../config";
import { hacketRankCookie } from "./platforms.cookies";

export enum PLATFORMS {
    LEETCODE = 'LEETCODE',
    CODEFORCES = 'CODEFORCES',
    CODECHEF = 'CODECHEF',
    HACKERRANK = 'HACKERRANK',
    HACKEREARTH = 'HACKEREARTH',
    SPOJ = 'SPOJ',
    GREEKFORGREEKS = 'GREEKFORGREEKS',
}

export class PlatformsService {
    async getPlatformData(platform: Platform) {
        switch (platform.name) {
            case PLATFORMS.LEETCODE:
                return this.getLeetCodeData(platform);
            case PLATFORMS.CODEFORCES:
                return this.getCodeforcesData(platform);
            case PLATFORMS.CODECHEF:
                return this.getCodechefData(platform);
            case PLATFORMS.HACKERRANK:
                return this.getHackerrankData(platform);
            case PLATFORMS.HACKEREARTH:
                return this.getHackerearthData(platform);
            case PLATFORMS.SPOJ:
                return this.getSpojData(platform);
            case PLATFORMS.GREEKFORGREEKS:
                return this.getGreekforGreeksData(platform);
            default:
                return platform;
        }
    }

    async getLeetCodeData(platform: Platform) {
        try {

        const axiosConfig: AxiosRequestConfig = {
            method: 'GET',
            url: leetCodeAPI(platform.username),
            data: {
                query: getQueryLeetCode(platform.username)
            }
        };
            const response = await axios(axiosConfig);
            const score = leetCode(response.data.data.matchedUser.submitStats.acSubmissionNum[0].count, 1300);
            const leetcodeData = {
                ...platform,
                scores: {
                    score: score,
                    rank: 0,
                    solved: response.data.data.matchedUser.submitStats.acSubmissionNum[0].count,
                    rating: 0,
                    streak: 0,
                }
            }
            return leetcodeData;
        }
        catch (error) {
            logger.error('Error Fetching LeetCode Data from API:', error);
        }

    }

    async getCodeforcesData(platform: Platform) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'GET',
                url: codeForcesAPI(platform.username, 'user.info'),
            };
            const response = await axios(axiosConfig);
            const userInfo = response.data.result[0];

            const axiosConfigRating: AxiosRequestConfig = {
                method: 'GET',
                url: codeForcesAPI(platform.username, 'user.status'),
            };

            const res = await axios(axiosConfigRating);
            const submissions = res.data.result
            const solvedProblems = new Set<string>();
            submissions.forEach((submission: any) => {
                if (submission.verdict === 'OK') {
                    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
                    solvedProblems.add(problemId);
                }
            });
            const codeforces = {
                ...platform,
                scores: {
                    score: codeForces(solvedProblems.size, userInfo.rating),
                    rank: 0,
                    solved: solvedProblems.size,
                    rating: response.data.result[0].rating,
                    streak: 0,
                }
            }
            return codeforces;

        }
        catch (error) {
            logger.error('Error Fetching Codeforces Data from API:', error);
        }
    }

    async getCodechefData(platform: Platform) {
        try {

            const axiosConfig: AxiosRequestConfig = {
                method: 'GET',
                url: codeChefAPI(platform.username),
            };
            const response = await axios(axiosConfig);
            const html = response.data;
            const root = parse(html);
            let rating = 0
            const solvedProblemsElement = root.querySelector('.rating-data-section.problems-solved h3:last-child');
            const ratingElement = root.querySelector('.rating-number');
            if (ratingElement) {
                rating = Number(ratingElement.text.trim());
            }
            let totalProblemsSolved = '';

            if (solvedProblemsElement) {
                const text = solvedProblemsElement.text;
                const match = text.match(/Total Problems Solved: (\d+)/);
                if (match) {
                    totalProblemsSolved = match[1];
                }
            } else {
                console.log('Unable to find the solved problems section.');
            }

            const codechef = {
                ...platform,
                scores: {
                    score: codeChef(Number(totalProblemsSolved), rating),
                    rank: 0,
                    solved: Number(totalProblemsSolved),
                    rating: rating,
                    streak: 0,
                }
            }
            return codechef;

        }
        catch (error) {
            logger.error('Error Fetching Codeforces Data from API:', error);
        }
    }

    async getHackerrankData(platform: Platform) {

        try {

            const cookieString = hacketRankCookie.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

            const axiosConfigUserInfo: AxiosRequestConfig = {
                method: 'GET',
                url: hackerRankAPI(platform.username, 'algorithms'),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) " +
                        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
                    Cookie: cookieString
                }
            };
            const userInfo = await axios(axiosConfigUserInfo);


            const axiosConfig: AxiosRequestConfig = {
                method: 'GET',
                url: hackerRankAPI(platform.username, 'algorithms'),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) " +
                        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
                    Cookie: cookieString
                }
            };

            const algoScore = await axios(axiosConfig);
            const axiosConfigDS: AxiosRequestConfig = {
                method: 'GET',
                url: hackerRankAPI(platform.username, 'data-structures'),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) " +
                        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
                    Cookie: cookieString
                }
            };
            const dsScore = await axios(axiosConfigDS);
            const totalScore = algoScore.data.models[0].score + dsScore.data.models[0].score;

            //TODO : GET TOTAL SOLVED PROBLEMS
            
            const hackerrank = {
                ...platform,
                scores: {
                    score: totalScore,
                    rank: 0,
                    solved: 0,
                    rating: 0,
                    streak: 0,
                }
            }
            return hackerrank;
        }
        catch (error) {
            logger.error('Error Fetching HackerRank Data from API:', error);
            throw error;
        }
    }

    async getGreekforGreeksData(platform: Platform) {

        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'GET',
                url: greekforgreeksAPI(platform.username),
            };
            const response = await axios(axiosConfig);
            const html = response.data;
            const root = parse(html);
            const overallCodingScore = root.querySelectorAll('.scoreCard_head_card_left--score__pC6ZA')[0].innerText.trim();
            const totalProblemSolved = root.querySelectorAll('.scoreCard_head_card_left--score__pC6ZA')[1].innerText.trim();

            if (overallCodingScore && totalProblemSolved) {
                const gfg = {
                    ...platform,
                    scores: {
                        score: Number(overallCodingScore),
                        rank: 0,
                        solved: Number(totalProblemSolved),
                        rating: 0,
                        streak: 0,
                    }
                }
                return gfg;
            } else {
                console.log('Unable to find the solved problems section.');
                return {
                    ...platform,
                    scores: {
                        score: 0,
                        rank: 0,
                        solved: 0,
                        rating: 0,
                        streak: 0,
                    }
                }
            }
        }
        catch (error) {
            logger.error('Error Fetching GreekforGreeks Data from API:', error);
            throw error;
        }

    }
    async getHackerearthData(platform: Platform) {
        return platform;
    }

    async getSpojData(platform: Platform) {
        return platform;
    }


}   