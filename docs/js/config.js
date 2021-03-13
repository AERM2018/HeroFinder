 const authentication = () => {
    const ts = new Date().getTime();
    const API_KEY_PUBLIC = '7e75ad34e757c48d3b3ee724348ba943';
    const API_KEY_PRIVATE = '6d00bfe06fcbeca0e956fb8bb1d4c0a29d4d2070'
    const hash = md5(`${ts}${API_KEY_PRIVATE}${API_KEY_PUBLIC}`);
    
    return `ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`
}

 const baseURL = `https://gateway.marvel.com:443/v1/public`

