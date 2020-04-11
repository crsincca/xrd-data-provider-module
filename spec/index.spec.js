/* global require,describe,it,expect */
'use strict';

describe('DataProvider', function () {

    var dispatcher = require('@crsincca/xrd-dispatch-module');

    it('should send plugin-hand-shake message', function () {
        dispatcher.on('plugin-hand-shake', function (payload) {
            expect(payload).toEqual('xrd-data-provider');
        });

        var data = require('../index.js');
    });

});
