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

		this.headerElement = null;

    var table = document.createElement("table");
		table.style.border = "#FFFFFF 1px";
		table.style.backgroundColor = "#FFFFFF";

    var data = [
                  [11, 12, 13],
                  [21, 22, 23],
                  [31, 32, 33],
                  [41, 42, 43]
               ];

    this.initElement(element);

		this.initOptions(options || {});

		this.Column = new Column(table, this.options["columns"]);

    var rows = [];

		// Table要素生成
    for (i = 0; i < data.length; i++) {
      rows.push(table.insertRow(-1));
      for(j = 0; j < data[0].length; j++) {
        cell = rows[i].insertCell(-1);
        cell.appendChild(document.createTextNode(data[i][j]));
      }
    }
    this.element.classList.add("trawtable");
    this.element.appendChild(table);
		// UI設定
		this.UISetting = new UiSetting();

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
			var row = this.headerElement.insertRow(0); // ヘッダーもいろいろできるようにしたいので後で検討
			var cell = [];
			var i = 0;
			this.columns = columns;
			this.columns.forEach(item=> {
				cell[i] = row.insertCell(i);
				cell[i].classList.add("col");
				cell[i].innerHTML = item.title; // カラムヘッダーのタイトル
				// カラム毎のフォーマット設定保持

				i++;
			});
		},
	};

	// 行設定
	var RowSetting = function() {

	};

	RowSetting.prototype = {

	};

	// jQuery-ui
	var UiSetting = function() {
		this.initTableSetting();
	}

	UiSetting.prototype = {
		initTableSetting: function() {
			$(".col").resizable({ // リサイズ可能なカラムに設定
				handles:"e"
			});
		}
	}

  return TrwTable;
});
