//var VIDAALiteU2LauncherTimeInterval = 0;
function getVIDAAU2MainTitlePageData(opts) {
    opts.CaE = [
//        {
//            "id":"VidaaU2MainTitleTime1",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitleTime2",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitleDate1",
//            "CaEType":"div"
//        },
//        {
//            "id":"VidaaU2MainTitleDate2",
//            "CaEType":"div"
//        },
//        {
//            "id":"VidaaU2MainTitleCity",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitletemperature",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitleweatherState",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitleWeatherIcon",
//            "CaEType":"img"
//        },
//        {
//            "id":"VidaaU2MainTitleWeatherIcon2",
//            "CaEType":"img"
//        },
//        {
//            "id":"VidaaU2MainTitleNetworkState",
//            "CaEType":"span"
//        },
//        {
//            "id":"VidaaU2MainTitleNetworkIcon",
//            "CaEType":"img"
//        },
        {
            id: 'VidaaU2MainTitleList',
            CaEType: 'NavigationBar',
            handler: {
                "befRightHandler":"VidaaU2MainTitleBefRightHandle",
                "befLeftHandler":"VidaaU2MainTitleBefLeftHandle",
                "aftRightHandler":"VidaaU2MainTitleAftRightHandle",
                "aftLeftHandler":"VidaaU2MainTitleAftLeftHandle",
                "aftEnterHandler":"VidaaU2MainTitleEnterHandle",
                "befUpHandler":"VidaaU2MainTitleBefUpHandle",
                "befDownHandler":"VidaaU2MainTitleBefDownHandle"
            },
            "onFocusFun":"VidaaU2MainTitleUlFocus",
            "onBlurFun":"VidaaU2MainTitleUlOnBlur",
            "classes":{
                "normal":"VidaaU2MainTitleLiNormal","focus":"VidaaU2MainTitleLiFocus",
                "dataSelected":"VidaaU2MainTitleLiNormal","disable":"VidaaU2MainTitleLiDisable"
            },
            "relPosition": [0, 0, 208, 208],//L,T,W,H
            oriCaE: [
                {
                    id: 'VidaaU2MainTitleImg',
                    CaEType: 'img',
                    classes: {
                        normal: 'VidaaU2MainTitleLiImg'
                    }
                },
                {
                    "id": "VidaaU2MainTitleArrowUp",
                    "description": "App img",
                    "CaEType": "img",
                    classes: {
                        normal: 'VidaaU2MainTitleArrowUp',disable:'VidaaU2MainTitleArrowUp'
                    }
                },
                {
                    "id": "VidaaU2MainTitleArrowLeft",
                    "description": "App img",
                    "CaEType": "img",
                    classes: {
                        normal: 'VidaaU2MainTitleArrowLeft',disable:'VidaaU2MainTitleArrowLeft'
                    }
                },
                {
                    "id": "VidaaU2MainTitleArrowRight",
                    "description": "App img",
                    "CaEType": "img",
                    classes: {
                        normal: 'VidaaU2MainTitleArrowRight',disable:'VidaaU2MainTitleArrowRight'
                    }
                },
                {
                    id: 'VidaaU2MainTitleText',
                    CaEType: 'div',
                    classes: {
                        normal: 'VidaaU2MainTitleLiText',disable:'VidaaU2MainTitleLiText'
                    }
                },
                {
                    id: 'VidaaU2MainTitleLockImg',
                    CaEType: 'img',
                    classes: {
                        normal: 'VidaaU2MainTitleLiImg'
                    }
                }
            ],
            NavigationBarConfig: {
                UlDataItem: [
                    'VidaaU2MainTitleImg',"VidaaU2MainTitleArrowUp","VidaaU2MainTitleArrowLeft","VidaaU2MainTitleArrowRight","VidaaU2MainTitleText","VidaaU2MainTitleLockImg"
                ]
            }
        }
    ]
    VIDAAU2InitMainTitlePageData();
    return VidaaU2MainTitlePageData;
}
var VidaaU2MainTitlePageData = {
//    "VidaaU2MainTitleTime1":{"Data":""},
//    "VidaaU2MainTitleTime2":{"Data":""},
//    "VidaaU2MainTitleDate1":{"Data":""},
//    "VidaaU2MainTitleDate2":{"Data":""},
//    "VidaaU2MainTitleCity":{"Data":""},
//    "VidaaU2MainTitletemperature":{"Data":""},
//    "VidaaU2MainTitleweatherState":{"Data":""},
//    "VidaaU2MainTitleWeatherIcon":{"Data":""},
//    "VidaaU2MainTitleWeatherIcon2":{"Data":""},
//    "VidaaU2MainTitleNetworkState":{"Data":""},
//    "VidaaU2MainTitleNetworkIcon":{"Data":""},
    "VidaaU2MainTitleList":{
        "Data":[
            {
                "VidaaU2MainTitleImg":{"Data":""},
                "VidaaU2MainTitleArrowUp":{"Data":VIDAAU2LauncherBaseDir+"img/title/remove.png"},
                "VidaaU2MainTitleArrowLeft":{"Data":VIDAAU2LauncherBaseDir+"img/title/arrow_left.png"},
                "VidaaU2MainTitleArrowRight":{"Data":VIDAAU2LauncherBaseDir+"img/title/arrow_right.png"},
                "VidaaU2MainTitleText":{"Data":""},
                "VidaaU2MainTitleLockImg":{"Data":""}
            }
        ],
        "SelectedIndex":0,
        "DataSelectedIndex":0
    },
    "operateData": {
        currState:0,//0:normal,1:edit,2:change
        moveState:0,//  0 :moveToLeft 1: moveToRight
        currTime1:"13:00",
        currTime2:"13:00",
        currDate:"13:00",
        currWeek:"13:00",
        currweatherData:"",
        mainTitleData:[],
        inputsData:""
    },
    "langData": {
        "Media":["Media"],
        "All":['All'],
        "Video":["Video"],
        "Music":["Music"],
        "Picture":["Picture"]
    },
    rewrite: "VIDAALiteU2MainTitleRewrite"
}

var rememberLaunchArray = [];

function VIDAAU2InitMainTitlePageData(mainData){
    try{
        var data = VidaaU2MainTitlePageData;
        if(!!mainData){
            data.operateData.mainTitleData = mainData;
        }else{
            data.operateData.mainTitleData = getLauncherData();
        }
        for(var i = 0; i < data.operateData.mainTitleData.length; i++){
            switch (data.operateData.mainTitleData[i].cmd){
                case LauncherCMD.NOTIFICATION:
                    data.operateData.mainTitleData[i].move = false;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.ALLAPP:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.ALLINPUTS:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.SETTINGS:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.LIVETV:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.HIMEDIA:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.EDIT:
                case LauncherCMD.RESET:
                    data.operateData.mainTitleData[i].move = false;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                case LauncherCMD.YOUTUBE_VIDEO:
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = false;
                    break;
                default :
                    data.operateData.mainTitleData[i].move = true;
                    data.operateData.mainTitleData[i].remove = true;
                    break;
            }
        }
//        var cTime = getSystemTime();
//        if(GLOBAL.TIME_FORMAT == 0){
//            var str1 = cTime.time.substring(0,5);
//            var str2 = cTime.time.substring(5,cTime.time.length);
//            data.operateData.currTime1 = str1;
//            data.operateData.currTime2 = str2;
//        }else{
//            data.operateData.currTime1 = cTime.time;
//            data.operateData.currTime2 = " ";
//        }
//        data.operateData.currDate = cTime.date;
//        data.operateData.currWeek = getCurrentWeek();

//        getCurrentWeatherData(refreshWeather);
//        showNetworkStatus();

    }catch (ex){
        debugE("VIDAAU2InitMainTitlePageData:"+ex.message);
    }
}

//function getCurrentWeek(){
//    var longTime = getSYSLongTime();
//    var utcdate = new Date(getLocalTimeByUTC(longTime) * milliBase);
//    return getCurrentContentLanguage(weekFull[utcdate.getUTCDay()]);
//}
function VIDAALiteU2MainTitleRewrite(data){
    try{
//        getcurrDate(data);
//        getCurrentWeatherData(refreshWeather);
//        showNetworkStatus();
        var hasNew = getNotificationDataNew();
//        data.VidaaU2MainTitleTime1.Data = data.operateData.currTime1;
//        data.VidaaU2MainTitleTime2.Data = data.operateData.currTime2;
//        data.VidaaU2MainTitleDate1.Data = data.operateData.currDate;
//        data.VidaaU2MainTitleDate2.Data = data.operateData.currWeek;

        var mainTitleData = data.operateData.mainTitleData;

        if(data.VidaaU2MainTitleList.Data.length > mainTitleData.length){
            data.VidaaU2MainTitleList.Data.splice( mainTitleData.length);
        }else if(data.VidaaU2MainTitleList.Data.length <  mainTitleData.length){
            while(data.VidaaU2MainTitleList.Data.length <  mainTitleData.length){
                var itemData = {
                    "VidaaU2MainTitleImg":{"Data":""},
                    "VidaaU2MainTitleArrowUp":{"Data":VIDAAU2LauncherBaseDir+"img/title/remove.png"},
                    "VidaaU2MainTitleArrowLeft":{"Data":VIDAAU2LauncherBaseDir+"img/title/arrow_left.png"},
                    "VidaaU2MainTitleArrowRight":{"Data":VIDAAU2LauncherBaseDir+"img/title/arrow_right.png"},
                    "VidaaU2MainTitleText":{"Data":""},
                    "VidaaU2MainTitleLockImg":{"Data":""}
                }
                data.VidaaU2MainTitleList.Data.push(itemData);
            }
        }
        if(data.operateData.currState == 0){
            data.VidaaU2MainTitleList.disableItem = [mainTitleData.length-1];
            mainTitleData[mainTitleData.length-2].Name = "Edit";
        }else{
            data.VidaaU2MainTitleList.disableItem = [];
            mainTitleData[mainTitleData.length-2].Name = "Done";
        }
        for(var i=0;i<mainTitleData.length;i++){
            if (mainTitleData[i].Icon.substring(1, 7) == "3rd_rw" || mainTitleData[i].Icon.substring(0, 6) == "../../") {
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleImg.Data= mainTitleData[i].Icon;
            }else if (mainTitleData[i].Icon.substring(0, 7) == "http://" || mainTitleData[i].Icon.substring(0, 8) == "https://" ||
                mainTitleData[i].Icon.substring(0, 7) == "file://") {
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleImg.Data= mainTitleData[i].Icon;
            }
            else {
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleImg.Data= VIDAAU2LauncherBaseDir + mainTitleData[i].Icon;
            }
            if(mainTitleData[i].cmd == LauncherCMD.APP || mainTitleData[i].cmd == LauncherCMD.BROWSER || mainTitleData[i].cmd == LauncherCMD.YOUTUBE_VIDEO){
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleText.Data = " ";
            }else{
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleText.Data = mainTitleData[i].Name;
            }

            if(mainTitleData[i].cmd == LauncherCMD.NOTIFICATION){
                if(hasNew){
                    mainTitleData[i].Icon = VIDAAU2LauncherBaseDir+"img/title/"+GLOBAL.LAUNCHER_THEME+"notification_new.png";

                }else{
                    mainTitleData[i].Icon = VIDAAU2LauncherBaseDir+"img/title/"+GLOBAL.LAUNCHER_THEME+"notification.png";
                }
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleImg.Data= mainTitleData[i].Icon;
            }

            if(mainTitleData[i].cmd == LauncherCMD.INPUT){
                var locked = false;
                for(var j=0;j<data.operateData.inputsData.length;j++){
                    if(data.operateData.inputsData[j].id == mainTitleData[i].id){
                        locked = data.operateData.inputsData[j].locked;
                        break;
                    }
                }
                if(locked){
                    data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleLockImg.Data= VIDAAU2LauncherBaseDir+"img/mask_luancher_input_children_lock.png";
                }else{
                    data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleLockImg.Data= VIDAAU2LauncherBaseDir+"img/blank.png";
                }
            }else{
                data.VidaaU2MainTitleList.Data[i].VidaaU2MainTitleLockImg.Data= VIDAAU2LauncherBaseDir+"img/blank.png";
            }

        }

    }catch (ex){
        debugPrint("VIDAALiteU2MainTitleRewrite:"+ex.message,DebugLevel.ERROR);
    }

}

function saveEditData(){
    var tileArray = getCurrTileArray();

    setRememberEditAppToNativeFile(tileArray);
}

function getCurrTileArray() {
    var tileArray = [];
    var tile = [];
    for (var i = 0; i < VidaaU2MainTitlePageData.operateData.mainTitleData.length; i++) {
        tile = VidaaU2MainTitlePageData.operateData.mainTitleData[i];
        var data;
        if (tile.cmd == LauncherCMD.INPUT) {
            data = {
                Name : tile.Name,
                Icon : tile.Icon,
                id : tile.id
            };
        } else if (tile.cmd == LauncherCMD.APP || tile.cmd == LauncherCMD.BROWSER || tile.cmd == LauncherCMD.YOUTUBE_VIDEO) {
            data = {
                Name : tile.Name,
                Icon : tile.Icon,
                url : tile.url,
                urlType : tile.urlType,
                storeType:0,
                data:{
                    txt:tile.Name,
                    url : tile.url,
                    appimg:tile.Icon
                }
            };
            if(tile.cmd == LauncherCMD.APP){
                data.storeType = tile.storeType;
            }
        }  else {
            data = {
                Icon : tile.Icon,
                Name : tile.Name
            };
        }
        data.cmd = tile.cmd;
        tileArray.push(data);
    }
    return tileArray;
}

function VidaaU2MainTitleEnterHandle(){
    var data = VidaaU2MainTitlePageData;
    switch (data.operateData.currState){
        case 0:
            switch (data.operateData.mainTitleData[this.SelectedIndex].cmd){
                case LauncherCMD.EDIT:
                {
                    VidaaU2MainTitleToEdit();
                    this.page.rewriteDataOnly();
                    VidaaU2ChangeFocusPosition(this.SelectedIndex);
                    changeMainTitleFocusImg(this.SelectedIndex);
                    break;
                }
                case LauncherCMD.ALLAPP:
                {
                    LogReportData.LauncherRunCloseReason=0;
                    VIDAAU2LauncherCreateFromAllAppsKey = false;
                    if(!!hiWebOsFrame.VIDAAU2AppPage){
                        hiWebOsFrame.myLauncher.close();
                        hiWebOsFrame.VIDAAU2AppPage.open();
                        hiWebOsFrame.VIDAAU2AppPage.hiFocus();
                    }else{
                        hiWebOsFrame.myLauncher.close();
                        hiWebOsFrame.createPage("VIDAAU2AppPage", null, null, null, function (a) {
                            hiWebOsFrame.VIDAAU2AppPage = a;
                            a.open();
                            a.hiFocus();
                        });
                    }
                    break;
                }
                case LauncherCMD.LIVETV:
                {
                    LogReportData.LauncherRunCloseReason=3;
                    this.page.close();
                    var SourceId =  tv ?model.source.getCurrentSource():0;
                    if(SourceId == 0){ // 0 :tv
                        openLiveTVModule();
                    }else{
                        tv && model.source.InputSet(0);
                        openLiveTVModule([Msg.WAIT_SOURCE_CHANGE, 1]);
                    }

                    break;
                }
                case LauncherCMD.HIMEDIA:
                {
                    var urlType = CmdURLType.START_BROWSER;
                    if(tv){
                        var url =  "file:///3rd_rw/UI/hisenseUI/mediaIndex.html?module=fileBrowser&type=0" + "&area=" + InitArea;
                    }
                    else {
                        var url = "mediaIndex.html?module=fileBrowser&type=0" + "&area=" + InitArea;
                    }
                    LogReportData.LauncherRunCloseReason=0;
                    sendCommndToTV(urlType,url);
                    break;
                }
                case LauncherCMD.ALLINPUTS:
                {
                    VIDAAU2LauncherCreateFromSourceKey = false;
                    LogReportData.LauncherRunCloseReason=3;
                    hiWebOsFrame.myLauncher.close();
                    hiWebOsFrame.createPage("VIDAAU2TvInput", null, null, null, function (a) {
                        hiWebOsFrame.VIDAAU2TvInput = a;
                        a.open();
                        a.hiFocus();
                    });
                    break;
                }
                case LauncherCMD.NOTIFICATION:
                {
                    LogReportData.LauncherRunCloseReason=0;
                    hiWebOsFrame.myLauncher.close();
                    hiWebOsFrame.createPage("notification", null, null, null, function (a) {
                        hiWebOsFrame.notification = a;
                        a.open();
                        a.hiFocus();

                    });
                    break;
                }
                case LauncherCMD.APP:
                {

                    var url = data.operateData.mainTitleData[this.SelectedIndex].url;
                    var urlType = data.operateData.mainTitleData[this.SelectedIndex].urlType;
                    LogReportData.LauncherRunCloseReason=2;
                    this.page.close();
                    sendCommndToTV(urlType,url,0,data.operateData.mainTitleData[this.SelectedIndex].storeType);
                    break;
                }
                case LauncherCMD.YOUTUBE_VIDEO:
                {

                    var url = data.operateData.mainTitleData[this.SelectedIndex].url;
                    this.page.close();
                    sendCommndToTV(37,url,0,StoreType.STORE);
                    break;
                }
                case LauncherCMD.BROWSER:
                {

                    var url = data.operateData.mainTitleData[this.SelectedIndex].url;
                    this.page.close();
                    sendCommndToTV(36,url,0,100);
                    break;
                }
                case LauncherCMD.SETTINGS:
                {
//                    hiWebOsFrame.createPage('setting_sys_qs_page', null, hiWebOsFrame.myLauncher, null, function (qspage) {//rmdr_edit_page
//                        hiWebOsFrame.settingsysqS = qspage;
//                        hiWebOsFrame.createPage('setting_fircls_page', null, null, null, function (a) {
//                            hiWebOsFrame.myLauncher.close();
//                            SettingFirInit();
//                            a.open();
//                            a.hiFocus();
//                            hiWebOsFrame.settingsFirst = a;
//                            hiWebOsFrame.settingsFirst.rewriteDataOnly();
//
//                        });
//                    });
                    if (settingInited) {
                        openMenuPage();
                    }
                    else {
                        settingInited = true;
                        createSettingPage(openMenuPage);
                    }
                    break;
                }
                case LauncherCMD.INPUT:
                {
                    var curSourceId = data.operateData.mainTitleData[this.SelectedIndex].id;
                    LogReportData.LauncherRunCloseReason=3;
                    if(curSourceId == 100){
                        hiWebOsFrame.myLauncher.close();
                        hiWebOsFrame.createPage('setting_pic_Mira_page', null, hiWebOsFrame.myLauncher, null, function (a) {
                            pauseDTV();
                            hiWebOsFrame.miracast = a;
                            hiWebOsFrame.miracast.origin = hiWebOsFrame.myLauncher;
                            if (!!tv) {
                                model.miracast.ActionStartApp();
                                model.miracast.onStatusChaged = onMiracastChanged;
                            }
                            a.open();
                            a.hiFocus();
                            try {
//                                logReport("GTAPPRun", "Anyview Cast", 1);
                            }
                            catch (ex) {
                                debugE(ex.message);
                            }

                        });
                    }else{
                        var SourceId =  tv ?model.source.getCurrentSource():0;
                        if(SourceId == curSourceId){
                            hiWebOsFrame.myLauncher.close();
                            hiWebOsFrame.blankPage.open();
                            hiWebOsFrame.blankPage.hiFocus();
                        }else{
                            hiWebOsFrame.myLauncher.close();
                            tv && model.source.InputSet(curSourceId);
                            openLiveTVModule([Msg.WAIT_SOURCE_CHANGE, 1]);
                        }
                    }
                    break;
                }
                default :
                    break;

            }
            break;
        case 1:
            switch (data.operateData.mainTitleData[this.SelectedIndex].cmd){
                case LauncherCMD.EDIT:
                {
                    VidaaU2MainTitleToNormal();
                    hiWebOsFrame["myLauncher"].hiFocus("VidaaU2MainTitleList");
                    this.page.rewriteDataOnly();
                    VidaaU2ChangeFocusPosition(this.SelectedIndex);
                    changeMainTitleFocusImg(this.SelectedIndex);
                    break;
                }
                case LauncherCMD.RESET:
                {
                    hiWebOsFrame.createPage("ViddaU2ResetLauncherEditId", null, this.Page, null, function (a) {
                        hiWebOsFrame. VidaaU2ResetLaucherEditDialog = a;
                        a.open();
                        a.hiFocus();
                    });
                    break;
                }
                default :
                    break;
            }
            break;
        case 2:
            switch (data.operateData.mainTitleData[this.SelectedIndex].cmd){
                case LauncherCMD.EDIT:
                {
                    VidaaU2MainTitleToNormal();
                    hiWebOsFrame["myLauncher"].hiFocus("VidaaU2MainTitleList");
                    this.page.rewriteDataOnly();
                    VidaaU2ChangeFocusPosition(this.SelectedIndex);
                    changeMainTitleFocusImg(this.SelectedIndex);
                    break;
                }
                case LauncherCMD.RESET:
                {
                    hiWebOsFrame.createPage("ViddaU2ResetLauncherEditId", null, this.Page, null, function (a) {
                        hiWebOsFrame. VidaaU2ResetLaucherEditDialog = a;
                        a.open();
                        a.hiFocus();
                    });
                    break;
                }
                default :
                    VidaaU2MainTitleHidenEditImg(this.SelectedIndex);
                    VidaaU2MainTitleToEdit();
                    break;
            }
            break;
        default :
            DBG_ERROR("VidaaU2MainTitleEnterHandle:"+data.operateData.currState);
            VidaaU2MainTitleToNormal();
            hiWebOsFrame["myLauncher"].hiFocus("VidaaU2MainTitleList");
    }

}

function VidaaU2MainTitleRefreshEditMsg(){
    var data = VidaaU2MainTitlePageData;
    switch (data.operateData.currState){
        case 0:
            $("#VidaaU2MainTitleEditMsg1").css("display", "none");
            $("#VidaaU2MainTitleEditMsg2").css("display", "none");
            break;
        case 1:
            $("#VidaaU2MainTitleEditMsg1").css("display", "block");
            $("#VidaaU2MainTitleEditMsg2").css("display", "none");
            $("#VidaaU2MainTitleEditMsg1").text(getCurrentContentLanguage("Press UP to change the location of a tile or remove it."));
            break;
        case 2:
            $("#VidaaU2MainTitleEditMsg1").css("display", "block");
            $("#VidaaU2MainTitleEditMsg1").text(getCurrentContentLanguage("Press LEFT or RIGHT to move the tile."));
            $("#VidaaU2MainTitleEditMsg2").css("display", "block");
            $("#VidaaU2MainTitleEditMsg2").text(getCurrentContentLanguage("Press DOWN to put the tile here."));
            break;
        default :
            $("#VidaaU2MainTitleEditMsg1").css("display", "none");
            $("#VidaaU2MainTitleEditMsg2").css("display", "none");
            break;
    }
}

function VidaaU2MainTitleBefUpHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 1){//edit
        if(data.operateData.mainTitleData[this.SelectedIndex].move
            || data.operateData.mainTitleData[this.SelectedIndex].remove){
            VidaaU2MainTitleToChange();
            rememberLaunchArray = getCurrTileArray();
            VidaaU2MainTitleShowEditImg(this.SelectedIndex);
        }
    }else if(data.operateData.currState == 2){
        if(data.operateData.mainTitleData[this.SelectedIndex].remove){
            try{
                if (data.operateData.mainTitleData[this.SelectedIndex].cmd == LauncherCMD.BROWSER) {
                    setLauncherDeleteBrowserAppByUser(data.operateData.mainTitleData[this.SelectedIndex].url);
                }
            }catch(e){
                DBG_ERROR("setLauncherDeleteBrowserAppByUser:"+ e.message);
            }
            try{
                var tempobj={
                    name:data.operateData.mainTitleData[this.SelectedIndex].Name,
                    type:3,
                    cmd:data.operateData.mainTitleData[this.SelectedIndex].cmd
                };
                var tileArray = getCurrTileArray();
                DBG_INFO("Log report TitleAction Delete:"+tempobj.name);
                var param=logReportADO(tempobj,tileArray,tempobj.name);
                LGReport.GTLauncherTitleAction(param.ActionType,param.ChangeSource,param.TitleType,param.AddOrRemoveTitleName,param.TitlesNum,param.Titles);
            }catch(ex){DBG_ERROR(ex.message)}

            data.operateData.mainTitleData.splice(this.SelectedIndex,1);
            this.page.rewrite();
            this.page.hiFocus();
            VidaaU2MainTitleToEdit();
            VidaaU2ChangeFocusPosition(this.SelectedIndex);

        }
    }
    return;
}
function VidaaU2GetCurrentSelectIndex(){
    return hiWebOsFrame.myLauncher.getCaE("VidaaU2MainTitleList").SelectedIndex;
}
function VidaaU2SetCurrentSelectIndex(index){
    hiWebOsFrame.myLauncher.getCaE("VidaaU2MainTitleList").setSelectedIndex(index);
}
function VidaaU2MainTitleAddItem(item,index){
    var data = VidaaU2MainTitlePageData;
    VidaaU2MainTitleToChange();
    item.remove = true;
    item.move = true;
    if(!!index &&(index < data.operateData.mainTitleData.length - 2)){
        data.operateData.mainTitleData.splice(index+1,0,item);
        var SelectedIndex = index+1;
    }else{
        data.operateData.mainTitleData.splice(data.operateData.mainTitleData.length - 2,0,item);
        var SelectedIndex = data.operateData.mainTitleData.length - 3;
    }
    hiWebOsFrame.myLauncher.rewrite();
    VidaaU2SetCurrentSelectIndex(SelectedIndex);
    VidaaU2MainTitleShowEditImg(SelectedIndex);
    VidaaU2ChangeFocusPosition(SelectedIndex);
    VidaaU2MainTitleRefreshEditMsg();
    try{
        var temparrary=getCurrTileArray();

        var tempobj={
            type:1,
            cmd:item.cmd
        };
        DBG_INFO("log report TitleAction add");
        var param=logReportADO(tempobj,temparrary,item.Name);
        LGReport.GTLauncherTitleAction(param.ActionType,param.ChangeSource,param.TitleType,param.AddOrRemoveTitleName,param.TitlesNum,param.Titles);
    }catch(ex){DBG_ERROR(ex.message)}
}
function VidaaU2MainTitleBefDownHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        VidaaU2MainTitleHidenEditImg(this.SelectedIndex);
        VidaaU2MainTitleToEdit();
        return;
    }
}
function VidaaU2MainTitleBefLeftHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        if(!data.operateData.mainTitleData[this.SelectedIndex].move ||
            (this.SelectedIndex > 0 && !data.operateData.mainTitleData[this.SelectedIndex - 1].move)
            ){
            return false;
        }
    }
    VidaaU2MainTitleHidenEditImg(this.SelectedIndex);
    data.operateData.moveState = 0;
}
function VidaaU2MainTitleBefRightHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        if(!data.operateData.mainTitleData[this.SelectedIndex].move ||
            (this.SelectedIndex > 0 && !data.operateData.mainTitleData[this.SelectedIndex + 1].move)
            ){
            return false;
        }
    }
    VidaaU2MainTitleHidenEditImg(this.SelectedIndex);
    data.operateData.moveState = 1;
}
function VidaaU2MainTitleAftLeftHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        VidaaU2ChangeOrder(this.SelectedIndex,this.SelectedIndex + 1);
        VidaaU2MainTitleShowEditImg(this.SelectedIndex);
    }
    VidaaU2ChangeFocusPosition(this.SelectedIndex);
}
function VidaaU2MainTitleAftRightHandle(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        VidaaU2ChangeOrder(this.SelectedIndex,this.SelectedIndex - 1);
        VidaaU2MainTitleShowEditImg(this.SelectedIndex);
    }
    VidaaU2ChangeFocusPosition(this.SelectedIndex);
}

function VidaaU2MainTitleShowEditImg(index){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 2){
        if(data.operateData.mainTitleData[index].remove){
            //can be remove
            $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowUp_sys"+index).css("visibility","visible");
        }
        if(data.operateData.mainTitleData[index].move && index > 0 &&
            data.operateData.mainTitleData[index - 1].move){
            //can move to left
            $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowLeft_sys"+index).css("visibility","visible");
        }
        if(data.operateData.mainTitleData[index].move && index < data.operateData.mainTitleData.length - 1 &&
            data.operateData.mainTitleData[index + 1].move){
            //can move to right
            $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowRight_sys"+index).css("visibility","visible");
        }
    }else{
        VidaaU2MainTitleHidenEditImg(index);
    }
}
function VidaaU2MainTitleHidenEditImg(index){
    $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowLeft_sys"+index).css("visibility","hidden");
    $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowRight_sys"+index).css("visibility","hidden");
    $("#VidaaU2MainTitleList_VidaaU2MainTitleArrowUp_sys"+index).css("visibility","hidden");
}
//function VidaaU2MainTitleHidenWeatherImg(index){
//    $("#"+index).css("visibility","hidden");
//
//}
function VidaaU2ChangeFocusPosition(index){
    var opData = VidaaU2MainTitlePageData.operateData;
    var width = 208;
    if(hiWebOsFrame.getCurrentBrand() == "his" || hiWebOsFrame.getCurrentBrand() == "bgh"){
        width = 208;
    }else{
        width = 220;
    }
    if(opData.currState == 0){
        var currPostion = (1-index) * width;
        $("#VidaaU2MainTitleList").css("left",currPostion+"px");
    }else{
        var currPostion = 536- index * (width+20);
        $("#VidaaU2MainTitleList").css("left",currPostion+"px");
    }
}
function VidaaU2ChangeOrder(originIdx,desIdx){
    var opData = VidaaU2MainTitlePageData.operateData;
    var tempData = opData.mainTitleData[originIdx];

    var originImgId = "VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+originIdx;
    var originNameId = "VidaaU2MainTitleList_VidaaU2MainTitleText_sys"+originIdx;
    var originLockedId = "VidaaU2MainTitleList_VidaaU2MainTitleLockImg_sys"+originIdx;
    var originImgSrc = $("#"+originImgId).attr("src");
    var originLockedImgSrc = $("#"+originLockedId).attr("src");
    var originName =  $("#"+originNameId).html();
    var desImgId = "VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+desIdx;
    var desLockedImgId = "VidaaU2MainTitleList_VidaaU2MainTitleLockImg_sys"+desIdx;
    var desNameId = "VidaaU2MainTitleList_VidaaU2MainTitleText_sys"+desIdx;
    var desImgSrc = $("#"+desImgId).attr("src");
    var desLockedImgSrc = $("#"+desLockedImgId).attr("src");
    var desName =  $("#"+desNameId).html();

    $("#"+originImgId).attr("src",desImgSrc);
    $("#"+originLockedId).attr("src",desLockedImgSrc);
    $("#"+originNameId).html(desName);

    $("#"+desImgId).attr("src",originImgSrc);
    $("#"+desLockedImgId).attr("src",originLockedImgSrc);
    $("#"+desNameId).html(originName);

    opData.mainTitleData[originIdx] = opData.mainTitleData[desIdx];
    opData.mainTitleData[desIdx] = tempData;


}
function VidaaU2MainTitleToNormal(){
    var data = VidaaU2MainTitlePageData;
    data.operateData.currState = 0;
    $("#VidaaU2MainTitleContent").attr("class","VidaaU2MainTitleContentNormal");
    VidaaU2MainTitleRefreshEditMsg();
    saveEditData();
    var index = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
    var length = VidaaU2MainTitlePageData.operateData.mainTitleData.length;
    DBG_INFO("index:"+index + "  length:"+length);
    if(index>=length-1){
        hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").setSelectedIndex(index-1);
        VidaaU2ChangeFocusPosition(index-1);
    }
    var forEach_break=null;
    var tempArray=getCurrTileArray();
    try{

        tempArray.forEach(function(v,index) {
            if(v.Name != rememberLaunchArray[index].Name){
                throw (forEach_break = new Error("StopIteration"));
            }
        })
    }catch(ex){
        if(ex==forEach_break){
            var tempobj={
                type:2
            };
            var crtIndex = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
            var param=logReportADO(tempobj,tempArray,data.operateData.mainTitleData[crtIndex].Name);
            LGReport.GTLauncherTitleAction(param.ActionType,param.ChangeSource,param.TitleType,param.AddOrRemoveTitleName,param.TitlesNum,param.Titles);
        }
    }
}
function VidaaU2MainTitleToEdit(){
    var data = VidaaU2MainTitlePageData;
    data.operateData.currState = 1;
    $("#VidaaU2MainTitleContent").attr("class","VidaaU2MainTitleContentEdit");
    VidaaU2MainTitleRefreshEditMsg();
}
function VidaaU2MainTitleToChange(){
    var data = VidaaU2MainTitlePageData;
    data.operateData.currState = 2;
    $("#VidaaU2MainTitleContent").attr("class","VidaaU2MainTitleContentChange");
    VidaaU2MainTitleRefreshEditMsg();
}

function changeMainTitleFocusImg(index){
    if(hiWebOsFrame.getCurrentBrand() == "bgh"){
        var data = VidaaU2MainTitlePageData;
        if(data.operateData.currState == 2 && data.operateData.moveState == 1){
            index = index-1;
        }else if(data.operateData.currState == 2 && data.operateData.moveState == 0){
            index = index+1;
        }
        var cmd = data.operateData.mainTitleData[index].cmd;
        if(cmd != LauncherCMD.APP && cmd != LauncherCMD.YOUTUBE_VIDEO && cmd != LauncherCMD.BROWSER){
            var desImgSrc = null;
            switch(cmd){
                case LauncherCMD.LIVETV:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/livetv_focus.png";
                    break;
                case LauncherCMD.NOTIFICATION:
                    var hasNew = getNotificationDataNew();
                    if(hasNew){
                        desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/notification_new_focus.png";
                    }else{
                        desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/notification_focus.png";
                    }

                    break;
                case LauncherCMD.HIMEDIA:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/himedia_focus.png";
                    break;
                case LauncherCMD.SETTINGS:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/settings_focus.png";
                    break;
                case LauncherCMD.ALLINPUTS:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/inputs_focus.png";
                    break;
                case LauncherCMD.ALLAPP:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/apps_focus.png";
                    break;
                case LauncherCMD.EDIT:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/edit_focus.png";
                    break;
                case LauncherCMD.RESET:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/reset_focus.png";
                    break;
                case LauncherCMD.INPUT:
                    var curSourceId = data.operateData.mainTitleData[index].id;
                    if(curSourceId == 100){
                        desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/Anyview_focus.png";
                    }else if(curSourceId == 0){
                        desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/tv_focus.png";
                    }else{
                        var imgSrc = $("#VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+index).attr("src");
                        var ImgDataList = imgSrc.split("/");
                        var tempImg = ImgDataList[ImgDataList.length -1];
                        var tmpArray = tempImg.split("_");
                        if(tmpArray.length==2){
                            desImgSrc = null;
                        }else{
                            tmpArray = tempImg.split(".");
                            desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/"+tmpArray[0]+"_focus.png";
                        }
                        DBG_INFO("imgSrc:"+desImgSrc);
                    }
                    break;

            }
            if(desImgSrc != null){
                $("#VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+index).attr("src",desImgSrc);
            }

        }
    }
}

function changeMainTitleNormalImg(index){
    if(hiWebOsFrame.getCurrentBrand() == "bgh"){
        var data = VidaaU2MainTitlePageData;
        var cmd = data.operateData.mainTitleData[index].cmd;
        if(cmd != LauncherCMD.APP && cmd != LauncherCMD.YOUTUBE_VIDEO && cmd != LauncherCMD.BROWSER){
            var desImgSrc = null;
            switch(cmd){
                case LauncherCMD.LIVETV:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/livetv.png";
                    break;
                case LauncherCMD.NOTIFICATION:
                    var hasNew = getNotificationDataNew();
                    if(hasNew){
                        desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/notification_new.png";
                    }else{
                        desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/notification.png";
                    }

                    break;
                case LauncherCMD.HIMEDIA:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/himedia.png";
                    break;
                case LauncherCMD.SETTINGS:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/settings.png";
                    break;
                case LauncherCMD.ALLINPUTS:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/inputs.png";
                    break;
                case LauncherCMD.ALLAPP:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/apps.png";
                    break;
                case LauncherCMD.EDIT:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/edit.png";
                    break;
                case LauncherCMD.RESET:
                    desImgSrc =  VIDAAU2LauncherBaseDir+"img/title/bgh/reset.png";
                    break;
                case LauncherCMD.INPUT:
                    var curSourceId = data.operateData.mainTitleData[index].id;
                    if(curSourceId == 100){
                        desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/Anyview_focus.png";
                    }else if(curSourceId == 0){
                        desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/tv_focus.png";
                    }else{
                        var imgSrc = $("#VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+index).attr("src");
                        var ImgDataList = imgSrc.split("/");
                        var tempImg = ImgDataList[ImgDataList.length -1];
                        var tmpArray = tempImg.split("_");
                        if(tmpArray.length==2){
                            desImgSrc = VIDAAU2LauncherBaseDir+"img/title/bgh/"+tmpArray[0]+".png";
                        }else{
                            desImgSrc = null;

                        }
                        DBG_INFO("imgSrc:"+desImgSrc);
                    }
                    break;

            }
            if(desImgSrc != null){
                $("#VidaaU2MainTitleList_VidaaU2MainTitleImg_sys"+index).attr("src",desImgSrc);
            }

        }
    }
}
function VidaaU2MainTitleUlFocus(){
    try{
        var data = VidaaU2MainTitlePageData;
//        data.operateData.RenameIndex  = this.SelectedIndex;
        var currId = $("#"+this.id+" li").eq(this.SelectedIndex).children()[4].id;
        var txt = $("#"+currId).html();
        var mar = $('#' + currId).children('marquee').is('marquee');
        var maxLength = 15;
        if(hiWebOsFrame.getCurrentBrand() == "his" || hiWebOsFrame.getCurrentBrand() == "bgh"){
            maxLength = 15;
        }else{
            maxLength = 18;
        }
        if(txt.length > maxLength){
            if(!mar){
                $("#"+currId).html('<marquee scrollAmount=10 scrollDelay=150 style="width:240px">'+txt +'</marquee>');
            }
        }
        changeMainTitleFocusImg(this.SelectedIndex);
    }catch(e){
        DBG_ERROR("VidaaLiteRecommendUlFocus:"+ e.message);
    }
}
function VidaaU2MainTitleUlOnBlur(){
    try{
        // del marquee
        var currId = $("#"+this.id+" li").eq(this.SelectedIndex).children()[4].id;
        var txt = $("#"+currId+" marquee").html();
        if(!!txt){
            $("#"+currId).html(txt);
        }
        changeMainTitleNormalImg(this.SelectedIndex);
    }catch(e){
        DBG_ERROR("VIDAAU2TvInputUlOnBlur:"+ e.message);
    }
}


function VIDAAU2MainTitleOnFocus(){

//    refreshLauncherTime();
//    getCurrentWeatherData(refreshWeather);
//    showNetworkStatus();
    if(!!hiWebOsFrame.VIDAAU2StatusPage){
        hiWebOsFrame.VIDAAU2StatusPage.open();
    }
//    hiWebOsFrame.myLauncher.rewriteDataOnly();
    var index = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
    changeMainTitleFocusImg(index);

}

//function refreshLauncherTime(){
//
//    clearInterval(VIDAALiteU2LauncherTimeInterval);
//    VIDAALiteU2LauncherTimeInterval = setInterval(function() {
//        var data = VidaaU2MainTitlePageData;
//        var cTime = getSystemTime();
//        DBG_ERROR("refreshLauncherTime time:"+objToString(cTime));
//        if(GLOBAL.TIME_FORMAT == 0){
//            var str1 = cTime.time.substring(0,5);
//            var str2 = cTime.time.substring(5,cTime.time.length);
//            data.operateData.currTime1 = str1;
//            data.operateData.currTime2 = str2;
//        }else{
//            data.operateData.currTime1 = cTime.time;
//            data.operateData.currTime2 = " ";
//        }
//        data.operateData.currDate = cTime.date;
//        data.operateData.currWeek = getCurrentWeek();
//
//        hiWebOsFrame.myLauncher.rewriteDataOnly();
//        var index = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
//        changeMainTitleFocusImg(index);
//
//    }, 60 * 1000);
//}
function VIDAAU2MainTitleOnOpen(){
    VidaaU2MainTitleRefreshEditMsg();
    UIObserver.subscribeMessage(UIObserver.MESSAGE_NAME.SOURCE_DETECT_CHANGED, mainTileSourceDetectChanged);
//    UIObserver.subscribeMessage(UIObserver.MESSAGE_NAME.NETWORK_CHANGED, launcherNetworkOnChange);
    var needUpdate = launcherDataNeedToUpdate();
    if(needUpdate == LauncherUpdate.SERVICE){
        hiWebOsFrame.startLoading();
        $("#VIDAAU2MainTitlePage").css("display", "none");
        $("#VIDAAU2TvInput").css("display", "none");
        $("#VIDAAU2AppPage").css("display", "none");
        $("#notification").css("display", "none");
//        hiWebOsFrame.startLoading();
        setTimeout(U2LauncherUpdateDataByDestroy, 20);

    }else{
        var data = VidaaU2MainTitlePageData;
        var mainTitleData = data.operateData.mainTitleData;
        var delData = getLauncherDeleteAppByUser();
        var needRewrite = false;
        var allAppDataUrls = [];
        for(var j=0;j<mainTitleData.length;j++){
            if(mainTitleData[j].cmd == LauncherCMD.ALLAPP){
                allAppDataUrls = mainTitleData[j].data.urls;
            }
        }
        for(var i=0;i<mainTitleData.length;i++){
            if(mainTitleData[i].cmd == LauncherCMD.APP){
                var idx = $.inArray(mainTitleData[i].url,delData);
                if (idx > -1) {
                    needRewrite = true;
                    mainTitleData.splice(i, 1);
                    i--;
                    continue;
                }
                idx = $.inArray(mainTitleData[i].url,allAppDataUrls);
                if(idx<0){
                    needRewrite = true;
                    mainTitleData.splice(i, 1);
                    i--;
                }
            }

        }
        VidaaU2MainTitlePageData.operateData.inputsData = initAllInputsData().sourceList;
//        var cTime = getSystemTime();
//
//        DBG_ERROR("VIDAAU2MainTitleOnOpen time:"+objToString(cTime));
//        if(GLOBAL.TIME_FORMAT == 0){
//            var str1 = cTime.time.substring(0,5);
//            var str2 = cTime.time.substring(5,cTime.time.length);
//            data.operateData.currTime1 = str1;
//            data.operateData.currTime2 = str2;
//        }else{
//            data.operateData.currTime1 = cTime.time;
//            data.operateData.currTime2 = " ";
//        }
//        data.operateData.currDate = cTime.date;
//        data.operateData.currWeek = getCurrentWeek();
        for(var i=0;i<mainTitleData.length;i++){
            if(mainTitleData[i].cmd == LauncherCMD.INPUT){
                var curSourceId = data.operateData.mainTitleData[i].id;

                if(curSourceId != 100){
                    for(var j = 0;j<VidaaU2MainTitlePageData.operateData.inputsData.length;j++){
                        if(VidaaU2MainTitlePageData.operateData.inputsData[j].id == curSourceId){
//                            mainTitleData[i].Name = getInputRenameByID(curSourceId);
                            mainTitleData[i].Name = VidaaU2MainTitlePageData.operateData.inputsData[j].rename;
                            break;
                        }
                    }

                }
            }
        }
        if(needRewrite){
            hiWebOsFrame.myLauncher.rewrite();
            VidaaU2MainTitleRefreshEditMsg();
        }else{
            hiWebOsFrame.myLauncher.rewriteDataOnly();
        }
        VidaaU2MainTitlePageData.operateData.currState = 0;
        $("#VidaaU2MainTitleContent").attr("class","VidaaU2MainTitleContentNormal");
        try{
            DBG_INFO("logreport launcherRun begin");
            LGReport.GTLauncherRunStart();
        }catch(ex){DBG_ERROR(ex.message)}
    }

}
function VIDAAU2MainTitleOnCreate(){


}
function U2LauncherUpdateDataByDestroy(){
    U2DestroyLauncherPages();
    try{
        if(!!hiWebOsFrame.VIDAAU2StatusPage){
            hiWebOsFrame.VIDAAU2StatusPage.destroy();
        }
        hiWebOsFrame.createPage("VIDAAU2StatusPage", null, null, null, function(a) {
            hiWebOsFrame.VIDAAU2StatusPage = a;
            a.open();
            hiWebOsFrame.createPage("VIDAAU2MainTitlePage", null, null, null, function(page) {
                hiWebOsFrame.myLauncher = page;
                hiWebOsFrame.myLauncher.origin = null;
                page.open();
                hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").setSelectedIndex(0);
                page.hiFocus();
                VidaaU2ChangeFocusPosition(0);
                hiWebOsFrame.endLoading();
            });
        });

    }catch (ex){
        debugE(ex.message);
    }
}
function U2DestroyLauncherPages() {

    var sdkPages = hiWebOsFrame.getSDKPages(),
        pageIds = [];

    sdkPages.forEach(function(v) {
        if('launcher' == v.module && 'launcher_stabar' != v.id && 'myLauncher' != v.id
            && 'launcher_recentwatch' != v.id && 'launcher_favoritelist' != v.id && 'VIDAAU2StatusPage' != v.id) {
            pageIds.push(v.id);
        }
    });

    pageIds.forEach(function(v) {
        if(v != 'VIDAAU2TvInput') {
            debugE('Destroy page id:' + v);
            hiWebOsFrame.getPageByIdFromSdkPages(v).destroy();
        }
    });
}
function VIDAAU2MainTitleOnDestroy(){
    hiWebOsFrame.myLauncher = null;

}

//var cities,defCityList;
//var pageInd = 0;
//var citylistPathForStaBar ='weather/cities';
//function getCurrentWeatherData(refreshWeather) {
//    try{
//        hisenseUIConfig = readFileFromNative("hisenseUI/config.ini", 1);
//    }catch(ex){debugE(ex.message)}
//    debugE("get weather data for launcher state bar");
//    VidaaU2MainTitlePageData.operateData.currweatherData = {};
//    try {
//        var isDefaultData = false;
//        try{
//            cities = readFileFromNative("weather/cities", 1);
//        }catch(ex){
//            debugE(ex.message);
//            cities=null;
//        }
//        debugE('cities:'+objToString(cities));
//        try {
//            debugE("hisenseUIConfig[DefaultCity]:"+hisenseUIConfig["DefaultCity"]);
//        } catch (ex) {
//            debugE(ex.message);
//            debugE("null == hisenseUIConfig:"+(null == hisenseUIConfig));
//        }
//        if(null == hisenseUIConfig || !hisenseUIConfig["DefaultCity"]){//user have not enter accuweather app so far
//            var defCityKey = tv ? model.basicSetting.getTvsetLocation() + "City" : "CHNCity";
//            debugE("use default city [" + defCityKey + "]");
//            defCityList = tv ? readFileFromNative("launcher/data/weather/cities",2):["CHNCity"];//3rd_rw/
//            debugE("init defCityList"+objToString(defCityList[defCityKey]));
//            var lancherAlreadCityflag=false;//�û��Ƿ���ѡ���ù�Ҷ�Ӧ�ĳ���
//            if(null == cities){//open launcher firstly
//                if(!!defCityList[defCityKey]){
//                    cities = defCityList[defCityKey];
//                    pageInd = 0;
//                    cities.cityList[pageInd].unit="Metric";
//                }else{
//                    debugE("can not find this default city[" + defCityKey + "]", DebugLevel.ERROR);
//                    cities = $.extend({}, defCityList["CHNCity"]);
//                }
//                isDefaultData = true;
//            }else{//null != cities : user have open launcher already, but user have not open accuweather app
//                debugE("cityList:"+objToString(cities.cityList));
//                try {
//                    for(var i=0;i<cities.cityList.length;i++){
//                        debugE("cities.cityList[i].locId:"+cities.cityList[i].locId);
//                        debugE("AccuWeatherData.defCityList[defCityKey].cityList.locId:"+defCityList[defCityKey].cityList[0].locId);
//                        if(cities.cityList[i].locId==defCityList[defCityKey].cityList[0].locId){
//                            lancherAlreadCityflag=true;//�û��Ѿ��򿪹�ù��
//                            cities.defInd=i;
//                            isDefaultData=false;
//                            break;
//                        }
//                    }
//                } catch (ex) {
//                    debugE(ex.message);
//                }
//                debugE("lancherAlreadCityflag:"+lancherAlreadCityflag);
//                if(!lancherAlreadCityflag){//�û�δ�򿪹�ù��
//                    debugE("cities.cityList.length:"+cities.cityList.length);
//                    debugE("pageInd:"+pageInd);
//                    pageInd=cities.cityList.length;
//                    cities.defInd=pageInd;
//                    debugE("cities.defInd:"+cities.defInd);
//                    defCityList[defCityKey].cityList[0].unit="Metric";
//                    var citiesTmp = defCityList[defCityKey].cityList[0];
//                    cities.cityList.push(citiesTmp);
////                    debugE("pageInd:"+pageInd);
////                    cities.cityList[pageInd].unit="Metric";
//                    isDefaultData=true;
//                }
//            }
//        }else{
//            if(null == cities || cities.cityList.length == 0) {//usr delete all cities.
//                debugE("weather: cities is null");
//                VidaaU2MainTitlePageData.operateData.currweatherData="noLocation";
//                refreshWeather(VidaaU2MainTitlePageData.operateData.currweatherData);
//                return;
//            }else{//userCities is not null
//                isDefaultData=false;
//            }
//        }
//        debugE('cities:'+objToString(cities));
//        var defInd = cities.defInd;
//        debugE("defInd:"+defInd);
//        var locId = cities.cityList[defInd].locId;
//        var unit = cities.cityList[defInd].unit;
//        VidaaU2MainTitlePageData.operateData.currweatherData.name = cities.cityList[defInd].locName;
//        var cityPath = {
//            current: (isDefaultData ? "launcher/data/weather/current/" : "weather/current/") + locId,
//            forecast: (isDefaultData ? "launcher/data/weather/forecast/" : "weather/forecast/") + locId
//        };
//
//        var newCityPath = {
//            current: ("weather/current/") + locId,
//            forecast: ("weather/forecast/") + locId
//        };
//        debugE("isDefaultData:"+isDefaultData);
//        if(isDefaultData){
//            var tempCurrent = readFileFromNative(cityPath.current,2);
//            var tempForecast = readFileFromNative(cityPath.forecast,2);
//            if(null == tempCurrent) {
//                debugE("can not find this default city[" + defCityKey + "]", DebugLevel.ERROR);
//                return;
//            }
//            writeFileToNative("weather/current/" + locId, objToString(tempCurrent),1);
//            writeFileToNative("weather/forecast/" + locId, objToString(tempForecast),1);
//            writeFileToNative(citylistPathForStaBar, objToString(cities),1);
//        }
//        var cityPathForStaBar=isDefaultData?cityPath:newCityPath;
//        try {
//            getWeatherData(refreshWeather,unit,isDefaultData,cityPathForStaBar,VidaaU2MainTitlePageData.operateData.currweatherData,cities);
//        } catch (ex) {
//            debugE(ex.message);
//        }
//        try {
//            updateWeatherData(locId, unit,getWeatherData.bind(this,refreshWeather,unit,false,newCityPath,VidaaU2MainTitlePageData.operateData.currweatherData,cities));
//        } catch (ex) {
//            debugE(ex.message);
//        }
//    }
//    catch(ex) {
//        debugE(ex.message, DebugLevel.ERROR);
//        VidaaU2MainTitlePageData.operateData.currweatherData="noLocation";
//        refreshWeather(VidaaU2MainTitlePageData.operateData.currweatherData);
//    }
//}
//function getCurrentWeatherData(refreshWeather) {
//    try{
//        hisenseUIConfig = readFileFromNative("hisenseUI/config.ini", 1);
//    }catch(ex){debugE(ex.message)}
//    debugE("get weather data for launcher state bar");
//    VidaaU2MainTitlePageData.operateData.currweatherData = {};
//    try {
//        var isDefaultData = false;
//        try{
//            cities = readFileFromNative("weather/cities", 1);
//        }catch(ex){
//            debugE(ex.message);
//            cities=null;
//        }
//        debugE('cities:'+objToString(cities));
//
//        if(null == cities && (null == hisenseUIConfig || !hisenseUIConfig["DefaultCity"])) {
//            debugE(ex.message, DebugLevel.ERROR);
//            VidaaU2MainTitlePageData.operateData.currweatherData="noLocation";
//            refreshWeather(VidaaU2MainTitlePageData.operateData.currweatherData);
//            return;
//        }
//        else if(null == cities || cities.cityList.length == 0) {
//            VidaaU2MainTitlePageData.operateData.currweatherData="noLocation";
//            refreshWeather(VidaaU2MainTitlePageData.operateData.currweatherData);
//            return;
//        }
//        DBG_INFO('cities:'+objToString(cities));
//        var defInd = cities.defInd;
//        var locId = cities.cityList[defInd].locId;
//        var unit = cities.cityList[defInd].unit;
//        VidaaU2MainTitlePageData.operateData.currweatherData.name = cities.cityList[defInd].locName;
//        var cityPath = {
//            current: (isDefaultData ? "UI/data/weather/current/" : "weather/current/") + locId,
//            forecast: (isDefaultData ? "UI/data/weather/forecast/" : "weather/forecast/") + locId
//        };
//
//        var newCityPath = {
//            current: ("weather/current/") + locId,
//            forecast: ("weather/forecast/") + locId
//        };
//        getWeatherData(refreshWeather,unit,isDefaultData,cityPath,VidaaU2MainTitlePageData.operateData.currweatherData,cities);
//
//        updateWeatherData(locId, unit,getWeatherData.bind(this,refreshWeather,unit,false,newCityPath,VidaaU2MainTitlePageData.operateData.currweatherData,cities));
//
//    }
//    catch(ex) {
//        debugE(ex.message, DebugLevel.ERROR);
//        VidaaU2MainTitlePageData.operateData.currweatherData="noLocation";
//        refreshWeather(VidaaU2MainTitlePageData.operateData.currweatherData);
//    }
//}
//function getWeatherData(callBack,unit,isDefaultData,cityPath,WeatherData,cities){
//    /* Update WeatherData Object for refreshing statusBar */
//    try{
//        var cw = readFileFromNative(cityPath.current, isDefaultData ? 2:1);
//        var fw = readFileFromNative(cityPath.forecast, isDefaultData ? 2:1);
//
//    }catch (ex){debugE(ex.message)}
//
//    if(null == cw || null == fw) {
//        cities.cityList.splice(defInd, 1);
//        cities.defInd = 0;
//        debugE("read current weather failed. remove index", DebugLevel.ERROR);
//        return;
//    }
//    var units = {
//        Metric: '°C',
//        Imperial: '°F'
//    };
//    WeatherData.degree = cw[0].Temperature[unit].Value + units[unit];
//    WeatherData.weather = cw[0].WeatherText;
//    WeatherData.icon =  ('0' + cw[0].WeatherIcon).slice(-2);
//    debugE(objToString(WeatherData));
//    if(callBack) callBack(WeatherData);//ˢ��Launcherҳ�� Current Weather���
//}
//
//function updateWeatherData(locId, itemUnit,callBack){
//    /*Upload data to temp*/
//    var m_interval = 2000;
//    var max_times = 2;
//    if(!networkConnected()){
//        debugE("network is not ok");
//        return;
//    }
//    var newWeatherWorkRoot =1;
//    var currentPath = setTempPath(locId, URLType.CURRENT),
//        forecastPath = setTempPath(locId, URLType.FORECAST);
//
//    var currentURL = setUrlSta(locId, URLType.CURRENT, itemUnit),
//        forecastURL = setUrlSta(locId, URLType.FORECAST, itemUnit);
//
//
//    if(downloadFileToNative(currentURL, currentPath, newWeatherWorkRoot, 10)) {
//        checkDownloadState(currentPath, newWeatherWorkRoot, updateWeatherDataCallback.bind(this,callBack), currentPath, m_interval, max_times);
//    }
//
//    if(downloadFileToNative(forecastURL, forecastPath, newWeatherWorkRoot, 10)) {
//        checkDownloadState(forecastPath, newWeatherWorkRoot, updateWeatherDataCallback.bind(this,callBack), forecastPath, m_interval, max_times);
//    }
//
//}
//
//function updateWeatherDataCallback(callBack,obj, identify){
//    /*Move data to dest*/
//    var newWeatherWorkRoot =1;
//    var callbackID=identify;
//    if(null == obj || "string" == typeof(obj)) {
//        debugE('get new weather failed');
//        if("string" == typeof(obj)) {
//            deleteNativeFile(identify, newWeatherWorkRoot);
//        }
//        return;
//    }
//    var destPath = '', locId = '';
//    debugE('updateWeatherDataCallback identify = ' + identify);
//    if(identify.indexOf('current') > -1) {
//        locId = identify.split('current')[1];
//        destPath = setPath(locId, URLType.CURRENT);
//    }
//    else if(identify.indexOf('forecast') > -1) {
//        locId = identify.split('forecast')[1];
//        destPath = setPath(locId, URLType.FORECAST);
//    }
//    if('' != destPath) {
//        moveNativeFile(destPath, identify, 1, newWeatherWorkRoot);
//    }
//    debugE('callback:'+callBack);
//    if(callbackID.indexOf('forecast') > -1){
//        callBack.call(this);//����ˢ�����
//    }
//}
//
//function URLType() {
//}
//URLType.CURRENT = 0;
//URLType.FORECAST = 1;
//URLType.SEARCH = 2;
//
//function setTempPath(key, urlType) {
//    var path = '';
//    switch(urlType) {
//        case URLType.CURRENT:
//            path += ('current' + key);
//            break;
//        case URLType.FORECAST:
//            path += ('forecast' + key);
//            break;
//        default :
//            debugE('url type error', DebugLevel.ERROR);
//            path += 'error';
//            break;
//    }
//    return path;
//}
//function setPath(key, urlType) {
//    var path = 'weather/';
//    switch(urlType) {
//        case URLType.CURRENT:
//            path += ('current/' + key);
//            break;
//        case URLType.FORECAST:
//            path += ('forecast/' + key);
//            break;
//        case URLType.SEARCH:
//            path += 'searchlist';
//            break;
//        default :
//            debugE('url type error', DebugLevel.ERROR);
//            path += 'error';
//            break;
//    }
//    return path;
//}
//function setUrlSta(key, urlType, itemUnit) {
//    var url = '';
//    var langMap = {
//        eng: "en", fre: "fr", spa: "es", ger: "de", ita: "it", por: "pt",
//        nor: "no", swe: "sv", dan: "da", fin: "fi", chi: "zh", cze: "cs",
//        slk: "sk", pol: "pl", hun: "hu", bgr: "bg", tur: "tr", uzb: "ur",
//        ara: "ar", rus: "ru", tha: "th", per: "fa", hin: "hi", heb: "he",
//        ukr: "uk", vie: "vi", bur: "en", ind: "id", mal: "ms", bul: "bg"
//    };
//    var langcode = !!GLOBAL.CURRENT_LANGUAGE ? langMap[GLOBAL.CURRENT_LANGUAGE] : "en";
//    var apiKey = '5f7afc280da94a37a8a4cef4930c48d8';
//    var params = '?language=' + langcode+ '&apikey=' + apiKey + '&metric=' + (itemUnit == 'Metric');
//    switch(urlType) {
//        case URLType.CURRENT:
//            url = 'http://api.accuweather.com/currentconditions/v1/' + key + '.json' + params + '&details=true';
//            break;
//        case URLType.FORECAST:
//            url = 'http://api.accuweather.com/forecasts/v1/daily/5day/' + key + params;
//            break;
//        case URLType.SEARCH:
//            url = 'http://api.accuweather.com/locations/v1/search' + params + "&q=" + key;
//            break;
//        default :
//            debugE('url type error', DebugLevel.ERROR);
//            break;
//    }
//    //debugE(url, DebugLevel.INFO);
//    return encodeURI(url);
//}
//function networkConnected() {
//    try {
//        var cnnct = tv ? model.network.getEnumNetworkAvailable() : 1;
//        return (1 == cnnct);
//    }
//    catch (ex) {
//        debugE(ex.message, DebugLevel.ERROR);
//        return false;
//    }
//}
//
//function refreshWeather(weatherData) {
//    debugE("launcher.weatherData: "+ objToString(weatherData));
//    if (weatherData == "noLocation") {
//        debugE("launcher.weatherData == noLocation");
//        VidaaU2MainTitleHidenWeatherImg("VidaaU2MainTitleWeatherIcon");
//        VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/blank.png";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon2.Data = VIDAAU2LauncherBaseDir + "img/weather/ic_statusbar_accweather.png";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleCity.Data = "";
//        VidaaU2MainTitlePageData.VidaaU2MainTitletemperature.Data = "";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleweatherState.Data = "";
//    } else {
//        debugE("!! launcher.weatherData");
//        VidaaU2MainTitleHidenWeatherImg("VidaaU2MainTitleWeatherIcon2");
//        VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/blank.png";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon2.Data = VIDAAU2LauncherBaseDir + "img/weather/ic_statusbar_accweather.png";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleCity.Data = "";
//        VidaaU2MainTitlePageData.VidaaU2MainTitletemperature.Data = "";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleweatherState.Data = "";
//        if (weatherData.name == null || weatherData.name == undefined) {
//            debugE( "launcher.weatherData.name is error " );
//            VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/weather/weather_unknown.png";
//        } else {
//            debugE( "launcher.weatherData.name: "+ weatherData.name );
//            VidaaU2MainTitlePageData.VidaaU2MainTitleWeatherIcon.Data = VIDAAU2LauncherBaseDir + "img/weather/" + weatherData.icon + ".png";
//            VidaaU2MainTitlePageData.VidaaU2MainTitletemperature.Data = weatherData.degree;
//            VidaaU2MainTitlePageData.VidaaU2MainTitleCity.Data = weatherData.name;
//            VidaaU2MainTitlePageData.VidaaU2MainTitleweatherState.Data = weatherData.weather;
//        }
//
//       // var textX = temperature.localToLocal(temperature.children[0].x, 0, statusBar).x;
//        //weatherIcon.x = textX - temperature.children[0].getMeasuredWidth() - weatherIcon.regX - 5;
//    }
//}
//function launcherNetworkOnChange(){
//    showNetworkStatus();
//    hiWebOsFrame.myLauncher.rewriteDataOnly();
//    var index = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
//    changeMainTitleFocusImg(index);
//}
//function showNetworkStatus(){
//    var NetStatus = tv ? model.network.getEnumNetworkAvailable() : 1; //1 success  0 fail
//    var networkOpenSwitch = tv?model.network.getEnumNetworkConfig():1;
//    var networkType = tv?model.network.getEnumNetworking():1;
//    debugE("NetStatus:"+NetStatus + " networkOpenSwitch: " + networkOpenSwitch + "networkType:" + networkType);
//    if(networkOpenSwitch == 0){
//        networkType = NetWorkType.OFF;
//    }
//    if(networkType == NetWorkType.ETHER){
//        if(NetStatus == NetWorkConnect.CONNECT){
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data = "Ethernet";
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data = VIDAAU2LauncherBaseDir + "img/network/ic_stat_ethernet.png";
//        }else{
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data = "";
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data = VIDAAU2LauncherBaseDir + "img/network/ic_stat_offline.png";
//        }
//    }else if(networkType == NetWorkType.WIRELESS){
//        if(NetStatus == NetWorkConnect.CONNECT){
//            var wifiName = tv?model.network.getSsid():"wifiname";
//            var wifiSignal = tv? model.network.getLink_quality():100;
//            var level = getWifiSignalLevel(wifiSignal);
//            var img = VIDAAU2LauncherBaseDir + "img/network/ic_stat_wifi_signal_"+level+".png";
//            debugE("immg:"+img);
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data = wifiName;
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data = img
//        }else{
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data = "";
//            VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data =  VIDAAU2LauncherBaseDir + "img/network/ic_stat_wifi_not_connected.png";
//
//        }
//    }else{
//        VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data = "";
//        VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data =  VIDAAU2LauncherBaseDir + "img/network/ic_stat_offline.png";
//    }
//    debugE("immg:"+VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkState.Data+VidaaU2MainTitlePageData.VidaaU2MainTitleNetworkIcon.Data);
//}
//
//function getWifiSignalLevel(signal){
//    var level = 1;
//    if(signal <= 33){
//        level = 'low';
//    }else if(signal > 33 && signal <= 66){
//        level = 'medium';
//        //}else if(signal > 66 && signal <= 100){
//        //    level = 3;
//    }else{
//        level = 'high';
//    }
//    return level;
//}


function getResetData(){
    launcherResetTitlesConfig();
    var data = VidaaU2MainTitlePageData;
    try{
        for(var i = 0; i < data.operateData.mainTitleData.length; i++){
            if (data.operateData.mainTitleData[i].cmd == LauncherCMD.BROWSER) {
                setLauncherDeleteBrowserAppByUser(data.operateData.mainTitleData[i].url);
            }
        }
    }catch(e){
        DBG_ERROR("setLauncherDeleteBrowserAppByUser:"+ e.message);
    }
    data.operateData.mainTitleData = getLauncherData();
    for(var i = 0; i < data.operateData.mainTitleData.length; i++){
        switch (data.operateData.mainTitleData[i].cmd){
            case LauncherCMD.NOTIFICATION:
                data.operateData.mainTitleData[i].move = false;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.ALLAPP:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.ALLINPUTS:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.SETTINGS:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.LIVETV:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.HIMEDIA:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.EDIT:
            case LauncherCMD.RESET:
                data.operateData.mainTitleData[i].move = false;
                data.operateData.mainTitleData[i].remove = false;
                break;
            case LauncherCMD.YOUTUBE_VIDEO:
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = false;
                break;
            default :
                data.operateData.mainTitleData[i].move = true;
                data.operateData.mainTitleData[i].remove = true;
                break;
        }

    }
    debugE(data.operateData.mainTitleData);
}

function VIDAAU2MainTitleEscHandler(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState == 0){
        LogReportData.LauncherRunCloseReason=1;
        hiWebOsFrame.myLauncher.close();
        hiWebOsFrame.blankPage.open();
        hiWebOsFrame.blankPage.hiFocus();
    }else if(data.operateData.currState == 1){
        VidaaU2MainTitleToNormal();
        hiWebOsFrame["myLauncher"].hiFocus("VidaaU2MainTitleList");
        hiWebOsFrame.myLauncher.rewriteDataOnly();

    }else if(data.operateData.currState == 2){
        VidaaU2MainTitleHidenEditImg(VidaaU2GetCurrentSelectIndex());
        VidaaU2MainTitleToEdit();
    }
}
function mainTileSourceDetectChanged(){
    hiWebOsFrame.myLauncher.rewriteDataOnly();
}

function VIDAAU2MainTitleOnClose(){
    var data = VidaaU2MainTitlePageData;
    if(data.operateData.currState != 0){
        VidaaU2MainTitleToNormal();
        hiWebOsFrame.myLauncher.rewriteDataOnly();
    }
    try{
        if(!!hiWebOsFrame.myLauncher){
            var index = hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").SelectedIndex;
            DBG_INFO("VIDAAU2MainTitleOnClose:"+index);
            VidaaU2MainTitleHidenEditImg(index);
        }
        UIObserver.unsubscribeMessage(UIObserver.MESSAGE_NAME.SOURCE_DETECT_CHANGED, mainTileSourceDetectChanged);
//        UIObserver.unsubscribeMessage(UIObserver.MESSAGE_NAME.NETWORK_CHANGED, launcherNetworkOnChange);
    }catch(e){

    }
    if(!!hiWebOsFrame.VIDAAU2AppPage){
        hiWebOsFrame.VIDAAU2AppPage.close();
    }
    if(!!hiWebOsFrame.VIDAAU2TvInput){
        hiWebOsFrame.VIDAAU2TvInput.close();
        hiWebOsFrame.VIDAAU2TvInput.destroy();
    }
    if(!!hiWebOsFrame.notification){
        hiWebOsFrame.notification.destroy();
    }
    if(!!hiWebOsFrame.pictureResource){
        hiWebOsFrame.pictureResource.destroy();
    }
    
//    clearInterval(VIDAALiteU2LauncherTimeInterval);

    if(!!hiWebOsFrame.VIDAAU2StatusPage){
        hiWebOsFrame.VIDAAU2StatusPage.close();
    }
    try{
        DBG_INFO("logreport launcherRun close");
        LGReport.GTLauncherRunClose(LogReportData.LauncherRunCloseReason);
        LogReportData.LauncherRunCloseReason=2;
    }catch(ex){DBG_ERROR(ex.message)}
}

function logReportTitleType(cmd){
    var TitleType=null;
    switch (cmd){
        case LauncherCMD.INPUT:
            return TitleType=1;
        case LauncherCMD.APP:
            return TitleType=2;
        default :
            return TitleType=3;
    }
}

function logReportADO(datatypeobj,tileArrary,name){
    try{
        var param={};
        param.ActionType=datatypeobj.type;
        //var Arrlen=tileArrary.length;
        switch (datatypeobj.type)
        {
            case 3:
                param.TitleType=logReportTitleType(datatypeobj.cmd);
                break;
            case 2:
                param.TitleType='';
                break;
            case 1:
                param.TitleType=logReportTitleType(datatypeobj.cmd);
                break;
            default :
                break;

        }
        param.ChangeSource=2;
        var TileLength=tileArrary.length;
        param.Titles=param.AddOrRemoveTitleName=name;
        param.TitlesNum=TileLength;
        if(param.ActionType==2){
            param.Titles = param.AddOrRemoveTitleName='';
        }
    }catch(ex){DBG_ERROR("logReportADO"+ex.message)}
    return param;
}