var Promise = require("Promise");
/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * @returns a Promise that should be filled with the response of the GET request
 * parsed as a JSON object and returned in the property named "data" of an
 * object. If the request has an error, the Promise should be rejected with an
 * object that contains the properties:
 * {number} status          The HTTP response status
 * {string} statusText      The statusText from the xhr request
 */

function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    console.log(url);
    // setTimeout(() => reject(new Error(
    //   { status: 501, statusText: "Not Implemented" })), 
    //   0
    // );
    // On Success return:
    // resolve({data: getResponseObject});
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if(this.readyState!==4)  {return;}
      if(this.status!==200){
        reject({status:this.status, statusText: this.statusText});
      }
      else{
        resolve({data:this.responseText});
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
}

export default fetchModel;

