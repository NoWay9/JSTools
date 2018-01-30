var ownApi = {
  get: function (url, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if (headers) {
      for (var headersName in headers) {
        xhr.setRequestHeader(headersName, headers[headersName]);
      }

    }

    xhr.send(null);

    return {
      done: function (callback) {
        xhr.addEventListener('load', function (e) {
          var result = JSON.parse(e.srcElement.response);
          callback(result);
        });
      }
    }
  },
  post: function (url, data, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    if (headers) {
      for (var headersName in headers) {
        xhr.setRequestHeader(headersName, headers[headersName]);
      }
    }
    xhr.send(JSON.stringify(data));
    return {
      done: function (callback) {
        xhr.addEventListener('load', function (e) {
          var result = JSON.parse(e.srcElement.response);
          callback(result);
        })
      }
    }
  },
  head: function (url, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url);
    if (headers) {
      for (var headersName in headers) {
        xhr.setRequestHeader(headersName, headers[headersName]);
      }
    }
    xhr.send(null);
    return {
      done: function () {
        xhr.addEventListener('load', function (callback) {
          var result = JSON.parse(e.srcElement.response);
          callback(result);
        })
      }
    }
  },
  put: function (url, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    if (headers) {
      for (var headersName in headers) {
        xhr.setRequestHeader(headersName, headers[headersName]);
      }
    }
    xhr.send(null);
    return {
      done: function () {
        xhr.addEventListener('load', function (callback) {
          var result = JSON.parse(e.srcElement.response);
          callback(result);
        })
      }
    }
  }
}

ownApi.get('https://api.github.com/users/itspoma/repos', { 'Accept-Language': 'ua' }).done(function (result) {
  var data = result;
  for (var repo in data) {
    createRepo(data[repo]);
    console.log(data[repo]);
  }
})


function createRepo(el) {
  var $repo = document.createElement('div');
  var $id = document.createElement('p');
  $id.innerText = el.id;
  var $name = document.createElement('p');
  $name.innerText = el.name;
  var $login = document.createElement('p');
  $login.innerText = el.owner.login;
  $repo.classList.add('item');
  document.body.appendChild($repo);
  $repo.appendChild($id);
  $repo.appendChild($name);
  $repo.appendChild($login);

}
