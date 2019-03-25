import axios from "axios";

const httpConf = {
  get: url => {
    return axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },
  post: (url, body) => {
    return axios.post(url, body, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },
  put: (url, body) => {
    return axios.put(url, body, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },
  delete: (url, body) => {
    return axios.delete(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
};

export { httpConf };
