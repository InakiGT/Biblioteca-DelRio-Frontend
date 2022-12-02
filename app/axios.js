export const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 1000,
    headers: {'api': 121312},
});

