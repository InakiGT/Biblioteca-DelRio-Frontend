
export const getQueryParams = url => {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [ key, val ] = param.split('=');
        params[key] = decodeURIComponent(val);
    });
    
    return params;
}

export const checkAuth = (response) => {
    if( response === 'Unauthorized' ) {
        return false;
    }

    return true;
}