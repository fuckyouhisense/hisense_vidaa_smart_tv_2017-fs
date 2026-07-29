/**
 * PvrModelDefines  class.
 * Contains all defined constants from Y:/jspp/common/include/model/values/values-pvr.h for
 * internal use.
 */

 function PvrModelDefines() {
 }
 {
     PvrModelDefines.SL2_TVAPI_VSTR_PVR_IS_REGISTERED = "tvapi.vstr.pvr.is.registered";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_SPEED_TEST = "tvapi.action.pvr.speed.test";
     PvrModelDefines.SL2_TVAPI_VSTR_PVR_PAR_INFO = "tvapi.vstr.pvr.par.info";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_START_RECORD = "tvapi.action.pvr.start.record";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_STOP_RECORD = "tvapi.action.pvr.stop.record";
     PvrModelDefines.SL2_TVAPI_I32_PVR_LEAD_TIME = "tvapi.i32.pvr.lead.time";
     PvrModelDefines.SL2_TVAPI_I32_PVR_TRAILING_TIME = "tvapi.i32.pvr.trailing.time";
     PvrModelDefines.SL2_TVAPI_I32_PVR_RECORD_STATE = "tvapi.i32.pvr.record.state";
     PvrModelDefines.SL2_TVAPI_I32_PVR_PAR_AVAILABLE = "tvapi.i32.pvr.par.available";
     PvrModelDefines.SL2_TVAPI_I32_PVR_IS_RUNNING = "tvapi.i32.pvr.is.running";
     PvrModelDefines.SL2_TVAPI_VSTR_PVR_SCHEDULE_ITEM = "tvapi.vstr.pvr.schedule.item";
     PvrModelDefines.SL2_TVAPI_I32_PVR_FREE_MEM_THRESHOLD = "tvapi.i32.pvr.free.mem.threshold";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_ADD = "tvapi.action.pvr.schedule.add";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_EDIT = "tvapi.action.pvr.schedule.edit";
     PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_REMOVE = "tvapi.action.pvr.schedule.remove";
     PvrModelDefines.SL2_TVAPI_VSTR_PVR_ALL_SCHEDULE_ITEMS = "tvapi.vstr.pvr.all.schedule.items";
     PvrModelDefines.SL2_TVAPI_I32_PVR_RUNNING_STATUS = "tvapi.i32.pvr.running.status";
     PvrModelDefines.SL2_TVAPI_I32_PVR_RECORD_STANDBY = "tvapi.i32.pvr.record.standby";

     // enum
     //ENUM_PVR_IS_REGISTERED
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_NOT_REGISTERED = 0;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_REGISTERED = 1;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_SPEED_LOW = 2;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RECORD_SPACE_LOW = 3;
     //ENUM_PVR_RECORD_STATE
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_UNKNOWN = 0;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_RECORDING = 1;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_SAVING = 2;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STATE_STOPPED = 3;
     //ENUM_PVR_PAR
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_NO_DEVICE  =  0;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_INSETTED  =  1;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_REMOVED  =  2;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_FORMATED  =  3;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_SELECTED  =  4;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_DEVICE_AVAIL  =  5;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_CHG_ANOTHER_AVAIL  =  6;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_READY  =  7;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_DEVICE_FULL  =  8;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_DEVICE_TOO_SMALL  =  9;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_PAR_DEVICE_READ_ONLY  =  10;
     //ENUM_I32_PVR_RUNNING_STATUS
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_NOT_RUNNING_STATUS = 0;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RUNNING_REMOTE_POWER_STATUS = 1;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_RUNNING_PANEL_POWER_STATUS = 2;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_CEC_WAKEUP_STATUS = 3;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_BTN_MENU_STATUS = 4;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_POWER_KEY_STATUS = 5;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_WAKEUP_BY_OTHER_KEYS_STATUS = 6;
     //ENUM_I32_PVR_RECORD_STANDBY
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STANDBY_RECORD = 0;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_STANDBY_STOP = 1;
     PvrModelDefines.ENUM_SL2_TVAPI_PVR_UI_IS_READY = 2;

     //ENUM self defined
     PvrModelDefines.ENUM_PVR_LOWPARTIP = 1;
     PvrModelDefines.ENUM_PVR_LOWPARSTOP = 2;
     //constants
     PvrModelDefines.CONSTRAINT_PVR_LOWPARTIP_SIZE = 1440;     //15min, 1.6MB/s
     PvrModelDefines.CONSTRAINT_PVR_LOWPARSTOP_SIZE = 192;     // 2min, 1.6MB/s
     PvrModelDefines.CONSTRAINT_PVR_LOWSPEED_LIMITE = 3072;  // 3*1024KB/s
     PvrModelDefines.CONSTRAINT_PVR_SCHEDULE_MAXLIMITE = 35;
     PvrModelDefines.CONSTRAINT_PVR_RECORD_RATE = 1.6; // 1.6MB/s
     //repeat type
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_EVERYDAY = 0;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_SUN = 1;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_MON = 2;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_TUE = 4;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_WED = 8;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_THU = 16;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_FRI = 32;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_SAT = 64;
     PvrModelDefines.CONSTRAINT_PVR_REPEAT_ONCE = 128;
}
/**
 * PvrModel class derived from SubModel.
 */
function PvrModel( parentModel ) {
    SubModel.call( this, parentModel, PvrModelDefines );

    // --------------------------------------------------------------
    // Objects
    // --------------------------------------------------------------
	// registerd
    this.registerSubObject = function () {
        this.registerStringVectorObject(
            PvrModelDefines.SL2_TVAPI_VSTR_PVR_IS_REGISTERED,
            "getIsRegisterd", "null", "null",
            null, null);
        //speed test
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_SPEED_TEST,
            [
                {
                    name: "speedTest", method: function (e, p) {
                    return e.invoke(p);
                }
                }
            ], "onSpeedTested");
        //par info
        this.registerStringVectorObject(
            PvrModelDefines.SL2_TVAPI_VSTR_PVR_PAR_INFO,
            "null", "setParInfo", "onParInfo",
            null, null);
        //start record
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_START_RECORD,
            [
                {
                    name: "startRecord", method: function (e) {
                    return e.invoke();
                }
                }
            ], "onStarted");
        //stop record
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_STOP_RECORD,
            [
                {
                    name: "stopRecord", method: function (e) {
                    return e.invoke();
                }
                }
            ], "onStopped");
        //lead time
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_LEAD_TIME,
            "getLeadTime", "setLeadTime", "null",
            null, null);
        //Trailing time
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_TRAILING_TIME,
            "getTrailingTime", "setTrailingTime", "null",
            null, null);
        //par available
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_PAR_AVAILABLE,
            "null", "null", "onParStateChanged",
            null, null);
        //pvr is running
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_IS_RUNNING,
            "getPvrIsRunning", "null", "null",
            null, null);
        //schedule event
        this.registerStringVectorObject(
            PvrModelDefines.SL2_TVAPI_VSTR_PVR_SCHEDULE_ITEM,
            "null", "null", "onScheduleNotify",
            null, null);
        //free mem event
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_FREE_MEM_THRESHOLD,
            "null", "null", "onFreeMemThresholdNotify",
            null, null);
        //add schedule
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_ADD,
            [
                {
                    name: "addSchedule",
                    method: function (e, ch_id, l_id, s_id, p_name, s_time, duration, repeat, b_mode) {
                        return e.invoke(ch_id, l_id, s_id, p_name, s_time, duration, repeat, b_mode);
                    }
                }
            ], "onScheduleAdded");
        //edit schedule
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_EDIT,
            [
                {
                    name: "editSchedule",
                    method: function (e, i, pn, st, d, wd) {
                        return e.invoke(i, pn, st, d, wd);
                    }
                }
            ], "onScheduleEdited");
        //remove schedule
        this.registerActionObject(
            PvrModelDefines.SL2_TVAPI_ACTION_PVR_SCHEDULE_REMOVE,
            [
                {
                    name: "removeSchedule",
                    method: function (e, i) {
                        return eval("e.invoke(" + i + ");");
                    }
                }
            ], "onScheduleRemoved");
        //schedule items
        this.registerStringVectorObject(
            PvrModelDefines.SL2_TVAPI_VSTR_PVR_ALL_SCHEDULE_ITEMS,
            "getScheduleItems", "setScheduleItems", "null",
            null, null);
        // running status
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_RUNNING_STATUS,
            "getPvrRunningStatus", "setPvrRunningStatus", "onRunningStatusChanged",
            null, null);
        // standby
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_RECORD_STANDBY,
            "null", "setRecordStandby", "null",
            null, null);
        //pvr state
        this.registerIntegerObject(
            PvrModelDefines.SL2_TVAPI_I32_PVR_RECORD_STATE,
            "getRecordState", "null", "onRecordStateChanged",
            null, null);
    }

}
PvrModel.prototype = new SubModel();
PvrModel.prototype.constructor = PvrModel;
{
    // --------------------------------------------------------------
    // Static constants
    // --------------------------------------------------------------
    SubModel.registerStaticConstants(
            PvrModel, PvrModelDefines,
            [
            ] );
}
