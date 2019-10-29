const sumScore = (urbanArea) => {
    let sum = 0;
    urbanArea.scoresArr.forEach(score => {
        sum += score.score_out_of_10;
    })

    return sum;
}

export const sortWorstToBest = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for(let i = 1; i < arr.length; i++) {
        if (sumScore(arr[i]) < sumScore(pivot)) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    const sortedLeft = sortWorstToBest(left);
    const sortedRight = sortWorstToBest(right);

    return sortedLeft.concat([pivot]).concat(sortedRight);
}

export const sortBestToWorst = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (sumScore(arr[i]) > sumScore(pivot)) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    const sortedLeft = sortBestToWorst(left);
    const sortedRight = sortBestToWorst(right);

    return sortedLeft.concat([pivot]).concat(sortedRight);
}