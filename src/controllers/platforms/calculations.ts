
export const leetCode = (solvedPS: number, rating: number) => {
    return (solvedPS * 50 + Math.sqrt(rating - 1300) / 30)
}

export const codeForces = (solvedPS: number, rating: number) => {
    if (rating > 1200) {
        return (solvedPS * 10 + Math.sqrt(rating - 1200) / 30)
    }
    return (solvedPS * 10)
}

export const hackerRank = (solvedPS: number, rating: number) => {
    return (solvedPS * 10 + Math.sqrt(rating - 1200) / 30)
}

export const spoj = (solvedPS: number, rating: number) => {
    return (solvedPS * 500 + rating * 20)
}

export const codeChef = (solvedPS: number, rating: number) => {
    const result = solvedPS * 10 + Math.sqrt(rating - 1300) / 30;
    return Math.floor(result); // or Math.round(result) or Math.ceil(result)
};

export const interviewBit = (score: number) => {
    return (score / 3)
}

export const greekforgreeks = (score: number) => {
    return (score / 3)
}