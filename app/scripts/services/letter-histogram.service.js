'use strict';

angular
.module('gmailHistogramApp')
.service('letterHistogram', [function () {
    this.create = function createLetterHistogramDictionary(stringArray) {
        return _
            .chain(stringArray)
            .flatMap(function (s) { return s.split(''); })
            .map(function (s) { return s.toLowerCase(); })
            .filter(function (s) { return s.match(/[a-z]/i); })
            .reduce(function (acc, letter) {
                acc[letter] = (acc[letter] || 0) + 1;
                return acc;
            }, {})
            .value();
    };
}]);