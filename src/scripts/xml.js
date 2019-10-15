export function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

// Example:

// makeRequest('GET', 'http://example.com')
//     .then(function (datums) {
//         console.log(datums);
//     })
//     .catch(function (err) {
//         console.error('Augh, there was an error!', err.statusText);
//     });