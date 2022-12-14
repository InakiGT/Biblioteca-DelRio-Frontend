export const instance = axios.create({
    baseURL: 'https://biblioteca-delrio.herokuapp.com/api/v1',
    timeout: 1000,
    headers: {'api': 121312},
});

