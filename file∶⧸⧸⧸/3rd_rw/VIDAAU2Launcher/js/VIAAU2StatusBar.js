var VIDAALiteU2LauncherTimeInterval = 0;
function getVIDAAU2StatusPageData(opts) {
    opts.CaE = [
        {
            "id":"VidaaU2MainTitleTime1",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitleTime2",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitleDate1",
            "CaEType":"div"
        },
        {
            "id":"VidaaU2MainTitleDate2",
            "CaEType":"div"
        },
        {
            "id":"VidaaU2MainTitleCity",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitletemperature",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitleweatherState",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitleWeatherIcon",
            "CaEType":"img"
        },
        {
            "id":"VidaaU2MainTitleWeatherIcon2",
            "CaEType":"img"
        },
        {
            "id":"VidaaU2MainTitleNetworkState",
            "CaEType":"span"
        },
        {
            "id":"VidaaU2MainTitleNetworkIcon",
            "CaEType":"img"
        }
    ]

    return VidaaU2StatusPageData;
}

var VidaaU2StatusPageData = {
    "VidaaU2MainTitleTime1":{"Data":""},
    "VidaaU2MainTitleTime2":{"Data":""},
    "VidaaU2MainTitleDate1":{"Data":""},
    "VidaaU2MainTitleDate2":{"Data":""},
    "VidaaU2MainTitleCity":{"Data":""},
    "VidaaU2MainTitletemperature":{"Data":""},
    "VidaaU2MainTitleweatherState":{"Data":""},
    "VidaaU2MainTitleWeatherIcon":{"Data":""},
    "VidaaU2MainTitleWeatherIcon2":{"Data":""},
    "VidaaU2MainTitleNetworkState":{"Data":""},
    "VidaaU2MainTitleNetworkIcon":{"Data":""},
    "operateData": {
        currTime1:"13:00",
        currTime2:"13:00",
        currDate:"13:00",
        currWeek:"13:00",
        currweatherData:""
    },
    rewrite: "VIDAALiteU2StatusRewrite"
}


function VIDAALiteU2StatusRewrite(data){

        data.VidaaU2MainTitleTime1.Data = data.operateData.currTime1;
        data.VidaaU2MainTitleTime2.Data = data.operateData.currTime2;
        data.VidaaU2MainTitleDate1.Data = data.operateData.currDate;
        data.VidaaU2MainTitleDate2.Data = data.operateData.currWeek;

}

function getCurrentWeek(){
    var longTime = getSYSLongTime();
    var utcdate = new Date(getLocalTimeByUTC(longTime) * milliBase);
    return getCurrentContentLanguage(weekFull[utcdate.getUTCDay()]);
}

function VIDAAU2StatusOnOpen(){
    UIObserver.subscribeMessage(UIObserver.MESSAGE_NAME.NETWORK_CHANGED, launcherNetworkOnChange);
    var data = VidaaU2StatusPageData;
        var cTime = getSystemTime();

        DBG_ERROR("VIDAAU2StatusOnOpen time:"+objToString(cTime));
        if(GLOBAL.TIME_FORMAT == 0){
            var str1 = cTime.time.substring(0,5);
            var str2 = cTime.time.substring(5,cTime.time.length);
            data.operateData.currTime1 = str1;
            data.operateData.currTime2 = str2;
        }else{
            data.operateData.currTime1 = cTime.time;
            data.operateData.currTime2 = " ";
        }
        data.operateData.currDate = cTime.date;
        data.operateData.currWeek = getCurrentWeek();
    DBG_ERROR("data.operateData.currTime1 "+data.operateData.currTime1);
    refreshLauncherTime();
    getCurrentWeatherData(refreshWeather);
    showNetworkStatus();
    hiWebOsFrame.VIDAAU2StatusPage.rewriteDataOnly();
}

function VIDAAU2StatusOnClose(){
    UIObserver.unsubscribeMessage(UIObserver.MESSAGE_NAME.NETWORK_CHANGED, launcherNetworkOnChange);
}

function refreshLauncherTime(){

    clearInterval(VIDAALiteU2LauncherTimeInterval);
    VIDAALiteU2LauncherTimeInterval = setInterval(function() {
        var data = VidaaU2StatusPageData;
        var cTime = getSystemTime();
        DBG_ERROR("refreshLauncherTime time:"+objToString(cTime));
        if(GLOBAL.TIME_FORMAT == 0){
            var str1 = cTime.time.substring(0,5);
            var str2 = cTime.time.substring(5,cTime.time.length);
            data.operateData.currTime1 = str1;
            data.operateData.currTime2 = str2;
        }else{
            data.operateData.currTime1 = cTime.time;
            data.operateData.currTime2 = " ";
        }
        data.operateData.currDate = cTime.date;
        data.operateData.currWeek = getCurrentWeek();

        hiWebOsFrame.VIDAAU2StatusPage.rewriteDataOnly();

    }, 60 * 1000);
}

var cities,defCityList;
var pageInd = 0;
var citylistPathForStaBar ='weather/cities';

function VidaaU2MainTitleHidenWeatherImg(index){
    $("#"+index).css("visibility","hidden");

}

function getCurrentWeatherData(refreshWeather) {
    debugE("get weather data for launcher Status bar");

    VidaaU2StatusPageData.operateData.currweatherData = {};
    if(!networkConnected()){
        //accuWeather logo is showed when network is not OK
        VidaaU2StatusPageData.operateData.currweatherData="noLocation";
        refreshWeather(VidaaU2StatusPageData.operateData.currweatherData);
        return;
    }

    try{
        hisenseUIConfig = readFileFromNative("hisenseUI/config.ini", 1);
    }catch(ex){
        debugE(ex.message);
        debugE("failed to read hisenseUI/config.ini");
    }

    try {
        var isDefaultData = false;
        try{
            cities = readFileFromNative("weather/cities", 1);
        }catch(ex){
            debugE(ex.message);
            cities=null;
        }
        debugE('cities:'+objToString(cities));

        if(null == hisenseUIConfig || !hisenseUIConfig["DefaultCity"]){//user have not enter accuweather app so far
            debugE("user have not enter accuweather app so far");
            var defCityKey = tv ? model.basicSetting.getTvsetLocation() + "City" : "CHNCity";
            DBG_INFO("use default city [" + defCityKey + "]");
            var defCityList = readFileFromNative("launcher/data/weather/cities",2);//3rd_rw/
            DBG_INFO("init defCityList"+objToString(defCityList[defCityKey]));
            var lancherAlreadCityflag=false;//用户是否曾选择过该国家对应的城市
            if(null == cities){//open launcher firstly
                debugE("open launcher firstly");
                if(!!defCityList[defCityKey]){
                    cities = defCityList[defCityKey];
                    pageInd = 0;
                    cities.cityList[pageInd].unit="Metric";
                }else{
                    DBG_INFO("can not find this default city[" + defCityKey + "]", DebugLevel.ERROR);
                    cities = $.extend({}, defCityList["CHNCity"]);
                }
                isDefaultData = true;
            }else{//null != cities : user have open launcher already, but user have not open accuweather app
                debugE("user have open launcher already, but user have not open accuweather app");
                DBG_INFO("cityList:"+objToString(cities.cityList));
                try {
                    for(var i=0;i<cities.cityList.length;i++){
                        DBG_INFO("cities.cityList[i].locId:"+cities.cityList[i].locId);
                        DBG_INFO("defCityList[defCityKey].cityList.locId:"+defCityList[defCityKey].cityList[0].locId);
                        if(cities.cityList[i].locId==defCityList[defCityKey].cityList[0].locId){
                            lancherAlreadCityflag=true;//用户已经打开过该国家
                            cities.defInd=i;
                            isDefaultData=false;
                            break;
                        }
                    }
                } catch (ex) {
                    DBG_ERROR(ex.message);
                }
                DBG_INFO("lancherAlreadCityflag:"+lancherAlreadCityflag);
                if(!lancherAlreadCityflag){//用户未打开过该国家
                    DBG_INFO("cities.cityList.length:"+cities.cityList.length);
                    DBG_INFO("pageInd:"+pageInd);
                    pageInd=cities.cityList.length;
                    cities.defInd=pageInd;
                    DBG_INFO("cities.defInd:"+cities.defInd);
                    defCityList[defCityKey].cityList[0].unit="Metric";
                    var citiesTmp = defCityList[defCityKey].cityList[0];
                    cities.cityList.push(citiesTmp);
//                    DBG_INFO("pageInd:"+pageInd);
//                    cities.cityList[pageInd].unit="Metric";
                    isDefaultData=true;
                }
            }
        }
        else if(null == cities || cities.cityList.length == 0) {
            DBG_ERROR("null == cities");
            VidaaU2StatusPageData.operateData.currweatherData="noLocation";
            refreshWeather(VidaaU2StatusPageData.operateData.currweatherData);
            return;
        }
        else{
            isDefaultData=false;
        }
        DBG_INFO('cities:'+objToString(cities));
        var defInd = cities.defInd;
        var locId = cities.cityList[defInd].locId;
        var unit = cities.cityList[defInd].unit;
        VidaaU2StatusPageData.operateData.currweatherData.name = cities.cityList[defInd].locName;
        var cityPath = {
            current: (isDefaultData ? "launcher/data/weather/current/" : "weather/current/") + locId,
            forecast: (isDefaultData ? "launcher/data/weather/forecast/" : "weather/forecast/") + locId
        };

        var newCityPath = {
            current: ("weather/current/") + locId,
            forecast: ("weather/forecast/") + locId
        };
        DBG_INFO("isDefaultData:"+isDefaultData);
        if(isDefaultData){
            var tempCurrent = readFileFromNative(cityPath.current,2);
            var tempForecast = readFileFromNative(cityPath.forecast,2);
            if(null == tempCurrent) {
                DBG_INFO("can not find this default city[" + defCityKey + "]", DebugLevel.ERROR);
                return;
            }
            writeFileToNative("weather/current/" + locId, objToString(tempCurrent),1);
            writeFileToNative("weather/forecast/" + locId, objToString(tempForecast),1);
            writeFileToNative(citylistPathForStaBar, objToString(cities),1);
        }
        var cityPathForStaBar=isDefaultData?cityPath:newCityPath;
        try {
            getWeatherData(refreshWeather,unit,isDefaultData,cityPathForStaBar,VidaaU2StatusPageData.operateData.currweatherData,cities);
        } catch (ex) {
            DBG_ERROR(ex.message);
        }
        try {
            updateWeatherData(locId, unit,getWeatherData.bind(this,refreshWeather,unit,false,newCityPath,VidaaU2StatusPageData.operateData.currweatherData,cities));
        } catch (ex) {
            DBG_ERROR(ex.message);
        }
    }
    catch(ex) {
        debugE(ex.message, DebugLevel.ERROR);
        VidaaU2StatusPageData.operateData.currweatherData="noLocation";
        refreshWeather(VidaaU2StatusPageData.operateData.currweatherData);
    }
}
function getWeatherData(callBack,unit,isDefaultData,cityPath,WeatherData,cities){
    /* Update WeatherData Object for refreshing statusBar */
    try{
        var cw = readFileFromNative(cityPath.current, isDefaultData ? 2:1);
        var fw = readFileFromNative(cityPath.forecast, isDefaultData ? 2:1);

    }catch (ex){debugE(ex.message)}

    if(null == cw || null == fw) {
        cities.cityList.splice(defInd, 1);
        cities.defInd = 0;
        debugE("read current weather failed. remove index", DebugLevel.ERROR);
        return;
    }
    var units = {
        Metric: '°C',
        Imperial: '°F'
    };
    WeatherData.degree = cw[0].Temperature[unit].Value + units[unit];
    WeatherData.weather = cw[0].WeatherText;
    WeatherData.icon =  ('0' + cw[0].WeatherIcon).slice(-2);
    debugE(objToString(WeatherData));
    if(callBack) callBack(WeatherData);//ˢ��Launcherҳ�� Current Weather���
}

function updateWeatherData(locId, itemUnit,callBack){
    /*Upload data to temp*/
    var m_interval = 2000;
    var max_times = 2;
    if(!networkConnected()){
        debugE("network is not ok");
        return;
    }
    var newWeatherWorkRoot =1;
    var currentPath = setTempPath(locId, URLType.CURRENT),
        forecastPath = setTempPath(locId, URLType.FORECAST);

    var currentURL = setUrlSta(locId, URLType.CURRENT, itemUnit),
        forecastURL = setUrlSta(locId, URLType.FORECAST, itemUnit);


    if(downloadFileToNative(currentURL, currentPath, newWeatherWorkRoot, 10)) {
        checkDownloadState(currentPath, newWeatherWorkRoot, updateWeatherDataCallback.bind(this,callBack), currentPath, m_interval, max_times);
    }

    if(downloadFileToNative(forecastURL, forecastPath, newWeatherWorkRoot, 10)) {
        checkDownloadState(forecastPath, newWeatherWorkRoot, updateWeatherDataCallback.bind(this,callBack), forecastPath, m_interval, max_times);
    }

}

function updateWeatherDataCallback(callBack,obj, identify){
    /*Move data to dest*/
    var newWeatherWorkRoot =1;
    var callbackID=identify;
    if(null == obj || "string" == typeof(obj)) {
        debugE('get new weather failed');
        if("string" == typeof(obj)) {
            deleteNativeFile(identify, newWeatherWorkRoot);
        }
        return;
    }
    var destPath = '', locId = '';
    debugE('updateWeatherDataCallback identify = ' + identify);
    if(identify.indexOf('current') > -1) {
        locId = identify.split('current')[1];
        destPath = setPath(locId, URLType.CURRENT);
    }
    else if(identify.indexOf('forecast') > -1) {
        locId = identify.split('forecast')[1];
        destPath = setPath(locId, URLType.FORECAST);
    }
    if('' != destPath) {
        moveNativeFile(destPath, identify, 1, newWeatherWorkRoot);
    }
    debugE('callback:'+callBack);
    if(callbackID.indexOf('forecast') > -1){
        callBack.call(this);//����ˢ�����
    }
}

function URLType() {
}
URLType.CURRENT = 0;
URLType.FORECAST = 1;
URLType.SEARCH = 2;

function setTempPath(key, urlType) {
    var path = '';
    switch(urlType) {
        case URLType.CURRENT:
            path += ('current' + key);
            break;
        case URLType.FORECAST:
            path += ('forecast' + key);
            break;
        default :
            debugE('url type error', DebugLevel.ERROR);
            path += 'error';
            break;
    }
    return path;
}
function setPath(key, urlType) {
    var path = 'weather/';
    switch(urlType) {
        case URLType.CURRENT:
            path += ('current/' + key);
            break;
        case URLType.FORECAST:
            path += ('forecast/' + key);
            break;
        case URLType.SEARCH:
            path += 'searchlist';
            break;
        default :
            debugE('url type error', DebugLevel.ERROR);
            path += 'error';
            break;
    }
    return path;
}
function setUrlSta(key, urlType, itemUnit) {
    var url = '';
    var langMap = {
        eng: "en", fre: "fr", spa: "es", ger: "de", ita: "it", por: "pt",
        nor: "no", swe: "sv", dan: "da", fin: "fi", chi: "zh", cze: "cs",
        slk: "sk", pol: "pl", hun: "hu", bgr: "bg", tur: "tr", uzb: "ur",
        ara: "ar", rus: "ru", tha: "th", per: "fa", hin: "hi", heb: "he",
        ukr: "uk", vie: "vi", bur: "en", ind: "id", mal: "ms", bul: "bg"
    };
    var langcode = !!GLOBAL.CURRENT_LANGUAGE ? langMap[GLOBAL.CURRENT_LANGUAGE] : "en";
    var apiKey = '5f7afc280da94a37a8a4cef4930c48d8';
    var params = '?language=' + langcode+ '&apikey=' + apiKey + '&metric=' + (itemUnit == 'Metric');
    switch(urlType) {
        case URLType.CURRENT:
            url = 'http://api.accuweather.com/currentconditions/v1/' + key + '.json' + params + '&details=true';
            break;
        case URLType.FORECAST:
            url = 'http://api.accuweather.com/forecasts/v1/daily/5day/' + key + params;
            break;
        case URLType.SEARCH:
            url = 'http://api.accuweather.com/locations/v1/search' + params + "&q=" + key;
            break;
        default :
            debugE('url type error', DebugLevel.ERROR);
            break;
    }
    //debugE(url, DebugLevel.INFO);
    return encodeURI(url);
}
function networkConnected() {
    try {
        var cnnct = tv ? model.network.getEnumNetworkAvailable() : 1;
        return (1 == cnnct);
    }
    catch (ex) {
        debugE(ex.message, DebugLevel.ERROR);
        return false;
    }
}

function refreshWeather(weatherData) {
    debugE("launcher.weatherData: "+ objToString(weatherData));
    if (weatherData == "noLocation") {
        debugE("launcher.weatherData == noLocation");
        VidaaU2MainTitleHidenWeatherImg("VidaaU2MainTitleWeatherIcon");
        $("#VidaaU2MainTitleWeatherIcon2").css("visibility","visible");
        VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/blank.png";
        VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon2.Data = VIDAAU2LauncherBaseDir + "img/weather/ic_statusbar_accweather.png";
        VidaaU2StatusPageData.VidaaU2MainTitleCity.Data = "";
        VidaaU2StatusPageData.VidaaU2MainTitletemperature.Data = "";
        VidaaU2StatusPageData.VidaaU2MainTitleweatherState.Data = "";
    } else {
        debugE("!! launcher.weatherData");
        VidaaU2MainTitleHidenWeatherImg("VidaaU2MainTitleWeatherIcon2");
        $("#VidaaU2MainTitleWeatherIcon").css("visibility","visible");
        VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/blank.png";
        VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon2.Data = VIDAAU2LauncherBaseDir + "img/weather/ic_statusbar_accweather.png";
        VidaaU2StatusPageData.VidaaU2MainTitleCity.Data = "";
        VidaaU2StatusPageData.VidaaU2MainTitletemperature.Data = "";
        VidaaU2StatusPageData.VidaaU2MainTitleweatherState.Data = "";
        if (weatherData.name == null || weatherData.name == undefined) {
            debugE( "launcher.weatherData.name is error " );
            VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/weather/weather_unknown.png";
        } else {
            debugE( "launcher.weatherData.name: "+ weatherData.name );
            VidaaU2StatusPageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/weather/" + weatherData.icon + ".png";
            VidaaU2StatusPageData.VidaaU2MainTitletemperature.Data = weatherData.degree;
            VidaaU2StatusPageData.VidaaU2MainTitleCity.Data = weatherData.name;
            VidaaU2StatusPageData.VidaaU2MainTitleweatherState.Data = weatherData.weather;
        }

        // var textX = temperature.localToLocal(temperature.children[0].x, 0, statusBar).x;
        //weatherIcon.x = textX - temperature.children[0].getMeasuredWidth() - weatherIcon.regX - 5;
    }
}
function launcherNetworkOnChange(){
    showNetworkStatus();
    hiWebOsFrame.VIDAAU2StatusPage.rewriteDataOnly();
}
function showNetworkStatus(){
    var NetStatus = tv ? model.network.getEnumNetworkAvailable() : 1; //1 success  0 fail
    var networkOpenSwitch = tv?model.network.getEnumNetworkConfig():1;
    var networkType = tv?model.network.getEnumNetworking():1;
    debugE("NetStatus:"+NetStatus + " networkOpenSwitch: " + networkOpenSwitch + "networkType:" + networkType);
    if(networkOpenSwitch == 0){
        networkType = NetWorkType.OFF;
    }
    if(networkType == NetWorkType.ETHER){
        if(NetStatus == NetWorkConnect.CONNECT){
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data = "Ethernet";
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data = VIDAAU2LauncherBaseDir + "img/network/ic_stat_ethernet.png";
        }else{
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data = "";
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data = VIDAAU2LauncherBaseDir + "img/network/ic_stat_offline.png";
        }
    }else if(networkType == NetWorkType.WIRELESS){
        if(NetStatus == NetWorkConnect.CONNECT){
            var wifiName = tv?model.network.getSsid():"wifiname";
            var wifiSignal = tv? model.network.getLink_quality():100;
            var level = getWifiSignalLevel(wifiSignal);
            var img = VIDAAU2LauncherBaseDir + "img/network/ic_stat_wifi_signal_"+level+".png";
            debugE("immg:"+img);
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data = wifiName;
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data = img
        }else{
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data = "";
            VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data =  VIDAAU2LauncherBaseDir + "img/network/ic_stat_wifi_not_connected.png";

        }
    }else{
        VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data = "";
        VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data =  VIDAAU2LauncherBaseDir + "img/network/ic_stat_offline.png";
    }
    debugE("immg:"+VidaaU2StatusPageData.VidaaU2MainTitleNetworkState.Data+VidaaU2StatusPageData.VidaaU2MainTitleNetworkIcon.Data);
}

function getWifiSignalLevel(signal){
    var level = 1;
    if(signal <= 33){
        level = 'low';
    }else if(signal > 33 && signal <= 66){
        level = 'medium';
        //}else if(signal > 66 && signal <= 100){
        //    level = 3;
    }else{
        level = 'high';
    }
    return level;
}
