// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Task = /*#__PURE__*/function () {
  function Task(text, isCheck, id) {
    _classCallCheck(this, Task);

    this.text = text;
    this.isCheck = isCheck;
    id ? this.id = id : this.id = Date.now();
  }

  _createClass(Task, [{
    key: "toString",
    value: function toString() {
      return JSON.stringify(this);
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var taskJSON = JSON.parse(json);
      return new Task(taskJSON.text, taskJSON.isCheck, taskJSON.id);
    }
  }]);

  return Task;
}();

exports.default = Task;
},{}],"TaskDAO.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskDAO = /*#__PURE__*/function () {
  function TaskDAO() {
    _classCallCheck(this, TaskDAO);
  }

  _createClass(TaskDAO, [{
    key: "addTask",
    value: function addTask(task) {
      if (task) {
        var tasksOfStorage = window.localStorage.getItem(task.id);

        if (!tasksOfStorage) {
          window.localStorage.setItem(task.id, task);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "removeTask",
    value: function removeTask(task_id) {
      if (task_id) {
        var tasksOfStorage = window.localStorage.getItem(task_id);

        if (tasksOfStorage) {
          window.localStorage.removeItem(task_id);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "getTask",
    value: function getTask(task_id) {
      if (task_id) {
        var tasksOfStorage = window.localStorage.getItem(task_id);

        if (tasksOfStorage) {
          return _Task.default.fromJSON(tasksOfStorage);
        }
      }

      return null;
    }
  }, {
    key: "updateTask",
    value: function updateTask(task) {
      if (task) {
        var tasksOfStorage = window.localStorage.getItem(task.id);

        if (tasksOfStorage) {
          window.localStorage.setItem(task.id, task);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "getAllTasks",
    value: function getAllTasks() {
      var tasks = [];

      for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        var taskJSON = window.localStorage.getItem(key);
        tasks.push(_Task.default.fromJSON(taskJSON));
      }

      return tasks;
    }
  }, {
    key: "clear",
    value: function clear() {
      window.localStorage.clear();
    }
  }]);

  return TaskDAO;
}();

exports.default = TaskDAO;
},{"./Task":"Task.js"}],"TaskRender.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskResder = /*#__PURE__*/function () {
  function TaskResder() {
    _classCallCheck(this, TaskResder);
  }

  _createClass(TaskResder, [{
    key: "renderTasks",
    value: function renderTasks(tasks) {
      if (tasks && Array.isArray(tasks)) {
        var renderedTasks = "";

        var _iterator = _createForOfIteratorHelper(tasks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var task = _step.value;
            renderedTasks += this.drawTask(task) + "\n";
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return renderedTasks;
      }
    }
  }, {
    key: "drawTask",
    value: function drawTask(task) {
      if (task) {
        var taskTemlate = "<div id=\"".concat(task.id, "\" class=\"task\">\n            <input type=\"checkbox\" data-button-action=\"check\" title=\"Check it if task is done\"\" ").concat(task.isCheck ? "checked" : "", ">\n            <input type=\"text\" size=\"40\" disabled value=\"").concat(task.text, "\">\n            <button class=\"task-button\" data-button-action=\"update\" title=\"Edit task\"></button>\n            <button class=\"task-button\" data-button-action=\"delete\" title=\"Delete task\"></button>\n         </div>");
        return taskTemlate;
      }
    }
  }]);

  return TaskResder;
}();

exports.default = TaskResder;
},{}],"ActionManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ActionManager = /*#__PURE__*/function () {
  function ActionManager(elem, service) {
    _classCallCheck(this, ActionManager);

    this.elem = elem;
    this.service = service;
    elem.addEventListener("click", this.onClick.bind(this));
  }

  _createClass(ActionManager, [{
    key: "add",
    value: function add() {
      this.service.openAddModal();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.service.closeModal();
    }
  }, {
    key: "addTask",
    value: function addTask() {
      this.service.addTask();
    }
  }, {
    key: "update",
    value: function update(target) {
      this.service.openUpdateModal(target);
    }
  }, {
    key: "updateTask",
    value: function updateTask(target) {
      this.service.updateTask(target);
    }
  }, {
    key: "check",
    value: function check(target) {
      this.service.checkTask(target);
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this.service.openDeleteAllItemsModal();
    }
  }, {
    key: "clearAllTasks",
    value: function clearAllTasks() {
      this.service.clearTaskList();
    }
  }, {
    key: "delete",
    value: function _delete(target) {
      this.service.openDeleteItemModal(target);
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(target) {
      this.service.deleteTask(target);
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var action = event.target.dataset.buttonAction;

      if (action) {
        this[action](event.target);
      }
    }
  }]);

  return ActionManager;
}();

exports.default = ActionManager;
},{}],"ModalFrame.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModalFrame = /*#__PURE__*/function () {
  function ModalFrame() {
    _classCallCheck(this, ModalFrame);

    this.modal;
  }

  _createClass(ModalFrame, [{
    key: "create",
    value: function create(option) {
      var modalElem = document.createElement("div");
      modalElem.classList.add("modal");
      modalElem.insertAdjacentHTML("afterbegin", "\n    <div class=\"modal-overlay\">\n        <div class=\"message-box\">\n            <div class=\"cancel-button-box\">\n                <button class=\"task-button\" data-button-action=\"closeModal\">&times;</button>\n            </div>\n            <div class=\"message-box-main\">\n                <div class=\" message-box-text \">\n            ".concat(option.body, "\n                </div>\n                <div class=\"message-box-buttons \">\n                ").concat(option.button, "\n                    <button class=\"message-button\" data-button-action=\"closeModal\">Cancel</button>\n                </div>\n            </div>\n        </div>\n    </div>  \n    "));
      document.body.append(modalElem);
      this.modal = modalElem;
    }
  }, {
    key: "openAddModal",
    value: function openAddModal() {
      var option = {
        body: "<p>Enter task message</p><input id='messageText' type='text'>",
        button: "<button class='message-button' data-button-action='addTask'>Ok</button>"
      };
      this.create(option);
      this.open();
    }
  }, {
    key: "openUpdateModal",
    value: function openUpdateModal(task) {
      var option = {
        body: "<p>Enter new task message</p><input id='messageText' type='text' value=\"".concat(task.text, "\">"),
        button: "<button class='message-button' data-button-action='updateTask' data-task-id=\"".concat(task.id, "\">Ok</button>")
      };
      this.create(option);
      this.open();
    }
  }, {
    key: "openDeleteAllItems",
    value: function openDeleteAllItems() {
      var option = {
        body: "<p>Do you really want to delete all tasks?</p>",
        button: "<button class='message-button' data-button-action='clearAllTasks'>Delete</button>"
      };
      this.create(option);
      this.open();
    }
  }, {
    key: "openDeleteItem",
    value: function openDeleteItem(task_id) {
      var option = {
        body: "<p>Do you really want to delete this tasks</p>",
        button: "<button class='message-button' data-button-action='deleteTask' data-task-id='".concat(task_id, "'>Delete</button>")
      };
      this.create(option);
      this.open();
    }
  }, {
    key: "open",
    value: function open() {
      this.modal.classList.add("open");
    }
  }, {
    key: "close",
    value: function close() {
      this.modal.classList.remove("open");
      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      document.querySelector(".modal").remove();
    }
  }]);

  return ModalFrame;
}();

exports.default = ModalFrame;
},{}],"TaskService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TaskDAO = _interopRequireDefault(require("./TaskDAO.js"));

var _TaskRender = _interopRequireDefault(require("./TaskRender.js"));

var _ActionManager = _interopRequireDefault(require("./ActionManager.js"));

var _ModalFrame = _interopRequireDefault(require("./ModalFrame.js"));

var _Task = _interopRequireDefault(require("./Task.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskService = /*#__PURE__*/function () {
  function TaskService() {
    _classCallCheck(this, TaskService);

    this.taskRender = new _TaskRender.default();
    this.taskDAO = new _TaskDAO.default();
    this.modalFrame = new _ModalFrame.default();
  }

  _createClass(TaskService, [{
    key: "start",
    value: function start() {
      this.actionManager = new _ActionManager.default(document.body, this);
      this.taskDAO.clear();
      this.drawAllTasks();
    }
  }, {
    key: "drawAllTasks",
    value: function drawAllTasks() {
      var tasksHomeElement = document.getElementById("tasks");
      var tasks = this.taskDAO.getAllTasks();
      tasks.sort(function (a, b) {
        return a.id - b.id;
      });
      var renderedTasks = this.taskRender.renderTasks(tasks);
      document.querySelectorAll(".task").forEach(function (x) {
        return x.remove();
      });
      tasksHomeElement.insertAdjacentHTML("afterbegin", renderedTasks);
    }
  }, {
    key: "openUpdateModal",
    value: function openUpdateModal(target) {
      var taskElem = target.closest(".task");
      var task_id = taskElem.id;
      var task = this.taskDAO.getTask(task_id);
      this.modalFrame.openUpdateModal(task);
    }
  }, {
    key: "updateTask",
    value: function updateTask(target) {
      var elem = document.getElementById("messageText");
      var text = elem.value;
      var task_id = target.dataset.taskId;
      var task = this.taskDAO.getTask(task_id);
      task.text = text;
      this.taskDAO.updateTask(task);
      this.drawAllTasks();
      this.modalFrame.close();
    }
  }, {
    key: "checkTask",
    value: function checkTask(target) {
      var taskElem = target.closest(".task");
      var task_id = taskElem.id;
      var task = this.taskDAO.getTask(task_id);
      task.isCheck = target.checked;
      this.taskDAO.updateTask(task);
      this.drawAllTasks();
      this.modalFrame.close();
    }
  }, {
    key: "openAddModal",
    value: function openAddModal() {
      this.modalFrame.openAddModal();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.modalFrame.close();
    }
  }, {
    key: "openDeleteAllItemsModal",
    value: function openDeleteAllItemsModal() {
      this.modalFrame.openDeleteAllItems();
    }
  }, {
    key: "openDeleteItemModal",
    value: function openDeleteItemModal(target) {
      var task = target.closest(".task");
      var task_id = task.id;
      this.modalFrame.openDeleteItem(task_id);
    }
  }, {
    key: "addTask",
    value: function addTask() {
      var elem = document.getElementById("messageText");
      var text = elem.value;
      var task = new _Task.default(text, false);
      this.taskDAO.addTask(task);
      this.drawAllTasks();
      this.modalFrame.close();
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(target) {
      console.log();
      var task_id = target.dataset.taskId;
      this.taskDAO.removeTask(task_id);
      this.modalFrame.close();
      this.drawAllTasks();
    }
  }, {
    key: "clearTaskList",
    value: function clearTaskList() {
      this.taskDAO.clear();
      this.modalFrame.close();
      this.drawAllTasks();
    }
  }]);

  return TaskService;
}();

exports.default = TaskService;
},{"./TaskDAO.js":"TaskDAO.js","./TaskRender.js":"TaskRender.js","./ActionManager.js":"ActionManager.js","./ModalFrame.js":"ModalFrame.js","./Task.js":"Task.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _TaskService = _interopRequireDefault(require("./TaskService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskService = new _TaskService.default();
taskService.start();
},{"./TaskService.js":"TaskService.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55047" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map