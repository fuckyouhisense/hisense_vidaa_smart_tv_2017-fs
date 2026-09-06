/**
 * Created by yangcheng3 on 2016-7-4.
 * The adapter of web sdk
 */
DBG_ERROR("tp_common read js in");
var sdk_adapter = {};
(function () {
    /**
     * get current module from sdk
     * @returns {string} current module name
     */
    sdk_adapter.getCurrentModule = function () {
        var name = "";
        // if (UI.getCurrModule()) {
        //     name = UI.getCurrModule().name;
        // }
        // DBG_INFO("sdk_adapter:getCurrentModule currModule = " + name);
        return name;
    };
    sdk_adapter.getCurrentSubModule = function () {
        var name = "";
        // if (UI.getCurrModule() && UI.getCurrSubModule()) {
        //     name = UI.getCurrSubModule().name;
        // }
        DBG_INFO("sdk_adapter:getCurrentModule currSubModule = " + name);
        return name;
    };
    /**
     * connect tp_common and ui module
     * @param module_id
     * @param callback
     * @param need_loading
     */
    sdk_adapter.connectModule = function (module_id, callback, need_loading) {
        DBG_INFO("sdk_adapter: connectModule module_id = " + module_id);
        // if (!!module_id) {
        //     if (!(UI.getCurrModule() && UI.getCurrModule().name == module_id)) {
        //         need_loading = need_loading ? true : false;
        //         UI.pushSubModule(module_id, "default_page", true, {need_loading: need_loading});
        //     }
        //     var retry_limit = 3;
        //     var delayExe = function (callback) {
        //         if (retry_limit > 0) {
        //             if (modules[module_id] && !UI.isLoadingModule) {
        //                 callback();
        //             } else {
        //                 --retry_limit;
        //                 setTimeout(function () {
        //                     delayExe(callback);
        //                 }, 200);
        //                 return;
        //             }
        //         }
        //         retry_limit = 3;
        //     };
        //     delayExe(callback);
        //
        //     //register key code
        //     UI.registerKeyCodes(null);
        //     UI.setKeyGroup(7);
        // }
    };
    var modules = {};
    sdk_adapter.setModuleConnected = function (module_id, flag) {
        // modules[module_id] = flag;
    };
    /**
     * disconnect tp_common and ui module
     * @param module_id
     * @param clearFunction
     */
    sdk_adapter.disconnectModule = function (module_id, clearFunction) {
        DBG_INFO("sdk_adapter: disconnectModule module_id = " + module_id);
        // if (!!module_id) {
        //     if (typeof clearFunction == "function") {
        //         clearFunction();
        //     }
        //     if (UI.getCurrModule() && UI.getCurrModule().name == module_id) {
        //         UI.clearAllSubModule(module_id);
        //     }
        // }
    };
    /**
     * The enum of ui event id
     */
    sdk_adapter.UI_EVENT_ID = {
        // SOURCE_CHANGED_EVENT: UIObserver.MESSAGE_NAME.CURRENT_SOURCE_CHANGED,
        // CHANNEL_CHANGED_EVENT: UIObserver.MESSAGE_NAME.CURRENT_CHANNEL_CHANGED,
        // CHANNEL_UPDATED_EVENT: UIObserver.MESSAGE_NAME.CHANNEL_UPDATED
    };
    sdk_adapter.switchOffTV = function () {
        model.system.SwitchOffTv(1);
    };
    sdk_adapter.addFuncQueue = function (func, params) {
        // UI.addToFuncQueue(func, params);
    };
    /**
     * add ui event listener to UI observer of sdk
     * @param event_id
     * @param func
     */
    sdk_adapter.addUIEventListener = function (event_id, func) {
        DBG_INFO("sdk_adapter: addUIEventListener event_id = " + event_id);
        // UIObserver.subscribeMessage(event_id, func);
    };
    /**
     * open livetv
     */
    sdk_adapter.openLiveTv = function (hide_ui) {
        DBG_INFO("sdk_adapter: openLiveTv");
        closeDOthersModule();
        openLiveTVModule();
        // UI.popAllModule();
        // if (hide_ui) {
        //     openLiveTVModule([Msg.PASSWORD, 0]);
        //     liveTV.hideNoCamCardTip();
        // } else {
        //     openLiveTVModule();
        // }
    };
    /**
     * get current channel info from livetv module
     * @returns {*} channel info
     */
    sdk_adapter.getCurrentChannel = function () {
        DBG_INFO("sdk_adapter: getCurrentChannel");
        // if (liveTV) {
        //     current_channel = liveTV.getCurrentChannelInfo();
        // } else {
        //     DBG_ERROR("sdk_adapter: getCurrentChannel liveTV is not available!");
        // }
        return livetvmain.getCurrentChannelInfo();
    };
    sdk_adapter.getDeletedChannels = function () {
        var deleted_channels = [];
        // var all_lists = liveTV.getChannelListOprtData().allLists;
        // var full_channels = liveTV.getChannelListOprtData().fullChannels;
        // for (var i = 0; i < all_lists.length; i++) {
        //     var list = full_channels[all_lists[i].name];
        //     if (list && list.length) {
        //         for (var j = 0; j < list.length; j++) {
        //             if (list[j].isSkip) {
        //                 deleted_channels.push(_cloneObj(list[j]));
        //             }
        //         }
        //     }
        // }
        DBG_INFO("sdk_adapter.getDeletedChannels deleted_channels.length is " + deleted_channels.length);
        return deleted_channels;
    };
    /**
     *
     */
    sdk_adapter.isInDtvSource = function () {
        // return (GLOBAL.CURRENT_SOURCE == SourceList.TV);
        return livetvmain.getCurrentSourceInnerId() == SourceList.TV;
    };
    sdk_adapter.changeSourceToDTV = function () {
        //GLOBAL.CURRENT_SOURCE = SourceList.TV;
    };
    /**
     * change channel by channel ids
     */
    sdk_adapter.changeChannelByIds = function (list_uid, uid, play_id) {
        DBG_INFO("sdk_adapter: changeChannelByIds ids = " + [list_uid, uid, play_id]);
        return livetvchlist.changeChannel(null, {
            playId: play_id,
            uid: uid,
            listUid: list_uid
        });

    };
    /**
     * notify other ui schedule list changed
     */
    sdk_adapter.onScheduleChanged = function () {
         refreshEPGModule();
    };
    /**
     * get the current time from sdk
     * @param is_system_time system time or broadcast time
     * @returns {*}
     */
    sdk_adapter.getCurrentTime = function (is_system_time) {
        //the time which pvr or timeshift is using is broadcast time
        return !is_system_time ? getDVBLongTime() : getSYSLongTime();
    };
    /**
     * check native app is working or not
     * @returns {boolean}
     */
    sdk_adapter.checkNativeAppOn = function () {
        return checkIsAppOn();
    };
    sdk_adapter.checkMediaRunning = function () {
        DBG_INFO("sdk_adapter: checkMediaRunning");
        return isCurrentAppHimedia();
    };
    sdk_adapter.checkHbbtvOn = function () {
        return !!checkHBBTVKeySet();
    };
    /**
     * stop all native app
     */
    sdk_adapter.stopAllNativeApp = function (callback) {
        DBG_INFO("sdk_adapter:stopAllNativeApp");
        if (checkIsAppOn()) {
            hiWebOsFrame[LiveTVModule.MAIN].operateData.callBackFunc = function () {
                hiWebOsFrame[LiveTVModule.MAIN].operateData.callBackFunc = null;
                if (typeof callback == "function") {
                    callback();
                }
            };
            checkAndCloseIfAppOn(hiWebOsFrame[LiveTVModule.MAIN]);
        }
        // UI.popAllModule();
        // if (appControl) {
        //     appStoppedFunc = function () {
        //         DBG_INFO("sdk_adapter:stopAllNativeApp appStoppedFunc");
        //         openLiveTVModule([Msg.INFO, 0]);
        //         resumeDTV();
        //         if (typeof callback == "function") {
        //             callback();
        //         }
        //         appStoppedFunc = null;
        //     };
        //     appControl.stopCurrentApp();
        // }
    };
    sdk_adapter.notifyThirdPartyWakeUp = function () {
        DBG_INFO("sdk_adapter.notifyThirdPartyWakeUp");
        sendAM(":dtv_app_mtk,am,:wakeup=hotkey");
    };
    sdk_adapter.pauseHbbtv = function () {
        pauseHBBTV();
    };
    sdk_adapter.resumeHbbtv = function () {
        resumeHBBTV();
    };
    sdk_adapter.protectPages = function () {
        GLOBAL.PROTECTED_TIME = true;
    };
    sdk_adapter.unprotectPages = function () {
        GLOBAL.PROTECTED_TIME = false;
    };
    sdk_adapter.notifyOtherModules = function (msg_type, params) {
        DBG_INFO("sdk_adapter.notifyOtherModule msg_type = " + msg_type);
        // UIObserver.publishMessage(msg_type, params);
    };
    sdk_adapter.MESSAGE_TYPE = {
        // PVR_STANDBY_RECORDING: UIObserver.MESSAGE_NAME.PVR_STANDBY_RECORDING,
        // PVR_RECORDING_WAKEUP: UIObserver.MESSAGE_NAME.PVR_RECORDING_WAKEUP,
        // PVR_CEC_NOTIFY: UIObserver.MESSAGE_NAME.PVR_RECORDING_WAKEUP
    };
    sdk_adapter.MILLIBASE = 1000;
})();
/**
 * Created by yangcheng3 on 2016-7-14.
 * The adapter of modeljs
 */
var modeljs_adapter = {
    timeshift: {},
    pvr: {},
    usb: {},
    system: {}
};
modeljs_adapter.init = function () {
    DBG_ERROR("tp_common init in");
    (function () {
        var MODEL_ID = {
            TIMESHIFT: "timeshift",
            PVR: "pvr",
            USB: "usb"
        };
        modeljs_adapter.registerCallback = function (modelId, methodId, func) {
            DBG_INFO("modeljs_adapter: registerCallback modelId = " + modelId + ", methodId = " + methodId);
            var model = getModel(modelId);
            if (model) {
                model.registerCallback(methodId, func);
            }
        };

        var getModel = function (modelId) {
            var model = null;
            switch (modelId) {
                case MODEL_ID.TIMESHIFT:
                    model = modeljs_adapter.timeshift;
                    break;
                case MODEL_ID.PVR:
                    model = modeljs_adapter.pvr;
                    break;
                default:
                    DBG_ERROR("modeljs_adapter: getModel no model exist");
                    break;
            }
            return model;
        }
    })();
    (function () {
        var onPlayStateChanged, onParAvailableChanged;
        var METHOD_ID = {
            ONPLAYSTATECHANGED: "onPlayStateChanged",
            ONPARAVAILABLECHANGED: "onParAvailableChanged"
        };
        modeljs_adapter.timeshift.registerCallback = function (methodId, func) {
            switch (methodId) {
                case METHOD_ID.ONPLAYSTATECHANGED:
                    onPlayStateChanged = func;
                    break;
                case METHOD_ID.ONPARAVAILABLECHANGED:
                    onParAvailableChanged = func;
                    break;
                default:
                    DBG_INFO("modeljs_adapter.timeshift: getMethod no method exist");
                    break
            }
        };

        modeljs_adapter.timeshift.setPar = function (path, size, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.SetPar path=" + path + ", size=" + size);
                    model.tshift.setParCallback = callback;
                    model.tshift.SetPar(path, size);
                } catch (e) {
                    DBG_ERROR("model.tshift.SetPar error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                    setTimeout(function () {
                        callback(0, 2);
                    }, 2000);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.isRegistered = function (callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.IsRegistered");
                    model.tshift.registerdCallback = callback;
                    model.tshift.IsRegistered();
                } catch (e) {
                    DBG_ERROR("model.tshift.IsRegistered error=" + e.message);
                }
            } else {
                //test code
                //success
                // var values = new Array(2);
                // values[0] = 512 * 3;
                // values[1] = "/mnt/usb/sda1/";
                //fail
                var values = new Array(2);
                values[0] = -1;
                values[1] = "/mnt/usb/sda1/";

                setTimeout(function () {
                    callback(0, values);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.getParInfo = function (path, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.getParInfo path=" + path);
                    model.tshift.onParInfoCallback = callback;
                    model.tshift.getParInfo([path]);
                } catch (e) {
                    DBG_ERROR("model.tshift.getParInfo error=" + e.message);
                }
            } else {
                //test code
                var values = [];
                if (path == "/mnt/usb/sda1/") {
                    values[0] = 4096;
                    values[1] = 2560;
                    values[2] = 1024;
                } else if (path == "/mnt/usb/sdb1/") {
                    values[0] = 66536;
                    values[1] = 56320;
                    values[2] = 10240;
                } else if (path == "/mnt/usb/sdc1/") {
                    values[0] = 32256;
                    values[1] = 28160;
                    values[2] = 0;
                } else if (path == "/mnt/usb/sdd1/") {
                    values[0] = 15360;
                    values[1] = 512;
                    values[2] = 511;
                }
                setTimeout(function () {
                    callback(values);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.beginShift = function (callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.BeginShift");
                    model.tshift.beginShiftCallBack = callback;
                    model.tshift.BeginShift();
                } catch (e) {
                    DBG_ERROR("model.tshift.BeginShift error=" + e.message);
                }
            } else {
                //test code
                var values = new Array(2);
                values[0] = 0;
                values[1] = 100;
                setTimeout(function () {
                    callback(0, values);
                    modeljs_adapter.timeshift.onPlayStateChanged(TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_1X);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.triplePlay = function (speed) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.TriplePlay speed=" + speed);
                    model.tshift.TriplePlay(speed);
                } catch (e) {
                    DBG_ERROR("model.tshift.TriplePlay error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    modeljs_adapter.timeshift.onPlayStateChanged(speed);
                }, 200);

            }
        };
        modeljs_adapter.timeshift.seek = function (position, callback) {
            if (tv) {
                try {
                    DBG_INFO("tvapi.action.tshift.seek.position position=" + position);
                    model.tshift.onSeeked = callback;
                    model.tshift.seek(position);
                } catch (e) {
                    DBG_ERROR("tvapi.action.tshift.seek.position error=" + e.message);
                }
            } else {

            }
        };
        modeljs_adapter.timeshift.play = function () {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.Play");
                    model.tshift.Play();
                } catch (e) {
                    DBG_ERROR("model.tshift.Play error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    modeljs_adapter.timeshift.onPlayStateChanged(TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_1X);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.pause = function () {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.Pause");
                    model.tshift.Pause();
                } catch (e) {
                    DBG_ERROR("model.tshift.Pause error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    modeljs_adapter.timeshift.onPlayStateChanged(TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_PAUSED);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.stop = function (callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.tshift.Stop");
                    model.tshift.stopCallback = callback;
                    model.tshift.Stop();
                } catch (e) {
                    DBG_ERROR("model.tshift.Stop error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.timeshift.getPlayState = function () {
            var state;
            if (tv) {
                try {
                    state = model.tshift.getPlayState();
                    DBG_ALWAYS("model.tshift.getPlayState state=" + state);
                } catch (e) {
                    DBG_ERROR("model.tshift.getPlayState error=" + e.message);
                }
            } else {
                //test code
                state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_PAUSED;   //just for test on computer
            }
            return state;
        };
        modeljs_adapter.timeshift.getRecordTimesInfo = function () {
            var values;
            var info = {};
            if (tv) {
                try {
                    values = model.tshift.getRecordTimesInfo();
                    DBG_ALWAYS("model.tshift.getRecordTimesInfo values=" + values);
                } catch (e) {
                    DBG_ERROR("model.tshift.getRecordTimesInfo error=" + e.message);
                }
            } else {
                //test code
                values = new Array(6);
                values[0] = "82";
                values[1] = "178";
                values[2] = "0";
                values[3] = "200";
                values[4] = "1";
                values[5] = "1";
            }
            info.current_play_time = parseInt(values[0]);
            info.current_record_time = parseInt(values[1]);
            info.begin_time = parseInt(values[2]);
            info.end_time = parseInt(values[3]);
            info.can_fast_forward = (parseInt(values[4]) == 1);
            info.can_fast_back = (parseInt(values[5]) == 1);
            return info;
        };

        modeljs_adapter.timeshift.onPlayStateChanged = function (value) {
            DBG_INFO("modeljs_adapter: model.tshift.onPlayStateChaged value = " + value);
            if (typeof onPlayStateChanged == "function") {
                var state = parseInt(value);
                onPlayStateChanged(state);
            }
        };
        modeljs_adapter.timeshift.onParAvailableChanged = function (value) {
            DBG_INFO("modeljs_adapter: model.tshift.onParAvailableChaged value = " + value);
            if (typeof onPlayStateChanged == "function") {
                var state = parseInt(value);
                onParAvailableChanged(state);
            }
        };
        modeljs_adapter.timeshift.onTimesInfoChanged = function (values) {
            var current_play_time = parseInt(values[0]);
            var current_record_time = parseInt(values[1]);
            var begin_time = parseInt(values[2]);
            var end_time = parseInt(values[3]);
            //can_fast_forward && can_fast_back are no longer used
            var can_fast_forward = (parseInt(values[4]) == 1);
            var can_fast_back = (parseInt(values[5]) == 1);
            DBG_INFO("modeljs_adapter: model.tshift.onRecordTimesInfoChanged current_play_time[" + current_play_time + "]," +
                " current_record_time[" + current_record_time + "], begin_time[" + begin_time + "], end_time[" + end_time + "]," +
                " can_fast_forward[" + can_fast_forward + "], can_fast_back[" + can_fast_back + "]");
        };

        if (tv) {
            //for time shift model
            model.tshift.onPlayStateChaged = modeljs_adapter.timeshift.onPlayStateChanged;
            model.tshift.onParAvailableChaged = modeljs_adapter.timeshift.onParAvailableChanged;
            model.tshift.onRecordTimesInfoChanged = modeljs_adapter.timeshift.onTimesInfoChanged;
        }
    })();
    (function () {
        var onParStateChanged, onScheduleNotify, onFreeMemThresholdNotify, onRunningStatusChanged, onRecordStateChanged;
        var METHOD_ID = {
            ONPARSTATECHANGED: "onParStateChanged",
            ONSCHEDULENOTIFY: "onScheduleNotify",
            ONFREEMEMTHRESHOLDNOTIFY: "onFreeMemThresholdNotify",
            ONRUNNINGSTATUSCHANGED: "onRunningStatusChanged",
            ONRECORDINGCHANGED: "onRecordStateChanged"
        };
        modeljs_adapter.pvr.registerCallback = function (methodId, func) {
            switch (methodId) {
                case METHOD_ID.ONPARSTATECHANGED:
                    onParStateChanged = func;
                    break;
                case METHOD_ID.ONSCHEDULENOTIFY:
                    onScheduleNotify = func;
                    break;
                case METHOD_ID.ONFREEMEMTHRESHOLDNOTIFY:
                    onFreeMemThresholdNotify = func;
                    break;
                case METHOD_ID.ONRUNNINGSTATUSCHANGED:
                    onRunningStatusChanged = func;
                    break;
                case METHOD_ID.ONRECORDINGCHANGED:
                    onRecordStateChanged = func;
                    break;
                default:
                    DBG_INFO("modeljs_adapter.timeshift: getMethod no method exist");
                    break
            }
        };

        modeljs_adapter.pvr.isRegistered = function (callback) {
            var state = [];
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.getIsRegisterd");
                    state = model.pvr.getIsRegisterd();
                } catch (e) {
                    DBG_ERROR("model.pvr.getIsRegisterd error=" + e.message);
                }
            } else {
                //test code
                state.push(PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_REGISTERED);
                state.push("/mnt/usb/sda1/");
            }
            setTimeout(function () {
                callback(state);
            }, 0);
        };
        modeljs_adapter.pvr.speedTest = function (path, callback) {
            if (tv) {
                try {
                    model.pvr.onSpeedTested = callback;
                    model.pvr.speedTest(path);
                } catch (e) {
                    DBG_ERROR("model.pvr.speedTest error=" + e.message);
                }
            } else {
                //test code
                var speed;
                speed = PvrModelDefines.CONSTRAINT_PVR_LOWSPEED_LIMITE + 2;
                // speed = PvrModelDefines.CONSTRAINT_PVR_LOWSPEED_LIMITE-2;
                setTimeout(function () {
                    callback(0, speed);
                }, 2000);
            }
        };
        modeljs_adapter.pvr.setParInfo = function (path, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.setParInfo path=" + path);
                    model.pvr.onParInfo = callback;
                    model.pvr.setParInfo([path]);
                } catch (e) {
                    DBG_ERROR("model.pvr.setParInfo error=" + e.message);
                }
            } else {
                //test code
                var values = [];
                if (path == "/mnt/usb/sda1/") {
                    //normal case
                    values[0] = 2 * PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE;
                    values[1] = PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE + 1;
                } else if (path == "/mnt/usb/sdb1/") {
                    //low space tip case 1
                    values[0] = 2 * PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE;
                    values[1] = PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE - 1;
                } else if (path == "/mnt/usb/sdc1/") {
                    //low space tip case 2
                    values[0] = 2 * PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE;
                    values[1] = PvrModelDefines.CONSTRAINT_PVR_LOWPARSTOP_SIZE + 1;
                } else if (path == "/mnt/usb/sdd1/") {
                    //low space warn case 1
                    values[0] = 2 * PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE;
                    values[1] = PvrModelDefines.CONSTRAINT_PVR_LOWPARSTOP_SIZE - 1;
                }
                setTimeout(function () {
                    callback(values);
                }, 200);
            }
        };
        modeljs_adapter.pvr.start = function (callback) {
            if (tv) {
                try {
                    model.pvr.onStarted = callback;
                    model.pvr.startRecord();
                } catch (e) {
                    DBG_ERROR("model.pvr.startRecord error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.pvr.stop = function (callback) {
            if (tv) {
                try {
                    model.pvr.onStopped = callback;
                    model.pvr.stopRecord();
                } catch (e) {
                    DBG_ERROR("model.pvr.stopRecord error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.pvr.setLeadTime = function (lead_time) {
            if (tv) {
                try {
                    model.pvr.setLeadTime(lead_time);
                } catch (e) {
                    DBG_ERROR("model.pvr.setLeadTime error=" + e.message);
                }
            } else {
                //test code
            }
        };
        modeljs_adapter.pvr.getLeadTime = function () {
            var value;
            if (tv) {
                try {
                    value = parseInt(model.pvr.getLeadTime());
                } catch (e) {
                    DBG_ERROR("model.pvr.getLeadTime error=" + e.message);
                }
            } else {
                //test code
                value = 5;
            }
            return value;
        };
        modeljs_adapter.pvr.setTrailingTime = function (trailing_time) {
            if (tv) {
                try {
                    model.pvr.setTrailingTime(trailing_time);
                } catch (e) {
                    DBG_ERROR("model.pvr.setTrailingTime error=" + e.message);
                }
            } else {
                //test code
            }
        };
        modeljs_adapter.pvr.getTrailingTime = function () {
            var value;
            if (tv) {
                try {
                    value = parseInt(model.pvr.getTrailingTime());
                } catch (e) {
                    DBG_ERROR("model.pvr.getTrailingTime error=" + e.message);
                }
            } else {
                //test code
                value = 2;
            }
            return value;
        };
        modeljs_adapter.pvr.runningState = function () {
            var state = false;
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.getPvrIsRunning");
                    state = parseInt(model.pvr.getPvrIsRunning());
                } catch (e) {
                    DBG_ERROR("model.pvr.getPvrIsRunning error=" + e.message);
                }
            } else {
                //test code
                state = 1;
            }
            return state;
        };
        modeljs_adapter.pvr.addSchedule = function (info, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.addSchedule info = " + objToString(info));
                    model.pvr.onScheduleAdded = callback;
                    model.pvr.addSchedule(info.channel_id, info.list_uid, info.svl_id, info.program_name,
                        info.begin_time, info.duration, info.repeat_type, info.book_type);
                } catch (e) {
                    DBG_ERROR("model.pvr.addSchedule error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.pvr.editSchedule = function (info, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.editSchedule info=" + objToString(info));
                    model.pvr.onScheduleEdited = callback;
                    model.pvr.editSchedule(info.index, info.program_name, info.begin_time, info.end_time - info.begin_time,
                        info.repeat_type);
                } catch (e) {
                    DBG_ERROR("model.pvr.editSchedule error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.pvr.removeSchedule = function (index, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.removeSchedule index=" + index);
                    if (!Array.isArray(index)) {
                        index = [index];
                    }
                    if (index.length > 0) {
                        model.pvr.onScheduleRemoved = callback;
                        model.pvr.removeSchedule(index);
                    }
                } catch (e) {
                    DBG_ERROR("model.pvr.removeSchedule error=" + e.message);
                }
            } else {
                //test code
                setTimeout(function () {
                    callback(0, 0);
                }, 200);
            }
        };
        modeljs_adapter.pvr.setSchedules = function (list) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.setScheduleItems");
                    model.pvr.setScheduleItems(list);
                } catch (e) {
                    DBG_ERROR("model.pvr.setScheduleItems error=" + e.message);
                }
            }
        };
        modeljs_adapter.pvr.getSchedules = function (callback) {
            var list = [];
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.getScheduleItems");
                    list = model.pvr.getScheduleItems();
                    callback(_generateScheduleList(list));
                } catch (e) {
                    DBG_ERROR("model.pvr.getScheduleItems error=" + e.message);
                }
            } else {
                //test code
                var schedule_info = {
                    index: 0,
                    channel_id: 262,
                    list_uid: 1,
                    svl_id: 2,
                    channel_name: "DC04 1080i",
                    channel_number: "1",
                    program_name: "program name",
                    begin_time: getDVBLongTime() + 30,
                    duration: 1800,
                    end_time: 0,
                    repeat_type: 23,
                    book_type: tp_common.PVR_BOOK_TYPE.PVR
                };
                callback([schedule_info]);
            }
        };
        modeljs_adapter.pvr.setStandby = function (state) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.setRecordStandby state=" + state);
                    model.pvr.setRecordStandby(state);
                } catch (e) {
                    DBG_ERROR("model.pvr.setRecordStandby error=" + e.message);
                }
            } else {
                //test code
            }
        };

        modeljs_adapter.pvr.onParStateChanged = function (value) {
            DBG_INFO("modeljs_adapter: model.pvr.onParStateChanged value = " + value);
            if (typeof onParStateChanged == "function") {
                var state = parseInt(value);
                onParStateChanged(state);
            }
        };
        modeljs_adapter.pvr.onScheduleNotify = function (value) {
            DBG_INFO("modeljs_adapter: model.pvr.onScheduleNotify value = " + value);
            if (typeof onScheduleNotify == "function") {
                var info = _generateScheduleInfo(value);
                onScheduleNotify(info);
            }
        };
        modeljs_adapter.pvr.onFreeMemThresholdNotify = function (value) {
            DBG_INFO("modeljs_adapter: model.pvr.onFreeMemThresholdNotify value = " + value);
            if (typeof onFreeMemThresholdNotify == "function") {
                var state = parseInt(value);
                onFreeMemThresholdNotify(state);
            }
        };
        modeljs_adapter.pvr.onRunningStatusChanged = function (value) {
            DBG_INFO("modeljs_adapter: model.pvr.onRunningStatusChanged value = " + value);
            if (typeof onRunningStatusChanged == "function") {
                onRunningStatusChanged(value);
            }
        };
        modeljs_adapter.pvr.getRecordState = function () {
            var ret = PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_UNKNOWN;
            if (tv) {
                try {
                    DBG_ALWAYS("model.pvr.getRecordState");
                    ret = model.pvr.getRecordState();
                } catch (e) {
                    DBG_ERROR("model.pvr.getRecordState error=" + e.message);
                }
            }
            return ret;
        };
        modeljs_adapter.pvr.onRecordStateChanged = function (value) {
            DBG_INFO("modeljs_adapter: model.pvr.onRecordStateChanged value = " + value);
            if (typeof onRecordStateChanged == "function") {
                var state = parseInt(value);
                onRecordStateChanged(state);
            }
        };
        /**
         * generate the schedule info from modeljs data
         * @param value
         * @returns {{channel_number: Number, channel_id: Number, channel_name: *, program_name: *, list_uid: Number, svl_id: Number, begin_time: Number, duration: Number, repeat_type: Number, book_type: Number, bgm_mode: Number}}
         * @private
         */
        var _generateScheduleInfo = function (value) {
            DBG_INFO("tp_common:_generateScheduleInfo value = " + value);
            return {
                channel_number: value[0],
                channel_id: parseInt(value[1]),
                channel_name: value[2],
                program_name: value[3],
                list_uid: parseInt(value[4]),
                svl_id: parseInt(value[5]),
                begin_time: parseInt(value[6]),
                duration: parseInt(value[7]),
                repeat_type: parseInt(value[8]),
                book_type: parseInt(value[9]),
                bgm_mode: parseInt(value[10])
            };
        };
        /**
         * analyze the schedule value of model
         * @param values
         * @returns {Array}
         * @private
         */
        var _generateScheduleList = function (values) {
            DBG_INFO("tp_common:_generateScheduleList values=" + values + "|length=" + values.length);
            var list = [];
            var i;
            var tmp;
            var vecLen = 11;
            for (i = 0; i < values.length / vecLen; i++) {
                tmp = values.slice(i * vecLen, (i + 1) * vecLen);
                // DBG_INFO("tp_common:_generateScheduleList tmp[" + i + "]=" + tmp);
                list.push({
                    index: parseInt(tmp[0]),
                    channel_number: tmp[1],
                    channel_name: tmp[2],
                    program_name: tmp[3],
                    begin_time: parseInt(tmp[4]),
                    duration: parseInt(tmp[5]),
                    end_time: parseInt(tmp[4]) + parseInt(tmp[5]),
                    repeat_type: parseInt(tmp[6]),
                    book_type: parseInt(tmp[7]),
                    channel_id: parseInt(tmp[8]),
                    list_uid: parseInt(tmp[9]),
                    svl_id: parseInt(tmp[10])
                });
            }
            return list;
        };

        if (tv) {
            model.pvr.onParStateChanged = modeljs_adapter.pvr.onParStateChanged;
            model.pvr.onScheduleNotify = modeljs_adapter.pvr.onScheduleNotify;
            model.pvr.onFreeMemThresholdNotify = modeljs_adapter.pvr.onFreeMemThresholdNotify;
            model.pvr.onRunningStatusChanged = modeljs_adapter.pvr.onRunningStatusChanged;
            model.pvr.onRecordStateChanged = modeljs_adapter.pvr.onRecordStateChanged;
        }
    })();
    (function () {
        var usb_iterator = null;
        var notify_callback = null;
        var MAX_COUNT = 500;
        var onUsbRecordFilesNotify = function (param, event) {
            DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify param is " + param);
            DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify event.type is " + event.type);
            var data = [];
            switch (event.type) {
                case TableIterator.EVENT_TYPE_TOTAL_COUNT:
                    DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify event.totalCount is " + event.totalCount);
                    if (event.totalCount > 0) {
                        usb_iterator.seekToRow(0, TableIterator.SEEK_SET);
                        usb_iterator.readNextRows(event.totalCount < MAX_COUNT ? event.totalCount : MAX_COUNT);
                        return;
                    }
                    break;
                case TableIterator.EVENT_TYPE_ROWS_READ:
                    DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify read rows length = " + event.rows.length);
                    for (var i = 0; i < event.rows.length; i++) {
                        // DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify read rows[" + i + "]  = " + event.rows[i]);
                        if (event.rows[i][0] == UsbModelDefines.SL2_TVAPI_USB_FILE_TYPE_PVR) {
                            data.push({
                                name: event.rows[i][1],
                                path: event.rows[i][2],
                                size: parseInt(event.rows[i][3]) >> 20,    //unit:B=>MB
                                mod_time: event.rows[i][4]
                            });
                        }
                    }
                    break;
                case TableIterator.EVENT_TYPE_SEEK_TO_ROW:
                    DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify seek to row index = " + event.result);
                    break;
                default:
                    DBG_INFO("modeljs_adapter.usb:onUsbRecordFilesNotify other cases");
                    break;
            }
            if (typeof notify_callback == "function") {
                notify_callback(data);
            }
        };
        var parseDiskListInfo = function (usb_file_str) {
            var usb_disk_str;
            var tmp_str_arr = [];
            var result = [];
            var usb_info_path = "";
            var usb_info_name = "";
            var i;
            if (!isNaN(usb_file_str)) {
                DBG_ERROR("modeljs_adapter.usb: parseDiskListInfo usb_file_str is NaN, return []");
                return result;
            }
            usb_disk_str = usb_file_str.split("\n");
            if (usb_disk_str.length > 0) {
                for (i = 0; i < usb_disk_str.length; i++) {
                    if (!!usb_disk_str[i]) {
                        if (tmp_str_arr.indexOf(usb_disk_str[i]) == -1) {
                            usb_info_path = usb_disk_str[i].split(";")[0];
                            usb_info_name = usb_disk_str[i].split(";")[1];
                            tmp_str_arr.push(usb_disk_str[i]);
                            result.push({path: usb_info_path, name: usb_info_name});
                        }
                    }
                }
            }
            return result;
        };
        modeljs_adapter.usb.getRecordFiles = function (disk_path, callback) {
            DBG_INFO("modeljs_adapter.usb.getRecordFiles path is " + disk_path);
            notify_callback = callback;
            if (tv) {
                try {
                    DBG_ALWAYS("model.usb.creatUSBTableMainIterator");
                    usb_iterator = model.usb.creatUSBTableMainIterator(
                        true,
                        [
                            {
                                field: UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_PATH,
                                condition: Model.FIELD_COND_EQUAL,
                                value: disk_path + "pvr"
                            },
                            {
                                field: UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_TYPE,
                                condition: Model.FIELD_COND_EQUAL,
                                value: UsbModelDefines.SL2_TVAPI_USB_FILE_TYPE_PVR
                            }
                        ],
                        [
                            UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_FILE_TYPE,
                            UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_FILE_NAME,
                            UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_FILE_URL,
                            UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_FILE_SIZE,
                            UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_FILE_MOD_TIME
                        ],
                        [
                            {field: UsbModelDefines.SL2_TVAPI_USB_TABLE_FIELD_PATH, direction: 1}
                        ],
                        onUsbRecordFilesNotify.bind(this, disk_path));
                }
                catch (ex) {
                    DBG_ERROR("model.usb.creatUSBTableMainIterator Error" + ex.message);
                }
                usb_iterator.fetchTotalCount();
            } else {
                setTimeout(function () {
                    onUsbRecordFilesNotify("/mnt/usb/sda1/", {
                        type: 1,
                        rows: [[4, "x1", "/mnt/usb/sda1/pvr/x1", 40 * 1024 * 1024, 110],
                            [4, "x2", "/mnt/usb/sda1/pvr/x2", 40 * 1024 * 1024, 110]]
                    });
                }, 200);
            }
        };
        modeljs_adapter.usb.deletePVRFile = function (file_path, callback) {
            if (tv) {
                try {
                    DBG_ALWAYS("model.usb.deletePVR file_path = " + file_path);
                    model.usb.deletePVRHandler = callback;
                    model.usb.deletePVR(file_path);
                } catch (e) {
                    DBG_ERROR("model.usb.deletePVR error=" + e.message);
                }
            } else {
                setTimeout(function () {
                    callback(0, 1);
                }, 200);
            }
        };
        modeljs_adapter.usb.getDiskList = function () {
            var values;
            var tmp_usb_file_str;
            if (tv) {
                try {
                    tmp_usb_file_str = Hisense.File.read("usbs", 0);
                }
                catch (e) {
                    DBG_ERROR("Hisense.File.read error=" + e.message);
                }
                DBG_INFO("modeljs_adapter.usb: getDiskList usblist=" + tmp_usb_file_str);
                values = parseDiskListInfo(tmp_usb_file_str);
            } else {
                //test code
                values = [];
                values[0] = {path: "/mnt/usb/sda1/", name: ""};
                values[1] = {path: "/mnt/usb/sdb1/", name: "yangcheng3"};
                values[2] = {path: "/mnt/usb/sdc1/", name: "lalala"};
                values[3] = {path: "/mnt/usb/sdd1/", name: null};
            }
            return values;
        };
    })();
    (function () {
        modeljs_adapter.system.getUserMode = function () {
            var ret = 0;
            if (tv) {
                try {
                    ret = model.system.getUserMode();
                }
                catch (ex) {
                    DBG_ERROR("modeljs_adapter.system.getUserMode: " + ex.message);
                }
            }
            return ret;
        }
        modeljs_adapter.system.isBGM = function () {
            var is_BGM = false;
            try {
                is_BGM = !!parseInt(model.system.getBgmStatus());
            } catch (e) {
                DBG_ERROR("BGM interface is error!" + e.message);
            }

            DBG_INFO("modeljs_adapter.pvr.isBGM[" + is_BGM + "]");
            return is_BGM;
        };
    })();
    tp_common.init();
    DBG_ERROR("tp_common init finished");
};


/**
 * Created by yangcheng3 on 2016-4-26.
 * timeshift && pvr common interface
 */
var tp_common = {};
tp_common.init = function () {
    (function () {
        /* ========================================
         * ==========model js adapter==============
         * ========================================
         */
        var timeshift = modeljs_adapter.timeshift;
        var pvr = modeljs_adapter.pvr;
        var usb = modeljs_adapter.usb;
        var system = modeljs_adapter.system;

        /* ========================================
         * ==========private vars==================
         * ========================================
         */
        var private_vars = {
            //private states
            _timeshift_player_state: TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED,
            _pvr_schedule_list: [],
            _pvr_current_record_info: {
                begin_time: 0,
                end_time: 0,
                manual_mode: true,
                low_space_tip: 0,
                schedule: null
            },
            _pvr_registerd_disk_path: "",
            _pvr_autostop_timer: -1,
            _pvr_channelchange_time: -1,
            _pvr_channelchange_info: null,

            //private callbacks
            _timeshift_register_success: null,
            _timeshift_register_fail: null,
            _timeshift_setparsuccess_callback: null,
            _pvr_register_success: null,
            _pvr_speedtest_success: null,
            _pvr_register_speedlow_failed: null,
            _pvr_register_spacelow_failed: null,
            _pvr_sourcechange_callback: null,
            _pvr_channelchange_callback: null
        };

        /* ========================================
         * ===========public constants=============
         * ========================================
         */
        /**
         * method id for module callbacks
         * @Enum
         */
        tp_common.METHOD_ID = {
            TP_NOTIFYERROR: "tp-notifyerror",
            TP_SHOWDISKCHECK: "tp-showdiskcheck",
            TP_SHOWRETRYDIALOG: "tp-showretrydialog",
            TP_SHOWDISKLIST: "tp-showdisklist",
            TP_SHOWSPEEDTEST: "tp-showspeedtest",
            TP_SHOWSPEEDRESULT: "tp-showspeedresult",
            TP_PLAYSTATESTARTED: "tp-playstatestarted",
            TP_PLAYSTATESTOPPED: "tp-playstatestopped",
            TIMESHIFT_SHOWPLAYER: "timeshift-showplayer",
            TIMESHIFT_SHOWDISKSELECT: "timeshift-showdiskselect",
            TIMESHIFT_PLAYSTATECHANGED: "timeshift-playstatechanged",
            TIMESHIFT_LEAVETIMESHIFT: "timeshift-leavetimeshift",
            PVR_SHOWPLAYER: "pvr-showplayer",
            PVR_SHOWSELECTPVRREMINDER: "pvr-showselectpvrorreminder",
            PVR_SHOWRECORDSETUP: "pvr-showrecordsetup",
            PVR_SHOWREMINDERSETUP: "pvr-showremindersetup",
            PVR_SHOWRECORDFILES: "pvr-showrecordfiles",
            PVR_SHOWCONFLICT: "pvr-showconflict",
            PVR_SHOWSCHEDULELIST: "pvr-showschedulelist",
            PVR_SCHEDULEADDED: "pvr-scheduleadded",
            PVR_SCHEDULEEDITED: "pvr-scheduleedited",
            PVR_SCHEDULEREMOVED: "pvr-scheduleremoved",
            PVR_SWITCHTOPVR: "pvr-switchtopvr",
            PVR_SWITCHTOREMINDER: "pvr-switchtoreminder",
            PVR_LEAVEPVR: "pvr-leavepvr",
            PVR_SHOWSTARTSTANDBYRECORD: "pvr-showstartstandbyrecord"
        };
        /**
         * error code for notify error
         * @Enum
         */
        tp_common.ERROR_CODE = {

            //timeshift disk error
            TIMESHIFT_NODISK_ERROR: -1001,
            TIMESHIFT_DISKNOTAVAILABLE_ERROR: -1002,
            TIMESHIFT_SETPAR_FAILED: -1003,
            TIMESHIFT_SPACENOTENOUGH: -1004,
            TIMESHIFT_DISKSPEEDLOW_ERROR: -1005,

            //timeshift play error
            TIMESHIFT_BEGINSHIFT_ERROR: -1101,
            TIMESHIFT_STOP_ERROR: -1102,
            TIMESHIFT_HASSTOPPED_ERROR: -1103,

            //pvr disk error
            PVR_DISKSPEEDLOW_ERROR: -2001,
            PVR_DISKSPACELOW_TIP: -2002,
            PVR_DISKSPACELOW_ERROR: -2003,
            PVR_DISKNOTAVAILABLE_ERROR: -2004,

            //pvr play error
            PVR_START_ERROR: -2101,
            PVR_STOP_ERROR: -2102,

            //pvr schedule error
            PVR_ADDSCHEDULE_ERROR: -2201,
            PVR_EDITSCHEDULE_ERROR: -2202,
            PVR_REMOVESCHEDULE_ERROR: -2203,
            PVR_SCHEDULEMAX_ERROR: -2204,

            //pvr delete file error
            PVR_DELETE_FILE_ERROR: -2301,

            //not cached pin error
            PVR_CI_NOT_CACHE_PIN_ERROR: -2401
        };
        /**
         * app id
         * @Enum
         * @private
         */
        var APP_ID = {
            APP_NONE: 0,
            APP_TIMESHIFT: 1,
            APP_PVR: 2,
            APP_HIMEDIA: 3,
            APP_NATIVE: 4,
            APP_HBBTV: 5
        };

        /**
         * PVR Book Type
         * @type {{PVR: number, REMINDER: number}}
         */
        tp_common.PVR_BOOK_TYPE = {
            PVR: 2,
            REMINDER: 1,
            NONE: 0
        };

        /**
         * PVR repeat type
         * @type {{ONCE: number, DAILY: number}}
         */
        tp_common.REPEAT_TYPE = {
            ONCE: 128,
            DAILY: 0
        };
        /* ========================================
         * ===========public interface=============
         * ===============for module===============
         * ===============time shift===============
         * ========================================
         */
        /**
         * start the process of time shift
         * can be called by other module
         */
        tp_common.startTimeShift = function () {
            DBG_INFO("tp_common:startTimeShift");
            if (tp_common.isPvring()) {
                tp_common.leavePvrToStart(function () {
                    setTimeout(tp_common.startTimeShift, 500);
                });
                return;
            } else if (tp_common.isTimeShifting()) {
                sdk_adapter.connectModule("timeshift", tp_common.show_TimeShiftPlayer);
                return;
            }
            sdk_adapter.protectPages();
            private_vars._timeshift_register_success = tp_common.beginTimeShift;
            private_vars._timeshift_register_fail = _show_diskCheck;
            private_vars._timeshift_setparsuccess_callback = tp_common.beginTimeShift;
            isUsbRegisterdTimeShift();
        };
        /**
         * start the process of setup usb device of time shift
         * can be called by other module
         */
        tp_common.startTimeShiftDiskSetup = function () {
            DBG_INFO("tp_common:startTimeShiftDiskSetup");
            sdk_adapter.protectPages();
            private_vars._timeshift_register_success = _show_diskCheck;
            private_vars._timeshift_register_fail = _show_diskCheck;
            private_vars._timeshift_setparsuccess_callback = function () {
                _showSpeedResult(0, function () {
                    if (!!hiWebOsFrame.settingssyspvr && hiWebOsFrame.settingssyspvr.visible) {
                        hiWebOsFrame.settingssyspvr.hiFocus();
                        DBG_INFO("!!hiWebOsFrame.settingssyspvr && hiWebOsFrame.settingssyspvr.visible, return settingssyspvr;")
                        return;
                    }
                });
            };
            // sdk_adapter.connectModule("timeshift", _show_diskCheck);
            currentSelected = "tshift";
            _show_diskCheck();
        };
        tp_common.getCurrentTimeshiftDisk = function (callback) {
            timeshift.isRegistered(callback);
        };
        tp_common.getCurrentPvrDisk = function (callback) {
            pvr.isRegistered(callback);
        };
        /**
         * end the process of time shift
         */
        tp_common.exitTimeShift = function () {
            DBG_INFO("tp_common:exitTimeShift");
            if (tp_common.isTimeShifting()) {
                tp_common.stopTimeShift();
                return;
            }
            sdk_adapter.disconnectModule("timeshift", function () {
                private_vars._timeshift_register_success = null;
                private_vars._timeshift_register_fail = null;
                private_vars._timeshift_setparsuccess_callback = null;
            });
        };
        /**
         * get the flag of whether time shift is working
         * @returns {boolean} the flag of whether time shift is working
         */
        tp_common.isTimeShifting = function () {
            var ret = (private_vars._timeshift_player_state != TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED);
            DBG_INFO("tp_common:isTimeShifting ret[" + ret + "]");
            return ret;
        };

        /**
         * get the info of the usb devices registerd in time shift model
         */
        var isUsbRegisterdTimeShift = function () {
            DBG_INFO("tp_common:isUsbRegistedTimeShift");
            timeshift.isRegistered(_timeshift_DiskRegisterdCallback);
        };
        /**
         * check the status of disk
         */
        tp_common.checkDisk = function () {
            DBG_INFO("tp_common:checkDisk");
            var disk_list = tp_common.getDiskList();
            if ((!disk_list) || disk_list.length == 0) {
                DBG_INFO("tp_common:checkDisk call retry");
                _show_diskRetry();
            } else {
                DBG_INFO("tp_common:checkDisk call disklist");
                _show_diskList(disk_list);
            }
        };
        /**
         * set info of disk selected to time shift
         * @param disk disk path info
         */
        tp_common.selectTimeShiftDisk = function (disk) {
            DBG_INFO("tp_common:selectTimeShiftDisk path=" + disk.path);
            timeshift.getParInfo(disk.path,
                function (values) {
                    DBG_INFO("model.tshift.onParInfoCallback values.length=" + values.length);
                    _timeshift_onParInfo(disk.path, disk.name, values);
                });
        };
        /**
         * begin time shift
         * @private
         */
        tp_common.beginTimeShift = function () {
            DBG_INFO("tp_common:_beginTimeShift");
            sdk_adapter.pauseHbbtv();
            timeshift.beginShift(onBeginTimeShiftCallback);
        };
        /**
         * pause time shift for time shift player
         */
        tp_common.pauseTimeShift = function () {
            DBG_INFO("tp_common:pauseTimeShift");
            timeshift.pause();
        };
        /**
         * resume play time shift for time shift player
         */
        tp_common.resumeTimeShift = function () {
            DBG_INFO("tp_common:resumeTimeShift");
            timeshift.play();
        };
        /**
         * stop time shift for time shift player
         */
        tp_common.stopTimeShift = function (callback) {
            DBG_INFO("tp_common: stopTimeShift callback=" + callback);
            timeshift.stop(function (actionId, value) {
                onTimeShiftStopCallback(actionId, value);
                if (typeof callback == "function" && parseInt(value) == 0) {
                    callback();
                }
            });
        };
        /**
         * seek position of timeshift
         * @param {number} position
         */
        tp_common.seekTimeshiftPosition = function (position) {
            DBG_INFO("tp_common: seekTimeshiftPosition position=" + position);
            timeshift.seek(position, onTimeshiftSeekCallback);
        };
        /***
         * callback of model.tshift.seek
         * @param actionId
         * @param value error code
         */
        var onTimeshiftSeekCallback = function (actionId, value) {
            DBG_INFO("tp_common: onTimeshiftSeekCallback value=" + value);
            var err_code = parseInt(value);
            if (err_code == 0) {
                setTimeout(tp_common.show_TimeShiftPlayer, 2000);
            }
        };
        /**
         * set fast forward of time shift for time shift player
         */
        tp_common.setTimeShiftForward = function () {
            DBG_INFO("tp_common:setTimeShiftForward");
            var state = private_vars._timeshift_player_state;
            if (state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED) {
                DBG_ERROR("setTimeShiftForward player state has stopped");
                // tp_common.notifyError("timeshift", tp_common.ERROR_CODE.TIMESHIFT_HASSTOPPED_ERROR, tp_common.exitTimeShift);
                return;
            }
            if (state < 0 || state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_PAUSED || state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_32X) {
                state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_2X;
            } else {
                state = 2 * state;
            }
            timeshift.triplePlay(state);
        };
        /**
         * set fast back of time shift for time shift player
         */
        tp_common.setTimeShiftBack = function () {
            DBG_INFO("tp_common:setTimeShiftBack");
            var state = private_vars._timeshift_player_state;
            if (state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED) {
                DBG_ERROR("setTimeShiftForward player state has stopped");
                tp_common.notifyError("timeshift", tp_common.ERROR_CODE.TIMESHIFT_HASSTOPPED_ERROR, tp_common.exitTimeShift);
                return;
            }
            if (state > 0 || state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_32X) {
                state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_2X
            } else {
                state = 2 * state;
            }
            timeshift.triplePlay(state);
        };

        /**
         * get the state of time shift for time shift player
         * @returns {number} state the state of time shift
         */
        tp_common.getTimeShiftState = function () {
            DBG_INFO("tp_common:getTimeShiftState state[" + private_vars._timeshift_player_state + "]");
            return private_vars._timeshift_player_state;
        };
        /**
         * get the times info of the program for time shift player
         * @returns {*} times info
         */
        tp_common.getTimeShiftTimesInfo = function () {
            DBG_INFO("tp_common:getTimeShiftTimesInfo");
            return timeshift.getRecordTimesInfo();
        };
        /**
         * callback of selectTimeShiftDisk
         * @param {String} path disk path
         * @param {String} name disk name
         * @param {Array} values disk info
         * @private
         */
        var _timeshift_onParInfo = function (path, name, values) {
            var disk_info = {
                path: path,
                name: name,
                total_space: Math.floor(parseInt(values[0]) / 512),
                free_space: Math.floor(parseInt(values[1]) / 512),
                registerd_space: Math.floor(parseInt(values[2]) / 512)
            };
            DBG_INFO("tp_common:selectTimeShiftDisk total_space[" + disk_info.total_space + "], " +
                "free_space[" + disk_info.free_space + "], registerd_space[" + disk_info.registerd_space + "]");
            if (disk_info.free_space + disk_info.registerd_space < 2) {
                DBG_INFO("tp_common:selectTimeShiftDisk space is not enough, notify error");
                // tp_common.notifyError("timeshift", tp_common.ERROR_CODE.TIMESHIFT_SPACENOTENOUGH, tp_common.exitTimeShift);
                notifyTimeShiftError(tp_common.ERROR_CODE.TIMESHIFT_SPACENOTENOUGH);
            } else {
                DBG_INFO("tp_common:selectTimeShiftDisk space is enough, set size");
                _show_TimeShiftDiskSelectPage(disk_info);
            }
        };
        /**
         * set the usb size to time shift model
         * @param {object} disk_info the path of the usb device to be set
         * @param {number} size the size to be registerd in time shift, n*512M
         */
        tp_common.setTimeShiftUsbInfo = function (disk_info, size) {
            DBG_INFO("tp_common:setTimeShiftUsbInfo usb_path[" + disk_info.path + "]" +
                ", size[" + size + "*512M]");
            timeshift.setPar(disk_info.path, size, _timeshift_SetParCallback);
        };

        tp_common.isUsbRegisterd = function (module_id) {
            var usb_register = null;
            switch (module_id) {
                case "timeshift":
                    usb_register = isUsbRegisterdTimeShift;
                    break;
                case "pvr":
                    usb_register = _isUsbRegisterdPvr;
                    break;
            }
            if (typeof usb_register == "function") {
                usb_register();
            }
        };
        /**
         * register the callbacks to common interface
         * @param {Array} callbacks
         * @param {Array} method_ids
         * @param {String} module_id
         */
        tp_common.registerCallbacks = function (callbacks, method_ids, module_id) {
            var i;
            if ((!method_ids) || (method_ids.length == 0)) {
                DBG_ERROR("tp_common: registerCallbacks methodIDs is null");
                return;
            }
            if (!module_id) {
                DBG_ERROR("tp_common: registerCallbacks module_id is null");
                return;
            }
            for (i = 0; i < method_ids.length; i++) {
                var cb;
                if (callbacks && (typeof callbacks[i] == "function")) {
                    cb = callbacks[i];
                } else {
                    cb = null;
                }
                _register_callback(cb, method_ids[i], module_id);
            }
        };
        /**
         * unregister the callbacks to common interface
         * @param {Array} method_ids
         * @param {String} module_id
         */
        tp_common.unRegisterCallbacks = function (method_ids, module_id) {
            tp_common.registerCallbacks(null, method_ids, module_id);
        };
        /**
         * private method to register/unregister a callback
         * @param callback
         * @param method_id
         * @param module_id
         * @private
         */
        var _register_callback = function (callback, method_id, module_id) {
            switch (method_id) {
                case tp_common.METHOD_ID.TP_NOTIFYERROR:
                    private_vars._tp_notifyerror_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_SHOWDISKCHECK:
                    private_vars._tp_showdiskcheck_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_SHOWRETRYDIALOG:
                    private_vars._tp_showretry_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_SHOWDISKLIST:
                    private_vars._tp_showdisklist_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_PLAYSTATECHANGED:
                    private_vars._timeshift_mediaplayerchanged_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_PLAYSTATESTARTED:
                    private_vars._tp_mediaplayerstarted_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_PLAYSTATESTOPPED:
                    private_vars._tp_mediaplayerstopped_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_SHOWPLAYER:
                    private_vars._timeshift_showplayer_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_SHOWDISKSELECT:
                    private_vars._timeshift_showdiskselect_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_SHOWSPEEDTEST:
                    private_vars._tp_showspeedtest_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TP_SHOWSPEEDRESULT:
                    private_vars._tp_showspeedresult_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_LEAVETIMESHIFT:
                    private_vars._timeshift_leavetimeshift_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWPLAYER:
                    private_vars._pvr_showplayer_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSELECTPVRREMINDER:
                    private_vars._pvr_showselectpvrorreminder[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWRECORDSETUP:
                    private_vars._pvr_showrecordsetup_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWREMINDERSETUP:
                    private_vars._pvr_showremindersetup_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWRECORDFILES:
                    private_vars._pvr_showrecordfiles_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWCONFLICT:
                    private_vars._pvr_showscheduleconflict_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSCHEDULELIST:
                    private_vars._pvr_showschedulelist_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEADDED:
                    private_vars._pvr_scheduleadded_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEEDITED:
                    private_vars._pvr_scheduleedited_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEREMOVED:
                    private_vars._pvr_scheduleremoved_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SWITCHTOPVR:
                    private_vars._pvr_showswitchtopvr_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SWITCHTOREMINDER:
                    private_vars._pvr_showswitchtoreminder_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_LEAVEPVR:
                    private_vars._pvr_leavepvr_callback[module_id] = callback;
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSTARTSTANDBYRECORD:
                    private_vars._pvr_showstartstandbyrecord_callback[module_id] = callback;
                    break;
                default:
                    DBG_ERROR("tp_common:_register_callback METHOD_ID is not exist");
                    break;
            }
        };
        /**
         * private method to get the callback of current module
         * @param method_id
         * @returns {*}
         * @private
         */
        var _getRegisterCallback = function (method_id) {
            var module_id = sdk_adapter.getCurrentModule();
            var callback = null;
            switch (method_id) {
                case tp_common.METHOD_ID.TP_NOTIFYERROR:
                    callback = private_vars._tp_notifyerror_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_SHOWDISKCHECK:
                    callback = private_vars._tp_showdiskcheck_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_SHOWRETRYDIALOG:
                    callback = private_vars._tp_showretry_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_SHOWDISKLIST:
                    callback = private_vars._tp_showdisklist_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_PLAYSTATECHANGED:
                    callback = private_vars._timeshift_mediaplayerchanged_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_PLAYSTATESTARTED:
                    callback = private_vars._tp_mediaplayerstarted_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_PLAYSTATESTOPPED:
                    callback = private_vars._tp_mediaplayerstopped_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_SHOWPLAYER:
                    callback = private_vars._timeshift_showplayer_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_SHOWDISKSELECT:
                    callback = private_vars._timeshift_showdiskselect_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_SHOWSPEEDTEST:
                    callback = private_vars._tp_showspeedtest_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TP_SHOWSPEEDRESULT:
                    callback = private_vars._tp_showspeedresult_callback[module_id];
                    break;
                case tp_common.METHOD_ID.TIMESHIFT_LEAVETIMESHIFT:
                    callback = private_vars._timeshift_leavetimeshift_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWPLAYER:
                    callback = private_vars._pvr_showplayer_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSELECTPVRREMINDER:
                    callback = private_vars._pvr_showselectpvrorreminder[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWRECORDSETUP:
                    callback = private_vars._pvr_showrecordsetup_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWREMINDERSETUP:
                    callback = private_vars._pvr_showremindersetup_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWRECORDFILES:
                    callback = private_vars._pvr_showrecordfiles_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWCONFLICT:
                    callback = private_vars._pvr_showscheduleconflict_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSCHEDULELIST:
                    callback = private_vars._pvr_showschedulelist_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEADDED:
                    callback = private_vars._pvr_scheduleadded_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEEDITED:
                    callback = private_vars._pvr_scheduleedited_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SCHEDULEREMOVED:
                    callback = private_vars._pvr_scheduleremoved_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SWITCHTOPVR:
                    callback = private_vars._pvr_showswitchtopvr_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SWITCHTOREMINDER:
                    callback = private_vars._pvr_showswitchtoreminder_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_LEAVEPVR:
                    callback = private_vars._pvr_leavepvr_callback[module_id];
                    break;
                case tp_common.METHOD_ID.PVR_SHOWSTARTSTANDBYRECORD:
                    callback = private_vars._pvr_showstartstandbyrecord_callback[module_id];
                    break;
                default:
                    DBG_ERROR("tp_common:_getRegisterCallback method_id is not exist");
                    break;
            }
            return callback;
        };

        /* ========================================
         * =====callbacks of time shift module=====
         * ========================================
         */
        /**
         * notify time shift module to show disk check page
         * @private
         */
        var _show_diskCheck = function () {
            hiWebOsFrame.createPage("pvrHardDiskCheck", null, hiWebOsFrame.getCurrentPage(), null, function (page) {
                hiWebOsFrame.pvrHardDiskCheck = page;
                if (hiWebOsFrame.pvrHardDiskCheck.origin.id != "setting_sys_pvr_page") {
                    hiWebOsFrame.pvrHardDiskCheck.origin.close();
                }
                page.open();
                hiWebOsFrame.pvrHardDiskCheck.searchHDTimer = setTimeout(function () {
                    pvrPartitionsInit(0);
                }, 1000);
                page.hiFocus();
            });
        };
        /**
         * notify time shift module to show disk retry page
         * @private
         */
        var _show_diskRetry = function () {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_SHOWRETRYDIALOG);
            if (typeof register_callback == "function") {
                register_callback();
            }
        };
        /**
         * notify time shift module to show player
         */
        tp_common.show_TimeShiftPlayer = function () {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TIMESHIFT_SHOWPLAYER);
            if (typeof register_callback == "function") {
                register_callback();
            }
        };
        /**
         * notify module to show disk list
         * @private
         */
        var _show_diskList = function (disk_list) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_SHOWDISKLIST);
            if (typeof register_callback == "function") {
                register_callback(disk_list);
            }
        };
        /**
         * show disk select page, and pass the disk info
         * @param disk_info
         * @private
         */
        var _show_TimeShiftDiskSelectPage = function (disk_info) {
            // var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TIMESHIFT_SHOWDISKSELECT);
            // if (typeof register_callback == "function") {
            //     register_callback(disk_info);
            // }
            hiWebOsFrame.pvrHDList.close();
            hiWebOsFrame.createPage("shiftHdSizeList", null, null, null, function (page) {
                hiWebOsFrame.shiftHdSizeList = page;
                setLeftParInfo(disk_info);
                page.open();
                page.hiFocus();
            });
        };
        /**
         * notify player has been started
         * @private
         */
        var _show_playerStateStarted = function (info, callback) {
            // var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_PLAYSTATESTARTED);
            // if (typeof register_callback == "function") {
            //     register_callback(info, callback);
            // }
            hiWebOsFrame.noRecordOfCurChannel = true;
            CreateSchdulePvrdialog(hiWebOsFrame.blankPage, info, callback);
        };
        /**
         * notify timeshift player has been changed
         * @private
         */
        var _show_timeshiftplayerStateChanged = function () {
            // var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TIMESHIFT_PLAYSTATECHANGED);
            // if (typeof register_callback == "function") {
            //     register_callback(private_vars._timeshift_player_state);
            // }
            launchTshift();
        };
        /**
         * notify player has been stopped
         * @private
         */
        var _show_playerStateStopped = function (info) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_PLAYSTATESTOPPED);
            if (typeof register_callback == "function") {
                register_callback(info);
            }
        };
        /**
         * notify module to show error page
         * @param {string} module_id
         * @param {number} error_code
         * @param callback after the error page disappear, callback
         */
        tp_common.notifyError = function (module_id, error_code, callback) {
            DBG_ERROR("tp_common.notifyError module = " + module_id + ", err = " + error_code);
            var func = function () {
                // sdk_adapter.connectModule(module_id, function () {
                //     var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_NOTIFYERROR);
                //     if (typeof register_callback == "function") {
                //         register_callback(error_code, callback);
                //     }
                // });
                callback();
            };
            switch (error_code) {
                case tp_common.ERROR_CODE.TIMESHIFT_SETPAR_FAILED:
                case tp_common.ERROR_CODE.TIMESHIFT_SPACENOTENOUGH:
                case tp_common.ERROR_CODE.TIMESHIFT_DISKSPEEDLOW_ERROR:
                case tp_common.ERROR_CODE.TIMESHIFT_BEGINSHIFT_ERROR:
                case tp_common.ERROR_CODE.PVR_DISKSPEEDLOW_ERROR:
                case tp_common.ERROR_CODE.PVR_DISKSPACELOW_ERROR:
                case tp_common.ERROR_CODE.PVR_DISKSPACELOW_TIP:
                case tp_common.ERROR_CODE.PVR_CI_NOT_CACHE_PIN_ERROR:
                case tp_common.ERROR_CODE.PVR_REMOVESCHEDULE_ERROR:
                case tp_common.ERROR_CODE.PVR_DELETE_FILE_ERROR:
                case tp_common.ERROR_CODE.PVR_START_ERROR:
                    func();
                    break;
                default:
                    if (system.isBGM()) {
                        if (typeof callback == "function") {
                            callback();
                        }
                    } else {
                        sdk_adapter.addFuncQueue(func);
                    }
                    break;
            }

        };
        /**
         * notify show a leave timeshift dialog
         * @param callback
         * @private
         */
        var _show_leaveTimeshift = function (callback) {
            DBG_INFO("tp_common:showLeaveTimeshift");
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TIMESHIFT_LEAVETIMESHIFT);
            if (typeof register_callback == "function") {
                register_callback(callback);
            }
        };
        /**
         * get the disk list
         * @returns {*} the list of disks
         */
        tp_common.getDiskList = function () {
            return usb.getDiskList();
        };

        /* ========================================
         * =====callbacks of time shift model======
         * ========================================
         */
        /**
         * callback of model.tshift.SetPar
         * @param actionId
         * @param value result value
         * @private
         */
        var _timeshift_SetParCallback = function (actionId, value) {
            DBG_INFO("tp_common:_timeshift_SetParCallback actionId[" + actionId + "], value[" + value + "]");
            var ret = parseInt(value);
            switch (ret) {
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_BEGIN:
                    _show_speedTest();
                    break;
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_IS_REGED:
                    exitTshiftMediaToTMsg();
                    if (typeof private_vars._timeshift_setparsuccess_callback == "function") {
                        private_vars._timeshift_setparsuccess_callback();
                    }
                    break;
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_OK:
                    _showSpeedResult(0, function () {
                        if (typeof private_vars._timeshift_setparsuccess_callback == "function") {
                            private_vars._timeshift_setparsuccess_callback();
                        }
                    });
                    break;
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_INVALID_PARAM:
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_FAILED:
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_SPEED_LOW:
                    _showSpeedResult(1);
                    break;
                case TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_OTHER_PARAM:
                default:
                    DBG_INFO("tp_common:_timeshift_SetParCallback do nothing!");
                    break;
            }
        };
        /**
         * callback of model.tshift.IsRegistered
         * @param actionId
         * @param values values[0] registered disk size, values[1] disk path
         * @private
         */
        var _timeshift_DiskRegisterdCallback = function (actionId, values) {
            DBG_INFO("tp_common:_timeshift_DiskRegisterdCallback ret[" + actionId + "], values[" + values + "]");
            var registerd_size = parseInt(values[0]);
            var root_path = values[1];
            DBG_INFO("tp_common:_timeshift_DiskRegisterdCallback registerd_size[" + registerd_size + "], " +
                "root_path[" + root_path + "]");
            if (registerd_size >= 1024) {
                if (typeof private_vars._timeshift_register_success == "function") {
                    private_vars._timeshift_register_success();
                }
            }
            else {
                if (typeof private_vars._timeshift_register_fail == "function") {
                    private_vars._timeshift_register_fail();
                }
            }
            sdk_adapter.unprotectPages();
        };
        /**
         * callback of beging shift
         * @param ret
         * @param values values[0] beginTime values[1] beginTime
         * @private
         */
        var onBeginTimeShiftCallback = function (ret, values) {
            DBG_INFO("tp_common:onBeginTimeShiftCallback ret[" + ret + "] values[" + values + "]");
            var begin_time = parseInt(values[0]);
            var end_time = parseInt(values[1]);
            DBG_INFO("tp_common:onBeginTimeShiftCallback begin_time[" + begin_time + "] end_time[" + end_time + "]");
            if (begin_time == 0 && end_time == 0) {
                sdk_adapter.resumeHbbtv();
                DBG_ERROR("tp_common:onBeginTimeShiftCallback begin error");
                private_vars._timeshift_player_state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED;
                tp_common.notifyError("timeshift", tp_common.ERROR_CODE.TIMESHIFT_BEGINSHIFT_ERROR, function () {
                    if (hiWebOsFrame.getCurrentPageId() == "livetv_main" || hiWebOsFrame.getCurrentPageId() == "tshiftMediaDialog" || hiWebOsFrame.getCurrentPageId() == "pvrOrtShiftDialogPage_id") {
                        hiWebOsFrame.createPage('tShiftMsg_id', null, null, null, function (page) {
                            debugPrint('launch tShiftMsg_id start !!!!!');
                            if (!!hiWebOsFrame.tshiftmedia) {
                                if (!!hiWebOsFrame.tshiftmedia.timer) {
                                    clearTimeout(hiWebOsFrame.tshiftmedia.timer);
                                }
                                hiWebOsFrame.tshiftmedia.timer = null;
                                hiWebOsFrame.tshiftmedia.close();
                            }
                            if (hiWebOsFrame.getCurrentPageId() == "pvrOrtShiftDialogPage_id") {
                                hiWebOsFrame.ptDialog.close();
                            }
                            hiWebOsFrame.tshiftMsg = page;
                            hiWebOsFrame.tshiftMsg.operateData.showFlag = 0;
                            page.open();
                            page.hiFocus();
                            debugPrint("UI call time shift stop command!!!!!");
                            hiWebOsFrame.tshiftMsg.rewriteDataOnly();
                            tp_common.stopTimeShift();
                            hiWebOsFrame.tshiftMsg.timer = setTimeout(exitTMsgPage, 3 * 1000);
                        });
                    }
                });
            } else {
                //notify ui started success
                private_vars._timeshift_player_state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_PAUSED;//MT5658EM-696
                sdk_adapter.pauseHbbtv();
                // sdk_adapter.connectModule("timeshift", _show_playerStateStarted);
                _show_timeshiftplayerStateChanged();
            }
        }
        var notifyTimeShiftError = function (id, callback) {
            switch (id) {
                case tp_common.ERROR_CODE.TIMESHIFT_SPACENOTENOUGH:
                    hiWebOsFrame.pvrHDList.close();
                    hiWebOsFrame.createPage('tShiftMsg_id', null, null, null, function (page) {
                        DBG_INFO('launch tShiftMsg_id start !!!!!');
                        hiWebOsFrame.tshiftMsg = page;
                        hiWebOsFrame.tshiftMsg.operateData.showFlag = 1;
                        hiWebOsFrame.tshiftMsg.rewriteDataOnly();
                        page.open();
                        page.hiFocus();
                        hiWebOsFrame.tshiftMsg.timer = setTimeout(exitTMsgPage, 10 * 1000);
                    });
                    break;
                default:
                    break;
            }
        };
        /**
         * callback of model.tshift.Stop
         * @param actionId
         * @param value result of stop
         * @private
         */
        var onTimeShiftStopCallback = function (actionId, value) {
            var ret = parseInt(value);
            DBG_INFO("tp_common:onTimeShiftStopCallback ret[" + ret + "]");
            if (ret != 0) {
                //notify error
            } else {
                private_vars._timeshift_player_state = TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED;
                //notify ui stopped success
                // _show_playerStateStopped();
            }
            sdk_adapter.resumeHbbtv();
        };
        /**
         * callback of time shift player state changed
         * @param value player state
         * @private
         */
        var onTimeshiftPlayStateChanged = function (value) {
            var state = parseInt(value);
            DBG_INFO("tp_common: onTimeshiftPlayStateChanged state[" + state + "]");
            if (private_vars._timeshift_player_state == state) {
                DBG_INFO("tp_common: onTimeshiftPlayStateChanged state is not changed");
                return;
            }
            private_vars._timeshift_player_state = state;
            tShiftPlayStatusChanged(state);
        };
        /**
         * callback of par state changed
         * @param value
         * @private
         */
        var onTimeShiftParAvailableChanged = function (value) {
            var state = parseInt(value);
            DBG_INFO("tp_common:onTimeShiftParAvailableChanged state[" + state + "]");
            if (tp_common.isTimeShifting()) {
                if (state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_NO_DEVICE
                    || state == TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_REMOVED) {
                    //disk is not available, timeshift is stopped, but timeshift model need ui to stop timeshift again
                    //so you cannot call tp_common.exitTimeshift here
                    tp_common.notifyError("timeshift", tp_common.ERROR_CODE.TIMESHIFT_DISKNOTAVAILABLE_ERROR, tp_common.stopTimeShift);
                }
            } else {
                DBG_ERROR("tp_common: onTimeShiftParAvailableChanged timeshift is not running");
            }
        };

        /* ========================================
         * ===========public interface=============
         * ============for pvr module==============
         * ========================================
         */
        /**
         * start the dialog to choose remind or record
         * @param program_info
         */
        tp_common.startRemindOrRecord = function (program_info) {
            var channel = {
                number: program_info.channel_number,
                uid: program_info.channel_id,
                playId: program_info.svl_id,
                listUid: program_info.list_uid
            };
            var schedule_info = _pvr_getScheduleByProgramInfo(channel,
                program_info.begin_time, program_info.end_time);
            if (schedule_info) {
                DBG_INFO("tp_common:startRemindOrRecord program_info = " + objToString(schedule_info));
                switch (schedule_info.book_type) {
                    case tp_common.PVR_BOOK_TYPE.REMINDER:
                        tp_common.startReminderSetup(schedule_info, true);
                        break;
                    case tp_common.PVR_BOOK_TYPE.PVR:
                        tp_common.startRecordSetup(schedule_info, true, true);
                        break;
                    default:
                        sdk_adapter.connectModule("pvr", function () {
                            tp_common.showSelectPvrOrReminder(schedule_info);
                        });
                        break;
                }
            } else {
                sdk_adapter.connectModule("pvr", function () {
                    tp_common.showSelectPvrOrReminder(program_info);
                });
            }
        };
        /**
         * start the process of pvr
         * for live tv & epg starting a process to setup the schedule info
         */
        tp_common.startRecordSetup = function (channel, program_info, is_from_epg, is_edit_mode) {
            DBG_INFO("tp_common: startRecordSetup");
            sdk_adapter.protectPages();
            // if tv in timeshif or pvr status, enable_manual_option should be false
            if (tp_common.isPvring() || tp_common.isTimeShifting()) {
                // page can be opened like from epg
                is_from_epg = true;
            }
            //program_info must have following prop
            //book_index (if not have, can be -1, this is only for epg)
            //uid (channel id/channel)
            //list uid(channel)
            //play id (svl id/channel)
            //channel name (channel name/channel)
            //program name (program)
            //start time (program)
            //end time (program)
            //duration (program)
            //repeat_type (if not have, can be 128, this is only for epg)
            //book_type (if not have, can be 1, this is only for epg)
            var program = {
                index: isNaN(program_info.index) ? -1 : program_info.index,
                uid: program_info.channelUid,
                list_uid: program_info.listUid,
                play_id: program_info.playId,
                program_name: program_info.title,
                begin_time: program_info.startTime,
                end_time: program_info.endTime,
                duration: program_info.endTime - program_info.startTime,
                book_type: program_info.book_type,
                repeat_type: program_info.repeat_type,
                channel_name: program_info.channelName,
                channel_number: program_info.channelNumber
            };
            if (!!channel) {
                program.uid = channel.uid;
                program.list_uid = channel.listUid;
                program.play_id = channel.playId;
                program.channel_name = channel.name;
                program.channel_number = channel.number;
            }
            private_vars._pvr_register_success = private_vars._pvr_speedtest_success = function () {
                program_info.book_type = tp_common.PVR_BOOK_TYPE.PVR;
                var enable_manual_option = !is_from_epg;
                var ori = hiWebOsFrame.livetv_main;
                if (!!hiWebOsFrame.epg && hiWebOsFrame.epg.visible) {
                    ori = hiWebOsFrame.epg;
                }
                openBookEditPage(channel, program, false, enable_manual_option, BookType.RECORD, ori);
            };
            private_vars._pvr_register_speedlow_failed = function () {
                // tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPEEDLOW_ERROR, tp_common.exitPvr);
                hiWebOsFrame.createPage("pvrHDSpeedCheckResult", null, null, null, function (page) {
                    hiWebOsFrame.pvrHDSpeedCheckResult = page;
                    hiWebOsFrame.pvrHDList.destroy();
                    pvrHDSpeedCheckResultPageData.operateData.curListIndex = 1;
                    hiWebOsFrame.pvrHDSpeedCheckResult.rewriteDataOnly();
                    hiWebOsFrame.pvrHDSpeedCheckResult.open();
                    hiWebOsFrame.pvrHDSpeedCheckResult.hiFocus();
                });
            };
            private_vars._pvr_register_spacelow_failed = function () {
                _showSpeedResult(1);
                // tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPACELOW_ERROR, tp_common.exitPvr);
            };
            _isUsbRegisterdPvr();
        };
        /**
         * start the process of reminder
         * for live tv & epg starting a process to setup the schedule info
         */
        tp_common.startReminderSetup = function (channel, program_info, is_edit_mode) {
            DBG_INFO("tp_common:startReminderSetup");
            //program_info must have following prop
            //book_index (if not have, can be -1, this is only for epg)
            //uid (channel id/channel)
            //list uid(channel)
            //play id (svl id/channel)
            //channel name (channel name/channel)
            //program name (program)
            //start time (program)
            //end time (program)
            //duration (program)
            //repeat_type (if not have, can be 128, this is only for epg)
            //book_type (if not have, can be 1, this is only for epg)
            var program = {
                index: isNaN(program_info.index) ? -1 : program_info.index,
                uid: program_info.channelUid,
                list_uid: program_info.listUid,
                play_id: program_info.playId,
                program_name: program_info.title,
                begin_time: program_info.startTime,
                end_time: program_info.endTime,
                duration: program_info.endTime - program_info.startTime,
                book_type: program_info.book_type,
                repeat_type: program_info.repeat_type,
                channel_name: program_info.channelName,
                channel_number: program_info.channelNumber
            };
            if (!!channel) {
                program.uid = channel.uid;
                program.list_uid = channel.listUid;
                program.play_id = channel.playId;
                program.channel_name = channel.name;
                program.channel_number = channel.number;
            }
            var ori = hiWebOsFrame.livetv_main;
            if (!!hiWebOsFrame.epg && hiWebOsFrame.epg.visible) {
                ori = hiWebOsFrame.epg;
            }
            openBookEditPage(channel, program, false, false, BookType.REMINDER, ori);
        };
        /**
         * start the process of pvr
         * for setting starting a process to setup the pvr disk
         */
        tp_common.startPvrDiskSetup = function () {
            DBG_INFO("tp_common:startPvrDiskSetup");
            sdk_adapter.protectPages();
            private_vars._pvr_register_success = _show_diskCheck;
            private_vars._pvr_speedtest_success = function () {
                if (!!hiWebOsFrame.settingssyspvr && hiWebOsFrame.settingssyspvr.visible) {
                    hiWebOsFrame.settingssyspvr.hiFocus();
                    DBG_INFO("!!hiWebOsFrame.settingssyspvr && hiWebOsFrame.settingssyspvr.visible, return settingssyspvr;")
                    return;
                }
            };
            private_vars._pvr_register_speedlow_failed = function () {
                // tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPEEDLOW_ERROR, tp_common.exitPvr);
                _showSpeedResult(1);
            };
            private_vars._pvr_register_spacelow_failed = function () {
                // tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPACELOW_ERROR, tp_common.exitPvr);
                _showSpeedResult(1);
            };
            // sdk_adapter.connectModule("pvr", _show_diskCheck);
            currentSelected = "pvr";
            _show_diskCheck();
        };
        /**
         * show record files for pvr
         */
        tp_common.showRecordFiles = function () {
            DBG_INFO("tp_common:showRecordFiles");
            sdk_adapter.protectPages();
            private_vars._pvr_register_success = private_vars._pvr_speedtest_success
                = private_vars._pvr_register_speedlow_failed
                = private_vars._pvr_register_spacelow_failed = function () {
                sdk_adapter.connectModule("pvr", show_recordFiles, true);
            };
            sdk_adapter.connectModule("pvr", _isUsbRegisterdPvr);
        };
        tp_common.showScheduleList = function () {
            DBG_INFO("tp_common:showScheduleList");
            sdk_adapter.connectModule("pvr", function () {
                //the timer is used to show ui first.
                //if remove this timer, the action of getting schedules will block ui
                setTimeout(function () {
                    pvr.getSchedules(function (list) {
                        _pvr_updateScheduleList(list);
                        _pvr_showScheduleList();
                    });
                }, 250);
            }, true);
        };
        /**
         * get the register disk info of pvr
         * @param callback
         */
        tp_common.getPvrRegisterdDiskInfo = function (callback) {
            DBG_INFO("tp_common:getPvrRegisterdDiskInfo path = " + private_vars._pvr_registerd_disk_path);
            return pvr.setParInfo(private_vars._pvr_registerd_disk_path, callback);
        };
        /**
         * start the process of pvr
         * for the schedule timer trigger this process to begin recording
         * @private
         */
        var _pvr_startRecord = function (info) {
            DBG_INFO("tp_common:_pvr_startRecord");
            if (tp_common.isPvring()) {
                DBG_INFO("tp_common:_pvr_startRecord isPvring = true");
                tp_common.stopRecord(function () {
                    _pvr_startRecord(info);
                });
                return;
            } else if (tp_common.isTimeShifting()) {
                DBG_INFO("tp_common:_pvr_startRecord isTimeShifting = true");
                tp_common.stopTimeShift(function () {
                    _pvr_startRecord(info);
                });
                return;
            }
            sdk_adapter.protectPages();
            private_vars._pvr_register_success = private_vars._pvr_speedtest_success = function () {
                private_vars._pvr_current_record_info.manual_mode = info.manual_mode;
                private_vars._pvr_current_record_info.schedule = info.schedule;
                private_vars._pvr_current_record_info.end_time = info.end_time;

                // sdk_adapter.connectModule("pvr", _begin_recording);
                _begin_recording()
            };
            private_vars._pvr_register_speedlow_failed = function () {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPEEDLOW_ERROR, function () {
                    hiWebOsFrame.createPage("pvrHDSpeedCheckResult", null, null, null, function (page) {
                        hiWebOsFrame.pvrHDSpeedCheckResult = page;
                        hiWebOsFrame.pvrHDSpeedCheckResult.open();
                        pvrHDSpeedCheckResultPageData.operateData.curListIndex = 1;
                        hiWebOsFrame.pvrHDSpeedCheckResult.rewriteDataOnly();
                        hiWebOsFrame.pvrHDSpeedCheckResult.hiFocus();
                    });
                });
            };
            private_vars._pvr_register_spacelow_failed = function () {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKSPACELOW_ERROR, tp_common.exitPvr);
            };
            // sdk_adapter.connectModule("pvr", _isUsbRegisterdPvr);
            _isUsbRegisterdPvr();
        };
        /**
         * end the pvr process
         */
        tp_common.exitPvr = function () {
            DBG_INFO("tp_common:exitPvr");
            if (tp_common.isPvring()) {
                tp_common.stopRecord();
                return;
            }
            sdk_adapter.disconnectModule("pvr", function () {
                if (private_vars._pvr_autostop_timer > 0) {
                    clearTimeout(private_vars._pvr_autostop_timer);
                    private_vars._pvr_autostop_timer = -1;
                }
                private_vars._pvr_current_record_info = {
                    begin_time: 0,
                    end_time: 0,
                    manual_mode: true,
                    low_space_tip: 0,
                    schedule: null
                };
                private_vars._pvr_register_success = null;
                private_vars._pvr_register_spacelow_failed = null;
                private_vars._pvr_register_speedlow_failed = null;
            });
        };
        /**
         * save the record info for pvr
         * for the page of schedule info setup page
         * @param schedule_info the record info to setup
         * @param {boolean} manual_flag manual record or not
         */
        tp_common.saveRecordInfo = function (schedule_info, manual_flag, callback) {
            if (manual_flag) {
                private_vars._pvr_current_record_info.manual_mode = true;
                private_vars._pvr_current_record_info.schedule = schedule_info;
                if (typeof callback == "function") {
                    callback();
                }
                _begin_recording();
            } else if (schedule_info.index < 0) {
                addScheduleInfo(schedule_info, callback);
            } else {
                editScheduleInfo(schedule_info, callback);
            }
        };
        /**
         * get the register status of disk for pvr
         * @private
         */
        var _isUsbRegisterdPvr = function () {
            DBG_INFO("tp_common:_isUsbRegisterdPvr regitser");
            pvr.isRegistered(_pvr_RegisterdCallback);
        };
        /**
         * callback of model.pvr.getIsRegisterd
         * @param values
         * @private
         */
        var _pvr_RegisterdCallback = function (values) {
            DBG_INFO("tp_common:_pvr_RegisterdCallback regitser values is " + values);
            var ret = parseInt(values[0]);
            var path = values[1];
            DBG_INFO("tp_common:_pvr_RegisterdCallback regitser ret is " + ret);
            DBG_INFO("tp_common:_pvr_RegisterdCallback regitser usb_path is " + path);
            switch (ret) {
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_NOT_REGISTERED:
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_SPEED_LOW:
                    _show_diskCheck();
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_REGISTERED:
                    private_vars._pvr_registerd_disk_path = path;
                    if (typeof private_vars._pvr_register_success == "function") {
                        private_vars._pvr_register_success();
                    }
                    break;
                // case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_SPEED_LOW:
                //     private_vars._pvr_registerd_disk_path = path;
                //     if (typeof private_vars._pvr_register_speedlow_failed == "function") {
                //         private_vars._pvr_register_speedlow_failed();
                //     }
                //     break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_SPACE_LOW:
                    private_vars._pvr_registerd_disk_path = path;
                    if (typeof private_vars._pvr_register_spacelow_failed == "function") {
                        private_vars._pvr_register_spacelow_failed();
                    }
                    break;
                default:
                    DBG_ERROR("tp_common:_isUsbRegisterdPvr regitser state is unknown");
                    tp_common.exitPvr();
                    break;
            }
            sdk_adapter.unprotectPages();
        };
        /**
         * set the disk info to pvr
         * @param {Object} disk_info {path:"xx", name:"yyy"}
         */
        tp_common.setPvrParInfo = function (disk_info) {
            DBG_INFO("tp_common:setPvrParInfo disk_path=" + disk_info.path);
            pvr.setParInfo(disk_info.path, function (values) {
                onPvrParInfoCallback(disk_info.path, values);
            });
        };
        /**
         * callback of setPvrParInfo
         * @param {String} path disk path
         * @param {Array} values the result of disk space info checking
         * @private
         */
        var onPvrParInfoCallback = function (path, values) {
            DBG_INFO("tp_common:onPvrParInfoCallback values=" + values);

            // pvr only focus free size
            // var total_size = parseInt(values[0]);
            var free_size = parseInt(values[1]);
            DBG_INFO("tp_common:onPvrParInfoCallback free_size=" + free_size);
            if (free_size < PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE) {
                if (typeof private_vars._pvr_register_spacelow_failed == "function") {
                    private_vars._pvr_register_spacelow_failed();
                }
            } else {
                //_show_speedTest(path);
                startTshiftMediaDialog("pvr", function () {
                    tp_common.pvrDiskSpeedTest(path);
                });
            }
        };
        /**
         * notify to show speed test page
         * @private
         */
        var _show_speedTest = function (path) {
            // var register_callback = _getRegisterCallback(tp_common.METHOD_ID.TP_SHOWSPEEDTEST);
            // if (typeof register_callback == "function") {
            //     register_callback(path);
            // }
        };
        /**
         * notify to show speed test result page
         * @param ret the speed result
         * @param callback
         * @private
         */
        var _showSpeedResult = function (ret, callback) {
            exitTshiftMediaToTMsg();
            hiWebOsFrame.createPage("pvrHDSpeedCheckResult", null, null, null, function (page) {
                DBG_INFO("speed test over and start record!");
                hiWebOsFrame.pvrHDSpeedCheckResult = page;
                hiWebOsFrame.pvrHDSpeedCheckResult.open();
                pvrHDSpeedCheckResultPageData.operateData.curListIndex = ret;
                pvrHDSpeedCheckResultPageData.operateData.callback = callback;
                hiWebOsFrame.pvrHDSpeedCheckResult.rewriteDataOnly();
                hiWebOsFrame.pvrHDSpeedCheckResult.hiFocus();
            });
        };
        /**
         * speed test for pvr disk
         * @param {String} disk_path
         */
        tp_common.pvrDiskSpeedTest = function (disk_path) {
            DBG_INFO("tp_common:pvrDiskSpeedTest disk_path=" + disk_path);
            pvr.speedTest(disk_path, function (actionId, value) {
                var speed = parseInt(value);
                onPvrDiskSpeedTest(disk_path, speed);
            });
        };
        /**
         * callback of speed test
         * @param {String} disk_path
         * @param {Number} speed the speed of the test
         * @private
         */
        var onPvrDiskSpeedTest = function (disk_path, speed) {
            DBG_INFO("tp_common:onPvrDiskSpeedTest path=" + disk_path + ", speed=" + speed);
            exitTshiftMediaToTMsg();
            private_vars._pvr_registerd_disk_path = disk_path;
            if (speed < PvrModelDefines.CONSTRAINT_PVR_LOWSPEED_LIMITE) {
                if (typeof private_vars._pvr_register_speedlow_failed == "function") {
                    private_vars._pvr_register_speedlow_failed();
                }
            } else {
                _showSpeedResult(0, private_vars._pvr_speedtest_success);
            }
        };
        /**
         * get the record files
         */
        tp_common.getRecordFiles = function (callback) {
            DBG_INFO("tp_common.getRecordFiles path is " + private_vars._pvr_registerd_disk_path);
            usb.getRecordFiles(private_vars._pvr_registerd_disk_path, callback);
        };
        /**
         * delete record files
         * @param files
         */
        tp_common.deleteRecordFiles = function (files) {
            var has_err = false;
            var index = 0;
            for (var i = 0; i < files.length; i++) {
                DBG_INFO("tp_common.deleteRecordFiles index=" + i + "|path = " + files[i].path);
                (function () {
                    var file = files[i];
                    usb.deletePVRFile(file.path, function (actionId, value) {
                        has_err = has_err || (parseInt(value) == 0);
                        DBG_INFO("model.usb.deletePVRHandler has_err=" + has_err);
                        index++;
                        if (index == files.length) {
                            _pvr_onFilesDeleted(file, has_err);
                        }
                    });
                })();
            }
        };
        /**
         * callback of model.usb.deletePVR
         * @param file
         * @param err
         * @private
         */
        var _pvr_onFilesDeleted = function (file, err) {
            DBG_INFO("tp_common._pvr_onFilesDeleted file=" + file.path + ", err=" + err);
            if (err) {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DELETE_FILE_ERROR, tp_common.showRecordFiles);
            } else {
                tp_common.showRecordFiles();
            }
        };
        /**
         * get the program book type
         * @param channel channel info of the program
         * @param begin_time begin time of the program
         * @param end_time end time of the program
         * @returns {number} book type
         */
        tp_common.getProgramBookType = function (channel, begin_time, end_time) {
            //TODO
            // return tp_common.PVR_BOOK_TYPE.NONE;
            var schedule = _pvr_getScheduleByProgramInfo(channel, begin_time, end_time);
            var ret = tp_common.PVR_BOOK_TYPE.NONE;
            if (schedule) {
                ret = schedule.book_type;
            }
            // DBG_INFO("tp_common:getProgramBookType type = " + ret);
            return ret;
        };
        /**
         * get the schedule info from some program info
         * @param channel channel info of the program
         * @param begin_time begin time of the program
         * @param end_time end time of the program
         * @returns {*}
         * @private
         */
        var _pvr_getScheduleByProgramInfo = function (channel, begin_time, end_time) {
            if (!channel) {
                DBG_ERROR("tp_common:_pvr_getScheduleByProgramInfo channel is null!");
                return null;
            }
            // DBG_INFO("tp_common:_pvr_getScheduleByProgramInfo channel[" + channel.number + "]," +
            //     " begin_time[" + begin_time + "], end_time[" + end_time + "]");
            var program = {
                channel: channel,
                begin_time: begin_time,
                end_time: end_time
            };
            var current_time = sdk_adapter.getCurrentTime();
            for (var i = 0; i < private_vars._pvr_schedule_list.length; i++) {
                var info = private_vars._pvr_schedule_list[i];
                if (checkProgramMacth(info, program, current_time)) {
                    //same schedule
                    // DBG_INFO("tp_common:_pvr_getScheduleByProgramInfo find schedule!");
                    return info;
                }
            }
            return null;
        };
        var checkProgramMacth = function (info, program, current_time) {
            var ret = false;
            var channel = program.channel;
            if (info.channel_id == channel.uid
                && info.svl_id == channel.playId) {
                var t1 = {
                    begin: info.begin_time,
                    duration: info.end_time - info.begin_time
                };
                var t2 = {
                    begin: program.begin_time,
                    duration: program.end_time - program.begin_time
                };
                if (!_simply_isPeriodMatch(t1, t2)) {
                    return false;
                }
                do {
                    if (_isPeriodMatch(t1, t2)) {
                        ret = true;
                        break;
                    }
                    t1 = tp_common.getNextTime(t1, info.repeat_type, current_time);
                } while (t1.begin < t2.begin + t2.duration)
            }
            return ret;
        };
        /**
         * restore schedule list
         */
        tp_common.restoreScheduleList = function () {
            DBG_INFO("tp_common:restoreScheduleList ");
            pvr.setSchedules([]);
            pvr.getSchedules(_pvr_updateScheduleList);
        };
        /**
         * get the list of pvr schedule
         */
        tp_common.getScheduleList = function () {
            DBG_INFO("tp_common:getScheduleList ");
            return private_vars._pvr_schedule_list;
        };
        tp_common.updateScheduleList = function () {
            DBG_INFO("tp_common:updateScheduleList ");
            pvr.getSchedules(_pvr_updateScheduleList);
        };
        /**
         * add a new schedule to the list
         * @param schedule_info the info to be added
         * @private
         */
        var addScheduleInfo = function (schedule_info, callback) {
            DBG_INFO("tp_common:addScheduleInfo ");
            if (private_vars._pvr_schedule_list.length >= PvrModelDefines.CONSTRAINT_PVR_SCHEDULE_MAXLIMITE) {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_SCHEDULEMAX_ERROR, function () {
                    if (typeof callback == "function") {
                        callback();
                    }
                });
                return;
            }
            var conflict_item = getConflictSchedule(schedule_info);
            if (!conflict_item) {
                pvr.addSchedule(schedule_info, function (actionId, value) {
                    onScheduleAdded(actionId, value, schedule_info, callback);
                });
            } else {
                // _showConflictSchedule(schedule_info, conflict_item);
                if (typeof callback == "function") {
                    callback({
                        id: conflict_item.uid,
                        programs: [schedule_info, conflict_item]
                    });
                }
            }
        };
        /**
         * callback of addScheduleInfo
         * @param {Number} actionId
         * @param {Number} value error code of addScheduleInfo
         * @param schedule_info
         * @private
         */
        var onScheduleAdded = function (actionId, value, schedule_info, callback) {
            var err = parseInt(value);
            DBG_INFO("tp_common:onScheduleAdded err=" + err);
            if (err != 0) {
                if (err == 4) {//check error code
                    tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_CI_NOT_CACHE_PIN_ERROR, function () {
                        pvr.addSchedule(schedule_info, function (actionId, value) {
                            onScheduleAdded(actionId, value, schedule_info, callback);
                        }, callback);
                    });
                } else {
                    tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_ADDSCHEDULE_ERROR, function () {
                        if (typeof callback == "function") {
                            callback();
                        }
                    });
                }
            } else {
                setTimeout(function () {
                    pvr.getSchedules(_pvr_updateScheduleList);
                }, 20);
                DBG_INFO("tp_common:onScheduleAdded _pvr_schedule_list.length=" + private_vars._pvr_schedule_list.length);
                if (typeof callback == "function") {
                    callback();
                }
            }
        };
        /**
         * edit a schedule info
         * @param schedule_info the info to be edited
         * @private
         */
        var editScheduleInfo = function (schedule_info, callback) {
            DBG_INFO("tp_common:editScheduleInfo info=" + objToString(schedule_info));
            var conflict_item = getConflictSchedule(schedule_info);
            if (!conflict_item) {
                pvr.editSchedule(schedule_info, function (a, v) {
                    onScheduleEdited(a, v, callback);
                });
            } else {
                // _showConflictSchedule(schedule_info, conflict_item);
                if (typeof callback == "function") {
                    callback(conflict_item);
                }
            }
        };
        /**
         * callback of editScheduleInfo
         * @param actionId
         * @param {Number} value error code of editScheduleInfo
         * @private
         */
        var onScheduleEdited = function (actionId, value, callback) {
            var err = parseInt(value);
            DBG_INFO("tp_common:onScheduleEdited err=" + err);
            if (err != 0) {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_EDITSCHEDULE_ERROR, function () {
                    if (typeof callback == "function") {
                        callback();
                    }
                });
            } else {
                setTimeout(function () {
                    pvr.getSchedules(_pvr_updateScheduleList);
                }, 20);
                DBG_INFO("tp_common:onScheduleEdited _pvr_schedule_list.length=" + private_vars._pvr_schedule_list.length);
                if (typeof callback == "function") {
                    callback();
                }
            }
        };
        /**
         * notify ui to show conflict page
         * @private
         */
        var _showConflictSchedule = function (info_new, info_conflict) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWCONFLICT);
            if (typeof register_callback == "function") {
                register_callback(info_new, info_conflict);
            }
        };
        /**
         * notify ui to show the list of all schedules
         * @private
         */
        var _pvr_showScheduleList = function () {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWSCHEDULELIST);
            if (typeof register_callback == "function") {
                register_callback();
            }
        };
        /**
         * clear the schedule list
         */
        tp_common.removeAllSchedules = function (callback) {
            var ids = [];
            for (var i = 0; i < private_vars._pvr_schedule_list.length; i++) {
                ids[i] = private_vars._pvr_schedule_list[i].index + "";
            }
            tp_common.removeScheduleInfo(ids, callback);
        };
        var removeSchedulesByDeleteChannels = function () {
            var channels = sdk_adapter.getDeletedChannels();
            var ids = [];
            for (var i = 0; i < private_vars._pvr_schedule_list.length; i++) {
                var schedule_info = private_vars._pvr_schedule_list[i];
                for (var j = 0; j < channels.length; j++) {
                    var channel = channels[j];
                    if ((channel.uid == schedule_info.channel_id)
                        && (channel.playId == schedule_info.svl_id)) {
                        ids.push(schedule_info.index);
                        break;
                    }
                }
            }
            tp_common.removeScheduleInfo(ids);
        };
        /**
         * remove a schedule
         * @param ids the index of schedule which to be removed
         * @param callback
         */
        tp_common.removeScheduleInfo = function (ids, callback) {
            DBG_INFO("tp_common:removeScheduleInfo ids=" + ids);
            if (typeof callback == "function") {
                pvr.removeSchedule(ids, function (actionId, value) {
                    var err = parseInt(value);
                    if (err != 0) {
                        tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_REMOVESCHEDULE_ERROR);
                    } else {
                        pvr.getSchedules(_pvr_updateScheduleList);
                        callback();
                    }
                });
            } else {
                pvr.removeSchedule(ids, onScheduleRemoved);
            }
        };
        /**
         * callback of removeScheduleInfo
         * @param {Number} actionId
         * @param {Number} value error code of removeScheduleInfo
         * @private
         */
        var onScheduleRemoved = function (actionId, value) {
            DBG_INFO("tp_common:onScheduleRemoved value=" + value);
            var err = parseInt(value);
            DBG_INFO("tp_common:onScheduleRemoved err=" + err);
            if (err != 0) {
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_REMOVESCHEDULE_ERROR, function () {
                    sdk_adapter.disconnectModule("pvr");
                });
            } else {
                pvr.getSchedules(_pvr_updateScheduleList);
                sdk_adapter.disconnectModule("pvr");
            }
        };
        /**
         * get the list of conflict programs while a new schedule is added/edited
         * @param schedule_info the new schedule will be added/edited
         * @returns {Array} the conflict list
         * @private
         */
        var getConflictSchedule = function (schedule_info) {
            DBG_INFO("tp_common:getConflictSchedule");
            var l = private_vars._pvr_schedule_list.length;
            var program;
            var current_time = sdk_adapter.getCurrentTime();
            for (var i = 0; i < l; i++) {
                program = private_vars._pvr_schedule_list[i];
                if (_checkConflict(schedule_info, program, current_time)) {
                    DBG_INFO("tp_common:getConflictSchedule has conflict");
                    return program;
                }
            }
            DBG_INFO("tp_common:getConflictSchedule no conflict");
            return null;
        };
        /**
         * check two programs are conflict or not
         * @param program1
         * @param program2
         * @param current_time
         * @returns {boolean} conflict flag
         * @private
         */
        var _checkConflict = function (program1, program2, current_time) {
            DBG_INFO("tp_common:_checkConflict");
            var t1 = {begin: program1.begin_time, duration: program1.duration};
            var t2 = {begin: program2.begin_time, duration: program2.duration};
            DBG_INFO("tp_common:_checkConflict t1.begin=" + t1.begin + "|t1.duration=" + t1.duration);
            DBG_INFO("tp_common:_checkConflict t2.begin=" + t2.begin + "|t2.duration=" + t2.duration);
            var time_limit = current_time + 8 * 24 * 3600;
            var _conflict_algorithm = null;
            var _simply_conflict_algorithm = null;
            if (program1.index == program2.index) {
                //same program
                DBG_INFO("tp_common:_checkConflict same index[" + program1.index + "]");
                return false;
            }
            if ((program1.book_type == tp_common.PVR_BOOK_TYPE.PVR) && (program2.book_type == tp_common.PVR_BOOK_TYPE.PVR)) {
                _conflict_algorithm = _isPeriodConflict;
                _simply_conflict_algorithm = _simply_isPeriodConflict;
            } else {
                _conflict_algorithm = _isTimeConflict;
                _simply_conflict_algorithm = _simply_isTimeConflict;
            }
            if (!_simply_conflict_algorithm(t1, t2)) {
                return false;
            }
            do {
                if (_conflict_algorithm(t1, t2)) {
                    return true;
                }
                if (t1.begin < t2.begin) {
                    t1 = tp_common.getNextTime(t1, program1.repeat_type, current_time);
                } else {
                    t2 = tp_common.getNextTime(t2, program2.repeat_type, current_time);
                }
            } while (t1.begin < time_limit && t2.begin < time_limit);
            return false;
        };
        /**
         * get the next begin time
         * @param time current begin time info
         * @param weekly_type repeat type
         * @param current_time
         * @returns {{begin: *, duration: *}} next time info
         */
        tp_common.getNextTime = function (time, weekly_type, current_time) {
            DBG_INFO("tp_common:getNextTime time=" + time.begin + "| weekly_type=" + weekly_type);
            DBG_INFO("tp_common:getNextTime current_time=" + current_time);
            var off_weeks = Math.floor((current_time - time.begin) / 3600 / 24 / 7) - 1;
            if (off_weeks < 0) {
                off_weeks = 0;
            }
            DBG_INFO("tp_common:getNextTime off_weeks=" + off_weeks);
            var next_begin;
            if (weekly_type == 0) {
                weekly_type = 127;
            }
            weekly_type = weekly_type % 128;
            var i_week = _getWeekDay(time.begin);
            var loop_flag = 0;
            do {
                i_week = (i_week + 1) % 7;
                loop_flag++;
            } while ((0 == ((1 << i_week) & weekly_type)) && loop_flag < 9);
            next_begin = time.begin + loop_flag * 24 * 3600 + 7 * 24 * 3600 * off_weeks;
            return {begin: next_begin, duration: time.duration};
        };
        /**
         * get the day of week
         * @param {number} time the time to translate(seconds)
         * @returns {number} 0~6
         * @private
         */
        var _getWeekDay = function (time) {
            var current_day = new Date(time * sdk_adapter.MILLIBASE);
            return current_day.getDay();

        };
        /**
         * determine two time periods are conflict or not
         * @param t1 time1
         * @param t2 time2
         * @return {boolean} has time conflict
         * @private
         */
        var _isPeriodConflict = function (t1, t2) {
            if (t1.duration * t2.duration == 0) {
                return false;
            }
            if (t1.begin < t2.begin) {
                return !((t1.begin + t1.duration) <= t2.begin);
            }
            if (t2.begin < t1.begin) {
                return !((t2.begin + t2.duration) <= t1.begin);
            }
            return true;
        };
        /**
         * determine two time begin_times are conflict or not
         * @param t1 time1
         * @param t2 time2
         * @returns {boolean} is conflict
         * @private
         */
        var _isTimeConflict = function (t1, t2) {
            var dist = Math.abs(t1.begin - t2.begin);
            return (dist < 60);
        };
        var _isPeriodMatch = function (t1, t2) {
            var dist_begin = Math.abs(t1.begin - t2.begin);
            var dist_end = Math.abs(t1.duration - t2.duration);
            return (dist_begin < 60) && (dist_end < 60);
        };
        var _simply_isPeriodConflict = function (t1, t2) {
            var d1 = new Date(t1.begin * sdk_adapter.MILLIBASE);
            var d2 = new Date(t2.begin * sdk_adapter.MILLIBASE);
            var off_t1 = d1.getUTCHours() * 3600 + d1.getMinutes() * 60;
            var off_t2 = d2.getUTCHours() * 3600 + d2.getMinutes() * 60;
            return _isPeriodConflict({begin: off_t1, duration: t1.duration}, {
                begin: off_t2,
                duration: t2.duration
            });
        };
        var _simply_isTimeConflict = function (t1, t2) {
            var d1 = new Date(t1.begin * sdk_adapter.MILLIBASE);
            var d2 = new Date(t2.begin * sdk_adapter.MILLIBASE);
            var off_t1 = d1.getUTCHours() * 3600 + d1.getMinutes() * 60;
            var off_t2 = d2.getUTCHours() * 3600 + d2.getMinutes() * 60;
            return _isTimeConflict({begin: off_t1, duration: t1.duration}, {begin: off_t2, duration: t2.duration});
        };
        var _simply_isPeriodMatch = function (t1, t2) {
            var d1 = new Date(t1.begin * sdk_adapter.MILLIBASE);
            var d2 = new Date(t2.begin * sdk_adapter.MILLIBASE);
            var off_t1 = d1.getUTCHours() * 3600 + d1.getMinutes() * 60;
            var off_t2 = d2.getUTCHours() * 3600 + d2.getMinutes() * 60;
            return _isPeriodMatch({begin: off_t1, duration: t1.duration}, {begin: off_t2, duration: t2.duration});
        };
        /**
         * update the pvr times info
         * only for pvr player page
         */
        tp_common.updatePvrTimeInfo = function (callback) {
            DBG_INFO("tp_common:updatePvrTimeInfo manual_mode=" + private_vars._pvr_current_record_info.manual_mode);
            var time_info;
            if (private_vars._pvr_current_record_info.manual_mode) {
                _pvr_calculateRemainTime(callback);
            } else {
                time_info = tp_common.getPvrRecordInfo();
                //set timer to auto stop record
                resetRecordAutoStopTimer(time_info);
                if (typeof callback == "function") {
                    callback(time_info);
                }
            }
        };
        /**
         * get the flag of disk low space tip
         * only for pvr player page
         */
        tp_common.getPvrLowSpaceFlag = function () {
            return private_vars._pvr_current_record_info.low_space_tip;
        };
        /**
         * reset the timer to stop recording of auto mode
         * @param time_info the time info of recording
         * @private
         */
        var resetRecordAutoStopTimer = function (time_info) {
            var remaining_sec = time_info.end_time - time_info.current_time;
            DBG_INFO("tp_common:resetRecordAutoStopTimer timeinfo[" + objToString(time_info) + "], remaining_sec[" + remaining_sec + "]");
            clearTimeout(private_vars._pvr_autostop_timer);
            private_vars._pvr_autostop_timer = setTimeout(tp_common.stopRecord, remaining_sec * sdk_adapter.MILLIBASE);
        };
        /**
         * get the pvr times info for pvr module
         */
        tp_common.getPvrRecordInfo = function () {
            var info = {
                current_time: sdk_adapter.getCurrentTime(),
                begin_time: private_vars._pvr_current_record_info.begin_time,
                end_time: private_vars._pvr_current_record_info.end_time + pvr.getTrailingTime() * 60
            };
            DBG_INFO("tp_common:getPvrRecordInfo time info is " + objToString(info));
            return info;
        };
        /**
         * calculate remain time of pvr, only for manual stop mode
         * @private
         */
        var _pvr_calculateRemainTime = function (callback) {
            DBG_INFO("tp_common:_pvr_calculateRemainTime path = " + private_vars._pvr_registerd_disk_path);
            pvr.setParInfo(private_vars._pvr_registerd_disk_path, function (values) {
                var free_size = parseInt(values[1]);
                DBG_INFO("tp_common:_pvr_calculateRemainTime free_size = " + free_size);
                private_vars._pvr_current_record_info.end_time = free_size / PvrModelDefines.CONSTRAINT_PVR_RECORD_RATE + getDVBLongTime();
                callback(tp_common.getPvrRecordInfo());
            });
        };
        /**
         * set the lead time of starting record
         * @param {Number} lead_time the value to be set
         */
        tp_common.setPvrLeadingTime = function (lead_time) {
            DBG_INFO("tp_common:setPvrLeadingTime lead_time=" + lead_time);
            pvr.setLeadTime(lead_time);
        };
        /**
         * get the lead time of starting record
         * @return {Number} the lead time
         */
        tp_common.getPvrLeadingTime = function () {
            var lead_time = pvr.getLeadTime();
            DBG_INFO("tp_common:getPvrLeadingTime lead_time=" + lead_time);
            return lead_time;
        };
        /**
         * set the trailing time of starting record
         * @param {Number} trail_time the value to be set
         */
        tp_common.setPvrTrailingTime = function (trail_time) {
            DBG_INFO("tp_common:setPvrTrailingTime trail_time=" + trail_time);
            pvr.setTrailingTime(trail_time);
        };
        /**
         * get the trailing time of starting record
         * @return {Number} trail_time
         */
        tp_common.getPvrTrailingTime = function () {
            var trail_time = pvr.getTrailingTime();
            DBG_INFO("tp_common:getPvrTrailingTime trail_time=" + trail_time);
            return trail_time;
        };
        /**
         * start the actual recording
         * @private
         */
        var _begin_recording = function () {
            DBG_INFO("tp_common:_begin_recording");
            if (GLOBAL.TV_SUSPENDING) {
                DBG_INFO("tp_common: tv is suspending, just return");
                return;
            }
            _show_playerStateStarted(private_vars._pvr_current_record_info.schedule, function () {
                sdk_adapter.pauseHbbtv();
                pvr.start(onRecordingStarted);
            });
        };
        /**
         * callback of _begin_recording
         * @param actionId
         * @param {Number} value error code of _begin_recording
         * @private
         */
        var onRecordingStarted = function (actionId, value) {
            var err = parseInt(value);
            DBG_INFO("tp_common:onRecordingStarted error_code=" + err);
            if (hiWebOsFrame.pvrRecordTip) {
                hiWebOsFrame.pvrRecordTip.close();
            }
            if (err != 0) {
                sdk_adapter.resumeHbbtv();
                if (err == -1) {//check error code
                    tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_CI_NOT_CACHE_PIN_ERROR, _begin_recording);
                } else {
                    tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_START_ERROR, tp_common.exitPvr);
                }
            } else {
                private_vars._pvr_current_record_info.begin_time = sdk_adapter.getCurrentTime();
                sdk_adapter.pauseHbbtv();
                setTimeout(function () {
                    if (pvr.runningState() > 0) {
                        tp_common.show_PvrPlayer();
                    } else {
                        sdk_adapter.resumeHbbtv();
                        tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_START_ERROR, tp_common.exitPvr);
                    }
                }, 2000);
            }
        };
        /**
         * notify module to show pvr player
         */
        tp_common.show_PvrPlayer = function () {
            if (pvr.runningState() > 0) {
                startToPvr();
            }
        };
        /**
         * stop the recording
         */
        tp_common.stopRecord = function (callback) {
            DBG_INFO("tp_common:stopRecord");
            if (private_vars._pvr_current_record_info.schedule) {
                pvr.stop(function (actionId, value) {
                    onRecordingStopped(actionId, value, function () {
                        sdk_adapter.resumeHbbtv();
                        if (!!hiWebOsFrame.pvrPage.operateData.progressTimer) {
                            clearInterval(hiWebOsFrame.pvrPage.operateData.progressTimer);
                            hiWebOsFrame.pvrPage.operateData.progressTimer = null;
                        }
                        if (typeof callback == "function") {
                            setTimeout(callback, 500);
                            // tp_common.exitPvr();
                        }
                    });
                });
            }
        };
        /**
         * callback of stopRecord
         * @param actionId
         * @param {Number} value error code of stopRecord
         * @param success_func callback of stop successfully
         * @private
         */
        var onRecordingStopped = function (actionId, value, success_func) {
            var err = parseInt(value);
            DBG_INFO("tp_common:onRecordingStopped err=" + err);
            if (err != 0) {
                //after error msg, show player
                tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_STOP_ERROR, tp_common.show_PvrPlayer);
            } else {
                //clear auto stop timer
                clearTimeout(private_vars._pvr_autostop_timer);
                private_vars._pvr_autostop_timer = -1;
                success_func();
            }
        };
        /**
         * get the flag of whether is recording
         * @returns {boolean} the flag of whether is recording
         */
        tp_common.isPvring = function () {
            var running_state = pvr.runningState();
            var record_state = pvr.getRecordState();
            DBG_INFO("tp_common:running_state[" + running_state + "], record_state[" + record_state + "]");
            return running_state > 0 && record_state == PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_RECORDING;
        };
        tp_common.isStandbyRecording = function () {
            return pvr.runningState() == 2;
        };
        /**
         * set the standby recording flag
         * @param {Number} state the flag of standby recording
         */
        tp_common.setPvrRecordStandby = function (state) {
            DBG_INFO("tp_common:setPvrRecordStandby state=" + state);
            if (state == PvrModelDefines.ENUM_SL2_TVAPI_PVR_STANDBY_RECORD) {
                if (system.getUserMode()) {
                    DBG_ERROR("tp_common:onPvrRunningStatusChanged current env is store mode, stop recording and power off");
                    tp_common.stopRecord(sdk_adapter.switchOffTV );
                    return;
                } else {
                    sdk_adapter.notifyOtherModules(sdk_adapter.MESSAGE_TYPE.PVR_STANDBY_RECORDING);
                }
            }
            pvr.setStandby(state);
        };
        /**
         * prepare the environment to start recoding
         * @private
         */
        var prepareEnvAndRecording = function (schedule_info, startFunc) {
            DBG_INFO("tp_common: prepareEnvAndRecording");
            //step 1:if someone app is running, stop it
            var running_app = getRunningApp();
            if (running_app > APP_ID.APP_NONE) {
                DBG_INFO("tp_common: prepareEnvAndRecording app is not none[" + running_app + "]");
                stopApp(running_app, prepareRecordingCallback(schedule_info, startFunc));
                return;
            }
            //step 2:if current source or channel is not correct, change channel
            if (!sdk_adapter.isInDtvSource() || !_isInScheduleChannel(schedule_info)) {
                DBG_INFO("tp_common: prepareEnvAndRecording channel is not in current channel");
                _changeChannel(schedule_info, prepareRecordingCallback(schedule_info, startFunc));
                return;
            }

            if (typeof startFunc == "function") {
                startFunc();
            }
        };
        /**
         * the callback of sth. executing async while prepareEnvAndRecording is running
         * @param schedule_info
         * @param startFunc
         * @returns {Function} prepareEnvAndRecording
         * @private
         */
        var prepareRecordingCallback = function (schedule_info, startFunc) {
            return function () {
                if (typeof private_vars._pvr_sourcechange_callback == "function") {
                    //clear callback
                    private_vars._pvr_sourcechange_callback = null;

                    //Exception: check source to avoid infinite loop
                    if (!sdk_adapter.isInDtvSource()) {
                        DBG_ERROR("change source error");
                        return;
                    }
                }
                if (typeof private_vars._pvr_channelchange_callback == "function") {
                    //MT5658EU-2434, waiting for correct callback
                    //Exception: check channel to avoid infinite loop
                    if (!_isInScheduleChannel(schedule_info)) {
                        DBG_ERROR("change channel error, waiting...");
                        return;
                    }

                    //clear callback
                    private_vars._pvr_channelchange_callback = null;
                    private_vars._pvr_channelchange_time = -1;
                    private_vars._pvr_channelchange_info = null;
                }
                prepareEnvAndRecording(schedule_info, startFunc);
            };
        };
        /**
         * prepare the environment to watch the channel
         * @private
         */
        var prepareEnvAndReminder = function (schedule_info, startFunc) {

            //step 1:if someone app is running, stop it
            var running_app = getRunningApp();
            if (running_app > APP_ID.APP_NONE) {
                stopApp(running_app, prepareReminderCallback(schedule_info, startFunc));
                return;
            }

            //step 2:if current source or channel is not correct, change channel
            if (!sdk_adapter.isInDtvSource() || !_isInScheduleChannel(schedule_info)) {
                _changeChannel(schedule_info, prepareReminderCallback(schedule_info, startFunc));
                return;
            }
            if (typeof startFunc == "function") {
                startFunc();
            }
        };
        /**
         * the callback of sth. executing async while prepareEnvAndReminder is running
         * @param schedule_info
         * @param startFunc
         * @returns {Function}
         * @private
         */
        var prepareReminderCallback = function (schedule_info, startFunc) {
            return function () {
                if (typeof private_vars._pvr_sourcechange_callback == "function") {
                    //clear callback
                    private_vars._pvr_sourcechange_callback = null;
                    //Exception: check source to avoid infinite loop
                    if (!sdk_adapter.isInDtvSource()) {
                        DBG_ERROR("change source error");
                        return;
                    }
                }
                if (typeof private_vars._pvr_channelchange_callback == "function") {
                    //MT5658EU-2434, waiting for correct callback
                    //Exception: check channel to avoid infinite loop
                    if (!_isInScheduleChannel(schedule_info)) {
                        DBG_ERROR("change channel error, waiting...");
                        return;
                    }

                    //clear callback
                    private_vars._pvr_channelchange_callback = null;
                    private_vars._pvr_channelchange_time = -1;
                    private_vars._pvr_channelchange_info = null;
                }
                prepareEnvAndReminder(schedule_info, startFunc);
            };
        };
        /**
         * get the app whitch is running
         * @returns {Number} running_app flag of the running app
         * @private
         */
        var getRunningApp = function () {
            var ret = APP_ID.APP_NONE;
            if (sdk_adapter.checkNativeAppOn()) {
                ret = APP_ID.APP_NATIVE;
            } else if (sdk_adapter.checkMediaRunning()) {
                ret = APP_ID.APP_HIMEDIA;
            } else if (tp_common.isTimeShifting()) {
                ret = APP_ID.APP_TIMESHIFT;
            } else if (tp_common.isPvring()) {
                ret = APP_ID.APP_PVR;
            } else if (sdk_adapter.checkHbbtvOn()) {
                ret = APP_ID.APP_HBBTV;
            }
            DBG_INFO("tp_common:getRunningApp ret is " + ret);
            return ret;
        };
        /**
         * stop the app
         * @param {number} app_id the app id
         * @param callback
         * @private
         */
        var stopApp = function (app_id, callback) {
            DBG_ERROR("tp_common:stopApp the app id=" + app_id);
            switch (app_id) {
                case APP_ID.APP_TIMESHIFT:
                    tp_common.stopTimeShift(callback);
                    break;
                case APP_ID.APP_PVR:
                    tp_common.stopRecord(callback);
                    break;
                case APP_ID.APP_HIMEDIA:
                    sdk_adapter.openLiveTv(true);
                    setTimeout(callback, 50);
                    break;
                case APP_ID.APP_NATIVE:
                    sdk_adapter.stopAllNativeApp(callback);
                    break;
                case APP_ID.APP_HBBTV:
                    sdk_adapter.pauseHbbtv();
                    setTimeout(callback, 100);
                    break;
                default:
                    DBG_ERROR("tp_common:stopApp the app id is not exist!");
                    break;
            }
        };
        /**
         * check current channel is the channel to record
         * @returns {boolean}
         * @private
         */
        var _isInScheduleChannel = function (schedule_info, current_channel) {
            DBG_INFO("tp_common:_isInScheduleChannel schedule_info = " + objToString(schedule_info));
            current_channel = current_channel ? current_channel : sdk_adapter.getCurrentChannel();
            if (current_channel) {
                DBG_INFO("tp_common:_isInScheduleChannel current_channel = " + objToString(current_channel));
                return (current_channel.uid == schedule_info.channel_id)
                    && (current_channel.listUid == schedule_info.list_uid);
            }
            DBG_ERROR("tp_common:_isInScheduleChannel current_channel is not exist!");
            return false;
        };
        /**
         * change to the channel which is desired to be recorded
         * @private
         */
        var _changeChannel = function (schedule_info, callback) {
            var channel;
            DBG_INFO("tp_common:_changeChannel change channel to channel" + schedule_info.channel_number);
            if (tp_common.isPvring()) {
                stopApp(APP_ID.APP_PVR, callback);
                return;
            }
            if (tp_common.isTimeShifting()) {
                stopApp(APP_ID.APP_TIMESHIFT, callback);
                return;
            }
            var retry_limit = 5;
            var doChangeChannel = function () {
                DBG_INFO("tp_common: doChangeChannel");
                if (pvr.runningState() > 0    //fix bug MT5658EM-1531, if pvr is running, retry it
                    || !sdk_adapter.changeChannelByIds(schedule_info.list_uid, schedule_info.channel_id, schedule_info.svl_id)) {
                    if (retry_limit > 0) {
                        DBG_ERROR("tp_common: changeChannelByIds failed, retry_limit[" + retry_limit + "]");
                        setTimeout(doChangeChannel, 1000);
                        --retry_limit;
                        return;
                    } else {
                        DBG_ERROR("tp_common: changeChannelByIds failed, out of limit");
                    }
                } else {
                    private_vars._pvr_channelchange_callback = callback;
                    private_vars._pvr_channelchange_time = sdk_adapter.getCurrentTime(true);
                    private_vars._pvr_channelchange_info = schedule_info;
                    //set flag
                    changeChannelByPvr = true;

                }
                retry_limit = 5;
            };
            doChangeChannel();
        };

        /**
         * register UI observers for pvr
         * only source changed event && channel changed event
         * @private
         */
        var registerUIObservers = function () {
            DBG_INFO("tp_common:registerUIObservers");
            // sdk_adapter.addUIEventListener(sdk_adapter.UI_EVENT_ID.SOURCE_CHANGED_EVENT, onSourceChanged);
            // sdk_adapter.addUIEventListener(sdk_adapter.UI_EVENT_ID.CHANNEL_CHANGED_EVENT, onChannelChanged);
            // sdk_adapter.addUIEventListener(sdk_adapter.UI_EVENT_ID.CHANNEL_UPDATED_EVENT, onChannelUpdate);
        };
        /**
         * callback of source changed event
         * @private
         */
        var onSourceChanged = function () {
            DBG_INFO("tp_common:onSourceChanged");
            if (typeof private_vars._pvr_sourcechange_callback == "function") {
                //after live tv ctrl callbacks being called, run this callback
                setTimeout(private_vars._pvr_sourcechange_callback, 0);
            }
        };
        /**
         * callback of channel changed event
         * @private
         */
        var onChannelChanged = function (current_channel) {
            DBG_INFO("tp_common:onChannelChanged");
            if (typeof private_vars._pvr_channelchange_callback == "function") {
                if (private_vars._pvr_channelchange_time < 0
                    || sdk_adapter.getCurrentTime(true) - private_vars._pvr_channelchange_time > 15) {
                    //MT5658EU-2434, waiting for correct msg, until time out
                    //only wait for 15s
                    //time out && clear callback
                    DBG_ERROR("tp_common:onChannelChanged do not receive correct msg, clear callback");
                    changeChannelByPvr = false;
                    private_vars._pvr_channelchange_callback = null;
                    private_vars._pvr_channelchange_time = -1;
                    private_vars._pvr_channelchange_info = null;
                } else {
                    if (!_isInScheduleChannel(private_vars._pvr_channelchange_info, current_channel)) {
                        DBG_ERROR("tp_common:onChannelChanged not target channel, ignore...");
                        return;
                    }
                    //after live tv ctrl callbacks being called, run this callback
                    changeChannelByPvr = false;
                    private_vars._pvr_channelchange_callback();
                }
            }
        };
        tp_common.onChannelChanged = onChannelChanged;
        var onChannelUpdate = function () {
            DBG_INFO("tp_common:onChannelUpdate");
            removeSchedulesByDeleteChannels();
        };
        /**
         * check whether current environment is suitable to start recording
         * @returns {boolean} the flag of suitable
         * @private
         */
        var _pvr_checkRecordingEnv = function (schedule_info) {
            DBG_INFO("tp_common:_pvr_checkRecordingEnv");
            var running_app = getRunningApp();
            return (running_app == APP_ID.APP_NONE) && sdk_adapter.isInDtvSource() && _isInScheduleChannel(schedule_info);
        };
        /**
         * check whether current environment is suitable to start watching
         * @param schedule_info
         * @returns {boolean}
         * @private
         */
        var _pvr_checkReminderEnv = function (schedule_info) {
            DBG_INFO("tp_common:_pvr_checkReminderEnv");
            var running_app = getRunningApp();
            return (running_app < APP_ID.APP_HIMEDIA) && sdk_adapter.isInDtvSource() && _isInScheduleChannel(schedule_info);
        };
        /* ========================================
         * =========callbacks of pvr module========
         * ========================================
         */
        tp_common.showSelectPvrOrReminder = function (schedule_info) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWSELECTPVRREMINDER);
            if (typeof register_callback == "function") {
                register_callback(schedule_info);
            }
        };
        /**
         * notify pvr module to show record files page
         * @private
         */
        var show_recordFiles = function () {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWRECORDFILES);
            if (typeof register_callback == "function") {
                register_callback();
            }
        };
        /**
         * notify pvr module to show record setup page
         * @param schedule_info
         * @param enable_manual_option
         * @param is_edit_mode
         * @private
         */
        var _show_recordInfoSetup = function (schedule_info, enable_manual_option, is_edit_mode) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWRECORDSETUP);
            if (typeof register_callback == "function") {
                register_callback(schedule_info, enable_manual_option, is_edit_mode);
            }
        };
        /**
         * notify pvr module to show reminder setup page
         * @param schedule_info
         * @param is_edit_mode
         * @private
         */
        var _show_reminderInfoSetup = function (schedule_info, is_edit_mode) {
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_SHOWREMINDERSETUP);
            if (typeof register_callback == "function") {
                register_callback(schedule_info, is_edit_mode);
            }
        };
        /**
         * show the dialog for leaving current page to pvr
         * @param schedule_info
         * @param callback
         * @private
         */
        var _showSwitchToPvr = function (schedule_info, callback) {
            DBG_INFO("tp_common:_showSwitchToPvr");
            hiWebOsFrame.createPage("dialog_reminder", null, null, null, function (page) {
                hiWebOsFrame["dialog_reminder"] = page;
                hiWebOsFrame["dialog_reminder"].callback = callback;
                if (checkIsAppOn()) {
                    startReminderDialogOnApp(schedule_info);
                }
                else if ("dialog_reminder" == hiWebOsFrame.getCurrentPageId()) {
                    openReminderDialog(hiWebOsFrame["dialog_reminder"].origin, schedule_info);
                }
                else if("epos" == hiWebOsFrame.getCurrentPageId()){
                    startReminderDialogOnApp(schedule_info);
                }
                else {
                    closePagesOrModuleByPage(hiWebOsFrame.getCurrentPage());
                    openReminderDialog(hiWebOsFrame.blankPage, schedule_info);
                }

            });
        };
        /**
         * show the dialog for leaving current page to reminder
         * @param schedule_info
         * @param callback
         * @private
         */
        var _showSwicthToReminder = function (schedule_info, callback) {
            DBG_INFO("tp_common:_showSwicthToReminder");
            hiWebOsFrame.createPage("dialog_reminder", null, null, null, function (page) {
                hiWebOsFrame["dialog_reminder"] = page;
                hiWebOsFrame["dialog_reminder"].callback = callback;
                if (checkIsAppOn()) {
                    startReminderDialogOnApp(schedule_info);
                }
                else if("dialog_reminder" == hiWebOsFrame.getCurrentPageId()){
                    // closePagesOrModuleByPage(hiWebOsFrame.getCurrentPage());
                    openReminderDialog(hiWebOsFrame["dialog_reminder"].origin, schedule_info);
                }
                else {
                    closePagesOrModuleByPage(hiWebOsFrame.getCurrentPage());
                    openReminderDialog(hiWebOsFrame.blankPage, schedule_info);
                }

            });
        };
        /**
         * show the dialog for leaving pvr to timeshift
         * @param callback
         * @private
         */
        var _show_leavePvr = function (callback) {
            DBG_INFO("tp_common:_show_leavePvrToStart");
            var register_callback = _getRegisterCallback(tp_common.METHOD_ID.PVR_LEAVEPVR);
            if (typeof register_callback == "function") {
                register_callback(callback);
            }
        };
        /**
         * show the page for start standby record
         * @private
         */
        var showStartStandbyRecord = function () {
            DBG_INFO("tp_common:showStartStandbyRecord");
            var originPage = hiWebOsFrame[LiveTVModule.MAIN];

            if (null == originPage) return;
            originPage.operateData.dialogOptions = {
                titleName: "",
                contentName: getCurrentContentLanguage("Allow recording in standby?"),
                okName: getCurrentContentLanguage('Standby Record'),
                cancelName: getCurrentContentLanguage('Power Off'),
                okCommand: function () {
                    if (tv) {
                        // hiWebOsFrame.lockAllKeys("standby_recording", "NaN");
                        openLiveTVModule([Msg.INFO, 0]);
                        tp_common.setPvrRecordStandby(PvrModelDefines.ENUM_SL2_TVAPI_PVR_STANDBY_RECORD);
                    }
                    else {
                        DBG_ALWAYS("standby record success");
                    }
                },
                cancelCommand: function () {
                    if (tv) {
                        try {//关机前关闭页面，否则 hdr开关机有可能出问题
                            hiWebOsFrame['dialog_common'].close();
                            openLiveTVModule([Msg.INFO, 0]);
                        } catch (ex) {
                            DBG_ERROR(ex.message);
                        }
                        hiWebOsFrame.lockAllKeys("stop.pvr.standy");
                        DBG_ALWAYS("model.pvr.StopRecord()");
                        tp_common.stopRecord(
                            sdk_adapter.switchOffTV
                        );
                    }
                    else {
                        DBG_ALWAYS("only power off");
                    }
                },
                escCommand: function () {
                    DBG_INFO("cancel standby record.");
                    openLiveTVModule([Msg.INFO, 0]);
                }
            }
            createModulePage('dialog_common', originPage);
        };
        var _pvr_updateScheduleList = function (list) {
            private_vars._pvr_schedule_list = list;
            DBG_INFO("tp_common:_pvr_updateScheduleList list_length = " + private_vars._pvr_schedule_list.length);
            // for (var i = 0; i < private_vars._pvr_schedule_list.length; i++) {
            //     DBG_INFO("tp_common:_pvr_updateScheduleList info[" + i + "] = " + objToString(private_vars._pvr_schedule_list[i]));
            // }
            //notify other ui that the list is changed
            setTimeout(sdk_adapter.onScheduleChanged, 200);
        };

        /* ========================================
         * =========callbacks of pvr model=========
         * ========================================
         */
        /**
         * callback of par info changed for pvr
         * model.pvr.onParStateChanged
         * @param state
         * @private
         */
        var onPvrParStateChanged = function (state) {
            DBG_INFO("tp_common:onPvrParStateChanged state=" + state);
            //disk is not available, pvr is stopped, but pvr model need ui to stop pvr again
            //so you cannot call tp_common.exitPvr here
            tp_common.notifyError("pvr", tp_common.ERROR_CODE.PVR_DISKNOTAVAILABLE_ERROR);
        };
        /**
         * callback of a schedule timer is triggered
         * model.pvr.onScheduleNotify
         * @param schedule_info
         */
        var onPvrScheduleNotify = function (schedule_info) {
            DBG_INFO("tp_common:onPvrScheduleNotify");
            if (!GLOBAL.SUPPORT_PVR_TIMESHIFT && schedule_info.book_type == tp_common.PVR_BOOK_TYPE.PVR) {
                DBG_ERROR("tp_common:onPvrScheduleNotify current env is not support pvr");
                return;
            }
            if (GLOBAL.TV_SUSPENDING) {
                DBG_ERROR("tp_common:onPvrScheduleNotify tv is SUSPENDING, ignore this rescording!");
                return;
            }
            if(GLOBAL.PARENTAL_CHILD_LOCK && GLOBAL.PARENTAL_LOCK_SWITCH){
                DBG_ERROR("tp_common:onPvrScheduleNotify tv is lock, ignore this rescording!");
                return;
            }
            var prepare_env = null;
            var check_env = null;
            var start_func = null;
            var show_switch = null;
            pvr.getSchedules(_pvr_updateScheduleList);
            if (schedule_info.book_type == tp_common.PVR_BOOK_TYPE.PVR) {
                prepare_env = prepareEnvAndRecording;
                check_env = _pvr_checkRecordingEnv;
                start_func = function () {
                    var info = {
                        manual_mode: false,
                        schedule: schedule_info,
                        end_time: schedule_info.begin_time + schedule_info.duration
                    };
                    DBG_INFO("tp_common:onPvrScheduleNotify schedule_info = " + objToString(schedule_info));
                    var page = hiWebOsFrame.getCurrentPage();
                    if (page.module == 'epg') {
                        hiWebOsFrame.lockAllKeys("Is exit epg !",500);
                        closeEPGModule();
                    }
                    sdk_adapter.openLiveTv(true);
                    setTimeout(function () {
                        _pvr_startRecord(info);
                        hiWebOsFrame.unLockAllKeys("exit epg succes");
                    }, 20);
                };

                show_switch = function (schedule_info, callback) {
                    _showSwitchToPvr(schedule_info, callback);
                };
            } else {
                prepare_env = prepareEnvAndReminder;
                check_env = _pvr_checkReminderEnv;
                start_func = sdk_adapter.openLiveTv;
                show_switch = function (schedule_info, callback) {
                    _showSwicthToReminder(schedule_info, callback);
                };
            }

            //check standby status
            if (schedule_info.bgm_mode == 1) {
                if (system.getUserMode()) {
                    DBG_ERROR("tp_common:onPvrScheduleNotify current env is store mode, do not support bgm recording!");
                    return;
                }
                prepare_env(schedule_info, start_func);
            } else {
                //check current env is available or not
                if (check_env(schedule_info)) {
                    start_func();
                } else {
                    show_switch(schedule_info, function () {
                        prepare_env(schedule_info, start_func);
                    });
                }
            }
        };
        /**
         * callback of par free space is low
         * model.pvr.onFreeMemThresholdNotify
         * @param {Number} state
         * @private
         */
        var onPvrFreeMemThresholdNotify = function (state) {
            DBG_INFO("tp_common:onPvrFreeMemThresholdNotify state=" + state);
            var msg;
            switch (state) {
                case PvrModelDefines.ENUM_PVR_LOWPARTIP:
                    msg = tp_common.ERROR_CODE.PVR_DISKSPACELOW_TIP;
                    private_vars._pvr_current_record_info.low_space_tip = 1;
                    break;
                case PvrModelDefines.ENUM_PVR_LOWPARSTOP:
                    msg = tp_common.ERROR_CODE.PVR_DISKSPACELOW_ERROR;
                    private_vars._pvr_current_record_info.low_space_tip = 2;
                    break;
                default :
                    DBG_ERROR("tp_common:onPvrFreeMemThresholdNotify non-exit case");
                    return;
            }
            tp_common.notifyError("pvr", msg);
        };
        /**
         * callback of pvr running status changed
         *  model.pvr.onRunningStatusChanged
         * @param state
         * @private
         */
        var onPvrRunningStatusChanged = function (state) {
            DBG_INFO("tp_common:onPvrRunningStatusChanged state=" + state);
            switch (state) {
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_NOT_RUNNING_STATUS:
                    //do nothing
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RUNNING_REMOTE_POWER_STATUS:
                    if (system.getUserMode()) {
                        DBG_ERROR("tp_common:onPvrRunningStatusChanged current env is store mode, stop recording and power off");
                        /*tp_common.stopRecord(function () {
                            sdk_adapter.switchOffTV
                        });*/
                        tp_common.stopRecord(sdk_adapter.switchOffTV );
                        return;
                    }
                    showStartStandbyRecord();
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_RUNNING_PANEL_POWER_STATUS:
                    tp_common.setPvrRecordStandby(PvrModelDefines.ENUM_SL2_TVAPI_PVR_STANDBY_RECORD);
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_CEC_WAKEUP_STATUS:
                    //do nothing
                    // DBG_TODO("tp_common:onPvrRunningStatusChanged CEC case");
                    // sdk_adapter.notifyOtherModules(sdk_adapter.MESSAGE_TYPE.PVR_CEC_NOTIFY);
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_BTN_MENU_STATUS:
                    //do nothing
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_POWER_KEY_STATUS:
                    sdk_adapter.notifyOtherModules(sdk_adapter.MESSAGE_TYPE.PVR_RECORDING_WAKEUP);
                    tp_common.show_PvrPlayer();
                    break;
                case PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_OTHER_KEYS_STATUS:
                    //do nothing
                    break;
                default :
                    DBG_ERROR("tp_common:onPvrRunningStatusChanged non-exist case");
                    break;
            }
        };

        var onRecordStateChanged = function (state) {
            DBG_INFO("tp_common:onRecordStateChanged state=" + state);
            switch (state) {
                case 4:
                    //4,3,-3 are all stop status, but 4 need to wake up third party
                    sdk_adapter.notifyThirdPartyWakeUp();   //need to fall through
                case 3:
                case -3:
                    // if (private_vars._pvr_current_record_info.schedule && !tp_common.isStandbyRecording()) {
                    //     sdk_adapter.connectModule("pvr", function () {
                    //         _show_playerStateStopped(private_vars._pvr_current_record_info.schedule);
                    //     });
                    // }
                    if (private_vars._pvr_current_record_info.schedule && !tp_common.isStandbyRecording()) {
                        sdk_adapter.openLiveTv();
                        setAfterStopPvrWantDo(stopBtnPressedCallBack);
                    }
                    mainAfterStopPvrProcess();
                    break;
                default:
                    break;
            }
        };

        /* ========================================
         * ============public interfaces===========
         * ============for other modules===========
         * ========================================
         */
        /**
         * check whether timeshift or pvr is running
         * @param startFunc after stop pvr/timeshift call startFunc
         * @returns {boolean} the running flag of timeshift or pvr
         */
        tp_common.checkLeaveTimeshiftOrPvr = function (startFunc) {
            var ret = false;
            var func = null;
            if (tp_common.isTimeShifting()) {
                ret = true;
                func = function () {
                    tp_common.stopTimeShift(startFunc);
                    pvrTshiftCancelCommand();
                };
            } else if (tp_common.isPvring()) {
                ret = true;
                func = function () {
                    tp_common.stopRecord(function () {
                        setTimeout(startFunc, 500);
                    });
                    pvrTshiftCancelCommand();
                };
            }
            if (typeof func == "function") {
                setTimeout(function () {
                    PVROrTShiftDialog(hiWebOsFrame.getCurrentPage(),
                        "Sure to exit from PVR or T.shift", func, pvrTshiftCancelCommand);
                }, 200);
            }
            return ret;
        };
        /**
         * show a page to leave timeshift to start other module
         * @param callback
         */
        tp_common.leaveTimeShiftToStart = function (callback) {
            DBG_INFO("tp_common: leaveTimeShiftToStart callback=" + callback);
            sdk_adapter.connectModule("timeshift", function () {
                _show_leaveTimeshift(callback);
            });
        };
        /**
         * show a page to leave pvr to start other module
         * @param callback
         */
        tp_common.leavePvrToStart = function (callback) {
            DBG_INFO("tp_common:leavePvrToStart callback = " + callback);
            sdk_adapter.connectModule("pvr", function () {
                _show_leavePvr(callback);
            });
        };

        /* ========================================
         * =====register the callbacks of model====
         * ========================================
         */
        timeshift.registerCallback("onPlayStateChanged", onTimeshiftPlayStateChanged);
        timeshift.registerCallback("onParAvailableChanged", onTimeShiftParAvailableChanged);

        pvr.registerCallback("onParStateChanged", onPvrParStateChanged);
        pvr.registerCallback("onScheduleNotify", onPvrScheduleNotify);
        pvr.registerCallback("onFreeMemThresholdNotify", onPvrFreeMemThresholdNotify);
        pvr.registerCallback("onRunningStatusChanged", onPvrRunningStatusChanged);
        pvr.registerCallback("onRecordStateChanged", onRecordStateChanged);

        /* ========================================
         * ============init of tp_common===========
         * ========================================
         */
        //while UI is prepared
        //notify pvr model UI is ready
        pvr.setStandby(PvrModelDefines.ENUM_SL2_TVAPI_PVR_UI_IS_READY);

        //sync the schedule list
        pvr.getSchedules(_pvr_updateScheduleList);

        //register the ui observers
        registerUIObservers();
    })();
};
DBG_ERROR("tp_common read js out")