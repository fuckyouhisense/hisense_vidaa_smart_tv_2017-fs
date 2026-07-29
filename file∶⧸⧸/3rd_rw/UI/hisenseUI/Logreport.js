/**
 * Created by shixin6 on 2016-11-15.
 */
function LogReportModule(){
    var curTime = "", curCountry = "", curZone = "", curBrand = "",
        macAddress = "", deviceID = "", remoteType = "", platform = "", DeviceMsg = "";
    var VerticalLine="|";
    var self=this;
    var logType={
        GTAPPRun:200101,
        GTRemoteControl:200120,
        GTRCNetFlix:200141,
        GTLauncherRun:200147,
        GTLTitleAction:200148,
        GTLPanel:200149,
        GTLToastReport:200150,
        GTLDialogReport:200151,
        GTSETItem:200152,
        GTFTE:200153
    }
    var reverseLogType={
        200101:'GTAPPRun',
        200120:'GTRemoteControl',
        200141:'GTRCNetFlix',
        200147:'GTLauncherRun',
        200148:'GTLTitleAction',
        200149:'GTLPanel',
        200150:'GTLToastReport',
        200151:'GTLDialogReport'
    }

    var reportParaObj = {
        actionType: "ActionType",
        addOrRemoveTileType: "AddOrRemoveTitleType",
        addOrRemoveTileName: "AddOrRemoveTitleName",
        appVersion: "APPVersion",
        appPackage: "APPPackage",
        backGroundPack: "BackgroundAPPPackage",
        brand: "Brand",
        closeReason: "CloseReason",
        changeSource: "ChangeSource",
        countyCode: "CountryCode",
        devID: "DeviceId",
        dismissCase: "DismissCause",
        devMsg: "DeviceMsg",
        endTime: "EndTime",
        func: "Function",
        interaction: "Interaction",
        launcherSource : "LaunchSource",
        msgType : "MsgType",
        msgId : "MsgId",
        netWorkType: "NetworkType",
        platForm: "ChipPlatform",
        panelName: "PanelName",
        ver: "Version",
        result: "Result",
        remoteType: "RemoteControlType",
        startTime: "StartTime",
        setItem: "SetItem",
        type: "EventCode",
        time: "Time",
        titleNum: "TitlesNum",
        tiles: "Titles",
        keyName: "KeyName",
        where: "Where",
        zone: "Zone"
    }

    var newReportParaObj={
        appid: 'appid',
        brand: 'brand',
        capabilitycode: 'capabilitycode',
        chipplatform: 'chipplatform',
        columnid: 'columnid',
        countrycode: 'countrycode',
        deviceid: 'deviceid',
        devicemsg: 'devicemsg',
        eventcode: 'eventcode',
        featurecode: 'featurecode',
        groupid: 'groupid',
        isposter: 'isposter',
        logstamp: 'logstamp',
        mediaid: 'mediaid',
        objectid: 'objectid',
        objecttype: 'objecttype',
        original: 'original',
        rowid: 'rowid',
        srccolumnid: 'srccolumnid',
        srcmediaid: 'srcmediaid',
        srcoriginal: 'srcoriginal',
        srceventcode: 'srceventcode',
        srcsearchkey: 'srcsearchkey',
        srcthirdpartyid: 'srcthirdpartyid',
        searchkey: 'searchkey',
        srcappid: 'srcappid',
        srcgroupid: 'srcgroupid',
        srcrowid: 'srcrowid',
        srctabid: 'srctabid',
        srctabindex: 'srctabindex',
        time: 'time',
        tabid: 'tabid',
        tabindex: 'tabindex',
        version: 'version',
        thirdpartyid: 'thirdpartyid'
    }



    function paraBasicInit(param,noCheckParam){
        if (!tv) {
            return false;
        }
        try{
            if(!GLOBAL.LOG_Report_DEVICEID_InitFlag){
                deviceID=tv?model.network.getSystem_featureCode():"";
                GLOBAL.DEVICE_ID = deviceID;
                DBG_INFO('get deviceID is:'+deviceID);
                GLOBAL.LOG_Report_DEVICEID_InitFlag=true;
            }
        }catch(ex){DBG_ERROR('get deviceID is error'+ex.message)}
        if(!GLOBAL.DEVICE_ID){
            DBG_INFO("not report GLOBAL.DEVICE_ID:"+GLOBAL.DEVICE_ID);
            return false;
        }
        try{
            DBG_INFO('receive para :'+objToString(param));
            if(!noCheckParam){
                for(var i=0;i<param.length;i++){
                    if(isNaN(param[i])&&!param[i]){
                        DBG_ERROR('para is null just return');
                        DBG_ERROR('para :'+objToString(param));
                        return false;
                    }
                }
            }

            curTime = tv ? model.timerfunc.getCurTime() : "";
            curCountry = tv ? model.basicSetting.getTvsetLocation() : "";
            curZone = tv ? model.timerfunc.getNewTimeZone() / 3600 : "";
            deviceID = GLOBAL.DEVICE_ID, remoteType = GLOBAL.REMOTE_TYPE, platform = GLOBAL.PLATFORM;
            macAddress = GLOBAL.MAC_ADDRESS;//tv ? Hisense.File.read("am_tv_mac_address", 0) : "";
            DeviceMsg =GLOBAL.MODEL_NAME; //tv ? Hisense.File.read("am_tv_model_name", 0) : "";
            curBrand = GLOBAL.CURRENT_BRAND;//tv ? Hisense.File.read("am_tv_brand", 0) : "";
            DBG_INFO("am_tv_mac_address :" + macAddress);
            DBG_INFO("length: " + macAddress.length);
            return true;
        }catch(ex){DBG_ERROR(ex.stack)}
    }

    function writeTvRunLogFunC(logType,msg){
        DBG_INFO("logType:"+reverseLogType[logType]+':'+logType+"----msg:"+objToString(msg));
        msg = objToString(msg);
        Hisense.RunLog.writeTvRunLog(logType,msg);
    }

    function UnionInfo(msg){
        msg[reportParaObj.countyCode] = curCountry;
        msg[reportParaObj.platForm] = platform;
        msg[reportParaObj.brand] = curBrand;
        msg[reportParaObj.devMsg] = DeviceMsg;
    }

    self.launcherPanelCloseReason = {
        OTHER:"0",
        KEY_PRESS:"1",
        TIME_OUT:"2",
        SELECTION:"3",
        BACK_BUTTON:"4"
    };

    self.GTAPPRunStart = function (AppName,LaunchSource){
        DBG_INFO('GTAPPRunStart');
        if(!paraBasicInit([AppName,LaunchSource])){
            return;
        }
        LogReportData.appStateAlreadyClosed=false;
        LogReportData.currentOperateTime = curTime;
        LogReportData.currentOperateName = AppName;
        if(LogReportData.currentHotKeyTime ==0){
            var msg={
            }
            msg[reportParaObj.ver]= '2.0';
            msg[reportParaObj.type] = logType.GTAPPRun.toString();
            msg[reportParaObj.devID] = deviceID;
            msg[reportParaObj.startTime] = curTime;
            msg[reportParaObj.endTime] = '0';
            msg[reportParaObj.appPackage] = AppName;
            msg[reportParaObj.zone] = curZone;
            msg[reportParaObj.appVersion] = '';
            UnionInfo(msg);
            msg[reportParaObj.launcherSource] = LaunchSource;
            writeTvRunLogFunC(logType.GTAPPRun, msg);
        }
        writeFileToNative("logReportAppRun", curTime + VerticalLine + AppName +VerticalLine +"1"+VerticalLine+LaunchSource, 0);
    }

    self.GTAPPRunClose = function(AppName,LaunchSource){
        DBG_INFO('GTAPPRunClose'+LogReportData.currentHotKeyTime);
        if(!paraBasicInit([AppName,LaunchSource])){
            return;
        }
        var msg={};
        if(LogReportData.currentHotKeyTime !=0){
            if(AppName.toLowerCase()=="netflix"){
                msg={};
                msg[reportParaObj.ver]= '2.0';
                msg[reportParaObj.type] = logType.GTRCNetFlix.toString();
                msg[reportParaObj.devID] = deviceID;
                msg[reportParaObj.time] = LogReportData.currentHotKeyTime;
                msg[reportParaObj.keyName] = AppName.toUpperCase();
                msg[reportParaObj.func] = '0';
                msg[reportParaObj.zone] = curZone;
                msg[reportParaObj.remoteType] = remoteType;
                UnionInfo(msg);
                writeTvRunLogFunC(logType.GTRCNetFlix, msg);
            }else{
                msg={};
                msg[reportParaObj.ver]= '2.0';
                msg[reportParaObj.type] = logType.GTRemoteControl.toString();
                msg[reportParaObj.devID] = deviceID;
                msg[reportParaObj.time] = LogReportData.currentHotKeyTime;
                msg[reportParaObj.keyName] = AppName.toUpperCase();
                msg[reportParaObj.countyCode] = curCountry;
                msg[reportParaObj.zone] = curZone;
                msg[reportParaObj.remoteType] = remoteType;
                msg[reportParaObj.platForm] = platform;
                msg[reportParaObj.brand] = curBrand;
                msg[reportParaObj.devMsg] = DeviceMsg;
                writeTvRunLogFunC(logType.GTRemoteControl, msg);
            }
            msg={};
            msg[reportParaObj.ver]= '2.0';
            msg[reportParaObj.type] = logType.GTAPPRun.toString();
            msg[reportParaObj.devID] = deviceID;
            msg[reportParaObj.startTime] = LogReportData.currentHotKeyTime;
            msg[reportParaObj.endTime] = '0';
            msg[reportParaObj.appPackage] = LogReportData.currentOperateName;
            msg[reportParaObj.zone] = curZone;
            msg[reportParaObj.appVersion] = '';
            UnionInfo(msg);
            msg[reportParaObj.launcherSource] = LaunchSource;
            writeTvRunLogFunC(logType.GTAPPRun, msg);
            msg={};
            msg[reportParaObj.ver]= '2.0';
            msg[reportParaObj.type] = logType.GTAPPRun.toString();
            msg[reportParaObj.devID] = deviceID;
            msg[reportParaObj.startTime] = LogReportData.currentHotKeyTime;
            msg[reportParaObj.endTime] = curTime;
            msg[reportParaObj.appPackage] = LogReportData.currentOperateName;
            msg[reportParaObj.zone] = curZone;
            msg[reportParaObj.appVersion] = '';
            UnionInfo(msg);
            msg[reportParaObj.launcherSource] = LaunchSource;
            writeTvRunLogFunC(logType.GTAPPRun,msg);
        }else{
            if(LogReportData.appStateAlreadyClosed==false){
                msg={};
                msg[reportParaObj.ver]= '2.0';
                msg[reportParaObj.type] = logType.GTAPPRun.toString();
                msg[reportParaObj.devID] = deviceID;
                msg[reportParaObj.startTime] = LogReportData.currentOperateTime;
                msg[reportParaObj.endTime] = curTime;
                msg[reportParaObj.appPackage] = LogReportData.currentOperateName;
                msg[reportParaObj.zone] = curZone;
                msg[reportParaObj.appVersion] = '';
                UnionInfo(msg);
                msg[reportParaObj.launcherSource] = LaunchSource;
                writeTvRunLogFunC(logType.GTAPPRun, msg);
            }
        }
        deleteNativeFile("logReportAppRun", 0);
        LogReportData.currentHotKeyTime=0;
    }

    self.GTAPPRunHotKey = function (startFlag){
        DBG_INFO('GTAPPRunHotKey');
        if(!paraBasicInit([startFlag])){
            return;
        }
        if(startFlag){
            LogReportData.currentHotKeyTime = curTime;

        }
        DBG_INFO('GTAPPRunHotKey'+ LogReportData.currentHotKeyTime);
    }

    self.GTRemoteControl = function (currKeyValue){
        DBG_INFO('GTRemoteControl');
        if(!paraBasicInit([currKeyValue])){
            return;
        }
        var msg='';
        if(CONST_KEYVAlUEMAP[VK_NETFLIX]==currKeyValue){
            msg={};
            msg[reportParaObj.ver]= '2.0';
            msg[reportParaObj.type] = logType.GTRCNetFlix.toString();
            msg[reportParaObj.devID] = deviceID;
            msg[reportParaObj.time] = curTime;
            msg[reportParaObj.keyName] = currKeyValue;
            msg[reportParaObj.func] = '1';
            msg[reportParaObj.zone] = curZone;
            msg[reportParaObj.remoteType] = remoteType;
            UnionInfo(msg);
            writeTvRunLogFunC(logType.GTRCNetFlix, msg);
        }else{
            msg={};
            msg[reportParaObj.ver]= '2.0';
            msg[reportParaObj.type] = logType.GTRemoteControl.toString();
            msg[reportParaObj.devID] = deviceID;
            msg[reportParaObj.time] = curTime;
            msg[reportParaObj.keyName] = currKeyValue;
            msg[reportParaObj.countyCode] = curCountry;
            msg[reportParaObj.zone] = curZone;
            msg[reportParaObj.remoteType] = remoteType;
            msg[reportParaObj.platForm] = platform;
            msg[reportParaObj.brand] = curBrand;
            msg[reportParaObj.devMsg] = DeviceMsg;
            writeTvRunLogFunC(logType.GTRemoteControl, msg);
        }
    }

    self.GTLauncherRunStart = function (){
        DBG_INFO('GTLauncherRunStart');
        if(!paraBasicInit(['Launcher'])){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLauncherRun.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.startTime] = curTime;
        msg[reportParaObj.endTime] = '0';
        msg[reportParaObj.backGroundPack] = '';
        msg[reportParaObj.closeReason] = '0';
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLauncherRun, msg);
        LogReportData.currentLauncherTime = curTime;
    }

    self.GTLauncherRunClose = function (closeReason){
        DBG_INFO('GTLauncherRunClose');
        if(!paraBasicInit([closeReason],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLauncherRun.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.startTime] = LogReportData.currentLauncherTime;
        msg[reportParaObj.endTime] = curTime;
        msg[reportParaObj.backGroundPack] = '';
        msg[reportParaObj.closeReason] = closeReason;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLauncherRun,msg);
        LogReportData.currentLauncherTime = 0;
    }

    self.GTLauncherTitleAction = function (ActionType,ChangeSource,TitleType,AddOrRemoveTitleName,TitlesNum,Titles){
        DBG_INFO('GTLauncherTitleAction');
        if(!paraBasicInit([ActionType,ChangeSource,TitleType,AddOrRemoveTitleName,TitlesNum,Titles],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLTitleAction.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.time] = curTime;
        msg[reportParaObj.actionType] = ActionType;
        msg[reportParaObj.changeSource] = ChangeSource;
        msg[reportParaObj.addOrRemoveTileType] = TitleType;
        msg[reportParaObj.addOrRemoveTileName] = AddOrRemoveTitleName;
        msg[reportParaObj.titleNum] = TitlesNum;
        msg[reportParaObj.tiles] = Titles;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLTitleAction, msg);
    }

    self.GTLauncherPanelStart = function (PanelName,CloseReason){
        DBG_INFO('GTLauncherPanelStart ');
        if(!paraBasicInit([PanelName,CloseReason],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLPanel.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.startTime] = curTime;
        msg[reportParaObj.endTime] = '0';
        msg[reportParaObj.panelName] = PanelName;
        msg[reportParaObj.closeReason] = CloseReason;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLPanel, msg);
        LogReportData.currentLauncherPanelTime = curTime;
    }

    self.GTLauncherPanelClose = function (PanelName,CloseReason){
        DBG_INFO('GTLauncherPanelClose '+PanelName + "  "+CloseReason);
        if(!paraBasicInit([PanelName,CloseReason],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLPanel.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.startTime] = LogReportData.currentLauncherPanelTime;
        msg[reportParaObj.endTime] = curTime;
        msg[reportParaObj.panelName] = PanelName;
        msg[reportParaObj.closeReason] = CloseReason;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLPanel, msg);
        LogReportData.currentLauncherPanelTime = 0;
    }

    self.GTLauncherNOTToastReport = function (MsgType,MsgId,DismissCause){
        DBG_INFO('GTLauncherNOTToastReport');
        if(!paraBasicInit([MsgType,MsgId,DismissCause],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLToastReport.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.time] = curTime;
        msg[reportParaObj.msgType] = MsgType;
        msg[reportParaObj.msgId] = MsgId;
        msg[reportParaObj.dismissCase] = DismissCause;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLToastReport, msg);
    }

    self.GTLauncherNOTDialogReport =function (MsgType,MsgId,Where,Interaction){
        DBG_INFO('GTLauncherNOTDialogReport');
        if(!paraBasicInit([MsgType,MsgId,Where,Interaction],true)){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTLDialogReport.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.time] = curTime;
        msg[reportParaObj.msgType] = MsgType;
        msg[reportParaObj.msgId] = MsgId;
        msg[reportParaObj.where] = Where;
        msg[reportParaObj.interaction] = Interaction;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTLDialogReport, msg);
    }

    self.GTSETItem =function (SetItem, Result){
        DBG_INFO('GTSETItem Report');
        if(!paraBasicInit([SetItem, Result])){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTSETItem.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.time] = curTime;
        msg[reportParaObj.setItem] = SetItem;
        msg[reportParaObj.result] = Result;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTSETItem, msg);
    }

    self.GTFTE  =function (NetworkType){
        DBG_INFO('GTFTE Report');
        if(!paraBasicInit([NetworkType])){
            return;
        }
        var msg={};
        msg[reportParaObj.ver]= '2.0';
        msg[reportParaObj.type] = logType.GTFTE.toString();
        msg[reportParaObj.devID] = deviceID;
        msg[reportParaObj.time] = curTime;
        msg[reportParaObj.netWorkType] = NetworkType;
        msg[reportParaObj.zone] = curZone;
        UnionInfo(msg);
        writeTvRunLogFunC(logType.GTFTE, msg);
    }

    self.KeyReport = function (keyCode){
        try{
            switch (keyCode){
                case VK_ENTER:break;
                case VK_BACK:break;
                case VK_UP:break;
                case VK_DOWN:break;
                case VK_LEFT:break;
                case VK_RIGHT:break;
                case VK_VOLUME_UP:break;
                case VK_VOLUME_DOWN:break;
                //case VK_MUTE:break;
                case VK_HOME:break;
                //case VK_CHANNEL_DOWN:break;
                //case VK_CHANNEL_UP:break;
                case VK_POWER:break;
                default :
                    LGReport.GTRemoteControl(CONST_KEYVAlUEMAP[keyCode]);
                    break;
            }
        }catch(ex){DBG_ERROR(ex.message)}
    }

    self.GT4KNowHomePage =function(capabilitycode ,columnid ,eventcode ,featurecode ,groupid ,logstamp ,rowid ,version){
        DBG_INFO('GT4KNowHomePage');
        if(!paraBasicInit([capabilitycode ,columnid ,eventcode ,featurecode ,groupid ,logstamp ,rowid ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.groupid] = groupid;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.rowid] = rowid;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreHomePage =function(capabilitycode ,columnid ,eventcode ,featurecode ,logstamp ,rowid ,version){
        DBG_INFO('GTAppStoreHomePage');
        if(!paraBasicInit([capabilitycode ,columnid ,eventcode ,featurecode ,logstamp ,rowid ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.rowid] = rowid;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTDiscoverHomePage =function(capabilitycode ,eventcode ,featurecode ,logstamp ,version){
        DBG_INFO('GTDiscoverHomePage');
        if(!paraBasicInit([capabilitycode ,eventcode ,featurecode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTHomePageSearchDone =function(srceventcode,capabilitycode ,eventcode ,searchkey ,logstamp ,version){
        DBG_INFO('GTHomePageSearchDone');
        if(!paraBasicInit([srceventcode,capabilitycode ,eventcode ,searchkey ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.searchkey] = searchkey;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KTabSelect =function(srccolumnid ,srceventcode ,srcgroupid ,srcrowid,capabilitycode ,columnid ,eventcode ,featurecode ,groupid ,logstamp ,rowid ,tabid ,tabindex,version){
        DBG_INFO('GT4KTabSelect');
        if(!paraBasicInit([srccolumnid ,srceventcode ,srcgroupid ,srcrowid,capabilitycode ,columnid ,eventcode ,featurecode ,groupid ,logstamp ,rowid ,tabid ,tabindex,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.groupid] = groupid;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.rowid] = rowid;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srccolumnid] = srccolumnid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcgroupid] = srcgroupid;
        msg[newReportParaObj.srcrowid] = srcrowid;
        msg[newReportParaObj.tabid] = tabid;
        msg[newReportParaObj.tabindex] = tabindex;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTDiscoverTabSelect =function(srceventcode ,srcsearchkey,capabilitycode ,eventcode ,featurecode ,tabid ,tabindex,logstamp ,version){
        DBG_INFO('GTDiscoverTabSelect');
        if(!paraBasicInit([srceventcode ,srcsearchkey,capabilitycode ,eventcode ,featurecode ,tabid ,tabindex,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcsearchkey] = srcsearchkey;
        msg[newReportParaObj.tabid] = tabid;
        msg[newReportParaObj.tabindex] = tabindex;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTTabSelectObjLaunch =function(srceventcode ,srcsearchkey, srctabid , srctabindex,capabilitycode , columnid, eventcode ,objectid , objecttype, original,logstamp ,version){
        DBG_INFO('GTDiscoverTabSelect');
        if(!paraBasicInit([srceventcode ,srcsearchkey, srctabid , srctabindex,capabilitycode , columnid, eventcode ,objectid , objecttype, original,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcsearchkey] = srcsearchkey;
        msg[newReportParaObj.srctabid] = srctabid;
        msg[newReportParaObj.srctabindex] = srctabindex;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.objectid] = objectid;
        msg[newReportParaObj.objecttype] = objecttype;
        msg[newReportParaObj.original] = original;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTDiscoverSearchWeb =function(srceventcode ,srctabid ,srctabindex ,capabilitycode ,eventcode ,featurecode ,searchkey,logstamp ,version){
        DBG_INFO('GTDiscoverTabSelect');
        if(!paraBasicInit([srceventcode ,srctabid ,srctabindex ,capabilitycode ,eventcode ,featurecode ,searchkey,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srctabid] = srctabid;
        msg[newReportParaObj.srctabindex] = srctabindex;
        msg[newReportParaObj.searchkey] = searchkey;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KClearHistory =function(srccolumnid ,srceventcode ,srcgroupid ,srcrowid,srctabid ,srctabindex,capabilitycode ,columnid ,eventcode ,featurecode ,logstamp ,version){
        DBG_INFO('GT4KClearHistory');
        if(!paraBasicInit([srccolumnid ,srceventcode ,srcgroupid ,srcrowid,srctabid ,srctabindex,capabilitycode ,columnid ,eventcode ,featurecode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srccolumnid] = srccolumnid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcgroupid] = srcgroupid;
        msg[newReportParaObj.srcrowid] = srcrowid;
        msg[newReportParaObj.srctabid] = srctabid;
        //msg[newReportParaObj.srctabindex] = srctabindex;
        msg[newReportParaObj.version] = version;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KSelectProvider =function(srceventcode ,srcmediaid ,srcoriginal,srcthirdpartyid,appid ,capabilitycode ,eventcode ,logstamp ,version ,isposter){
        DBG_INFO('GT4KSelectProvider');
        if(!paraBasicInit([srceventcode ,srcmediaid ,srcoriginal,srcthirdpartyid,appid ,capabilitycode ,eventcode ,logstamp ,version ,isposter],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcmediaid] = srcmediaid;
        msg[newReportParaObj.srcoriginal] = srcoriginal;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.isposter] = isposter;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KDetailWatchNow =function(srceventcode ,srcmediaid ,srcthirdpartyid,appid ,capabilitycode ,columnid,eventcode ,isposter,logstamp ,mediaid, rowid,version){
        DBG_INFO('GT4KDetailWatchNow');
        if(!paraBasicInit([srceventcode ,srcmediaid ,srcthirdpartyid,appid ,capabilitycode ,columnid,eventcode ,isposter,logstamp ,mediaid, rowid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcmediaid] = srcmediaid;
        msg[newReportParaObj.isposter] = isposter;
        msg[newReportParaObj.mediaid] = mediaid;
        msg[newReportParaObj.rowid] = rowid;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KProviderWatchNow =function(srceventcode ,srcmediaid ,srcoriginal,srcthirdpartyid,appid ,capabilitycode ,columnid,eventcode ,isposter,logstamp ,mediaid, rowid,version){
        DBG_INFO('GT4KProviderWatchNow');
        if(!paraBasicInit([srceventcode ,srcmediaid ,srcoriginal,srcthirdpartyid,appid ,capabilitycode ,columnid,eventcode ,isposter,logstamp ,mediaid, rowid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.columnid] = columnid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcmediaid] = srcmediaid;
        msg[newReportParaObj.isposter] = isposter;
        msg[newReportParaObj.mediaid] = mediaid;
        msg[newReportParaObj.rowid] = rowid;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        msg[newReportParaObj.srcoriginal] = srcoriginal;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KProviderCancelInstall =function(srcappid ,srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,featurecode ,logstamp ,version){
        DBG_INFO('GT4KProviderCancelInstall');
        if(!paraBasicInit([srcappid ,srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,featurecode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srcappid] = srcappid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GT4KProviderInstallApp =function(srcappid ,srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,logstamp ,version){
        DBG_INFO('GT4KProviderInstallApp');
        if(!paraBasicInit([srcappid ,srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srcappid] = srcappid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreOpenAPP =function(srccolumnid ,srceventcode ,srcrowid,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version){
        DBG_INFO('GTAppStoreOpenAPP');
        if(!paraBasicInit([srccolumnid ,srceventcode ,srcrowid,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srccolumnid] = srccolumnid;
        msg[newReportParaObj.srcrowid] = srcrowid;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.thirdpartyid] = thirdpartyid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTThirdPartyOpenAPP =function(srceventcode ,srcthirdpartyid,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version){
        DBG_INFO('GTThirdPartyOpenAPP');
        if(!paraBasicInit([srceventcode ,srcthirdpartyid,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.thirdpartyid] = thirdpartyid;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreHomeQuickInstallAPP =function(srccolumnid ,srceventcode ,srcrowid, srctabid ,srctabindex ,appid ,capabilitycode ,eventcode ,logstamp ,version){
        DBG_INFO('GTAppStoreHomeQuickInstallAPP');
        if(!paraBasicInit([srccolumnid ,srceventcode ,srcrowid, srctabid ,srctabindex ,appid ,capabilitycode ,eventcode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srccolumnid] = srccolumnid;
        msg[newReportParaObj.srcrowid] = srcrowid;
        msg[newReportParaObj.srctabid] = srctabid;
        msg[newReportParaObj.srctabindex] = srctabindex;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTThirdPartyQuickInstallAPP =function(srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,featurecode ,logstamp ,version){
        DBG_INFO('GTThirdPartyQuickInstallAPP');
        if(!paraBasicInit([srceventcode ,srcthirdpartyid,capabilitycode ,eventcode ,featurecode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreQuickInstallAPPInstall =function(srceventcode ,srcthirdpartyid, appid,capabilitycode,eventcode ,logstamp ,version){
        DBG_INFO('GTAppStoreQuickInstallAPPInstall');
        if(!paraBasicInit([srceventcode ,srcthirdpartyid, appid, capabilitycode,eventcode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        msg[newReportParaObj.appid] = appid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreDetailInstallAPP =function(srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,srcthirdpartyid){
        DBG_INFO('GTAppStoreDetailInstallAPP');
        if(!paraBasicInit([srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,srcthirdpartyid],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreDetailOpenAPP =function(srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version){
        DBG_INFO('GTAppStoreDetailOpenAPP');
        if(!paraBasicInit([srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srcthirdpartyid] = thirdpartyid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreHomeOpenAPP =function(srccolumnid,srceventcode ,srcrowid ,srctabid ,srctabindex,appid ,capabilitycode ,eventcode ,logstamp ,thirdpartyid,version){
        DBG_INFO('GTAppStoreHomeOpenAPP');
        if(!paraBasicInit([srccolumnid,srceventcode ,srcrowid ,srctabid ,srctabindex,appid ,capabilitycode ,eventcode ,logstamp ,thirdpartyid,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.thirdpartyid] = thirdpartyid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srccolumnid] = srccolumnid;
        msg[newReportParaObj.srcrowid] = srcrowid;
        msg[newReportParaObj.srctabid] = srctabid;
        msg[newReportParaObj.srctabindex] = srctabindex;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreDetailUnInstallAPP =function(srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,thirdpartyid){
        DBG_INFO('GTAppStoreDetailUnInstallAPP');
        if(!paraBasicInit([srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,thirdpartyid],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = thirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreDetailCancelInstall =function(srceventcode ,srcthirdpartyid, appid ,capabilitycode ,eventcode ,logstamp ,version){
        DBG_INFO('GTAppStoreDetailCancelInstall');
        if(!paraBasicInit([srceventcode ,srcthirdpartyid, appid ,capabilitycode ,eventcode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreQuickInstallCancelInstall =function(srceventcode ,srcthirdpartyid, appid ,capabilitycode ,eventcode ,logstamp ,version){
        DBG_INFO('GTAppStoreQuickInstallCancelInstall');
        if(!paraBasicInit([srceventcode ,srcthirdpartyid, appid ,capabilitycode ,eventcode ,logstamp ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTAppStoreDetailViewScreenShot =function(srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,srcthirdpartyid){
        DBG_INFO('GTAppStoreDetailViewScreenShot');
        if(!paraBasicInit([srceventcode ,appid ,capabilitycode ,eventcode ,featurecode ,logstamp ,version,srcthirdpartyid],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.srceventcode] = srceventcode;
        msg[newReportParaObj.srcthirdpartyid] = srcthirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.GTNotification = function(appid,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid ,version){
        DBG_INFO('GTNotification');
        if(!paraBasicInit([appid,capabilitycode ,eventcode ,featurecode ,logstamp ,thirdpartyid ,version],true)){
            return;
        }
        var msg={};
        msg[newReportParaObj.brand]= curBrand;
        msg[newReportParaObj.capabilitycode] = capabilitycode;
        msg[newReportParaObj.chipplatform] = platform;
        msg[newReportParaObj.countrycode] = curCountry;
        msg[newReportParaObj.deviceid] = deviceID;
        msg[newReportParaObj.devicemsg] = DeviceMsg;
        msg[newReportParaObj.eventcode] = eventcode;
//        msg[newReportParaObj.featurecode] = featurecode;
        msg[newReportParaObj.logstamp] = logstamp;
        msg[newReportParaObj.time] = curTime;
        msg[newReportParaObj.version] = version;
        msg[newReportParaObj.appid] = appid;
        msg[newReportParaObj.thirdpartyid] = thirdpartyid;
        writeTvRunLogFunC(eventcode, msg);
    }

    self.getDeviceMsg = function (){
        try {
            GLOBAL.MAC_ADDRESS=tv ? Hisense.File.read("am_tv_mac_address", 0) : "";
            GLOBAL.MODEL_NAME=tv ? Hisense.File.read("am_tv_model_name", 0) : "";
            GLOBAL.CURRENT_BRAND=tv ? Hisense.File.read("am_tv_brand", 0) : "";

            switch (hiWebOsFrame.getCurrentArea()) {
                case "NA":
                    //deviceID = "861003009000001000000712";
                    GLOBAL.REMOTE_TYPE = "EN2A27";
                    GLOBAL.PLATFORM = "MT5659";
                    break;
                case "SA":
                    //deviceID = "861003009000002000000712";
                    GLOBAL.REMOTE_TYPE = "EN2H27";
                    GLOBAL.PLATFORM = "MT5659";
                    break;
                case "EU":
                    //deviceID = "861003009000003000000712";
                    GLOBAL.REMOTE_TYPE = "EN2X27";
                    GLOBAL.PLATFORM = "MT5659";
                    break;
                case "EM":
                    //deviceID = "861003009000004000000712";
                    GLOBAL.REMOTE_TYPE = "EN2B27";
                    GLOBAL.PLATFORM = "MT5659";
                    break;
                default :
                    //deviceID = "861003009000005000000712";
                    GLOBAL.REMOTE_TYPE = "EN2B27";
                    GLOBAL.PLATFORM = "MT5659";
                    break;
            }
        }
        catch (ex) {
            DBG_ERROR(ex.message);
        }
    }



}
var LGReport=new LogReportModule();
