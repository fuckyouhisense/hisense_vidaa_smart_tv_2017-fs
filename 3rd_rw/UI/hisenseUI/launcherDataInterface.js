/**
 * Created by Administrator on 16-2-3.
 */


/* Launcher Global data define */
var ENUM_INDEX = 0;
function LauncherCMD() {
    ENUM_INDEX = 0;
}

LauncherCMD();
LauncherCMD.APP = ENUM_INDEX++;
LauncherCMD.LIVETV = ENUM_INDEX++;
LauncherCMD.HIMEDIA = ENUM_INDEX++;
LauncherCMD.SETTINGS = ENUM_INDEX++;
LauncherCMD.ALLINPUTS = ENUM_INDEX++;
LauncherCMD.NOTIFICATION = ENUM_INDEX++;
LauncherCMD.ALLAPP = ENUM_INDEX++;
LauncherCMD.RECOMMEND = ENUM_INDEX++;
LauncherCMD.CHANNEL = ENUM_INDEX++;
LauncherCMD.INPUT = ENUM_INDEX++;
LauncherCMD.ALLAPPTITLES = ENUM_INDEX++;
LauncherCMD.YOUTUBE_VIDEO = ENUM_INDEX++;
LauncherCMD.EDIT = ENUM_INDEX++;
LauncherCMD.RESET = ENUM_INDEX++;
LauncherCMD.PICTURE = ENUM_INDEX++;
LauncherCMD.PICTURE_B = ENUM_INDEX++;
LauncherCMD.BROWSER = ENUM_INDEX++;

function CmdURLType() {

}
CmdURLType.NONE = 0;
CmdURLType.DEFAULT = 10;
CmdURLType.VUDU_POSTER = 14;
CmdURLType.START_WEBAPP = 36;
CmdURLType.START_NATIVEAPP = 37;
CmdURLType.HIPAGE = 37; // old == 60, now same as nativeapp
CmdURLType.START_BROWSER = 40;
CmdURLType.VUDU_POSTER = 92;
CmdURLType.STOP_NATIVEAPP = 130;
CmdURLType.START_WEBAPP = 36;
CmdURLType.STOP_WEBAPP = 136;
CmdURLType.START_BROWSER = 40;
CmdURLType.AMCOMMAND = 50;
CmdURLType.YOUTUBE = 51;
CmdURLType.STOP_BROWSER = 140;
CmdURLType.LAU_BROWSER_PICASA = 100;
CmdURLType.LAU_BROWSER_HIMEDIA = 200;
CmdURLType.LAU_BROWSER_WIZARD = 300;
CmdURLType.LAU_BROWSER_EPOS = 400;
CmdURLType.PAUSE_NETFLIX = 500;
CmdURLType.STOP_NETFLIX = 600;
CmdURLType.START_FROM_DIALSERVER = 700;
CmdURLType.START_FROM_STANDBY = 800;
CmdURLType.STOP_FROM_DIALSERVER = 900;
CmdURLType.LAU_BROWSER_TERRATV = 1000;
CmdURLType.START_HBBTV_APP = 60;
CmdURLType.FREEVIEW_APP = 360;


function StoreType() {

}
StoreType.OPERA = 95;
StoreType.FOXXUM = 81;
StoreType.NETRANGE = 93;
StoreType.HBBTV = 97;
StoreType.STORE = 98;
StoreType.HISENSE = 99;
StoreType.BROWSER = 100;
StoreType.YOUTUBE = 200;

function APPMODULE() {
}
APPMODULE.MAIN = "APP";
APPMODULE.CONTROL = "appControl";
APPMODULE.WAITING = "waitingPage";

function LauncherTagType() {

}
LauncherTagType.AllAPP = 57;
LauncherTagType.YOUTUBE = 58;
LauncherTagType.MEDIA = 59;
LauncherTagType.LIVETV = 70;
LauncherTagType.RECOMMEND = 83;
LauncherTagType.AD = 99;
LauncherTagType.AllAPPTITLES = 1001;
LauncherTagType.SCREENPROTECT = 1002;
LauncherTagType.RECENTLY = 1003;
LauncherTagType.YOUTUBE_VIDEO = 1004;
LauncherTagType.SETTINGS = 1006;
LauncherTagType.FEATURED = 91;
LauncherTagType.PICTURE = 1007;
LauncherTagType.PICTURE_B = 1008;

var g_screenProtectPath = ["Screen/11.jpg","Screen/22.jpg","Screen/33.jpg"];
function LauncherUpdate() {
    ENUM_INDEX = 0;
}

LauncherUpdate();
LauncherUpdate.NOUPDATE = ENUM_INDEX++;
LauncherUpdate.LANGUAGE = ENUM_INDEX++;
LauncherUpdate.COUNTRY = ENUM_INDEX++;
LauncherUpdate.SERVICE = ENUM_INDEX++;


var g_fteNoneSource = {
    "none":false,
    "needUpdate":false
};
var g_LauncherData = {"currentCountryCode": "USA", "currentLanguage": "eng", "cTimestamp": 0};
var g_notificationApps = [];
var g_notificationTimeStamp = getNotificationTimeStamp();
var g_launcherHotelStatus = 0;
var g_launcherSourceHotel = [];
var g_notificationCrtTimeStamp = 0;
var g_pictureResource = null;
var g_pictureResourceB = null;
var g_appStoreList = [];
var g_browserAppList = [];

//GLOBAL.LAUNCHER_THEME = OEMFunction.getConditionCheckResult(OEMFunction.OEMConditions.LAUNCHER_THEME);

function getLauncherData() {

    var dd = [];
    var serviceUpdate = getLauncherServiceUpdateData();
    GLOBAL.LAUNCHER_THEME = getLauncherTheme();
    var currentCountryCode = tv ? model.basicSetting.getTvsetLocation() : "ARG";
    var serviceCountryCode = serviceUpdate.countryCode;
    DBG_INFO('current Country Code ' + currentCountryCode, DebugLevel.WARNING);
    getAlwaysDebugStatus();
    g_launcherHotelStatus = tv ? model.hotel.getHotelMode() : 0;
    g_launcherSourceHotel = initAllInputsData().sourceList;
    g_LauncherData.currentCountryCode = currentCountryCode;
    g_LauncherData.cTimestamp = serviceUpdate.timeStamp;
    g_LauncherData.currentLanguage = hiWebOsFrame.getCurrentLanguage();
    DBG_INFO("currentCountryCode:" + currentCountryCode);
    var mainJSON = null;
    var defaultData = (serviceCountryCode != currentCountryCode) || getAlwaysDefaultDataStatus() || serviceUpdate.timeStamp == 0;
    var crtArea = hiWebOsFrame.getCurrentArea();
    crtArea = crtArea+"/";
    var launcherPath = defaultData ? (tv?"VIDAAU2Launcher/data/"+crtArea:"../VIDAAU2Launcher/data/"+crtArea) : "launcher/data/";

    if (defaultData) {
        DBG_ERROR('service country not equal current country, use default data', DebugLevel.WARNING);
        mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
    }
    else {
        mainJSON = readXMLDOM(launcherPath + "CategoryIndex.xml", 1);
        if (null == mainJSON) {
            launcherPath = "VIDAAU2Launcher/data/"+crtArea;
            DBG_ERROR('get launcher data error, use default data', DebugLevel.ERROR);
            mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
            defaultData = true;
        }
    }

    if (null != mainJSON) {
        var footerJSON = readXMLDOM(launcherPath + getCategoryListPath(mainJSON), defaultData ? 2 : 1);
        dd = parseLauncherCategoryListData(footerJSON, defaultData, launcherPath);
    }
//    var launcherData = {};
//    launcherData.data = dd;
//    DBG_ERROR("return data:" + objToString(launcherData));
//    var ret = $.extend(true,{}, launcherData);
    if(dd == null){
        launcherPath = "VIDAAU2Launcher/data/"+crtArea;
        DBG_ERROR('no all app data ,use default data');
        mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
        defaultData = true;
        if (null != mainJSON) {
            var footerJSON = readXMLDOM(launcherPath + getCategoryListPath(mainJSON), defaultData ? 2 : 1);
            dd = parseLauncherCategoryListData(footerJSON, defaultData, launcherPath);
        }
    }
    DBG_INFO("return data:" + objToString(dd));

    return dd;
}
function refreshNotificationApps(){
    var deletedNotification = null;
    if(!tv){
        deletedNotification = [];
        var obj = {
            tagType:0,
            contentMD5:0
        }
        obj.tagType = LauncherTagType.RECOMMEND;
        obj.contentMD5 = "e6e36b32bf5fd24d13db744a74a3185caaaa";
        deletedNotification.push(obj);
    }else{
        deletedNotification = readFileFromNative('launcher/deletedNotification.txt', 1);
        if (null == deletedNotification) {
            deletedNotification = [];
        }
    }
    return deletedNotification;

}

function getNotificationApps(){
//    DBG_ERROR("getNotificationApps:" + objToString(g_notificationApps));
    return g_notificationApps;
}

function getPictureResource(){
//    DBG_ERROR("getNotificationApps:" + objToString(g_notificationApps));
    var data = null;
    if(g_pictureResource!=null){
        data = {};
        data.Icon = g_pictureResource.Icon;
        data.Detail = g_pictureResource.Detail;
        data.Name = g_pictureResource.Name;
        data.cmd = g_pictureResource.cmd;
        data.date = g_pictureResource.date;
    }
    return data;
}

function getPictureResourceB(){
//    DBG_ERROR("getNotificationApps:" + objToString(g_notificationApps));
    var data = null;
    if(g_pictureResourceB!=null){
        data = {};
        data.Icon = g_pictureResourceB.Icon;
        data.Detail = g_pictureResourceB.Detail;
        data.Name = g_pictureResourceB.Name;
        data.cmd = g_pictureResourceB.cmd;
        data.date = g_pictureResourceB.date;
    }
    return data;
}

function clearNotificationApps(){
    var cateGory = [];
    var obj = {
        tagType:0,
        contentMD5:0
    }
    if(g_pictureResource!=null){
        obj.tagType = LauncherTagType.PICTURE;
        obj.contentMD5 = g_pictureResource.contentMD5;
        cateGory.push(obj);
    }
    if(g_pictureResourceB!=null){
        obj.tagType = LauncherTagType.PICTURE_B;
        obj.contentMD5 = g_pictureResourceB.contentMD5;
        cateGory.push(obj);
    }
    if(g_notificationApps.length>0){
        obj.tagType = LauncherTagType.RECOMMEND;
        obj.contentMD5 = g_notificationApps[0].contentMD5;
        cateGory.push(obj);
    }

    if(cateGory.length>0){
        if (tv) {
            writeFileToNative('launcher/deletedNotification.txt', objToString(cateGory), 1);
        }
    }
    g_notificationApps = [];
    g_pictureResourceB = null;
    g_pictureResource = null;
}

function parseLauncherCategoryListData(footer, defaultData, launcherPath) {
    var containerData = [];
    if (null == footer) {
        DBG_ERROR("footer json is null");
        return containerData;
    }
    var delData = getLauncherDeleteAppByUser();
    var rememberInfo = getRememberEditAppFromNativeFile();
    var delNotification = refreshNotificationApps();
//    DBG_ERROR("rememberInfo:"+JSON.stringify(rememberInfo));
//    var homeData = $.extend(true, {}, rememberInfo.appInfo);
    var homeData = rememberInfo.appInfo;
    var footerTmp = getNodesByKey(CategoryKey.INFO, footer);
    var hasProtect = false;
    var hasNotification = false;
    var hasAllAppTitles = false;
    var hasPictureResource = false;
    var hasPictureResourceB = false;
    var hasAllApp = false;
    var allAppLen = 0;
    var allAppTitlesLen = 0;
    var addApps =null;
    var youtube_video = null;
//    DBG_ERROR("footerTmp.length:" + footerTmp.length);
    for (var i = 0; i < footerTmp.length; i++) {
        var contentItem = {};

        contentItem.Name = getItemsByLanguage(getNodesByKey(CategoryKey.CATEGORYNAME, footerTmp[i]), "name", defaultData);
        contentItem.Icon = getItemsByLanguage(getNodesByKey(CategoryKey.CATEGORYICON, footerTmp[i]), 'iconUrl', defaultData);
        contentItem.Order = getTextByKey(CategoryKey.ORDER, footerTmp[i]);
        contentItem.tagType = getTextByKey(CategoryKey.TAGTYPE, footerTmp[i]);

        var contentData = {};
        contentData.tagType = contentItem.tagType;
        contentData.txts = [];
        contentData.imgs = [];
        contentData.urls = [];
        contentData.urlTypes = [];
        contentData.storeTypes = [];
        contentData.canRemoves = [];
        contentData.canMoves = [];
        contentData.Descs = [];
        contentData.cmd = -1;
        if (contentItem.tagType == LauncherTagType.LIVETV) {
            contentItem.data = contentData;
        } else {
            contentItem.data = parseLauncherCategoryContentData(getTextByKey(CategoryKey.CATEGORYURL, footerTmp[i]), defaultData, launcherPath,contentItem.tagType);
            if (contentItem.tagType == LauncherTagType.AllAPP || contentItem.tagType == LauncherTagType.AllAPPTITLES) {

                for (var m = 0; m < delData.length; m++) {
                    var idx = $.inArray(delData[m], contentItem.data.urls);
                    if (idx > -1) {
                        DBG_ALWAYS("generateDataFunction:delete all:" + delData[m] + "," + delData.length);
                        contentItem.data.imgs.splice(idx, 1);
                        contentItem.data.txts.splice(idx, 1);
                        contentItem.data.urls.splice(idx, 1);
                        contentItem.data.urlTypes.splice(idx, 1);
                        contentItem.data.canRemoves.splice(idx, 1);
                        contentItem.data.canMoves.splice(idx, 1);
                        contentItem.data.storeTypes.splice(idx, 1);
                    }
                }
                var configAppNum = contentItem.data.imgs.length;
                addApps = getAddAppFromOpera();
                g_appStoreList = [];
                DBG_ALWAYS("VIDAALiteInitLauncherAppPageData:add app number:" + addApps.length);
                launcherLastAppStoreAddNum = addApps.length;
                for (var n = 0; n < addApps.length; n++) {
                    g_appStoreList.push(addApps[n].appUrl);
                    contentItem.data.imgs[n + configAppNum] = addApps[n].Image;
                    contentItem.data.txts[n + configAppNum] = addApps[n].appName;
                    contentItem.data.urls[n + configAppNum] = addApps[n].appUrl;
                    contentItem.data.urlTypes[n + configAppNum] = addApps[n].appUrlType;
                    contentItem.data.canRemoves[n + configAppNum] = addApps[n].canRemove;
                    contentItem.data.canMoves[n + configAppNum] = addApps[n].canMove;
                    contentItem.data.storeTypes[n + configAppNum] = addApps[n].storeType;
                }
                if(contentItem.tagType == LauncherTagType.AllAPP){
                    contentData.cmd = LauncherCMD.ALLAPP;
                    hasAllApp = true;
                    allAppLen = contentItem.data.urls.length;
                }else if(contentItem.tagType == LauncherTagType.AllAPPTITLES){
                    hasAllAppTitles = true;
                    allAppTitlesLen = contentItem.data.urls.length;
                }
            }
            else if(contentItem.tagType == LauncherTagType.SCREENPROTECT){
                hasProtect = true;
                g_screenProtectPath = [];
                var tmpPath = ["Screen/11.jpg","Screen/22.jpg","Screen/33.jpg"];
                var b=0;
                for(var a=0;a<contentItem.data.imgs.length;a++){
                    if(contentItem.data.imgs[a].indexOf("default.png")>-1){
//                        hasProtect = false;
//                        break;
                        g_screenProtectPath[a] = tmpPath[b];
                        if(b<2){
                            b++;
                        }else{
                            b = 0;
                        }
                    }else{
                        g_screenProtectPath[a] = contentItem.data.imgs[a];
                    }
                }
            }else if(contentItem.tagType == LauncherTagType.RECOMMEND){
//                DBG_INFO("!!!!!!!!!!!!!");
                hasNotification = true;
//                g_notificationTimeStamp = g_LauncherData.cTimestamp;
                for(var mm=0;mm<delNotification.length;mm++){
                    if(contentItem.data.contentMD5 == delNotification[mm].contentMD5){
                        hasNotification = false;
                        break;
                    }
                }
                if(hasNotification){
                    g_notificationApps = [];

                    for(var y=0;y<contentItem.data.imgs.length;y++){
                        var appInfo = {};
                        var data = {};
                        appInfo.Name = contentItem.data.txts[y];
                        if(contentItem.data.imgs[y].indexOf("default.png")>-1){
                            appInfo.Icon = "launcher/notification/default.png";
                        }else{
                            appInfo.Icon = contentItem.data.imgs[y];
                        }
                        appInfo.Detail = " ";
                        appInfo.date = g_LauncherData.cTimestamp;
                        appInfo.cmd = LauncherCMD.APP;
                        appInfo.data = data;
                        data.url = contentItem.data.urls[y];
                        data.urlType = contentItem.data.urlTypes[y];
                        data.storeType = contentItem.data.storeTypes[y];
                        appInfo.contentMD5 = contentItem.data.contentMD5;
                        g_notificationApps.push(appInfo);
                    }
                    g_notificationCrtTimeStamp = g_LauncherData.cTimestamp;
                }


            }else if(contentItem.tagType == LauncherTagType.YOUTUBE_VIDEO){
                contentData.cmd = LauncherCMD.YOUTUBE_VIDEO;
                youtube_video = $.extend(true,{}, contentItem.data);
            }
            else if(contentItem.tagType == LauncherTagType.PICTURE){
                DBG_INFO("!!!!!!!!!!!!!"+contentItem.data.contentMD5+"  "+objToString(delNotification));
                hasPictureResource = true;
                for(var mm=0;mm<delNotification.length;mm++){
                    if(contentItem.data.contentMD5 == delNotification[mm].contentMD5){
                        hasPictureResource = false;
                        break;
                    }
                }
                if(hasPictureResource){
                    g_pictureResource =
                    {
                        "Icon":"",
                        "Name":"",
                        "Detail":" ",
                        "cmd":LauncherCMD.PICTURE,
                        "date":g_LauncherData.cTimestamp,
                        "data":[]
                    };

                    g_pictureResource.Icon = contentItem.Icon;
                    g_pictureResource.Name = contentItem.Name;
                    g_pictureResource.contentMD5 = contentItem.data.contentMD5;

                    for(var y=0;y<contentItem.data.imgs.length;y++){
                        var appInfo = {};
                        appInfo.Name = contentItem.data.txts[y];
                        if(contentItem.data.imgs[y].indexOf("default.png")>-1){
                            appInfo.Icon = "launcher/notification/default.png";
                        }else{
                            appInfo.Icon = contentItem.data.imgs[y];
                        }
                        appInfo.Detail = contentItem.data.Descs[y];
                        appInfo.cmd = LauncherCMD.PICTURE;
                        g_pictureResource.data.push(appInfo);
                    }
                    g_notificationCrtTimeStamp = g_LauncherData.cTimestamp;
                }


            }
            else if(contentItem.tagType == LauncherTagType.PICTURE_B){
                hasPictureResourceB = true;
                for(var mm=0;mm<delNotification.length;mm++){
                    if(contentItem.data.contentMD5 == delNotification[mm].contentMD5){
                        hasPictureResourceB = false;
                        break;
                    }
                }
                if(hasPictureResourceB){
                    g_pictureResourceB =
                    {
                        "Icon":"",
                        "template":contentItem.template,
                        "Name":"",
                        "Detail":" ",
                        "cmd":LauncherCMD.PICTURE_B,
                        "date":g_LauncherData.cTimestamp,
                        "data":[]
                    };

                    g_pictureResourceB.Icon = contentItem.Icon;
                    g_pictureResourceB.Name = contentItem.Name;
                    g_pictureResourceB.contentMD5 = contentItem.data.contentMD5;

                    for(var y=0;y<contentItem.data.imgs.length;y++){
                        var appInfo = {};
                        appInfo.Name = contentItem.data.txts[y];
                        if(contentItem.data.imgs[y].indexOf("default.png")>-1){
                            appInfo.Icon = "launcher/notification/default.png";
                        }else{
                            appInfo.Icon = contentItem.data.imgs[y];
                        }
                        appInfo.Detail = contentItem.data.Descs[y];
                        appInfo.cmd = LauncherCMD.PICTURE_B;

                        g_pictureResourceB.data.push(appInfo);
                    }
                    g_notificationCrtTimeStamp = g_LauncherData.cTimestamp;
                }

            }
        }

        if (contentItem.data != null && contentItem.tagType!=LauncherTagType.SCREENPROTECT && contentItem.tagType!=LauncherTagType.PICTURE && contentItem.tagType!=LauncherTagType.PICTURE_B) {
            containerData.push(contentItem);
        }
    }
    if(!hasAllApp){
        DBG_ERROR("no all app  data!!!!!!!!!!!!!!!");
        return null;
    }
    if(!hasProtect){
        g_screenProtectPath = [];
        g_screenProtectPath = ["Screen/11.jpg","Screen/22.jpg","Screen/33.jpg"];
    }
    if(!hasNotification){
        g_notificationApps = [];
    }
    if(!hasPictureResource){
        g_pictureResource = null;
    }
    if(!hasPictureResourceB){
        g_pictureResourceB = null;
    }
//    DBG_ERROR("xml data:" + objToString(containerData));
    //var allAppData = [];
    //DBG_ERROR("footerTmp.length:"+objToString(containerData));
    for(var j =0;j<homeData.length;j++){
        for(var x=0;x<containerData.length;x++){
            if((homeData[j].tagType == containerData[x].tagType)||
                (homeData[j].cmd == LauncherCMD.ALLAPP && containerData[x].tagType == LauncherTagType.AllAPP) ||
                (homeData[j].cmd == LauncherCMD.LIVETV && containerData[x].tagType == LauncherTagType.LIVETV)){
//                homeData[j].Name = containerData[x].Name;
                homeData[j].data = containerData[x].data;
//                if(!defaultData){
//                    homeData[j].Icon = containerData[x].Icon;
//                }
            }
            if(homeData[j].cmd == LauncherCMD.APP && containerData[x].tagType == LauncherTagType.AllAPP){
                for(var t=0;t<containerData[x].data.urls.length;t++){
                    if(homeData[j].data.url == containerData[x].data.urls[t]){
                        homeData[j].data.txt = containerData[x].data.txts[t];
                        homeData[j].Name = containerData[x].data.txts[t];
                        break;
                    }

                }
            }
            if(homeData[j].cmd == LauncherCMD.APP && containerData[x].tagType == LauncherTagType.AllAPPTITLES){
                for(var t=0;t<containerData[x].data.urls.length;t++){
                    if(homeData[j].data.url == containerData[x].data.urls[t]){
                        if(containerData[x].data.imgs[t].indexOf("default.png")>-1){
                            var imgPath = getLauncherAllAppImgNameByUrl(homeData[j].data.url);
                            if(imgPath==null){
                                homeData[j].data.appimg = "../../VIDAAU2Launcher/img/title/app/his/default.png";
                                homeData[j].Icon = "../../VIDAAU2Launcher/img/title/app/his/default.png";
                            }else{
                                homeData[j].data.appimg = "../../VIDAAU2Launcher/img/title/app/his"+imgPath+".png";
                                homeData[j].Icon = "../../VIDAAU2Launcher/img/title/app/his"+imgPath+".png";
                            }
                        }else{
                            homeData[j].data.appimg = containerData[x].data.imgs[t];
                            homeData[j].Icon = containerData[x].data.imgs[t];
                        }

                        break;
                    }
                }
            }
        }
    }
    var homeDataAppUrls = [];
    for(var j =0;j<homeData.length;j++){
        if(homeData[j].cmd == LauncherCMD.APP || homeData[j].cmd == LauncherCMD.BROWSER ){
            if(!!homeData[j].data.url){
                homeDataAppUrls.push(homeData[j].data.url);
            }
            if(!!homeData[j].url){
                homeDataAppUrls.push(homeData[j].url);
            }

        }
    }
//    if(addApps!=null && addApps.length>0){
//        for (var n = 0; n < addApps.length; n++) {
//            if($.inArray(addApps[n].appUrl,homeDataAppUrls) == -1 && addApps[n].storeType == 81){
//                var item = {};
//                item.Name = addApps[n].appName;
//                item.Icon = addApps[n].Image;
//                item.cmd =  LauncherCMD.APP;
//                item.url = addApps[n].appUrl;
//                item.data = {};
//                item.data.appimg =addApps[n].Image;
//                item.data.canMove = true;
//                item.data.canRemove = true;
//                item.data.img = addApps[n].Image;
//                item.data.txt = addApps[n].appName;
//                item.data.url = addApps[n].appUrl;
//                item.data.urlType = addApps[n].appUrlType;
//                item.data.storeType = addApps[n].storeType;
//                homeData.push(item);
//            }
//        }
//    }
//    DBG_INFO("xml data:" + objToString(homeData));
    var addBrowserApp = getAddAppFromBrowser();
    if(addBrowserApp!=null){
        var appIndex = 0;
        for(var i=0;i<homeData.length;i++){
            if(homeData[i].cmd == LauncherCMD.ALLAPP){
                appIndex = i+1;
                break;
            }
        }
        launcherLastAppBrowserAddNum = addBrowserApp.length;
        g_browserAppList = [];
        for (var n = 0; n < addBrowserApp.length; n++) {
            if($.inArray(addBrowserApp[n].appUrl,homeDataAppUrls) == -1){
//                if($.inArray(addBrowserApp[n].appUrl,foxxumApp) == -1){
                g_browserAppList.push(addBrowserApp[n].appUrl);
                var item = {};
                item.Name = addBrowserApp[n].appName;
                item.Icon = addBrowserApp[n].Image;
                item.cmd =  LauncherCMD.BROWSER;
                item.urlType = addBrowserApp[n].appUrlType;
                item.url = addBrowserApp[n].appUrl;
                item.data = {};
                item.data.appimg =addBrowserApp[n].Image;
                item.data.canMove = true;
                item.data.canRemove = true;
                item.data.img = addBrowserApp[n].Image;
                item.data.txt = addBrowserApp[n].appName;
                item.data.url = addBrowserApp[n].appUrl;
                item.data.urlType = addBrowserApp[n].appUrlType;
                item.data.storeType = StoreType.BROWSER;
                homeData.splice(appIndex,0,item);
                appIndex++;
//                    homeData.push(item);
//                }
            }
        }
    }
    if(g_launcherHotelStatus ==1){
        for(var k=0;k<containerData.length;k++){
            if(containerData[k].tagType == LauncherTagType.AllAPP){
                var idx = $.inArray("netflix",containerData[k].data.urls);
                if(idx > -1){
                    containerData[k].data.imgs.splice(idx, 1);
                    containerData[k].data.txts.splice(idx, 1);
                    containerData[k].data.urls.splice(idx, 1);
                    containerData[k].data.urlTypes.splice(idx, 1);
                    containerData[k].data.canRemoves.splice(idx, 1);
                    containerData[k].data.canMoves.splice(idx, 1);
                    containerData[k].data.storeTypes.splice(idx, 1);
                }
            }
            if(containerData[k].tagType == LauncherTagType.AllAPPTITLES){
                var idx = $.inArray("netflix",containerData[k].data.urls);
                if(idx > -1){
                    containerData[k].data.imgs.splice(idx, 1);
                    containerData[k].data.txts.splice(idx, 1);
                    containerData[k].data.urls.splice(idx, 1);
                    containerData[k].data.urlTypes.splice(idx, 1);
                    containerData[k].data.canRemoves.splice(idx, 1);
                    containerData[k].data.canMoves.splice(idx, 1);
                    containerData[k].data.storeTypes.splice(idx, 1);
                }
            }
        }
    }
    if(hasAllAppTitles && allAppLen != allAppTitlesLen){
        DBG_ERROR(" allAppLen != allAppTitlesLen");
        hasAllAppTitles = false;
    }
    var allAppArray = [],allAppTitlesArray = [];
    for(var k=0;k<containerData.length;k++){
        if(containerData[k].tagType == LauncherTagType.AllAPP){
            allAppArray = containerData[k].data.urls;
        }
        if(containerData[k].tagType == LauncherTagType.AllAPPTITLES){
            allAppTitlesArray = containerData[k].data.urls;
        }
    }
    for(var mm=0;mm<allAppTitlesArray.length;mm++){
        if($.inArray(allAppTitlesArray[mm],allAppArray) == -1){
            DBG_ERROR("allApp!=allAppTitlesArray");
            hasAllAppTitles = false;
            break;
        }
    }

    for(var j =0;j<homeData.length;j++){
        if(homeData[j].cmd == LauncherCMD.ALLAPP){
            if(homeData[j].data.urls.length>0){
                var appimgs = [];
                for(var n=0;n<containerData.length;n++){
                    if(hasAllAppTitles){
                        if(containerData[n].tagType == LauncherTagType.AllAPPTITLES){
                            for(var x=0;x<homeData[j].data.urls.length;x++){
                                for(var y=0;y<containerData[n].data.urls.length;y++){
                                    if(homeData[j].data.urls[x] == containerData[n].data.urls[y]){
                                        if(containerData[n].data.imgs[x].indexOf("default.png")>-1){
                                            var imgPath = getLauncherAllAppImgNameByUrl(homeData[j].data.urls[x]);
                                            if(imgPath==null){
                                                appimgs[x] = "../../VIDAAU2Launcher/img/title/app/his/default.png";
                                            }else{
                                                appimgs[x] = "../../VIDAAU2Launcher/img/title/app/his"+imgPath+".png";
                                            }
                                        }else{
                                            appimgs[x] = containerData[n].data.imgs[y];
                                        }
                                        break;
                                    }
                                }
                                if(homeData[j].data.imgs[x].indexOf("default.png")>-1){
                                    var imgPath = getLauncherAllAppImgNameByUrl(homeData[j].data.urls[x]);
                                    if(imgPath==null){
                                        homeData[j].data.imgs[x] = "../../VIDAAU2Launcher/img/app/launcher1/default.png";
                                    }else{
                                        homeData[j].data.imgs[x] = "../../VIDAAU2Launcher/img/app/launcher1"+imgPath+".png";
                                    }
                                }
                            }
                            break;
                        }
                    }
                    else{
                        for(var x=0;x<homeData[j].data.urls.length;x++){
                            if(homeData[j].data.imgs[x].indexOf("default.png")>-1){
                                var imgPath = getLauncherAllAppImgNameByUrl(homeData[j].data.urls[x]);
                                if(imgPath==null){
                                    homeData[j].data.imgs[x] = "../../VIDAAU2Launcher/img/app/launcher1/default.png";
                                }else{
                                    homeData[j].data.imgs[x] = "../../VIDAAU2Launcher/img/app/launcher1"+imgPath+".png";
                                }
                            }
                            var imgPath1 = getLauncherAllAppImgNameByUrl(homeData[j].data.urls[x]);
                            if(imgPath1==null){
                                appimgs[x] = homeData[j].data.imgs[x];
                            }else{
                                appimgs[x] = "../../VIDAAU2Launcher/img/title/app/his"+imgPath1+".png";
                            }

                        }
                    }

                }
                homeData[j].data.appimgs = appimgs;
            }
            var settingUseApps = [];
            $.each(homeData[j].data.urls, function(k,v) {
                if('netflix' == v) {
                    settingUseApps.push(v);
                }
                else if('vudu' == v || 'vudu_movie' == v) {
                    settingUseApps.push('vudu');
                }
            });
            writeFileToNative('launcher/settingappinfo.txt', objToString(settingUseApps), 1);
        }
    }
    for(var z =0;z<homeData.length;z++){
//        if(homeData[z].cmd == LauncherCMD.NOTIFICATION){
//            homeData[z].Name = "[SE2970]";
//        }
//        else if(homeData[z].cmd == LauncherCMD.ALLAPP){
//            homeData[z].Name = "[OT0043]";
//        }else if(homeData[z].cmd == LauncherCMD.LIVETV){
//            homeData[z].Name = "[LA0076]";
//        }else if(homeData[z].cmd == LauncherCMD.ALLINPUTS){
//            homeData[z].Name = "[SE0333]";
//        }else if(homeData[z].cmd == LauncherCMD.HIMEDIA){
//            homeData[z].Name = "[LA0019]";
//        }else if(homeData[z].cmd == LauncherCMD.SETTINGS){
//            homeData[z].Name = "[DMP0123]";
//        }
    }
    if(!!youtube_video && !!youtube_video.urls){
        var notificationIndex = 0;
        for(var s =0;s<homeData.length;s++){
            if(homeData[s].cmd == LauncherCMD.NOTIFICATION){
                notificationIndex = s+1;
            }
            if(homeData[s].cmd == LauncherCMD.YOUTUBE_VIDEO){
                var dx = $.inArray(homeData[s].data.url, youtube_video.urls);
                DBG_INFO("youtube_video:"+dx);
                if (dx < 0 ) {
                    homeData.splice(s, 1);
                    s--;
                }
            }
        }
        for(var g=0;g<youtube_video.urls.length;g++){
            var already = false;
            for(var e =0;e<homeData.length;e++){
                if(homeData[e].cmd == LauncherCMD.YOUTUBE_VIDEO){
                    if(homeData[e].data.url == youtube_video.urls[g]){
                        already = true;
                        homeData[e].Icon = youtube_video.imgs[g];
                        break;
                    }
                }
            }
            if(already){
                continue;
            }
            var item = {"Name": "FreeviewPlay", "Icon": "launcher/title/youtube.png",
                "cmd": LauncherCMD.YOUTUBE_VIDEO,"url":"youtube"};
            item.Name = youtube_video.txts[g];
            item.Icon = youtube_video.imgs[g];
            item.url = youtube_video.urls[g];
            item.urlType = 37;
            homeData.splice(notificationIndex,0,item);
        }
    }else{
        for(var q =0;q<homeData.length;q++){
            if(homeData[q].cmd == LauncherCMD.YOUTUBE_VIDEO){
                homeData.splice(q, 1);
                q--;
            }
        }
    }

//    DBG_INFO("youtube_video:" + objToString(youtube_video));
    allAppsWriteToFileForUse(containerData);
    return homeData;
}

function parseLauncherCategoryContentData(url, defaultData, launcherPath,tagType) {

    var contentData = {};
    contentData.txts = [];
    contentData.imgs = [];
    contentData.urls = [];
    contentData.urlTypes = [];
    contentData.storeTypes = [];
    contentData.canRemoves = [];
    contentData.canMoves = [];
    contentData.widths = [];
    contentData.Descs = [];
    contentData.contentMD5 = null;
    if (!url) {
        return null;
    }

    var contentJSON = null;
    if (defaultData) {
        contentJSON = readXMLDOM(launcherPath + url, 2);
    }
    else {
        contentJSON = readXMLDOM(launcherPath + url, 1);
    }
    if (null == contentJSON) {
        DBG_INFO('read category ' + url + 'error. ', DebugLevel.ERROR);
        return contentData;
    }

    var objectTmp = getNodesByKey(ObjectKey.OBJECTINFO, contentJSON);
    if(tagType == LauncherTagType.RECOMMEND || tagType == LauncherTagType.PICTURE || tagType == LauncherTagType.PICTURE_B){
        var md5 = getTextByKey("contentMD5",contentJSON);
        if(!!md5){
            contentData.contentMD5 = md5;
        }
    }

    for (var j = 0; j < objectTmp.length; j++) {
        contentData.txts[j] = getItemsByLanguage(getNodesByKey(ObjectKey.OBJECTNAME, objectTmp[j]), "name", false);
        contentData.imgs[j] = getItemsByLanguage(getNodesByKey(ObjectKey.OBJECTPICTURE, objectTmp[j]), 'pictureUrl', false);
        if(defaultData){
            contentData.imgs[j] = contentData.imgs[j].replace("../VIDAAU2Launcher/img/app/","../VIDAAU2Launcher/img/app/");
            contentData.imgs[j] = contentData.imgs[j].replace("launcher/title/","launcher/title/");
        }
        contentData.urlTypes[j] = parseInt(getTextByKey(ObjectKey.OBJECTTYPE, objectTmp[j]));
        contentData.urls[j] = getTextByKey(ObjectKey.OBJECTURL, objectTmp[j]);
        if(contentData.urls[j] == "miracast"){
            if(defaultData){
                //if(GLOBAL.MODULEID == "launcher2"){
//                    contentData.imgs[j] = contentData.imgs[j].replace("launcher/app/"+GLOBAL.MODULEID+"/","launcher/app/"+GLOBAL.MODULEID+"/"+GLOBAL.LAUNCHER_THEME);
//                    contentData.imgs[j] = contentData.imgs[j].replace("launcher/title/"+GLOBAL.MODULEID+"/","launcher/title/"+GLOBAL.MODULEID+"/"+GLOBAL.LAUNCHER_THEME);
//                    contentData.imgs[j] = ("../VIDAAU2Launcher/img/app/default.png");
                //}
            }
        }

//        if(contentData.urls[j] == "media"){
//            if(defaultData){
//                if(GLOBAL.MODULEID == "launcher2"){
//                    contentData.imgs[j] = contentData.imgs[j].replace("launcher/app/"+GLOBAL.MODULEID+"/","launcher/app/"+GLOBAL.MODULEID+"/"+GLOBAL.LAUNCHER_THEME);
//                    contentData.imgs[j] = contentData.imgs[j].replace("launcher/title/"+GLOBAL.MODULEID+"/","launcher/title/"+GLOBAL.MODULEID+"/"+GLOBAL.LAUNCHER_THEME);
//                }
//            }
//        }
        if(!!tagType && (tagType== LauncherTagType.PICTURE||tagType==LauncherTagType.PICTURE_B)){
            contentData.Descs[j] = getItemsByLanguage(getNodesByKey(ObjectKey.OBJECTDESCS, objectTmp[j]), "desc", false);
        }
        contentData.widths[j] = getTextByKey(ObjectKey.WIDTH, objectTmp[j]);
        contentData.canMoves[j] = parseInt(getTextByKey(ObjectKey.MOVABLE, objectTmp[j])) == 0 ? false : true;
        contentData.canRemoves[j] = (contentData.urlTypes[j] == CmdURLType.START_WEBAPP);
        var ownerId = getOwnerId(objectTmp[j]);
        if (ownerId == null) {
            contentData.storeTypes[j] = 10000;
        }
        else {
            contentData.storeTypes[j] = parseInt(ownerId);
        }
        if(contentData.urlTypes[j] == 32){
            contentData.storeTypes[j] = 100;
            contentData.urlTypes[j] = 36;
        }
        if (92 == ownerId && CmdURLType.VUDU_POSTER != contentData.urlTypes[j]) {
            contentData.urlTypes[j] = CmdURLType.VUDU_POSTER;
            DBG_INFO("vudu poster, set object type = " + CmdURLType.VUDU_POSTER, DebugLevel.WARNING);
        }
    }

    return contentData;
}

function getItemsByLanguage(items, key, def) {

    var langs = ["chi", "eng", "fre", "kor", "rus", "jpn", "spa", "ger", "zho", "ara", "per",
        "tha", "ita", "dut", "por", "cze", "hun", "gre", "bul", "rum", "mal",
        "hbr", "tur", "ind", "uzb", "nor", "swe", "dan", "fin", "vie"
        , "mya", "hin", "eng", "ukr", "slk", "pol", "srp","mac","alb","hrv","lav","est","lit"];
    var languageId = langs.indexOf(hiWebOsFrame.getCurrentLanguage());
//    DBG_ALWAYS("getItemsByLanguage!!!!!!!!!!:"+languageId);

    if (languageId < 0) {
        languageId = 1;
    }
//    else if (36 == languageId) {
//        languageId = 31;
//    }
//    def = true;
    return getItemByKeyLang(key, items[0], languageId, def);
}

function loadLauncherDefaultData(launcherPath, countryCode) {
    var crtCountryCode = mapCountryCode(countryCode);
    var obj = readXMLDOM(launcherPath + 'CategoryIndex_' + crtCountryCode  + ".xml", 2);
    if (null == obj) {
        DBG_ERROR("can not find default CategoryIndex_" + crtCountryCode + ".xml");
        obj = readXMLDOM(launcherPath + 'CategoryIndex.xml', 2);
    }
    return obj;
}
function mapCountryCode(countryCode) {

    var returnCode = '';
    var crtArea = hiWebOsFrame.getCurrentArea();
    switch(crtArea) {
        case 'EU':
            switch(countryCode) {
                case "DEU":
                    returnCode = 'DEU';
                    break;
                case "FRA":
                    returnCode = 'FRA';
                    break;
                case "GBR":
                    returnCode = 'GBR';
                    break;
                case "ESP":
                    returnCode = 'ESP';
                    break;
                case "ITA":
                    returnCode = 'ITA';
                    break;
                case "PRT":
                case "CHE":
                    returnCode = 'PRT';
                    break;
                case "AUT":
                    returnCode = 'AUT';
                    break;
                case "TUR":
//              case "CZE":
//              case "SVK":
                case "POL":
                case "HUN":
                case "BGR":
                case "HRV":
                    returnCode = 'FLL';
                    break;
                case "CZE":
                case "SVK":
                    returnCode = 'CZE';
                    break;
                case "SWE":
                case "DNK":
                case "FIN":
                case "NOR":
                    returnCode = 'SWE';
                    break;
                case "AZE":
                case "ARM":
                case "UZB":
                case "KGZ":
                case "TKM":
                case "UKR":
                case "KAZ":
                case "TJK":
                case "BLR":
                case "MDA":
//              case "HRV":
                    returnCode = 'UZB';
                    break;
                case "RUS":
                    returnCode = 'RUS';
                    break;
                case "LVA":
                case "EST":
                case "LTU":
                    returnCode = 'LTU';
                    break;
                case "IRQ":
                case "SAU":
                case "ARE":
                case "KWT":
                case "OMN":
                case "QAT":
                case "JOR":
                case "DXB":
                case "BHR":
                case "LBN":
                case "MAR":
                case "NGA":
                case "LBY":
                    returnCode = 'DXB';
                    break;
                case "ZAF":
                    returnCode = 'ZAF';
                    break;
                case "GEO":
                    returnCode = 'GEO';
                    break;
                case "DZA":
                    returnCode = 'EGY';
                    break;
                default :
                    returnCode = 'FLL';
                    break;

            }
            break;
        case 'SA':
            switch(hiWebOsFrame.getCurrentBrand()){
                case "his":
                    switch(countryCode) {
                        case "ARG":
                            returnCode = 'ARG';
                            break;
                        case "URY":
                        case "PRY":
                        case "ECU":
                            returnCode = 'ECU_his';
                            break;
                        case "PHL":
                            returnCode = 'PHL_his';
                            break;
                        case "BRA":
                        case "CRI":
                        case "BOL":
                        case "PAN":
                        case "VEN":
                        case "CHL":
                        case "PER":
                        case "COL":
                            returnCode = 'BRA';
                            break;
                        default :
                            returnCode = 'ARG';
                            break;
                    }
                    break;
                case "bgh":
                    switch(countryCode) {
                        case "ARG":
                            returnCode = 'ARG_BGH';
                            break;
                        case "CHL":
                        case "URY":
                        case "PER":
                            returnCode = 'CHL_BGH';
                            break;
                        default :
                            returnCode = 'ARG_BGH';
                            break;
                    }
                    break;
                case "adm":
                case "fam":
                case "kal":
                case "pan":
                    returnCode = 'COL';
                    break;
                case "dev":
                case "avi":
                case "ame":
                case "ezy":
                    returnCode = 'PHL';
                    break;
                case "riv":
                    returnCode = 'ECU';
                    break;
                case "nob":
                    returnCode = 'ARG_NOB';
                    break;
                case "shp":
                    returnCode = 'ARG';
                    break;
                default :
                    returnCode = 'ARG';
                    break;
            }
            break;
        case 'EM':
            returnCode = 'AUS';
            break;
    }

    return returnCode;
}
/*get launcher service update countryCode and timeStamp*/
function getLauncherServiceUpdateData() {
    var srvUpdate = {},
        cTimestampDom = readXMLDOM('launcher/data/serviceUpdate.xml', 1),
        cTimestampJson = getServiceUpdateJSON(cTimestampDom);
    if (null != cTimestampJson) {
        srvUpdate.timeStamp = cTimestampJson.updateTimestamp;
        srvUpdate.countryCode = cTimestampJson.countryCode;
    }
    else {
        srvUpdate.timeStamp = 0;
        srvUpdate.countryCode = '';
    }
    if (getAlwaysDefaultDataStatus()) {
        srvUpdate.timeStamp = 0;
        var currentCountryCode = tv ? model.basicSetting.getTvsetLocation() : "USA";
        srvUpdate.countryCode = tv ? currentCountryCode : "USA";
    }
    return srvUpdate;
}

function getLauncherDeleteAppByUser() {
    if (!tv) {
        var deletedApps = [];
    } else {
        var deletedApps = readFileFromNative('launcher/deletedPresetApp.txt', 1);
        if (null == deletedApps) {
            DBG_ALWAYS("parseOEMLauncherDeleteApp:no delete app!");
            deletedApps = [];
        }
        DBG_INFO("parseOEMLauncherDeleteApp:" + deletedApps);
    }
    return deletedApps;
}
function allAppsWriteToFileForUse(launcherData) {

    var tmpData = launcherData,
        index = 0,
        tempData = {
            AppInfo: []
        };

    for(var i = 0; i < tmpData.length; ++i) {
        if(tmpData[i].tagType == '57') {
            index = i;
            break;
        }
    }

    var dataContents = tmpData[index].data,
        dataLength = dataContents.txts.length;

    var deletedPresetApps = readFileFromNative("launcher/deletedPresetApp.txt", 1);

    for (var i = 0; i < dataLength; ++i) {

        if (Array.isArray(deletedPresetApps) && deletedPresetApps.indexOf(dataContents.urls[i]) > -1) {
            //debugE("This App has been removed:" + dataContents.urls[i]);
            continue;
        }

        tempData.AppInfo.push({
            AppName: dataContents.txts[i],
            IconURL: dataContents.imgs[i],
            InstallTime: "",
            RunTimes: 0,
            URL: ((null == dataContents.urls[i]) ? ("") : (dataContents.urls[i])),
            StartCommand: ((null == dataContents.urls[i]) ? ("") : (dataContents.urls[i])),
            UrlType: dataContents.urlTypes[i],
            StoreType: dataContents.storeTypes[i],
            PreInstall: true
        });
    }
    writeFileToNative('launcher/preset.txt', objToString(tempData), 1);
}

function getRememberEditAppFromNativeFile() {

    if (!tv) {
        var rememberEditApp = getDefaultHomeConfigData("USA");
        //if(g_fteNoneSource.none){
        //    for(var i=0;i<rememberEditApp.appInfo.length;i++){
        //        if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
        //            rememberEditApp.appInfo.splice(i, 1);
        //            break;
        //        }
        //    }
        //}
        return rememberEditApp;
    } else {
        var rememberEditApp = readFileFromNative('launcher/rememberEditApp.json', 1);
        var currentCountryCode = g_LauncherData.currentCountryCode;
        if (null == rememberEditApp) {
//            DBG_ERROR("parseOEMLauncherDeleteApp!!!!!!!!!!!!!!!!!!!!!!!!!!:");
            rememberEditApp = getDefaultHomeConfigData(currentCountryCode);
//            setRememberEditAppToNativeFile(rememberEditApp.appInfo);
            if(g_fteNoneSource.none){
                for(var i=0;i<rememberEditApp.appInfo.length;i++){
                    if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                        rememberEditApp.appInfo.splice(i, 1);
                        break;
                    }
                }
            }else{
                if(g_fteNoneSource.needUpdate){
                    var hasLive = false;
                    for(var i=0;i<rememberEditApp.appInfo.length;i++){
                        if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                            hasLive = true;
                            break;
                        }
                    }
                    if(!hasLive){
                        var item = {"Name": "Live TV", "Icon": "launcher/title/livetv.png", "tagType": "70", "cmd": LauncherCMD.LIVETV};
                        rememberEditApp.appInfo.push(item);
                    }
                }

            }
            return rememberEditApp;
        }
        if (currentCountryCode == rememberEditApp.countryCode) {
            if(g_fteNoneSource.none){
                for(var i=0;i<rememberEditApp.appInfo.length;i++){
                    if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                        rememberEditApp.appInfo.splice(i, 1);
                        break;
                    }
                }
            }else{
                if(g_fteNoneSource.needUpdate){
                    var hasLive = false;
                    for(var i=0;i<rememberEditApp.appInfo.length;i++){
                        if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                            hasLive = true;
                            break;
                        }
                    }
                    if(!hasLive){
                        var item = {"Name": "Live TV", "Icon": "launcher/title/livetv.png", "tagType": "70", "cmd": LauncherCMD.LIVETV};
                        rememberEditApp.appInfo.push(item);
                    }
                }

            }

            return rememberEditApp;
        } else {
            DBG_INFO("VIDAALiteGetRememberEditApp:currentCountry:" + currentCountryCode + ",rememberCountry:" + rememberEditApp.countryCode);
//            var ret = Hisense.File.delete('launcher/rememberEditApp.json', 1);
//            if(0 != ret) {
//                DBG_ERROR('remove native file: "' + path + '" error. Error code = ' + ret);
//            }
//            else {
//                DBG_INFO('remove native file: "' + path + '" success');
//            }
//            return {};
            rememberEditApp = getDefaultHomeConfigData(currentCountryCode);
            if(g_fteNoneSource.none){
                for(var i=0;i<rememberEditApp.appInfo.length;i++){
                    if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                        rememberEditApp.appInfo.splice(i, 1);
                        break;
                    }
                }
            }else{
                if(g_fteNoneSource.needUpdate){
                    var hasLive = false;
                    for(var i=0;i<rememberEditApp.appInfo.length;i++){
                        if(rememberEditApp.appInfo[i].cmd == LauncherCMD.LIVETV){
                            hasLive = true;
                            break;
                        }
                    }
                    if(!hasLive){
                        var item = {"Name": "Live TV", "Icon": "launcher/title/livetv.png", "tagType": "70", "cmd": LauncherCMD.LIVETV};
                        rememberEditApp.appInfo.push(item);
                    }
                }

            }
            return rememberEditApp;
        }
    }
}
function setRememberEditAppToNativeFile(editApp) {
//    DBG_ERROR("Remember Data is :" + JSON.stringify(editApp));
    var currentCountryCode = tv ? model.basicSetting.getTvsetLocation() : "USA";
    //if (currentCountryCode != "USA" && currentCountryCode != "CAN" && currentCountryCode != "MEX") {
    //    currentCountryCode = "USA";
    //}
    var rememberEditApp = {
        countryCode: currentCountryCode,
        appInfo: editApp
    };
    if (tv) {
        writeFileToNative('launcher/rememberEditApp.json', objToString(rememberEditApp), 1);
    }
}
function launcherResetTitlesConfig(){
//    DBG_ERROR("launcherResetTitlesConfig !!!!!!!!!!!!!!!!!!!!!!");
    var rememberEditApp = getDefaultHomeConfigData(g_LauncherData.currentCountryCode);
    setRememberEditAppToNativeFile(rememberEditApp.appInfo);
}

function getDefaultHomeConfigData(countryCode) {
    var app = {};
    DBG_INFO("getDefaultHomeConfigData:"+GLOBAL.LAUNCHER_THEME);
        app = {"countryCode": "USA", "appInfo": [
            {"Name": "Notifications", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"notification.png", "tagType": "22", "cmd": LauncherCMD.NOTIFICATION},
            {"Name": "Apps", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"apps.png", "tagType": "57", "cmd": LauncherCMD.ALLAPP, "data": null},
            {"Name": "Live TV", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"livetv.png", "tagType": "70", "cmd": LauncherCMD.LIVETV},
            {"Name": "Source", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"inputs.png", "cmd": LauncherCMD.ALLINPUTS},
            {"Name": "Media", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"himedia.png", "tagType": "59", "cmd": LauncherCMD.HIMEDIA},
            {"Name": "Settings", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"settings.png", "cmd": LauncherCMD.SETTINGS},
            {"Name": "Edit", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"edit.png", "cmd": LauncherCMD.EDIT},
            {"Name": "Reset", "Icon": "img/title/"+GLOBAL.LAUNCHER_THEME+"reset.png", "cmd": LauncherCMD.RESET}
        ]};
    app.countryCode = countryCode;
    return app;
}
var launcherNeedDownLoadAppImgUrl = [];
var launcherLastAppStoreAddNum = 0;
var launcherLastAppBrowserAddNum = 0;
function getAddAppFromOpera() {
    var storeTypeList = {
        "opera": StoreType.OPERA,
        "foxxum": StoreType.FOXXUM,
        "netrange": StoreType.NETRANGE,
        "store":StoreType.STORE,
        "hbbtv":StoreType.HBBTV,
        "browser":StoreType.BROWSER,
        "hisense":StoreType.HISENSE
    };
    var addApps = [];
    if (!tv) {
        addApps = [];
        return addApps;
    } else {
        launcherNeedDownLoadAppImgUrl = [];
        addApps = [];
        var favAppsPageData = readFileFromNative('launcher/Appinfo.json', 1);
        if (null == favAppsPageData || 0 == favAppsPageData.AppInfo.length) {
            return addApps;
        }
        var favArr = favAppsPageData.AppInfo;
        var iconArr = readCacheIndex('launcher/cache/index.json');
        if (null == iconArr) {
            iconArr = [];
        }
        for (var i = 0; i < favArr.length; i++) {
            var app = {};
            app.Image = getLocalAppImgUrl(favArr[i].Image, iconArr);
            app.appName = favArr[i].Title;
            app.appUrl = favArr[i].URL;
            app.appUrlType = CmdURLType.START_WEBAPP;
            app.canRemove = true;
            app.canMove = true;
            app.storeType = storeTypeList[favArr[i].StoreType];
            addApps.push(app);
        }
        cacheFileToNative(launcherNeedDownLoadAppImgUrl, 'launcher/cache', 'launcher/cache/index.json');
        DBG_INFO("getAddAppFromOpera:" + addApps.length);
        return addApps;
    }
}

function setLauncherDeleteAppByUser(url) {
    if (tv) {
        DBG_ALWAYS("deleteOEMLauncherEditApp:url" + url);
        var favApps = readFileFromNative('launcher/Appinfo.json', 1);
        if (favApps == null) {

        } else {
            var favArr = favApps.AppInfo;
            for (var i = 0; i < favApps.AppInfo.length; i++) {
                if (!!favArr[i] && url == favArr[i].URL) {
                    favArr.splice(i, 1);
                }
            }
            writeFileToNative('launcher/Appinfo.json', objToString(favApps), 1);
        }
        //add deleted app
        var deletedApps = readFileFromNative('launcher/deletedPresetApp.txt', 1);
        if (null == deletedApps) {
            deletedApps = [];
        }
        for (i = 0; i < deletedApps.length; i++) {
            if ($.inArray(url, deletedApps) > -1) {
                DBG_ALWAYS("deleteOEMLauncherEditApp:have delete");
                return;
            }
        }
        deletedApps.push(url);
        writeFileToNative('launcher/deletedPresetApp.txt', objToString(deletedApps), 1);

        //remove preset
        var preApps = readFileFromNative('launcher/preset.txt', 1);
        if (null != preApps && !!preApps.AppInfo) {
            for (var i = 0; i < preApps.AppInfo.length; i++) {
                if (url == preApps.AppInfo[i].URL) {
                    preApps.AppInfo.splice(i, 1);
                    break;
                }
            }
            writeFileToNative('launcher/preset.txt', objToString(preApps), 1);
        }

        //remove recentUseApps
        var recentUseApps = readFileFromNative("launcher/recentapps.txt", 1);
        if (null != recentUseApps && !!recentUseApps.AppInfo) {
            for (var i = 0; i < recentUseApps.AppInfo.length; i++) {
                if (url == recentUseApps.AppInfo[i].URL) {
                    recentUseApps.AppInfo.splice(i, 1);
                    break;
                }
            }
            writeFileToNative('launcher/recentapps.txt', objToString(recentUseApps), 1);
        }
    }
}

/*
 映射本地网络图片路径和本地图片路径
 */
function getLocalAppImgUrl(oriImgUrl, localIcons) {
    for (var i = 0; i < localIcons.length; i++) {
        if (oriImgUrl == localIcons[i].original_url) {
            return localIcons[i].local_url;
        }
    }
    launcherNeedDownLoadAppImgUrl.push(oriImgUrl);
    DBG_ALWAYS('getLocalAppImgUrl:can not find local icon, use image url.');
    return oriImgUrl;
}

var g_launcherDataPassword = "";
var g_alwaysDefaultData = false;
var g_alwaysDebugData = false;

function getAlwaysDefaultDataStatus() {
    g_alwaysDefaultData = readFileFromNative("launcher/default_launcher_data", 1);
    if (null == g_alwaysDefaultData) g_alwaysDefaultData = false;
    showLauncherDefaultDataTip();
    return g_alwaysDefaultData;
}
function getAlwaysDebugStatus() {
    var timeStamp  = tv?readFileFromNative("launcher/debugmode.txt", 1):null;
    var txt = 0;
    if(timeStamp!=null){
        txt = parseInt(timeStamp[0]);
    }
    if(txt == 0){
        g_alwaysDebugData = false;
    }else{
        g_alwaysDebugData = true;
    }
    showLauncherDebugDataTip();
    DBG_ERROR("getAlwaysDebugStatus:" + g_alwaysDebugData);
}

function setDefaultDataStatus(o, d, code) {
    var num = (code - hiWebOsFrame.getKeyValues().keyNum0) + "";
    g_launcherDataPassword += num;
    if ("1969" == g_launcherDataPassword.slice(-4)) {
        g_launcherDataPassword = "";
        g_alwaysDefaultData = !g_alwaysDefaultData;
        DBG_ALWAYS("always use default data[" + g_alwaysDefaultData + "]");
        writeFileToNative("launcher/default_launcher_data", g_alwaysDefaultData + "", 1);
        showLauncherDefaultDataTip();
    }
}

function setDebugDataStatus(o, d, code) {
    var num = (code - hiWebOsFrame.getKeyValues().keyNum0) + "";
    g_launcherDataPassword += num;
    if ("0532" == g_launcherDataPassword.slice(-4)) {
        g_launcherDataPassword = "";
        g_alwaysDebugData = !g_alwaysDebugData;
        DBG_ALWAYS("setDebugDataStatus[" + g_alwaysDebugData + "]");
        var txt = 0;
        if(g_alwaysDebugData){
            txt = 1;
        }
        var arr  = [];
        arr.push(txt);
        if(tv)writeFileToNative("launcher/debugmode.txt", objToString(arr), 1);
        showLauncherDebugDataTip();
    }
}

function showLauncherDefaultDataTip() {
    if (g_alwaysDefaultData) {
        showLauncherDefaultTip();
    } else {
        hideLauncherDefaultTip();
    }

//    $("#launcher_default_data_tip").css("display", g_alwaysDefaultData ? "block" : "none");
}

function showLauncherDebugDataTip() {
    if (g_alwaysDebugData) {
        showLauncherDebugTip();
    } else {
        hideLauncherDebugTip();
    }

//    $("#launcher_default_data_tip").css("display", g_alwaysDefaultData ? "block" : "none");
}

function readXMLDOM(url, workRoot) {
    if (!tv) {
        var xmlBasePath = (workRoot == 2) ? '../' : "../../appdata/";
        var dom = loadxmldoc(xmlBasePath + url + "?time=" + Date.now());
        return dom;
    }
    var dom = null;
    DBG_INFO('xml path = ' + url + '; workRoot = ' + workRoot);
    var obj = Hisense.File.read(url, workRoot);
    if (isNaN(obj)) {
        try {
            dom = (new DOMParser()).parseFromString(obj, "text/xml");
        }
        catch (e) {
            DBG_INFO("launcher_debug_readXML_error:" + e.message, DebugLevel.ERROR);
            dom = null;
        }
        return dom;
    }
    else {
        DBG_INFO("error in reading xml: " + obj, DebugLevel.ERROR);
        return null;
    }
}

function loadxmldoc(x) {
    try {
        DBG_INFO("XMLHttpRequest[" + x + "]");
        var xmlDoc;
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.load(x);
        }
        else if (window.XMLHttpRequest) {
            xmlDoc = getxml(x).responseXML;
        }
        else {
            return false;
        }


        return xmlDoc;
    }
    catch (ex) {
        DBG_ERROR(ex.message);
        return null;
    }
}
var xmlhttpMain = null;
function getxmlhttp() {
    if (window.ActiveXObject) {
        try {
            xmlhttpMain = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlhttpMain = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    else if (window.XMLHttpRequest) {
        xmlhttpMain = new XMLHttpRequest();
    }
    return xmlhttpMain;
}

function getxml(x) {
    if (null == xmlhttpMain) {
        getxmlhttp();
    }
    if (xmlhttpMain != null) {
        xmlhttpMain.open("GET", x, false);
        xmlhttpMain.send(null);
    }
    else {
        DBG_INFO("Your browser does not support XMLHTTP.11");
        return false;
    }
    return (xmlhttpMain);
}

function launcherDataNeedToUpdateForNob() {
    var update = LauncherUpdate.NOUPDATE;
    var tempLanguage = hiWebOsFrame.getCurrentLanguage();
    if(g_LauncherData.currentLanguage != tempLanguage){
        update = LauncherUpdate.SERVICE;
        DBG_ERROR("launcher need update by Language changed!!!");
    }
    return update;
}

function launcherDataNeedToUpdate() {
    var update = LauncherUpdate.NOUPDATE;
    var tempSrvUpdate = getLauncherServiceUpdateData();
    var currentCountryCode = tv ? model.basicSetting.getTvsetLocation() : "USA";
    //if (currentCountryCode != "USA" && currentCountryCode != "CAN" && currentCountryCode != "MEX") {
    //    currentCountryCode = "USA";
    //}
    if(!tv){
        return LauncherUpdate.NOUPDATE;
    }

    var tempHotelStatus = tv ? model.hotel.getHotelMode() : 1;
    var tempCountryCode = tv ? currentCountryCode : "USA";
    var tempLanguage = hiWebOsFrame.getCurrentLanguage();
    if(g_LauncherData.currentCountryCode != tempCountryCode
        || g_LauncherData.cTimestamp != tempSrvUpdate.timeStamp){
        update = LauncherUpdate.SERVICE;
        DBG_ERROR("launcher need update by Country change or launcher service!");
        return update;

    }
    if(g_LauncherData.currentLanguage != tempLanguage){
        update = LauncherUpdate.SERVICE;
        DBG_ERROR("launcher need update by Language changed!!!");
        return update;
    }
    var addApps = getAddAppFromOpera();
//    DBG_ERROR("add app number:" + addApps.length);
    if (addApps.length != launcherLastAppStoreAddNum) {
        DBG_ERROR("launcher need update by Opera install number changed!!!");
        update = LauncherUpdate.SERVICE;
        return update;
    }else{
        for (var n = 0; n < addApps.length; n++) {
            if($.inArray(addApps[n].appUrl,g_appStoreList) == -1){
                DBG_ERROR("launcher need update by Opera install url changed!!!");
                update = LauncherUpdate.SERVICE;
                return update;
            }
        }
    }
    var addBrowserApp = getAddAppFromBrowser();
    if (addBrowserApp.length != launcherLastAppBrowserAddNum) {
        DBG_ERROR("launcher need update by Browser install number changed!!!");
        update = LauncherUpdate.SERVICE;
        return update;
    }
//    else{
//        for (var n = 0; n < addBrowserApp.length; n++) {
//            if($.inArray(addBrowserApp[n].appUrl,g_browserAppList) == -1){
//                DBG_ERROR("launcher need update by Browse install url changed!!!");
//                update = LauncherUpdate.SERVICE;
//                return update;
//            }
//        }
//    }

//    DBG_ERROR("launcherDataNeedToUpdate!!!!!:"+g_fteNoneSource.needUpdate);
    if(g_fteNoneSource.needUpdate){
        update = LauncherUpdate.SERVICE;
        DBG_ERROR("launcher need update by g_fteNoneSource.needUpdate changed!!!");
        return update;
    }
    if(g_launcherHotelStatus != tempHotelStatus){
        update = LauncherUpdate.SERVICE;
        DBG_ERROR("launcher need update by hotel mode changed!!!");
        return update;
    }
    var SourceHotel = initAllInputsData().sourceList;
    for(var i= 0;i<g_launcherSourceHotel.length;i++){
        if(g_launcherSourceHotel[i].hotelLock!=SourceHotel[i].hotelLock){
            DBG_ERROR("launcher need update by hotel locked changed!!!");
            update = LauncherUpdate.SERVICE;
            break;
        }
    }
    return update;
}

function getLauncherAllAppImgNameByUrl(url){
    var ret = null;
    switch(url){
        case "netflix":
            ret = "netflix";
            break;
        case "youtube":
            ret = "youtube";
            break;
        case "amazonruby":
        case "amazon":
            ret = "amazon";
            break;
//        case "vudu":
//            ret = "vudu";
//            break;
//        case "https://ecs.ultraflix.com/00170A3/ultraflix/index.html/?allowLive&device=Hi-Sense":
//            ret = "Ultraflix";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/ted-talks/?closeWindow=1":
//            ret = "TEDTalks";
//            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/ted/?closeWindow=1":
            ret = "TED";
            break;
        case "pandora":
        case "https://tv.pandora.com/?model=MTK5658&vendor=Sharp&type=HTML5&modelYear=2016&badge=7bsx3s6dur6tkbtu562mnhhgxoh6dwtsen5gh6ldsjlntolr5xua&mouseEnabled=true&playKey=415&skipKey=417&pauseKey=19&backKey=8":
            ret = "pandora";
            break;
        case "http://www.yupptv.com/hisense/index.html":
            ret = "YuppTV";
            break;
        case "http://html5.toongoggles.com/":
            ret = "ToonGoggles";
            break;
        case "http://ott.on.aol.com/ott/hisense_tv/homepage":
            ret = "AOLOn";
            break;
        case "accuweather":
            ret = "accuweather";
            break;
        case "dailymotion":
            ret = "Dailymotion";
            break;
        case "http://www.viewster.tv/Viewster_v5/index.html":
            ret = "viewster";
            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/facebook/?closeWindow=1":
            ret = "facebook";
            break;
        case "appstore":
            ret = "OperaTVStore";
            break;
        case "browser":
            ret = "TVBrowser";
            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/tvitter/?closeWindow=1":
            ret = "Tvitter";
            break;
        case "gamecenter":
            ret = "gamecenter";
            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/ap-news/?closeWindow=1":
//            ret = "ap_news";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/rockswap-adventures/?closeWindow=1":
//            ret = "rock_swap";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/ultimate-poker-2/?closeWindow=1":
//            ret = "ultimatepoker";
//            break;
        case "http://kidoz.tv/hs/hisense.html":
            ret = "Kidoz";
            break;
//        case "http://hisense.8tv.tvigle.ru/":
//            ret = "B8TV";
//            break;
//        case "http://www.bbc.co.uk/iplayer/":
//            ret = "BBCiplayer";
//            break;
//        case "http://www.bbc.co.uk/tvapp/news":
//            ret = "BBCNEWS";
//            break;
//        case "http://www.bbc.co.uk/tvapp/sport":
//            ret = "BBCSPORT";
//            break;
//        case "http://smarttv.vetrya.biz/hisense/calciomercato":
//            ret = "Calciomercato";
//            break;
//        case "http://hisense.chili.tv":
//            ret = "Chili";
//            break;
        case "http://web.ottcloud.tv/chinablue/hisense/index.html":
            ret = "ChinaBlue";
            break;
        case "http://tv.deezer.com/smarttv/oaquaexeex4fu2waereeseicheiGhopa9wei6aes/hisense/index.xhtml":
            ret = "deezer";
            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/dw-lrby/?closeWindow=1":
//            ret = "DW";
//            break;
//        case "https://www.etungo.com.tw/":
//            ret = "etungo_icon";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/golf-digest/?closeWindow=1":
//            ret = "GolfDigest";
//            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/golf-tv/?closeWindow=1":
            ret = "GolfTV";
            break;
        case "http://apps.icflix.com/hisense":
            ret = "Icflix";
            break;
//        case "http://smarttv.vetrya.biz/hisense/ilmeteo":
//            ret = "ilmeteo";
//            break;
//        case "http://smarttv.vetrya.biz/hisense/italiasmart":
//            ret = "ItaliaSmart";
//            break;
//        case "http://movie.opera.ivi.ru":
//            ret = "ivi";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/kinopoisk/?closeWindow=1":
//            ret = "KinoPoisk";
//            break;
        case "http://tv.gole.tv/hx_index.html?clientType=Hisense":
            ret = "livetvapp";
            break;
//        case "http://hisense-app.megogo.net":
//            ret = "MEGOGO";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/nowru-theatre/?closeWindow=1":
//            ret = "Now";
//            break;
        case "http://plex.tv/web/tv/hisense":
            ret = "PLEX";
            break;
//        case "http://smarttv.vetrya.biz/hisense/quattroruoteTV":
//            ret = "quattroruote";
//            break;
        case "http://operatv.redbull.tv/":
            ret = "RedbullTV";
            break;
//        case "http://smarttv.vetrya.biz/hisense/repubblicatv/":
//            ret = "RepubblicaTV";
//            break;
//        case "http://smarttv.vetrya.biz/hisense/rtl":
//            ret = "rtl";
//            break;
//        case "http://hisense.rm.tvigle.ru/":
//            ret = "Russianmusic";
//            break;
//        case "http://8428364763.a.fxmconnect.com":
//            ret = "SchalkeTV";
//            break;
        case "http://apps.showmax.com/Kieshoh7eiz9aeph0iewii1theephe":
            ret = "SHOWMAX";
            break;
//        case "http://hisense.btv.tvigle.ru/":
//            ret = "tv";
//            break;
//        case "http://hisense.tvigle.ru/":
//            ret = "Tvigle";
//            break;
//        case "http://services.tvzavr.ru/alliance/":
//            ret = "TVZAVR";
//            break;
        case "http://www.viaway.com/CE/hisense.aspx":
            ret = "VIAWAY";
            break;
//        case "https://smarttv3.videociety.de":
//            ret = "Videociety";
//            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/vimeo/?closeWindow=1":
            ret = "Vimeo";
            break;
//        case "http://opera.vintera.tv/opera/":
//            ret = "Vinteratv";
//            break;
        case "http://smarttvlive.wowtv.com/hisense/index.html":
            ret = "WoWTV";
            break;
//        case "https://hisense-app.wuaki.tv/":
//            ret = "wuakiTV";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/iandeks/?closeWindow=1":
//            ret = "Yandex";
//            break;
//        case "http://www.zoomby.ru/ce/hisense/hisense.html":
//            ret = "zoomby";
//            break;
//        case "http://ampya.com/smarttv/redirect/hisense13":
//            ret = "AMPYA";
//            break;
//        case "http://www.rtve.es/hbbtv/alacarta/hisense.html":
//            ret = "RTVE";
//            break;
//        case "http://www.rtve.es/hbbtv/clan/hisense.html":
//            ret = "Clan";
//            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/gismeteo-2/?closeWindow=1":
//            ret = "Gismeteo";
//            break;
//        case "http://hs.okko.tv":
//            ret = "okko";
//            break;
//        case "http://smarttv.myvideo.ge/hisense/":
//            ret = "Myvideo";
//            break;
//        case "http://sbsondemandhisense.sbs.com.au/":
//            ret = "SBSONDEMAND";
//            break;
//        case "http://prod.hisense.accedo.tv/hisense2015/fairfaxtv/":
//            ret = "SMHtv";
//            break;
        case "http://tv2hisense.clarovideo.net/FRONTEND/":
            ret = "clarovideo";
            break;
        case "http://opera.qubit.tv":
            ret = "Qubit";
            break;
        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/crackle-2/?closeWindow=1":
            ret = "Crackle";
            break;
//        case "https://hisense.tvstore.opera.com:84/api/tvapps/runapp/crackle-2/?closeWindow=1":
//            ret = "Bollywood";
//            break;
        case "media":
            ret = "media";
            break;
        case "miracast":
            //if(GLOBAL.MODULEID == "launcher2"){
            //    ret = GLOBAL.LAUNCHER_THEME+"anyviewcast";
            //}else{
                ret = "anyviewcast";
            //}
            break;
        default:
            ret = null;
            break;
    }
    if(ret!=null){
        ret = "/"+ret;
    }
    return ret;
}
function getNotificationData() {
    var Notifications = [];
    var msg = UIObserver.getNotifications();
//    DBG_INFO("getNotificationApps333!!!!:" + JSON.stringify(msg));
    if(!tv)msg = {"30":[{"MsgName":30,"MsgId":1,"date":1504576969,"data":["3-1"],"cmd":9},{"MsgName":30,"MsgId":2,"date":1504576994,"data":["2-1"],"cmd":9},{"MsgName":30,"MsgId":3,"date":1504577018,"data":["1-1"],"cmd":9},{"MsgName":30,"MsgId":4,"date":1504577025,"data":["1-0"],"cmd":9}],"33":[{"MsgName":33,"MsgId":0,"date":1504576955,"data":[["offline","/mnt/usb/sda1/","MANLI","DE42-03D4"]],"cmd":2},{"MsgName":33,"MsgId":5,"date":1504577036,"data":[["online","/mnt/usb/sdb1/","MANLI","DE42-03D4"]],"cmd":2}]}
    var obj = Object.keys(msg);
    var sourceMap = {
        0: "tv",
        1: "av",
//        2: "component",
        2: "hdmi1",
        3: "hdmi2",
        4: "hdmi3",
        5: "hdmi4"
    };
    var UsbOffline = [];
    var inputsData = initAllInputsData();
    for (var i = 0; i < obj.length; i++) {
        if (msg[obj[i]].length > 0) {
            if (msg[obj[i]][0].cmd == LauncherCMD.INPUT) {
                for (var j = 0; j < msg[obj[i]].length; j++) {
                    var array = msg[obj[i]][j].data[0].split("-");
                    if (array.length > 1) {
                        if (array[1] == 1) {
                            var item = {
                                "Name": " ",
                                "Detail": " ",
                                "Icon": "",
                                "date": "",
                                "data": "",
                                "cmd": ""
                            };
                            item.Name = sourceMap[array[0]];
                            item.cmd = LauncherCMD.INPUT;
                            item.data = array[0];
                            item.Icon = "img/notification/ic_" + sourceMap[array[0]] + ".png";
                            for (var x = 0; x < inputsData.sourceList.length; x++) {
                                if (item.data == inputsData.sourceList[x].id) {
                                    item.Name = inputsData.sourceList[x].name;
                                    if(!!inputsData.sourceList[x].rename){
                                        item.Name = inputsData.sourceList[x].rename;
                                    }
                                    break;
                                }
                            }
                            item.date = msg[obj[i]][j].date;
                            for(var y=0;y<Notifications.length;y++){
                                if(Notifications[y].cmd == LauncherCMD.INPUT){
                                    if(Notifications[y].data == item.data){
                                        Notifications.splice(y, 1);
                                    }
                                }
                            }
                            if($.inArray(item.data,inputsData.signalSourceList) > -1){
                                Notifications.push(item);
                            }
                        }
                    }
                }
            } else if (msg[obj[i]][0].cmd == LauncherCMD.HIMEDIA) {
                for (var j = 0; j < msg[obj[i]].length; j++) {
                    if(msg[obj[i]][j].data[0][0] == "online"){
                        var item = {
                            "Name": " ",
                            "Detail": " ",
                            "Icon": "",
                            "date": "",
                            "data": "",
                            "cmd": ""
                        };
                        item.Name = getCurrentContentLanguage("Media");
                        item.cmd = LauncherCMD.HIMEDIA;
                        item.data = "";
                        item.Detail = msg[obj[i]][j].data[0][2];
                        item.Icon = "img/notification/ic_media.png";
                        item.date = msg[obj[i]][j].date;
                        Notifications.push(item);
                    }else if(msg[obj[i]][j].data[0][0] == "offline"){
                        var item = {
                            "Name": " ",
                            "Detail": " ",
                            "Icon": "",
                            "date": "",
                            "data": "",
                            "cmd": ""
                        };
                        item.Name = "[LA0019]";
                        item.cmd = LauncherCMD.HIMEDIA;
                        item.data = "";
                        item.Detail = msg[obj[i]][j].data[0][2];
//                        item.Icon = "launcher/notification/"+GLOBAL.LAUNCHER_THEME+"ic_media.png";
                        item.date = msg[obj[i]][j].date;
                        UsbOffline.push(item);
                    }
                }
            }
        }
    }
    try{
    for(var a=0;a<Notifications.length;a++){
        for(var b=0;b<UsbOffline.length;b++){
            if(Notifications[a].cmd == LauncherCMD.HIMEDIA){
                if(Notifications[a].Detail == UsbOffline[b].Detail){
                    if(UsbOffline[b].date > Notifications[a].date){
                        Notifications.splice(a,1);
                        a--;
                        break;
                    }
                }
            }
        }
    }
    }catch(e){
        DBG_ERROR("" + e.message);
    }
//    if(tv && model.system.getNotificationSwitch()!=0){
        var launcherMsg = getNotificationApps();
        Notifications = Notifications.concat(launcherMsg);
        var picMsg = getPictureResource();
        if(picMsg!=null){
            Notifications = Notifications.concat(picMsg);
        }
        picMsg = getPictureResourceB();
        if(picMsg!=null){
            Notifications = Notifications.concat(picMsg);
        }

//    }
//    DBG_INFO("getNotificationApps22222!!!!:" + JSON.stringify(Notifications));
    var tem = 0;
    try{
    for(var m=0;m<Notifications.length;m++){
        for(var n=0;n<Notifications.length-m-1;n++){
            if(Notifications[n].date<Notifications[n+1].date){
                tem = Notifications[n];
                Notifications[n] = Notifications[n+1];
                Notifications[n+1] = tem;
            }
        }
    }

//    Notifications = [{"Name":"Media","Detail":"MISS QIN","Icon":"launcher/notification/ic_media.png","date":1088651425,"data":"","cmd":2},{"Name":"Media","Detail":"MISS QIN","Icon":"launcher/notification/ic_media.png","date":1088651417,"data":"","cmd":2}];
    for(var x=0;x<Notifications.length-1;x++){
        if(Notifications[x].cmd == LauncherCMD.HIMEDIA && Notifications[x].cmd == Notifications[x+1].cmd){
            if(Notifications[x].Detail == Notifications[x+1].Detail){
                Notifications.splice(x+1, 1);
            }
        }
        if(Notifications[x].cmd == LauncherCMD.INPUT && Notifications[x].cmd == Notifications[x+1].cmd){
            if(Notifications[x].data == Notifications[x+1].data){
                Notifications.splice(x+1, 1);
            }
        }
    }
    }catch(e){
        DBG_ERROR("" + e.message);
    }
//    DBG_INFO("getNotificationApps22222!!!!:" + JSON.stringify(Notifications));
//    test();

    return Notifications;
}
//
function test(){
    DBG_INFO("test!!!!!!!!!!!!getNotificationApps22222!!!!:");
    var a =[1];
    var t = a[0];
    for(var i=0;i<a.length;i++){
        DBG_INFO("i:" + i);
        for(var j=0;j< a.length-i-1;j++){
            DBG_INFO("j:" + j);
            if(a[j]<a[j+1]){
                t=a[j];
                a[j] = a[j+1];
                a[j+1] = t;
            }
        }
//        DBG_INFO("test!!!!!!!!!!!!getNotificationApps22222!!!!:"+a[i]);
    }
    DBG_INFO("test!!!!!!!!!!!!getNotificationApps22222!!!!:"+JSON.stringify(a));
}


function setNotificationTimeStamp(){
    g_notificationTimeStamp = getSYSLongTime();
    DBG_INFO("setNotificationTimeStamp!!!!:" + g_notificationTimeStamp);
    var arr  = [];
    arr.push(g_notificationTimeStamp);
    writeFileToNative("launcher/notificationTimeStamp.txt", objToString(arr), 1);
}

function getNotificationTimeStamp(){
    var timeStamp = readFileFromNative("launcher/notificationTimeStamp.txt", 1);
    var notificationTimeStamp = 0;
    if(timeStamp!=null){
        notificationTimeStamp = parseInt(timeStamp[0]);
    }
    DBG_ERROR("getNotificationTimeStamp:" + notificationTimeStamp);
    return notificationTimeStamp;

}

function getNotificationDataNew() {
//    var temTimeStamp = 0;
    var newData = false;
//    var Notifications = [];
//    Notifications = getNotificationData();
//    if(Notifications.length>0){
//        temTimeStamp = Notifications[0].date;
//    }
//    for(var i=0;i<Notifications.length;i++){
//        if(Notifications[i].date>temTimeStamp){
//            temTimeStamp = Notifications[i].date;
//        }
//    }
    if(g_notificationCrtTimeStamp>g_notificationTimeStamp){
        newData = true;
    }

    DBG_INFO("getNotificationDataNew:" + newData);
    return newData;
}


function getSharpLauncherData() {
    var dd = [];
    var serviceUpdate = getLauncherServiceUpdateData();

    var currentCountryCode = tv ? model.basicSetting.getTvsetLocation() : "ARG";
    var serviceCountryCode = serviceUpdate.countryCode;
    DBG_INFO('current Country Code ' + currentCountryCode, DebugLevel.WARNING);
    g_launcherHotelStatus = tv ? model.hotel.getHotelMode() : 1;
    g_launcherSourceHotel = initAllInputsData().sourceList;
    g_LauncherData.currentCountryCode = currentCountryCode;
    g_LauncherData.cTimestamp = serviceUpdate.timeStamp;
    g_LauncherData.currentLanguage = tv?ChangeLangNumToCode(model.language.getOsd()):hiWebOsFrame.getCurrentLanguage();
    DBG_INFO("currentCountryCode:" + currentCountryCode);
    var mainJSON = null;
    var defaultData = (serviceCountryCode != currentCountryCode) || getAlwaysDefaultDataStatus() || serviceUpdate.timeStamp == 0;
    if(hiWebOsFrame.getCurrentBrand() == "nob"){
        defaultData = true;
    }
    var launcherPath = defaultData ? (tv?"VIDAAU2Launcher/data/sharp/":"../VIDAAU2Launcher/data/sharp/") : "launcher/data/";
    if (defaultData) {
        DBG_ERROR('service country not equal current country, use default data', DebugLevel.WARNING);
        mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
    }
    else {
        mainJSON = readXMLDOM(launcherPath + "CategoryIndex.xml", 1);
        if (null == mainJSON) {
            launcherPath = "UI/data/";
            DBG_ERROR('get launcher data error, use default data', DebugLevel.ERROR);
            mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
            defaultData = true;
        }
    }

    if (null != mainJSON) {
        var footerJSON = readXMLDOM(launcherPath + getCategoryListPath(mainJSON), defaultData ? 2 : 1);
        dd = parseSharpLauncherCategoryListData(footerJSON, defaultData, launcherPath);
    }
//    var launcherData = {};
//    launcherData.data = dd;
//    DBG_ERROR("return data:" + objToString(launcherData));
//    var ret = $.extend(true,{}, launcherData);
    if(dd == null){
        launcherPath = "UI/sharp/data/";
        DBG_ERROR('no all app data ,use default data');
        mainJSON = loadLauncherDefaultData(launcherPath, currentCountryCode);
        defaultData = true;
        if (null != mainJSON) {
            var footerJSON = readXMLDOM(launcherPath + getCategoryListPath(mainJSON), defaultData ? 2 : 1);
            dd = parseSharpLauncherCategoryListData(footerJSON, defaultData, launcherPath);
        }
    }
    DBG_INFO("return data:" + objToString(dd));
    allAppsWriteToFileForUseBySharp(dd);
    return dd;
}

function allAppsWriteToFileForUseBySharp(data) {

    var tmpData = data,
        index = 0,
        tempData = {
            AppInfo: []
        };
    var settingUseApps = [];

    var deletedPresetApps = readFileFromNative("launcher/deletedPresetApp.txt", 1);

    for(var i = 0; i < tmpData.length; ++i) {
        if(parseInt(tmpData[i].tagType) != LauncherTagType.LIVETV &&
            parseInt(tmpData[i].tagType) != 59) {
            index = i;
            var dataContents = tmpData[index].data,
                dataLength = dataContents.txts.length;
            for (var j = 0; j < dataLength; ++j) {

                if (Array.isArray(deletedPresetApps) && deletedPresetApps.indexOf(dataContents.urls[j]) > -1) {
                    DBG_INFO("This App has been removed:" + dataContents.urls[j]);
                    continue;
                }
                if(dataContents.urls[j] == 'netflix' || dataContents.urls[j] == 'vudu'){
                    settingUseApps.push(dataContents.urls[j]);
                }

                tempData.AppInfo.push({
                    AppName: dataContents.txts[j],
                    IconURL: dataContents.imgs[j],
                    InstallTime: "",
                    RunTimes: 0,
                    URL: ((null == dataContents.urls[j]) ? ("") : (dataContents.urls[j])),
                    StartCommand: ((null == dataContents.urls[j]) ? ("") : (dataContents.urls[j])),
                    UrlType: dataContents.urlTypes[j],
                    StoreType: dataContents.storeTypes[j],
                    PreInstall: true
                });
            }
//            break;
        }
    }
    writeFileToNative('launcher/settingappinfo.txt', objToString(settingUseApps), 1);
    writeFileToNative('launcher/preset.txt', objToString(tempData), 1);
}


var g_ad_data = [];

function parseSharpLauncherCategoryListData(footer, defaultData, launcherPath){
    var containerData = [];
    var has_ad = false;
    g_ad_data = [];
    if (null == footer) {
        DBG_ERROR("footer json is null");
        return containerData;
    }
    var hasNotification = false;
    var delData = getLauncherDeleteAppByUser();
    var footerTmp = getNodesByKey(CategoryKey.INFO, footer);
    for (var i = 0; i < footerTmp.length; i++) {
        var contentItem = {};

        contentItem.Name = getItemsByLanguage(getNodesByKey(CategoryKey.CATEGORYNAME, footerTmp[i]), "name", defaultData);
        contentItem.Icon = getItemsByLanguage(getNodesByKey(CategoryKey.CATEGORYICON, footerTmp[i]), 'iconUrl', defaultData);

        contentItem.Order = getTextByKey(CategoryKey.ORDER, footerTmp[i]);
        contentItem.canPlay = getTextByKey(CategoryKey.ARROW, footerTmp[i]) == 0;
        contentItem.tagType = getTextByKey(CategoryKey.TAGTYPE, footerTmp[i]);
        var contentData = {};
        contentData.txts = [];
        contentData.imgs = [];
        contentData.urls = [];
        contentData.urlTypes = [];
        contentData.storeTypes = [];
        contentData.canRemoves = [];
        contentData.canMoves = [];
        contentData.cmd = -1;

        if (contentItem.tagType == LauncherTagType.LIVETV) {    //input
            contentItem.data = contentData;
            contentData.cmd = LauncherCMD.ALLINPUTS;
        }else if(contentItem.tagType == LauncherTagType.MEDIA){
            contentData.urlTypes = [0];
            contentData.txts[0] = "Media";
            contentData.imgs = ['launcher/sharp/input/media.png'];
            contentData.urls =['media'];
            contentItem.data = contentData;
            contentData.cmd = LauncherCMD.HIMEDIA;
        }
        else if(contentItem.tagType == LauncherTagType.SETTINGS){
            contentItem.data = contentData;
            contentData.cmd = LauncherCMD.SETTINGS;
        }
        else {
            contentItem.data = parseSharpLauncherCategoryContentData(getTextByKey(CategoryKey.CATEGORYURL, footerTmp[i]), defaultData, launcherPath);
            if (contentItem.tagType == LauncherTagType.AllAPP) {    //all app
//                DBG_ALWAYS("getItemsByLanguage!!!!!!!!!!:"+JSON.stringify(contentItem));
                contentData.cmd = LauncherCMD.ALLAPP;
                for (var m = 0; m < delData.length; m++) {
                    var idx = $.inArray(delData[m], contentItem.data.urls);
                    if (idx > -1) {
                        DBG_ALWAYS("generateDataFunction:delete all:" + delData[m] + "," + delData.length);
                        contentItem.data.imgs.splice(idx, 1);
                        contentItem.data.txts.splice(idx, 1);
                        contentItem.data.urls.splice(idx, 1);
                        contentItem.data.urlTypes.splice(idx, 1);
                        contentItem.data.canRemoves.splice(idx, 1);
                        contentItem.data.canMoves.splice(idx, 1);
                        contentItem.data.storeTypes.splice(idx, 1);
                    }
                }
                var configAppNum = contentItem.data.imgs.length;
                var addApps = getAddAppFromOpera();
                DBG_ALWAYS("VIDAALiteInitLauncherAppPageData:add app number:" + addApps.length);
                launcherLastAppStoreAddNum = addApps.length;
                for (var n = 0; n < addApps.length; n++) {
                    contentItem.data.imgs[n + configAppNum] = addApps[n].Image;
                    contentItem.data.txts[n + configAppNum] = addApps[n].appName;
                    contentItem.data.urls[n + configAppNum] = addApps[n].appUrl;
                    contentItem.data.urlTypes[n + configAppNum] = addApps[n].appUrlType;
                    contentItem.data.canRemoves[n + configAppNum] = addApps[n].canRemove;
                    contentItem.data.canMoves[n + configAppNum] = addApps[n].canMove;
                    contentItem.data.storeTypes[n + configAppNum] = addApps[n].storeType;
                }
            }
            else if(contentItem.tagType == LauncherTagType.RECOMMEND) {
                if(contentItem.data != null){
                    hasNotification = true;
                    contentData.cmd = LauncherCMD.NOTIFICATION;
//                g_notificationTimeStamp = g_LauncherData.cTimestamp;
                    g_notificationApps = [];
                    for(var y=0;y<contentItem.data.imgs.length;y++){
                        var appInfo = {};
                        var data = {};
                        appInfo.Name = contentItem.data.txts[y];
                        if(contentItem.data.imgs[y].indexOf("default.png")>-1){
                            appInfo.Icon = "launcher/notification/default.png";
                        }else{
                            appInfo.Icon = contentItem.data.imgs[y];
                        }
                        appInfo.Detail = " ";
                        appInfo.date = g_LauncherData.cTimestamp;
                        appInfo.cmd = LauncherCMD.APP;
                        appInfo.data = data;
                        data.url = contentItem.data.urls[y];
                        data.urlType = contentItem.data.urlTypes[y];
                        data.storeType = contentItem.data.storeTypes[y];
                        g_notificationApps.push(appInfo);
                    }

                }

            }
            else if(contentItem.tagType == LauncherTagType.AD) {
                has_ad = true;
                g_ad_data = contentItem.data;
            }else if(contentItem.tagType == LauncherTagType.RECENTLY) {
//                var recentapplist = readFileFromNative("launcher/recentapps.txt", 1);
//                var configAppNum = contentItem.data.imgs.length;
//                if (null != recentapplist && !!recentapplist.AppInfo) {
//                    for (var i = 0; i < recentapplist.AppInfo.length; i++) {
//                        contentItem.data.imgs[i + configAppNum] = recentapplist.AppInfo[i].IconURL;
//                        contentItem.data.txts[i + configAppNum] = recentapplist.AppInfo[i].AppName;
//                        contentItem.data.urls[i + configAppNum] = recentapplist.AppInfo[i].URL;
//                        contentItem.data.urlTypes[i + configAppNum] = recentapplist.AppInfo[i].UrlType;
//                        contentItem.data.canRemoves[i + configAppNum] = 0;
//                        contentItem.data.canMoves[i + configAppNum] = 0;
//                        contentItem.data.storeTypes[i + configAppNum] = recentapplist.AppInfo[i].StoreType;
//                    }
//                }
            }
        }
        if (contentItem.data != null) {
            containerData.push(contentItem);
        }
    }
    if(!hasNotification){
        g_notificationApps = [];
    }
    if(!has_ad){
        g_ad_data = [];
    }

    return containerData;
}

function parseSharpLauncherCategoryContentData(url, defaultData, launcherPath) {

    var contentData = {};
    contentData.txts = [];
    contentData.imgs = [];
    contentData.urls = [];
    contentData.urlTypes = [];
    contentData.storeTypes = [];
    contentData.canRemoves = [];
    contentData.canMoves = [];
    if (!url) {
        return contentData;
    }

    var contentJSON = null;
    if (defaultData) {
        contentJSON = readXMLDOM(launcherPath + url, 2);
    }
    else {
        contentJSON = readXMLDOM(launcherPath + url, 1);
    }
    if (null == contentJSON) {
        DBG_INFO('read category ' + url + 'error. ', DebugLevel.ERROR);
        return contentData;
    }

    var objectTmp = getNodesByKey(ObjectKey.OBJECTINFO, contentJSON);
    for (var j = 0; j < objectTmp.length; j++) {
        contentData.txts[j] = getItemsByLanguage(getNodesByKey(ObjectKey.OBJECTNAME, objectTmp[j]), "name", false);
        contentData.imgs[j] = getItemsByLanguage(getNodesByKey(ObjectKey.OBJECTPICTURE, objectTmp[j]), 'pictureUrl', false);
        contentData.urlTypes[j] = parseInt(getTextByKey(ObjectKey.OBJECTTYPE, objectTmp[j]));
        contentData.urls[j] = getTextByKey(ObjectKey.OBJECTURL, objectTmp[j]);
        contentData.canMoves[j] = parseInt(getTextByKey(ObjectKey.MOVABLE, objectTmp[j])) == 0 ? false : true;
        contentData.canRemoves[j] = (contentData.urlTypes[j] == CmdURLType.START_WEBAPP);
        var ownerId = getOwnerId(objectTmp[j]);
        if (ownerId == null) {
            contentData.storeTypes[j] = 10000;
        }
        else {
            contentData.storeTypes[j] = parseInt(ownerId);
        }
        if(contentData.urlTypes[j] == 32){
            contentData.storeTypes[j] = 100;
            contentData.urlTypes[j] = 36;
        }
        if (92 == ownerId && CmdURLType.VUDU_POSTER != contentData.urlTypes[j]) {
            contentData.urlTypes[j] = CmdURLType.VUDU_POSTER;
            DBG_INFO("vudu poster, set object type = " + CmdURLType.VUDU_POSTER, DebugLevel.WARNING);
        }
    }
    return contentData;
}

//function setAppInfoForSettingRecentUse(url) {
//    var information = null, current = null, appInfo = null;
//
//    information = readFileFromNative("launcher/preset.txt", 1);
//    current = readFileFromNative("launcher/recentapps.txt", 1);
//    appInfo = readFileFromNative("launcher/Appinfo.json", 1);
//
//    if(information == null) {
//        debugE('Launcher is not ready! Return form setAppInfoForSettingRecentUse!');
//        return;
//    }
//    if(current == null) {
//        current = {
//            AppInfo:[]
//        };
//    }
//
//    var currentObj = $.extend(true,{},current);
//    var maxLength = 20, flag = 0, tmp = null;
//
//    if(current.AppInfo.length != 0) {
//        $.each(information.AppInfo, function(k,v) {
//            if(v.URL == url) {
//                $.each(current.AppInfo, function(kk,vv) {
//                    if(vv.URL == url) {
//                        tmp = vv;
//                        currentObj.AppInfo.splice(kk,1);
//                        currentObj.AppInfo.unshift(tmp);
//                        return false;
//                    }
//                    else if(kk == current.AppInfo.length - 1) {
//                        if(current.AppInfo.length < maxLength) {
//                            currentObj.AppInfo.unshift(v);
//                        }
//                        else {
//                            currentObj.AppInfo.pop();
//                            currentObj.AppInfo.unshift(v);
//                        }
//                    }
//                });
//                flag = 1;
//                return false;
//            }
//        });
//        if(!flag && appInfo != null) {
//            $.each(appInfo.AppInfo, function(k,v) {
//                if(v.URL == url) {
//                    $.each(current.AppInfo, function(kk,vv) {
//                        if(vv.URL == url) {
//                            tmp = vv;
//                            currentObj.AppInfo.splice(kk,1);
//                            currentObj.AppInfo.unshift(tmp);
//                            return false;
//                        }
//                        else if(kk == current.AppInfo.length - 1) {
//                            if(current.AppInfo.length < maxLength) {
//                                v.UrlType = 36;
//                                v.IconURL = v.Image;
//                                currentObj.AppInfo.unshift(v);
//                            }
//                            else {
//                                currentObj.AppInfo.pop();
//                                v.UrlType = 36;
//                                v.IconURL = v.Image;
//                                currentObj.AppInfo.unshift(v);
//                            }
//                        }
//                    });
//                    return false;
//                }
//            })
//        }
//    }
//    else {
//        $.each(information.AppInfo,function(k,v) {
//            if(v.URL == url) {
//                currentObj.AppInfo.unshift(v);
//                return false;
//            }
//        })
//    }
//    writeFileToNative('launcher/recentapps.txt', objToString(currentObj), 1);
//
//}

function getRememberEditAppForNewsan() {
    var rememberEditApp = readFileFromNative('launcher/rememberEditApp.json', 1);
    var app = [];
    var currentCountryCode = g_LauncherData.currentCountryCode;
    if (currentCountryCode == rememberEditApp.countryCode) {
        if (null != rememberEditApp) {
            app = rememberEditApp.appInfo;
        }
    }
    return app;

}

function VIDAALiteLauncherAddfunc(item,flag){
    if(!!hiWebOsFrame.myLauncher){
        var index = VidaaU2GetCurrentSelectIndex();
        VidaaU2MainTitleAddItem(item,index);
        if(!!flag){
            hiWebOsFrame.VIDAAU2AppPage.close();
        }else{
//            hiWebOsFrame.VIDAAU2TvInput.close();
            hiWebOsFrame.VIDAAU2TvInput.destroy();
        }
        hiWebOsFrame.myLauncher.open();
        VidaaU2MainTitleToChange();
        hiWebOsFrame.myLauncher.hiFocus();
    }else{
        hiWebOsFrame.createPage("VIDAAU2MainTitlePage", null, null, null, function (a) {
            hiWebOsFrame.myLauncher = a;
            VidaaU2MainTitleAddItem(item);
            if(!!flag){
                hiWebOsFrame.VIDAAU2AppPage.close();
            }else{
//                hiWebOsFrame.VIDAAU2TvInput.close();
                hiWebOsFrame.VIDAAU2TvInput.destroy();
            }
            hiWebOsFrame.createPage("VIDAAU2StatusPage", null, a, null, function (page) {
                hiWebOsFrame.VIDAAU2StatusPage = page;
                page.open();
                a.open();
                VidaaU2MainTitleToChange();
                a.hiFocus();
            });
        });

    }

}
function VIDAALiteLauncherAddfuncforNob(item){
    if(!!hiWebOsFrame.myLauncher){
        VidaaU2NobAddItem(item);
        hiWebOsFrame.VIDAAU2AppPage.close();
        hiWebOsFrame.myLauncher.open();
        hiWebOsFrame.myLauncher.hiFocus();
    }else{
        hiWebOsFrame.createPage("NoblexLauncher_page", null, null, null, function (a) {
            hiWebOsFrame.myLauncher = a;
            VidaaU2NobAddItem(item);
                hiWebOsFrame.VIDAAU2AppPage.close();
            hiWebOsFrame.createPage("VIDAAU2StatusPage", null, a, null, function (page) {
                hiWebOsFrame.VIDAAU2StatusPage = page;
                page.open();
                a.open();
                a.hiFocus();
            });
        });

    }

}

function getAddAppFromBrowser() {
    var storeTypeList = {
        "opera": StoreType.OPERA,
        "foxxum": StoreType.FOXXUM,
        "netrange": StoreType.NETRANGE,
        "store":StoreType.STORE,
        "hbbtv":StoreType.HBBTV,
        "browser":StoreType.BROWSER,
        "hisense":StoreType.HISENSE
    };
    var addApps = [];
    if (!tv) {
        addApps = [];
        return addApps;
    } else {
//        launcherNeedDownLoadAppImgUrl = [];
        addApps = [];
        var favAppsPageData = readFileFromNative('launcher/BrowserAppInfo.json', 1);
        if (null == favAppsPageData || 0 == favAppsPageData.AppInfo.length) {
            return addApps;
        }
        var favArr = favAppsPageData.AppInfo;

        for (var i = 0; i < favArr.length; i++) {
            var app = {};
            app.Image = favArr[i].Image;
            app.appName = favArr[i].Title;
            app.appUrl = favArr[i].URL;
            app.appUrlType = CmdURLType.START_WEBAPP;
            app.canRemove = true;
            app.canMove = true;
            app.storeType = storeTypeList[favArr[i].StoreType];
            addApps.push(app);
        }
        DBG_INFO("getAddAppFromBrowser:" + addApps.length);
        return addApps;
    }
}
function setLauncherDeleteBrowserAppByUser(url) {
    if (tv) {
        DBG_ALWAYS("setLauncherDeleteFoxxumAppByUser:url" + url);
        var favApps = readFileFromNative('launcher/BrowserAppInfo.json', 1);
        if (favApps == null) {

        } else {
            var favArr = favApps.AppInfo;
            for (var i = 0; i < favApps.AppInfo.length; i++) {
                if (!!favArr[i] && url == favArr[i].URL) {
                    favArr.splice(i, 1);
                }
            }
            writeFileToNative('launcher/BrowserAppInfo.json', objToString(favApps), 1);
        }
    }
}



function getAppNameByUrl(url){
    var name = url;
    if(url==HSAPPURL.GAMECENTER){
        return "Game Center"
    }
    if(url==HSAPPURL.DAILYMOTION){
        return "Dailymotion"
    }
    var allAppsData = null;
    var currentData = getLauncherData();
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].cmd == LauncherCMD.ALLAPP) {
            allAppsData = currentData[i].data;
            break;
        }
    }
    if(allAppsData != null){
        for (var i = 0; i < allAppsData.urls.length; i++) {
            if(url == allAppsData.urls[i]){
                name = allAppsData.txts[i];
                break;
            }
        }
    }
    return name;
}

function getAppUrlByName(name){
    var url = null;
    var allAppsData = null;
    var currentData = getLauncherData();
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].cmd == LauncherCMD.ALLAPP) {
            allAppsData = currentData[i].data;
            break;
        }
    }
    var appName = name.toLowerCase().replace(" ", "");
    if(allAppsData != null){
        for (var i = 0; i < allAppsData.imgs.length; i++) {
            var tmpName = allAppsData.txts[i].toLowerCase().replace(" ", "");
            if(appName == tmpName){
                url = allAppsData.urls[i];
                break;
            }
            if(allAppsData.urls[i].indexOf(appName)>-1){
                url = allAppsData.urls[i];
                break;
            }
        }
    }
    return url;
}

function getRecentlyApps(){
    var recentapplist = readFileFromNative("launcher/recentapps.txt", 1);
    var contentItem = {};
    contentItem.data = {
        "txts":[],
        "imgs":[],
        "urls":[],
        "urlTypes":[],
        "storeTypes":[],
        "canRemoves":[],
        "canMoves":[]
    };

    if (null != recentapplist && !!recentapplist.AppInfo) {
//        var currentData = getSharpLauncherData();
//        var allAppsData;
//        for (var i = 0; i < currentData.length; i++) {
//            if (currentData[i].cmd == LauncherCMD.ALLAPP) {
//                allAppsData = currentData[i].data;
//            }
//
//        }
        for (var h = 0; h < recentapplist.AppInfo.length; h++) {
            if(g_launcherHotelStatus == 1 && recentapplist.AppInfo[h].URL == "netflix"){
                continue;
            }
//            var idx = $.inArray(recentapplist.AppInfo[h].URL,allAppsData.urls);
//            if (idx > -1) {
//                recentapplist.AppInfo[h].IconURL = allAppsData.imgs[idx];
//            }

            contentItem.data.imgs.push(recentapplist.AppInfo[h].IconURL);
            contentItem.data.txts.push(recentapplist.AppInfo[h].AppName);
            contentItem.data.urls.push(recentapplist.AppInfo[h].URL);
            contentItem.data.urlTypes.push(recentapplist.AppInfo[h].UrlType);
            contentItem.data.canRemoves.push(0);
            contentItem.data.canMoves.push(0);
            contentItem.data.storeTypes.push(recentapplist.AppInfo[h].StoreType);
        }
    }
    return contentItem;
}

