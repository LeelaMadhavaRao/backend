export interface TProfile {
    user: string;
    profiles: {
        name: string; //leetcode, codeforces, hackerrank, hackerearth
        scores: {
            score: number;
            rank: number;
            solved: number;
            rating: number;
            streak: number;
        },
        username: string;
    }[];
    socials: {
        name: string;
        url: string;
    }[];
    rank: number;
    totalScore: number;
    recentActivity: Date;
}