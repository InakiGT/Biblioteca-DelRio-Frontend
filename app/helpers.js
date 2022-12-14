
export const getQueryParams = url => {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [ key, val ] = param.split('=');
        params[key] = decodeURIComponent(val);
    });
    
    return params;
}

export const checkAuth = response => {
    if( response === 'Unauthorized' ) {
        return false;
    }

    return true;
}

export const showError = ( node, value ) => {
    const errorCard = document.createElement('div');
    const errorP = document.createElement('p');
    const errorContent = document.createTextNode(value);

    errorCard.className = "error-card";
    errorP.appendChild(errorContent);
    errorCard.appendChild(errorP);
    node.appendChild(errorCard);
    
 }