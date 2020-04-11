'use strict';
var dispatcher = require('@crsincca/xrd-dispatch-module');

var xrdDataProvider = {};

dispatcher.on('open-file', function (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var lines = e.target.result.split('\n');
        xrdDataProvider['data'] = [];
        lines.forEach(function (line) {
            if (!line.startsWith('#')) {
                var regex = /[+-]?\d+(\.\d+)?/g;
                var floatStrings = line.match(regex);
                if (floatStrings != null && floatStrings.length === 2) {
                    var floats = floatStrings.map(function (v) { return parseFloat(v); });
                    xrdDataProvider['data'].push([floats[0], floats[1]]); // array [[x1,y1], [x2,y2], ...]
                }
            }
        });
        dispatcher.emit('data-updated', xrdDataProvider['data']);
    };
    reader.readAsText(file);
});

dispatcher.emit('plugin-hand-shake', 'xrd-data-provider');
