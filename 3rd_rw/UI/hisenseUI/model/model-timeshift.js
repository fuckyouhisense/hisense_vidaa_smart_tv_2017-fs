/**
 * TimeshiftModelDefines  class.
 * Contains all defined constants from Z:/4ui/values-timeshift.h for
 * internal use.
 */

 function TimeshiftModelDefines() {
 }
 {
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_SET_PAR = "tvapi.action.tshift.set.par";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_IS_REGISTERED = "tvapi.action.tshift.is.registered";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PAR_INFO = "tvapi.vstr.tshift.par.info";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_BEGIN_SHIFT = "tvapi.action.tshift.begin.shift";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_TRIPLE_PLAY = "tvapi.action.tshift.triple.play";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PLAY = "tvapi.action.tshift.play";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PAUSE = "tvapi.action.tshift.pause";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_STOP= "tvapi.action.tshift.stop";
     TimeshiftModelDefines.SL2_TVAPI_I32_TSHIFT_PLAY_STATE= "tvapi.i32.tshift.play.state";
     TimeshiftModelDefines.SL2_TVAPI_I32_TSHIFT_PAR_AVAILABLE = "tvapi.i32.tshift.par.available";
     TimeshiftModelDefines.SL2_TVAPI_VSTR_TSHIFT_RECORD_TIMES_INFO = "tvapi.vstr.tshift.record.times.info";
     TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_SEEK_POSITION = "tvapi.action.tshift.seek.position";

     // enum
     //ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_START_REG_FAIL  =  -1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_START_REG_OK  =  0;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_START_REG_REGISTERED  =  1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_ANALYSIS_BEGIN  =  2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_ANALYSIS_PROGRESS  =  3;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_ANALYSIS_OK  =  4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_ANALYSIS_FAIL  =  5;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_CREATE_FILE_BEGIN  =  6;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_CREATE_FILE_PROGRESS  =  7;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_CREATE_FILE_OK  =  8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_CREATE_FILE_FAIL  =  9;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_SPEED_TEST_BEGIN  =  10;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_SPEED_TEST_PROGRESS  =  11;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_SPEED_TEST_LOW  =  12;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_SPEED_TEST_OK  =  13;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_SPEED_TEST_FAIL  =  14;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_REG_DEV_STATE_REG_FINISHED  =  15;

     //ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE_UNKNOWN = -4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE_START_FAIL = -3;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE_STOP_FAIL = -2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE_START_OK = 2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_ACTION_STATE_STOP_OK = 3;

     //ENUM_SL2_TVAPI_TSHIFT_PAR_INFO
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_INFO_MEM_INDEX  =  0;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_INFO_FREE_MEM_INDEX  =  1;

     //ENUM_SL2_TVAPI_TSHIFT_TRIPLE_PLAY
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_1X   =  1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_2X   =  2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_4X   =  4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_8X   =  8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_16X  =  16;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FF_32X  =  32;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_1X   = -1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_2X   =  -2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_4X   =  -4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_8X   =  -8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_16X  =  -16;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_TRIPLE_FB_32X  =  -32;

     //ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_1X    =  1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_2X    =  2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_4X    =  4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_8X    =  8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_16X   =  16;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FF_32X   =  32;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_1X    =  -1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_2X    =  -2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_4X    =  -4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_8X    =  -8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_16X   =  -16;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_FB_32X   =  -32;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_PAUSED   =  33;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PLAY_STATE_STOPPED  =  34;

     //ENUM_SL2_TVAPI_TSHIFT_PAR
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_NO_DEVICE  =  0;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_INSETTED  =  1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_REMOVED  =  2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_FORMATED  =  3;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_SELECTED  =  4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_DEVICE_AVAIL  =  5;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_CHG_ANOTHER_AVAIL  =  6;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_READY  =  7;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_DEVICE_FULL  =  8;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_DEVICE_TOO_SMALL  =  9;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_PAR_DEVICE_READ_ONLY  =  10;

     //
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_BEGIN  =  0;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_IS_REGED  =  1;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_OK  =  2;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_INVALID_PARAM  =  3;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_SPEED_LOW  =  4;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_TEST_FAILED  =  5;
     TimeshiftModelDefines.ENUM_SL2_TVAPI_TSHIFT_SETPAR_OTHER_PARAM  =  100;
}
/**
 * TimeshiftModel class derived from SubModel.
 */
function TimeshiftModel( parentModel ) {
    SubModel.call( this, parentModel, TimeshiftModelDefines );

    // --------------------------------------------------------------
    // Objects
    // --------------------------------------------------------------
// SetPar
    this.registerSubObject = function () {
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_SET_PAR,
        [
            {
                name: "SetPar", method: function (e, path, size) {
                return e.invoke(path, size);
            }
            }
        ], "setParCallback");

    // is regist
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_IS_REGISTERED,
        [
            {
                name: "IsRegistered", method: function (e) {
                return e.invoke();
            }
            }
        ], "registerdCallback");

    // ParInfo
    this.registerStringVectorObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PAR_INFO,
        "null", "getParInfo", "onParInfoCallback",
        null, null);

    // BeginShift
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_BEGIN_SHIFT,
        [
            {
                name: "BeginShift", method: function (e) {
                return e.invoke();
            }
            }
        ], "beginShiftCallBack");

    // TriplePlay
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_TRIPLE_PLAY,
        [
            {
                name: "TriplePlay", method: function (e, speed) {
                return e.invoke(speed);
            }
            }
        ], "null");

    // Play
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PLAY,
        [
            {
                name: "Play", method: function (e) {
                return e.invoke();
            }
            }
        ], "null");

    // Pause
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_PAUSE,
        [
            {
                name: "Pause", method: function (e) {
                return e.invoke();
            }
            }
        ], "null");

    // Stop
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_STOP,
        [
            {
                name: "Stop", method: function (e) {
                return e.invoke();
            }
            }
        ], "stopCallback");

    // PlayState
    this.registerIntegerObject(
        TimeshiftModelDefines.SL2_TVAPI_I32_TSHIFT_PLAY_STATE,
        "getPlayState", "null", "onPlayStateChaged",
        null, null);

    //PAR AVAILABLE
    this.registerIntegerObject(
        TimeshiftModelDefines.SL2_TVAPI_I32_TSHIFT_PAR_AVAILABLE,
        "null", "null", "onParAvailableChaged",
        null, null);

    //RECORD TIMES INFO
    this.registerStringVectorObject(
        TimeshiftModelDefines.SL2_TVAPI_VSTR_TSHIFT_RECORD_TIMES_INFO,
        "getRecordTimesInfo", "null", "onRecordTimesInfoChanged",
        null, null);
    // Seek Position
    this.registerActionObject(
        TimeshiftModelDefines.SL2_TVAPI_ACTION_TSHIFT_SEEK_POSITION,
        [
            {
                name: "seek", method: function (e,p) {
                return e.invoke(p);
            }
            }
        ], "onSeeked");}
}
TimeshiftModel.prototype = new SubModel();
TimeshiftModel.prototype.constructor = TimeshiftModel;
{
    // --------------------------------------------------------------
    // Static constants
    // --------------------------------------------------------------
    SubModel.registerStaticConstants(
            TimeshiftModel, TimeshiftModelDefines,
            [
            ] );
}
