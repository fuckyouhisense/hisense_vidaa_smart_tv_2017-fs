/**
 * Created by jiangbo1 on 2016/1/26.
 */

function MessagePool() {
    var myEnum = 0, _this = this, msgIdEnum = 0;
    _this.MESSAGE_NAME = {
        AM_STATE_CHANGED: myEnum++,
        AUDIO_FORMAT_INFO_CHANGED: myEnum++,
        CEC_ARC_STATE_CHANGED: myEnum++,
        CEC_DEVICE_EXIST_CHANGED: myEnum++,
        CEC_CHANGE_SOURCE: myEnum++,
        CEC_CONTROL_CHANGED: myEnum++,
        CHANNEL_FAV_SET: myEnum++,
        CHANNEL_SKIP_SET: myEnum++,
        CHANNEL_SCAN_STATE:myEnum++,
        CHANNEL_UPDATED: myEnum++,
        CI_MENU_CHANGED: myEnum++,
        CURRENT_CHANNEL_CHANGED: myEnum++,
        CURRENT_COUNTRY_CHANGED: myEnum++,
        CURRENT_LANGUAGE_CHANGED: myEnum++,
        CURRENT_PROGRAM_INFO: myEnum++,
        CURRENT_INPUT_LOCK_CHANGED: myEnum++,
        CURRENT_SOURCE_CHANGED: myEnum++,
        MHL_AVAILABLE_CHANGED: myEnum++,
        MHL_CONNECT_CHANGED: myEnum++,
        ENTER_SUSPEND_MODE: myEnum++,
        FACTORY_MODE_CHANGED: myEnum++,
        HISMART_DATA: myEnum++,
        INPUT_RENAMED: myEnum++,
        KEY_RELEASE: myEnum++,
        KEY_REPORT:myEnum++,
        LANGUAGE_CHANGUAGE_COMPLETE: myEnum++,
        LIVETV_INITED: myEnum++,
        MUTE_CHANGED: myEnum++,
        NETWORK_CHANGED: myEnum++,
        NEXT_PROGRAM_INFO: myEnum++,
        PARENTAL_LOCK_SWITCH: myEnum++,
        PVR_STANDBY_RECORDING: myEnum++,
        PVR_RECORDING_WAKEUP: myEnum++,
        SIGNAL_CHANGED: myEnum++,
        SOURCE_DETECT_CHANGED: myEnum++,
        TIME_FORMAT_CHANGED: myEnum++,
        TIME_ZONE_CHANGED: myEnum++,
        USB_DEVICE_CHANGED: myEnum++,
        VIDEO_FORMAT_CHANGED: myEnum++,
        VIDEO_FORMAT_INFO_CHANGED: myEnum++,
        VOLUME_CHANGED: myEnum++,
        VOLUME_DEV_CHANGED: myEnum++,
        MENU_TIMEOUT_CHANGED: myEnum++,
	HEADPHONE_DEVICE_INSERT:myEnum++,
        HEADPHONE_VOLUME:myEnum++,
	DAYLIGHT_SAVINGS_CHANGED: myEnum++,
        BLUETOOTH_DISCONNECT:myEnum++,
        CHILD_LOCK_CHANGED:myEnum++,
        TV_SPEAKER:myEnum++,
        ACTION_HDS_DISPLAY_CHANGED:myEnum++,
        MAX_COUNT: myEnum++,
        DEVICE_ID_CHANGED:myEnum
    };

    var NFYMessages = [
        _this.MESSAGE_NAME.USB_DEVICE_CHANGED,
        _this.MESSAGE_NAME.HISMART_DATA,
        _this.MESSAGE_NAME.SOURCE_DETECT_CHANGED
    ];
    var noResponseInFACM = [
        _this.MESSAGE_NAME.USB_DEVICE_CHANGED,
        _this.MESSAGE_NAME.CURRENT_CHANNEL_CHANGED,
        _this.MESSAGE_NAME.MUTE_CHANGED,
        _this.MESSAGE_NAME.SIGNAL_CHANGED,
        _this.MESSAGE_NAME.VOLUME_CHANGED,
        _this.MESSAGE_NAME.VOLUME_DEV_CHANGED,
        _this.MESSAGE_NAME.VIDEO_FORMAT_CHANGED,
        _this.MESSAGE_NAME.CEC_CHANGE_SOURCE
    ];
    var unProcessedNFY = {};

    var funcs = [];

    function publishMessage(msg, val) {
        if (!funcs[msg]) return;
        funcs[msg].forEach(
            function (item) {
                try {
                    item.apply(_this, val);
                }
                catch (ex) {
                    DBG_ERROR("func[" + item.name + "], error[" + ex.message + "]");
                }
            }
        );
    }

    function publishUIMessage() {
        var args = Array.prototype.slice.call(arguments);
        var msg = args.shift();
        publishMessage(msg, args);
    }
    function FuncArrayExist(msg){
       if(funcs[msg]!=undefined) {
           return true;
       }else{
       return false;
       }
    }
    function onTVModelChanged() {
        var args = Array.prototype.slice.call(arguments);
        var msg = args.shift();
        if (1 == GLOBAL.FACTORY && noResponseInFACM.indexOf(msg) > -1) return false;
        if (NFYMessages.indexOf(msg) > -1) addNotification(msg, args);
        //do global operation
        switch (msg) {
            case _this.MESSAGE_NAME.PARENTAL_LOCK_SWITCH:
                GLOBAL.PARENTAL_LOCK_SWITCH = parseInt(args[0]);
                break;
            case _this.MESSAGE_NAME.CURRENT_SOURCE_CHANGED:
                DBG_ALWAYS("current source changed: " + args[0]);
                var obj = objectFindByKey(GLOBAL.SOURCE_LIST, "uid", args[0]);
                GLOBAL.CURRENT_SOURCE = (null == obj) ? SourceList.TV : obj.innerId;
                break;
            //case _this.MESSAGE_NAME.MHL_AVAILABLE_CHANGED:
            //    GLOBAL.MHLAVAILABLE = parseInt(args[0]);
            //    break;
            //case _this.MESSAGE_NAME.SIGNAL_CHANGED:
            //    GLOBAL.NO_SIGNAL = (1 == args[0]);
            //    break;
            //case _this.MESSAGE_NAME.CEC_ARC_STATE_CHANGED:
            //    GLOBAL.CEC_ARC_STATE = parseInt(args[0]);
            //    break;
            //case _this.MESSAGE_NAME.CEC_CONTROL_CHANGED:
            //    GLOBAL.CEC_CONTROL = parseInt(args[0]);
            //    break;
            //case _this.MESSAGE_NAME.CEC_DEVICE_EXIST_CHANGED:
            //    GLOBAL.CEC_DEVICE_EXIST = parseInt(args[0]);
            //    break;
            case _this.MESSAGE_NAME.TIME_FORMAT_CHANGED:
                GLOBAL.TIME_FORMAT = parseInt(args[0]);
                DBG_ALWAYS("   GLOBAL.TIME_FORMAT"+  GLOBAL.TIME_FORMAT);
                break;
            //case _this.MESSAGE_NAME.TIME_ZONE_CHANGED:
            //    GLOBAL.TIMEZONE_SECONDS = 3600 * parseInt(args[0]);
            //    if ("SA" == GLOBAL.CURRENT_AREA) {
            //        if ("PHL" != GLOBAL.CURRENT_COUNTRY) {
            //            GLOBAL.TIMEZONE_SECONDS += 3 * 3600
            //        }
            //        DBG_INFO("SA timezone needs add 3 hours offset");
            //    }
            //    break;
            case _this.MESSAGE_NAME.MENU_TIMEOUT_CHANGED:
                GLOBAL.SETTING_TIMEOUT_DELAY =parseInt(args[0]);
                DBG_ALWAYS("GLOBAL.SETTING_TIMEOUT_DELAY"+GLOBAL.SETTING_TIMEOUT_DELAY);
                break;
            case _this.MESSAGE_NAME.CURRENT_COUNTRY_CHANGED:
                GLOBAL.CURRENT_COUNTRY = args[0];
                updateDateFormat();
                break;
            case _this.MESSAGE_NAME.CURRENT_LANGUAGE_CHANGED:
                DBG_ALWAYS(" LANUAGE CHANGED");
                GLOBAL.CURRENT_LANGUAGE = ChangeLangNumToCode(args[0]);
                updateDateFormat();
                break;
            case _this.MESSAGE_NAME.CHILD_LOCK_CHANGED:
                GLOBAL.PARENTAL_CHILD_LOCK = parseInt(args[0],10);
                DBG_ALWAYS("CHILD_LOCK_CHANGED"+GLOBAL.PARENTAL_CHILD_LOCK );
                break;
            case _this.MESSAGE_NAME.DEVICE_ID_CHANGED:
                DBG_ALWAYS("deviceId changed");
                GLOBAL.LOG_Report_DEVICEID_InitFlag = false;
                break;
            //case _this.MESSAGE_NAME.DAYLIGHT_SAVINGS_CHANGED:
            //    GLOBAL.DST_SECONDS = (parseInt(args[0]) * 3600);
            //    break;
            //case  _this.MESSAGE_NAME.TV_SPEAKER:
            //    GLOBAL.SPEAKER_STATE = parseInt(args[0]);
            //    break;
            default :
                break;
        }
        publishMessage(msg, args);
    }

    function subjectMessage(msg, func) {
        //DBG_INFO("subject msg[" + msg + "], func[" + func.name + "]");
        if (!funcs[msg]) funcs[msg] = [];
        unsubscribeMessage(msg, func);
        funcs[msg].push(func);
    }

    function unsubscribeMessage(msg, func) {
        //DBG_INFO("unsbuject msg[" + msg + "], func[" + func.name + "]");
        if (!funcs[msg]) return;
        funcs[msg] = funcs[msg].filter(
            function (item) {
                if (item !== func) {
                    return item;
                }
            }
        );
    }
    function getSystemLongTime(){
        var utcTime = 0;
        if (tv) {
            utcTime = parseInt(model.timerfunc.getCurTime());
            DBG_INFO("system utcTime[" + utcTime + "]");
        }
        else {
            utcTime = Math.ceil(Date.now() / GLOBAL.MILLIBASE);
        }
        return utcTime;
    }

    function addNotification(msg, args) {
        if (!funcs[msg]) return;
        var item = {
            "MsgName": msg,
            "MsgId": msgIdEnum++,
            "date": getSystemLongTime(),// delete temporary
            "data": args,
            "cmd": ""
        }

        //Temp. Actually, We should not do these operations here.
        switch (msg) {
            case _this.MESSAGE_NAME.USB_DEVICE_CHANGED:
                item.cmd = LauncherCMD.HIMEDIA;
                if(args[0][0] == "online"){
                    g_notificationCrtTimeStamp = item.date;
                }
                break;
            case _this.MESSAGE_NAME.SOURCE_DETECT_CHANGED:
                item.cmd = LauncherCMD.INPUT;
                var array = args[0].split("-");
                if (array.length > 1) {
                    if (array[1] == 1){
                        g_notificationCrtTimeStamp = item.date;
                    }
                }

                break;
            default :
                return;
        }
        if(!unProcessedNFY[msg]) {
            unProcessedNFY[msg] = [item];
        }
        else{
            unProcessedNFY[msg].push(item);
        }
    }

    function getNotifications() {
        return unProcessedNFY;
    }

    function clearNotifications() {
        unProcessedNFY = {};
        return true;
    }

    function deleteNotificationByMsg(msg, id) {
        if(null == id) {
            delete unProcessedNFY[msg];
        }
        else{
            var allMsg = unProcessedNFY[msg];
            for (var i = 0; i < allMsg.length; i++) {
                if (allMsg[i].MsgId == id) {
                    allMsg.splice(i, 1);
                    break;
                }
            }
        }
    }

    _this.getNotifications = getNotifications;
    _this.clearNotifications = clearNotifications;
    _this.deleteNotificationByMsg = deleteNotificationByMsg;
    _this.subscribeMessage = subjectMessage;
    _this.unsubscribeMessage = unsubscribeMessage;
    _this.publishMessage = onTVModelChanged;
    _this.FuncArrayExist=FuncArrayExist;

    _this.registerNotify = function() {
        try {
            model.tvservice.onNoSignalMainChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.SIGNAL_CHANGED);
            //model.tvservice.getChannelNowPfInfoCallBack = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CURRENT_PROGRAM_INFO);
            //model.tvservice.getChannelNextPfInfoCallBack = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.NEXT_PROGRAM_INFO);
            //model.tvservice.onMainPlayVideoFormatInfoChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.VIDEO_FORMAT_INFO_CHANGED);
            //model.tvservice.onMainPlayAudioFormatInfoChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.AUDIO_FORMAT_INFO_CHANGED);
            model.source.onCurrentSourceChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CURRENT_SOURCE_CHANGED);
            //model.source.onInputMhlAvailableChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.MHL_AVAILABLE_CHANGED);
            //model.source.onMhlConnectChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.MHL_CONNECT_CHANGED);
            //model.tvservice.onCurrentSourceVideoFormatChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.VIDEO_FORMAT_CHANGED);
            model.parentlock.onSModelChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.PARENTAL_LOCK_SWITCH);
            //model.source.onInputCurrentInLockChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CURRENT_INPUT_LOCK_CHANGED); //����ʹ�ã���ĸ����Ϣ
            model.source.onInputRenameCallback = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.INPUT_RENAMED);
            //model.cec.onCecSourceChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CEC_CHANGE_SOURCE);
            //model.sound.onMainMuteChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.MUTE_CHANGED);
            //model.sound.onMainVolumeChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.VOLUME_CHANGED);
            //model.sound.onExternalDeviceChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.VOLUME_DEV_CHANGED);
            //model.channelSearch.onFavSetCallback = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CHANNEL_FAV_SET);
            //model.channelSearch.onSkipSetCallback = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CHANNEL_SKIP_SET);
            //model.channelSearch.onStateChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CHANNEL_SCAN_STATE);
            ////model.system.onAmStateChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.AM_STATE_CHANGED);
            //model.cec.onIsAudioDeviceExistChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CEC_DEVICE_EXIST_CHANGED);
            //model.cec.onHdmiDevicesArcStateChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CEC_ARC_STATE_CHANGED);
            //model.cec.onFunctionalityChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CEC_CONTROL_CHANGED);
            model.basicSetting.onTvsetLocationChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CURRENT_COUNTRY_CHANGED);
            model.language.onOsdChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CURRENT_LANGUAGE_CHANGED);
            //model.timerfunc.onNewAreaTimeZoneChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.TIME_ZONE_CHANGED);
            model.timerfunc.onTimeFormatChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.TIME_FORMAT_CHANGED);
            model.basicSetting.onMenuDelayDisappearChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.MENU_TIMEOUT_CHANGED);
            model.network.onEnumNetworkAvailableChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.NETWORK_CHANGED);
            model.source.onSRCDetectInfoChanged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.SOURCE_DETECT_CHANGED);
            model.usb.onVstrLatestEventChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.USB_DEVICE_CHANGED);
            //model.timerfunc.onDaylightSavingsChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.DAYLIGHT_SAVINGS_CHANGED);
            //model.sound.onHeadphoneInsertChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.HEADPHONE_DEVICE_INSERT);
            //model.sound.onHeadphoneVolumeChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.HEADPHONE_VOLUME);
            //model.sound.onTvSpeakerChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.TV_SPEAKER);
            //model.ci.onCIVStrMenuChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CI_MENU_CHANGED);
            model.parentlock.onChildLockChaged=onTVModelChanged.bind(_this, _this.MESSAGE_NAME.CHILD_LOCK_CHANGED);
            model.ci.onActionHdsDisplaychange=onTVModelChanged.bind(_this, _this.MESSAGE_NAME.ACTION_HDS_DISPLAY_CHANGED);
            model.network.onSystem_featureCodeChaged=onTVModelChanged.bind(_this, _this.MESSAGE_NAME.DEVICE_ID_CHANGED);
            try{
                //model.bluetooth.onDevicesDisconnectChaged = onTVModelChanged.bind(_this, _this.MESSAGE_NAME.BLUETOOTH_DISCONNECT)
            }catch (e){
                DBG_ERROR(e.message)
            }

	    }
        catch (ex){
            DBG_ERROR(ex.message);
        }
    }
}
MessagePool.prototype.constructor = MessagePool;
var UI = {
    funcQueue : [],
    currModule : {},
    funcQueueTimeout:null
};
UI.addToFuncQueue = function (processFunc,param) {
    UI.funcQueue.push({func:processFunc,value:param});
    UI.excuteFuncQueue();
    clearTimeout(UI.funcQueueTimeout);
    UI.funcQueueTimeout = setTimeout(UI.excuteFuncQueue, 5000);
};
UI.excuteFuncQueue = function() {
    clearTimeout(UI.funcQueueTimeout);
    if (CanScheduleProgrammePopUp()) {
        var item = UI.funcQueue.shift();
        if (item!=undefined&&!!item.func)
        {
            item.func.call(this,item.value);
            DBG_INFO("FuncQueue : func excuted.");
        }
    }else
    {
        debugE("can not open the upgrade dialog")
    }
    if(UI.funcQueue.length > 0) {
        UI.funcQueueTimeout = setTimeout(UI.excuteFuncQueue, 5000);
    }
};
UI.clearFuncQueue = function () {
    UI.funcQueue = [];
    if (!!UI.funcQueueTimeout) {
        clearTimeout(UI.funcQueueTimeout);
        UI.funcQueueTimeout = null;
    }
};
UI.deleteFuncQueue= function (processFunc,param) {
    var val={func:processFunc, value: param};
    if (UI.funcQueue.length > 0) {
        for(var a in UI.funcQueue)
        {
            if(isObjectValueEqual(UI.funcQueue[a], val)){
                UI.funcQueue.splice(a, 1);
            }
        }
    }
}
UI.checkFuncQueue= function (processFunc) {
    var val={func:processFunc, value:null};
    if (UI.funcQueue.length > 0) {
        for(var a in UI.funcQueue)
        {
            if(UI.funcQueue[a]&&
                !!UI.funcQueue[a].func&&
                UI.funcQueue[a].func==processFunc){
                val.value=UI.funcQueue[a].value;
                return val;
            }
        }
        return null;
    }
};
