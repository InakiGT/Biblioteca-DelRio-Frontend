import { instance } from './axios.js';

const getToken = async () => {
    const token = await localStorage.getItem('token') || '';
    return token;
}

const petitionGet = async ( endpoint, id ) => {
    try {

        if(!endpoint) {
            return null;
        }

        endpoint = id ? `${endpoint}/${id}` : endpoint;
        const token = await getToken();
        const response = await instance.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;

    } catch(err) {
        console.log(err);
    }
}

const petitionPost = async ( endpoint, data ) => {
    try {

        if( !endpoint || !data ) {
            return null;
        }
        const token = await getToken();
        const response = await instance.post( endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;

    } catch(err) {
        console.log(err);
    }
}

const petitionPatch = async ( endpoint, id, data ) => {
    try {

        if(!endpoint || !id || !data) {
            return null;
        }

        endpoint = `${endpoint}/${id}`;
        const token = await getToken();
        const response = await instance.patch( endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    } catch(err) {
        console.log(err);
    }
}

const petitionDelete = async ( endpoint, id ) => {
    try {

        if(!endpoint || !id) {
            return null;
        }

        endpoint = `${endpoint}/${id}`;
        const token = await getToken();
        const response = instance.delete(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;

    } catch(err) {
        console.log(err);
    }
}

export { 
    petitionGet, 
    petitionPost, 
    petitionPatch,
    petitionDelete,
}