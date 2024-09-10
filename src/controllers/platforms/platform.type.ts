export interface Platform {
    name: string; //leetcode, codeforces, hackerrank, hackerearth
    scores: {
        score: number;
        rank: number;
        solved: number;
        rating: number;
        streak: number;
    },
    username: string;
}