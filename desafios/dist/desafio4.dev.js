"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var apiKey;
var requestToken;
var username;
var password;
var sessionId;
var listId = '7101979';
var loginButton = document.getElementById('login-button');
var searchButton = document.getElementById('search-button');
var searchContainer = document.getElementById('search-container');
loginButton.addEventListener('click', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(criarRequestToken());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(logar());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(criarSessao());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
searchButton.addEventListener('click', function _callee2() {
  var lista, query, listaDeFilmes, ul, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, li;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          lista = document.getElementById("lista");

          if (lista) {
            lista.outerHTML = "";
          }

          query = document.getElementById('search').value;
          _context2.next = 5;
          return regeneratorRuntime.awrap(procurarFilme(query));

        case 5:
          listaDeFilmes = _context2.sent;
          ul = document.createElement('ul');
          ul.id = "lista";
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 11;

          for (_iterator = listaDeFilmes.results[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            li = document.createElement('li');
            li.appendChild(document.createTextNode(item.original_title));
            ul.appendChild(li);
          }

          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 19:
          _context2.prev = 19;
          _context2.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context2.prev = 22;

          if (!_didIteratorError) {
            _context2.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context2.finish(22);

        case 26:
          return _context2.finish(19);

        case 27:
          console.log(listaDeFilmes);
          searchContainer.appendChild(ul);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 15, 19, 27], [20,, 22, 26]]);
});

function preencherSenha() {
  password = document.getElementById('senha').value;
  validateLoginButton();
}

function preencherLogin() {
  username = document.getElementById('login').value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = document.getElementById('api-key').value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

var HttpClient =
/*#__PURE__*/
function () {
  function HttpClient() {
    _classCallCheck(this, HttpClient);
  }

  _createClass(HttpClient, null, [{
    key: "get",
    value: function get(_ref) {
      var url, method, _ref$body, body;

      return regeneratorRuntime.async(function get$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = _ref.url, method = _ref.method, _ref$body = _ref.body, body = _ref$body === void 0 ? null : _ref$body;
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open(method, url, true);

                request.onload = function () {
                  if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                  } else {
                    reject({
                      status: request.status,
                      statusText: request.statusText
                    });
                  }
                };

                request.onerror = function () {
                  reject({
                    status: request.status,
                    statusText: request.statusText
                  });
                };

                if (body) {
                  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  body = JSON.stringify(body);
                }

                request.send(body);
              }));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return HttpClient;
}();

function procurarFilme(query) {
  var result;
  return regeneratorRuntime.async(function procurarFilme$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = encodeURI(query);
          console.log(query);
          _context4.next = 4;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(query),
            method: "GET"
          }));

        case 4:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function adicionarFilme(filmeId) {
  var result;
  return regeneratorRuntime.async(function adicionarFilme$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/movie/".concat(filmeId, "?api_key=").concat(apiKey, "&language=en-US"),
            method: "GET"
          }));

        case 2:
          result = _context5.sent;
          console.log(result);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function criarRequestToken() {
  var result;
  return regeneratorRuntime.async(function criarRequestToken$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/authentication/token/new?api_key=".concat(apiKey),
            method: "GET"
          }));

        case 2:
          result = _context6.sent;
          requestToken = result.request_token;

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function logar() {
  return regeneratorRuntime.async(function logar$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=".concat(apiKey),
            method: "POST",
            body: {
              username: "".concat(username),
              password: "".concat(password),
              request_token: "".concat(requestToken)
            }
          }));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function criarSessao() {
  var result;
  return regeneratorRuntime.async(function criarSessao$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/authentication/session/new?api_key=".concat(apiKey, "&request_token=").concat(requestToken),
            method: "GET"
          }));

        case 2:
          result = _context8.sent;
          sessionId = result.session_id;

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function criarLista(nomeDaLista, descricao) {
  var result;
  return regeneratorRuntime.async(function criarLista$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/list?api_key=".concat(apiKey, "&session_id=").concat(sessionId),
            method: "POST",
            body: {
              name: nomeDaLista,
              description: descricao,
              language: "pt-br"
            }
          }));

        case 2:
          result = _context9.sent;
          console.log(result);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function adicionarFilmeNaLista(filmeId, listaId) {
  var result;
  return regeneratorRuntime.async(function adicionarFilmeNaLista$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/list/".concat(listaId, "/add_item?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
            method: "POST",
            body: {
              media_id: filmeId
            }
          }));

        case 2:
          result = _context10.sent;
          console.log(result);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function pegarLista() {
  var result;
  return regeneratorRuntime.async(function pegarLista$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(HttpClient.get({
            url: "https://api.themoviedb.org/3/list/".concat(listId, "?api_key=").concat(apiKey),
            method: "GET"
          }));

        case 2:
          result = _context11.sent;
          console.log(result);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
}