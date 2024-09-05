(function() {
    'use strict';

    let p1Message = 'SUCCESS';
    let p2Message = 'SUCCESS';
    let p3Message = 'SUCCESS';

    function testMakeMultiFilter() {
        console.log('Testing MakeMultiFilter...');

        let arrayMaker = MakeMultiFilter([1, 2, 3]);

        let result = arrayMaker(function (elem) {
            return elem !== 2;
        }, function (currentArray) {
            console.log(this);
            console.log(currentArray);
        });

        result = arrayMaker();
        if (result.toString() !== [1, 3].toString()) {
            p1Message = 'FAILURE';
        }

        result = arrayMaker(function (elem) {
            return elem !== 3;
        });
        if (result != [1]) {
            p1Message = 'FAILURE';
        }

        arrayMaker = MakeMultiFilter([1, 2, 3]);
        result = arrayMaker(function (elem) {
            return elem !== 2;
        })(function (elem) {
            return elem === 1;
        })();
        if (result.toString() !== [1].toString()) {
            p1Message = 'FAILURE';
        }

        console.log('Test MakeMultiFilter result: ' + p1Message);
    }

    function testTemplateProcessor() {
        console.log('Testing TemplateProcessor...');

        let template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
        let dateInfo = {month: 'July', day: '1', year: '2016'};

        let tp = new TemplateProcessor(template);

        let result = tp.fillIn(dateInfo);
        if (result !== 'My favorite month is July but not the day 1 or the year 2016') {
            p2Message = 'FAILURE';
        }

        dateInfo.month = 'August';
        result = tp.fillIn(dateInfo);
        if (result !== 'My favorite month is August but not the day 1 or the year 2016') {
            p2Message = 'FAILURE';
        }

        delete dateInfo.day;
        result = tp.fillIn(dateInfo);
        if (result !== 'My favorite month is August but not the day  or the year 2016') {
            p2Message = 'FAILURE';
        }

        result = tp.fillIn({});
        if (result !== 'My favorite month is  but not the day  or the year ') {
            p2Message = 'FAILURE';
        }

        console.log('Test TemplateProcessor result: ' + p2Message);
    }

    function test() {
        testMakeMultiFilter();
        testTemplateProcessor();

        console.log('Final Result: ' + (p1Message === 'SUCCESS' && p2Message === 'SUCCESS' && p3Message === 'SUCCESS' ? 'SUCCESS' : 'FAIL'));
    }

    test();
})();