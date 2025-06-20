function regexMatch(text, pattern) {
    const tLen = text.length;
    const pLen = pattern.length;
    let prev = new Array(pLen + 1).fill(false);
    let curr = new Array(pLen + 1).fill(false);

    prev[0] = true;

    for (let j = 2; j <= pLen; j++) {
        if (pattern[j - 1] === '*') {
            prev[j] = prev[j - 2];
        }
    }

    for (let i = 1; i <= tLen; i++) {
        curr[0] = false;
        for (let j = 1; j <= pLen; j++) {
            if (pattern[j - 1] === '.' || pattern[j - 1] === text[i - 1]) {
                curr[j] = prev[j - 1];
            } else if (pattern[j - 1] === '*') {
                curr[j] = curr[j - 2];
                if (pattern[j - 2] === '.' || pattern[j - 2] === text[i - 1]) {
                    curr[j] = curr[j] || prev[j];
                }
            } else {
                curr[j] = false;
            }
        }
        [prev, curr] = [curr, prev];  
    }

    return prev[pLen];
}
