$(function () {

    var x = 'http://api.worldbank.org/countries/il';
    var y = 'http://api.worldbank.org/indicators';
    var z = 'http://api.worldbank.org/indicator/SG.GEN.PARL.ZS?locations=IL';
    var w = 'http://api.worldbank.org/countries/IL/indicators/SG.GEN.PARL.ZS';
    var baseUrl = w;

    var suffix = 'format=jsonP&per_page=60&prefix=?';
    var debugSuffix = 'format=json&per_page=60&prefix=?';

    var url = baseUrl + (baseUrl.indexOf("?") != -1 ? "&" : "?") + suffix;
    var debugUrl = baseUrl + (baseUrl.indexOf("?") != -1 ? "&" : "?") + debugSuffix;

    $.getJSON(url, function (data, textStatus, jqXHR) {
        console.info(textStatus);
        console.info(debugUrl);

        q = data[1];
        console.log(data[0]);
        console.log(data[1]);
    });

    return;

    var api = 'http://api.worldbank.org/countries/IL?format=json'





    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        url: api,
        type: 'GET',
        crossDomain: true, // enable this
        dataType: 'jsonp',
        success: function (e) {
            //console.log(e);
        },
        error: function (e) {
            console.error(e);

        }
    });
})