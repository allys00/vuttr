
export const CheckIfHasEmpty = (obj: any, keys: string[] = []) => {
    let ret = false;
    if (obj === {}) {
        return true;
    } else {
        if (keys.length > 0) {
            keys.forEach(e => {
                if (obj[e] === {} || obj[e] === '' || obj[e] === undefined || obj[e] === null || obj[e].length === 0) {
                    ret = true;
                }
            });
        } else {
            for (let key in obj) {
                if (obj[key] === {} || obj[key] === '' || obj[key] === undefined || obj[key] === null || obj[key].length === 0) {
                    ret = true;
                }
            }
        }

    }
    return ret;
};