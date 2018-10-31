import axios from "axios";

//用户信息接口
export default {
  userList: function (params) {
    return axios.get('/api/user/userList', {
      params: params
    })
  },
  userPageOfJSON: function (params) {
    return axios.post('/api/user/userPageOfJSON', params)
  }
}
