export function getCurrentDateTime()
{
    return (new Date()).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
}

export const errorHandler = (error) => {
    if (error.response) {
        return Promise.reject({ ...error.response, __error: error });
    } else if (error.request) {
        return Promise.reject(error.request);
    } else {
        return Promise.reject(error.message);
    }
};

export function isEmpty(value) {
    if (typeof (value) === undefined || value === null || value === undefined) {
        return true;
    }
    if (Array.isArray(value) && value.length <= 0) {
        return true;
    }
    if (typeof (value) === 'object') {
        return Object.values(value).filter(item => item).length <= 0;
    }
    if (typeof (value) === 'string') {
        return value.length <= 0;
    }
    if (typeof (value) === 'number') {
        return value <= 0;
    }
    return !Boolean(value);
}
