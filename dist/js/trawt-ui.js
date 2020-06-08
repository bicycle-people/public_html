/*
* Copyright Takafumi Ishikawa; Licensed MIT
*/
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (global, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		global.TrwTable = factory();
	}
}) (this, function () {

  var TrwTable = function TrwTable(element, options) {

		this.options = {};

		this.columns = {};

		this.colLength = 0;

		this.headerElement = null;

    var table = document.createElement("table");

		table.style.border = "#FFFFFF 1px";
//		table.style.backgroundColor = "#FFFFFF";
		table.id = "resizable-table";

    this.initElement(element);

		this.initOptions(options || {});

		this.colLength = this.options["columns"].length;

		this.Column = new Column(table, this.options["columns"]);

    var rows = {};

		// Table要素生成
		var tbody = document.createElement("tbody");

		table.appendChild(tbody);

		this.Data = new Data(tbody, this.colLength, this.options["data"]);

		// 対象のdiv要素にテーブルを追加
    this.element.appendChild(table);

		// UI設定
		this.UI = new Ui();

		console.log(this.element);

		this.element.classList.add("trawtable");

  };

  // prototypeを記述
  TrwTable.prototype = {
		// オプションの既定値設定 ---------->>
		defaultOptions: {
			type: "view", // "view", "mainte", "transact"
			columns: [],
			data: [],
		},

		// 要素初期化 ---------->>
    initElement: function(element) {
  		if (typeof HTMLElement !== "undefined" && element instanceof HTMLElement) {
  			this.element = element;
  			return true;
  		} else if (typeof element === "string") {
  			this.element = document.querySelector(element);
  			if (this.element) {
  				return true;
  			} else {
  				console.error("TrwTable Creation Error - no element found matching selector: ", element);
  				return false;
  			}
  		} else {
  			console.error("TrwTable Creation Error - Invalid element provided:", element);
  			return false;
  		}
    },

		// オプション初期化 --------->>
		initOptions: function(options) {

			if (options.invalidOptionWarnings !== false) {
				for (var key in options) {
					if (typeof this.defaultOptions[key] === "undefined") {
						console.warn("Invalid table constructor option:", key);
					}
				}
			}
			//assign options to table
			for (var key in this.defaultOptions) {
				if (key in options) {
					this.options[key] = options[key];
				} else {
					if (Array.isArray(this.defaultOptions[key])) {
						this.options[key] = [];
					} else if (_typeof(this.defaultOptions[key]) === "object" && this.defaultOptions[key] !== null) {
						this.options[key] = {};
					} else {
						this.options[key] = this.defaultOptions[key];
					}
				}
			}
		},

  };
	// カラム設定
	var Column = function(table, columns) {
		this.initColumnOption(table, columns);
	};

	Column.prototype = {
		defaultOptionList: ["title", "field"],
		initColumnOption: function(table, columns) {
			this.headerElement = table.createTHead();
			this.headerElement.classList.add("trawtable-header");
			var row = this.headerElement.insertRow(0); // ヘッダーもいろいろできるようにしたいので後で検討
			var cell = [];
			var i = 0;
			this.columns = columns;
			this.columns.forEach(item=> {
				cell[i] = row.insertCell(i);
				cell[i].classList.add("resizable-column");
				cell[i].innerHTML = item.title; // カラムヘッダーのタイトル
				// カラム毎のフォーマット設定保持

				i++;
			});
		},
	};

	// 行設定
	var Row = function() {

	};

	Row.prototype = {
		initRows: function () {

		},
	};

	// UI設定
	var Ui = function() {
		this.initTable();
	};

	Ui.prototype = {
		initTable: function() {
			var tsize = 0;
			$(".resizable-column").resizable({ // リサイズ可能なカラムに設定
				handles:"e",
				start: function(event, ui) {
					tsize = document.getElementById("resizable-table").clientWidth;
				},
				resize: function(event, ui) {
					console.log(tsize);
					var resizeValue = ui.size.width - ui.originalSize.width;
					var tableSize = tsize + resizeValue;
					var panelSize = document.getElementById("view-list").clientWidth;
					document.getElementById("resizable-table").width = tableSize;
					if (panelSize <= tableSize + 1) {
						document.getElementById("view-list").style.overflow = "scroll";
					} else {
						document.getElementById("view-list").style.overflow = "hidden";
					};
				},
			});
		},
	};

	// データ設定
	var Data = function(tbody, length, data) {
		this.insertRow(tbody, length, data);
	};

	Data.prototype = {
		initData: function(options) {

		},
		insertRow: function(tbody, length, data) {
			this.length = length;
			this.data = data;
			var row = [];
			var cell = [];
			var i = 1;
			this.data.forEach(item=> {
				var j = 0;
				row[i] = tbody.insertRow();
				for (var key in item) {
						if (key === "id") {
							row[i].id = "item_" + i;
						} else {
							cell[i, j] = row[i].insertCell();
							cell[i, j].innerHTML = item[key];
						}
				}
				i++;
			});
		},
	};

  return TrwTable;
});
