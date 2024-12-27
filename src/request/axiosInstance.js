// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rpc-testnet.hashahead.org/mrpc', // 设置你的API基本路径
    timeout: 7000, // 设置请求超时时间
    headers: {
        'Content-Type': 'application/json', // 设置请求头
    },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // 例如，添加认证头
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// 封装get请求
export const get = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// 封装post请求
export const post = async (url, data = {}) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export default axiosInstance;
