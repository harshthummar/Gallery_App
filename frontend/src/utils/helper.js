export const getToken = ()=>{
        return localStorage.getItem('token');
} 


export const removeToken = ()=> {
    localStorage.removeItem('token');
}
export const setToken = (token)=>{
    localStorage.setItem('token',token);
}

export const BASE_URL = "https://gallery-app-backend-47wq.onrender.com"