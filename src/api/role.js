import instance from './index';
import axios from "axios";
const preUrlPath = '';
//获取角色列表
const request = {
  p: ['get,/api/role'],
  r: params => {
    return axios.get('/api/role', {params})
  }
};
//删除角色
const remove = {
  p: ['delete,/role/**'],
  r: params => {
    return instance.get(`${preUrlPath}/role/${params.id}`)
  }
};
//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, {params})
  }
}

export {
  request,
  remove,
  notAllowed
}
