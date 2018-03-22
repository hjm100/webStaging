import axios from "axios";
import qs from "qs";

let reqAndUrl = ["recordsdata"];

class ApiService {}
ApiService.hostname = "/index.php/Mobile/Clubnew/";
ApiService.prototype.getSessionData = sessionItem => {
  let sessionValue = sessionStorage.getItem(sessionItem);
  return sessionValue;
};
ApiService.prototype.setSessionData = (sessionItem, sessionValue) => {
  if (sessionValue instanceof Object) {
    return sessionStorage.setItem(sessionItem, JSON.stringify(sessionValue));
  }
  sessionStorage.setItem(sessionItem, sessionValue);
};

for (const url of reqAndUrl) {
  ApiService.prototype[url] = data => {
    let req = axios
      .post(ApiService.hostname + url, qs.stringify(data))
      .then(res => {
        return res.data.data;
      });
    return req;
  };
}

export default ApiService;
