'use strict';

/**
 * @ngdoc function
 * @name gmailHistogramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gmailHistogramApp
 */
angular.module('gmailHistogramApp')
  .controller('MainCtrl', ['$scope', 'gmailApi', '$q', function ($scope, gmailApi, $q) {
    var main = this;
    main.messages = [];

    this.authAndLoadData = function loadGmailData() {
      gmailApi.authorize().then(this.loadMessages);
    };

    this.loadMessages = function loadMessages() {
      gmailApi.getMessageList().then(function messagesReceived(messages) {
        var loadMessageByIdPromises = messages.map(function(m) { return gmailApi.getMessageById(m.id) });
        
        $q.all(loadMessageByIdPromises).then(function (results) {
            main.messages = results.map(function(r) { return { id: r.id, snippet: r.snippet } });
            main.updateData();
        });
      });
    };
    
    this.updateData = function updateData() {
      var items = _
        .chain(main.messages)
        .map(function (msg) { return msg.snippet; })
        .flatMap(function (str) { return str.split('') })
        .map(function (str) { return str.toLowerCase(); })
        .filter(function (char) { return char.match(/[a-z]/i); })
        .groupBy()
        .map(function (items, key) { return { "name": key, "size": items.length } })
        .value();

      main.globData = {
        "name": "flare",
        "children": items
      };
    };

    this.globData = {
      "name": "flare",
      "children": [
        {
          "name": "A",
          "size": 100000
        },
        {
          "name": "animate",
          "children": [
            { "name": "Easing", "size": 17010 }
          ]
        },
        {
          "name": "data",
          "children": [
            {
              "name": "converters",
              "children": [
                { "name": "Converters", "size": 721 },
                { "name": "DelimitedTextConverter", "size": 4294 },
                { "name": "GraphMLConverter", "size": 9800 },
                { "name": "IDataConverter", "size": 1314 },
                { "name": "JSONConverter", "size": 2220 }
              ]
            },
            { "name": "DataField", "size": 1759 },
            { "name": "DataSchema", "size": 2165 },
            { "name": "DataSet", "size": 586 },
            { "name": "DataSource", "size": 3331 },
            { "name": "DataTable", "size": 772 },
            { "name": "DataUtil", "size": 3322 }
          ]
        },
        {
          "name": "display",
          "children": [
            { "name": "DirtySprite", "size": 8833 },
            { "name": "LineSprite", "size": 1732 },
            { "name": "RectSprite", "size": 3623 },
            { "name": "TextSprite", "size": 10066 }
          ]
        },
        {
          "name": "util",
          "children": [
            { "name": "Arrays", "size": 8258 },
            { "name": "Colors", "size": 10001 },
            { "name": "Dates", "size": 8217 },
            { "name": "Displays", "size": 12555 },
            { "name": "Filter", "size": 2324 },
            { "name": "Geometry", "size": 10993 },
            {
              "name": "heap",
              "children": [
                { "name": "FibonacciHeap", "size": 9354 },
                { "name": "HeapNode", "size": 1233 }
              ]
            },
            { "name": "IEvaluable", "size": 335 },
            { "name": "IPredicate", "size": 383 },
            { "name": "IValueProxy", "size": 874 },
            {
              "name": "math",
              "children": [
                { "name": "DenseMatrix", "size": 3165 },
                { "name": "IMatrix", "size": 2815 },
                { "name": "SparseMatrix", "size": 3366 }
              ]
            },
            { "name": "Maths", "size": 17705 },
            { "name": "Orientation", "size": 1486 },
            {
              "name": "palette",
              "children": [
                { "name": "ColorPalette", "size": 6367 },
                { "name": "Palette", "size": 1229 },
                { "name": "ShapePalette", "size": 2059 },
                { "name": "SizePalette", "size": 2291 }
              ]
            },
            { "name": "Property", "size": 5559 },
            { "name": "Shapes", "size": 19118 },
            { "name": "Sort", "size": 6887 },
            { "name": "Stats", "size": 6557 },
            { "name": "Strings", "size": 22026 }
          ]
        }
      ]
    };

  }]);
