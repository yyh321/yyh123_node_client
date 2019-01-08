const axios = require('axios');
import {Loading, Message} from 'element-ui';
import router from './router';

let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'拼命加载中',
        background:'rgba(0,0,0,0.7)'
    })
}

function endLoading(){
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    if(localStorage.eleToken) {
        //设置统一的请求header
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

//响应拦截
axios.interceptors.response.use(response => {
    //结束加载动画
    endLoading();
    return response;
}, err => {
    //错误提醒
    endLoading();
    Message.error(err.response.data);
    // 获取错误状态码
    const {status} = err.response;
    if(status == 401) {
        Message.error('token失效，请重新登录!');
        //清除token
        localStorage.removeItem('eleToken');
        //跳转到登录
        router.push('/login');
    }
    return Promise.reject(err);
});

export default axios;



