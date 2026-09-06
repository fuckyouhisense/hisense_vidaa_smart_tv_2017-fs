/**
 * Created by jiaguili on 2017/8/16.
 */
GLOBAL = {
    CURRENT_AREA: "SA",
    CURRENT_COUNTRY: "ARG",
    //UI_BRAND: "nob",
    LAUNCHER_THEME: "",
    //MODULEID : "launcher1",
    //PATHID : "launcher1",
    //CURRENT_Platform_config:"",
    //CAM_MSG_TYPE: 0,
    CEC_CONTROL: 0,
    CEC_DEVICE_EXIST: 0,
    CEC_ARC_STATE: 0,
    //SPEAKER_STATE:0,
    //VOICEOUT_DEVICE:0,
    CURRENT_LANGUAGE: "eng",
    //CURRENT_CHLIST_INDEX: 0,
    //CURRENT_SOURCE: 0,
    CURRENT_BRAND:'',
    CURRENT_SVR_MSG: 0,
    //CURRENT_TOAST_TYPE: 0,
    DATE_FORMAT: "dmy",
    DATE_SEPARATOR: "/",
    DEVICE_ID:'',
    //DISABLE_MESSAGE : false,
    DST_SECONDS: 0,
    //DST_UPDATE_TIME: 0,
    //DTV_PAUSED: false,
    //EDIT_FILTER_INDEX:0,
    //FACTORY: 0,
    //FREEVIEW_VERSION: false,
    //HBBTV_KEYSET: 0,
    //HBBTV_PAUSED: false,
    //HICONTRAST : false,
    //LOCKED: false,
    LOG_Report_DEVICEID_InitFlag:false,
    //MASTER_KEY: "0532",
    MAC_ADDRESS:'',
    //MEDIA_STARTUP_FLAG:false,
    MODEL_NAME:'',
    //MSG_BOX_TYPE: 0,
    //MHEG5_STATUS: 0,
    //MHLAVAILABLE: 0,
    MILLIBASE: 1000,
    //MISS_CURRENT_CHANNEL: false,
    APP_POWER_ON: 0,
    //NO_SIGNAL: false,
    //NOT_SUPPORTED: false,
    //NUM_INPUT_INDEX:0,
    PARENTAL_LOCK_SWITCH: 0,
    PARENTAL_CHILD_LOCK: 0,
    PLATFORM:'',
    READY_SUSPENDING: false,
    REMOTE_TYPE:'',
    //RTL:false,
    SETTING_TIMEOUT_DELAY:0,
    //SOFTKEYBOAD_INITED : false,
    //SOURCE_LIST: [],
    //STANDBY_FLAG: 0,
    //TV_SUSPENDING: 0,
    //TELETEXT_STATUS: 0,
    TIME_FORMAT: 0,
    TIMEZONE_SECONDS: 8 * 3600,
    //AUTO_SLEEP:1,
    //TTS : false,
    //UNLOCKED: false,
    WAIT_POWERON: 0,
    //LockParentIndex: 0,
    //StartSearchFromLiveTV: false,
    //BLUETOOTH_SUPPORT:true,
    StartChannelEditFromLiveTV: false,
    HOTEL_MODE:0,
    //HOTEL_KB_LOCK:0,
    //HOTEL_SEARCH_LOCK:0,
    //HOTEL_SUBMENU_LOCK:0,
    //HOTEL_AUTO_SLEEP:0,
    //HOTEL_MIN_VOLUME:0,
    //HOTEL_MAX_VOLUME:100,
    //PROTECTED_TIME:false,
    SUPPORT_PVR_TIMESHIFT: true,
    //PICTURE_MODE_TOAST:0,
    LAST_APPCMD:null,
    DROP_NETFLIX_STOP:false,
    LOG_KEY_ARRAY :[],
    STAND_BY_NETFLIX:1,
    STAND_BY_AMAZON:2,
    STAND_BY_VUDU:3,
    STAND_BY_YOUTUBE:4,
    STAND_BY_FANDANGONOW:5


    /* ADD the GLOAL variable, waiting the message pool ready to update the values .add by jiaguili*/
};

newsanBrandList=['nob','jvc','san','phi','ilo','pio','sei','ton','shp','psc'];
hasAutoSleepCountryListEM=["DZA","IRN","ARE"];

var ENUM_INDEX = 0;
function CHIPS() {
    ENUM_INDEX = 0;
}
CHIPS();
//CHIPS.TTS = ENUM_INDEX++;
//CHIPS.KEYBOARD = ENUM_INDEX++;
CHIPS.AUDIO_ONLY = ENUM_INDEX++;
CHIPS.EPG = ENUM_INDEX++;
CHIPS.AUDIO_TRACK = ENUM_INDEX++;
CHIPS.CLOSED_CAPTION= ENUM_INDEX++;
//CHIPS.SND_MODE = ENUM_INDEX++;
//CHIPS.ASPECT = ENUM_INDEX++;
//CHIPS.FAVOURITE = ENUM_INDEX++;
CHIPS.SUBTITLE = ENUM_INDEX++;
CHIPS.SAP = ENUM_INDEX++;
CHIPS.AUDIO_LANGUAGE = ENUM_INDEX++;
CHIPS.HEAD_PHONE = ENUM_INDEX++;
CHIPS.TELETEXT = ENUM_INDEX++;
CHIPS.PIC_MODE = ENUM_INDEX++;
CHIPS.SND_MODE = ENUM_INDEX++;
CHIPS.GINGA = ENUM_INDEX++;

//CHIPS.KEY_FEATURE = ENUM_INDEX++;
//CHIPS.SELLER_SETTING = ENUM_INDEX++;

function NetWorkType() {

}
NetWorkType.ETHER = 0;
NetWorkType.WIRELESS = 1;
NetWorkType.OFF = 2;

function NetWorkConnect() {

}
NetWorkConnect.CONNECT = 1;
NetWorkConnect.DISCONNECT = 0;

function NetWorkIpConfig() {

}
NetWorkIpConfig.MANUAL = 1;
NetWorkIpConfig.DHCP = 0;
//function LauncherCMD() {
//    ENUM_INDEX = 0;
//}
//LauncherCMD();
//LauncherCMD.APP = ENUM_INDEX++;
//LauncherCMD.LIVETV = ENUM_INDEX++;
//LauncherCMD.HIMEDIA = ENUM_INDEX++;
//LauncherCMD.SETTINGS = ENUM_INDEX++;
//LauncherCMD.ALLINPUTS = ENUM_INDEX++;
//LauncherCMD.NOTIFICATION = ENUM_INDEX++;
//LauncherCMD.ALLAPP = ENUM_INDEX++;
//LauncherCMD.RECOMMEND = ENUM_INDEX++;
//LauncherCMD.CHANNEL = ENUM_INDEX++;
//LauncherCMD.INPUT = ENUM_INDEX++;
//LauncherCMD.ALLAPPTITLES = ENUM_INDEX++;
//LauncherCMD.YOUTUBE_VIDEO = ENUM_INDEX++;
function HOTKEY_TIMEOUT(){};
HOTKEY_TIMEOUT.YOUTUBETIMEOUT=null;

function SvrMsg() {
    ENUM_INDEX = 0;
}

SvrMsg();
SvrMsg.EMPTY = 0;//ENUM_INDEX++;
SvrMsg.NO_SIGNAL = 1;//ENUM_INDEX++;
SvrMsg.SCAN_CH = 2;//ENUM_INDEX++;
SvrMsg.GETTING_DATA = 3;//ENUM_INDEX++;
SvrMsg.LOCKED_CH = 4;//ENUM_INDEX++;
SvrMsg.LOCKED_PROG = 5;// ENUM_INDEX++;
SvrMsg.LOCKED_INP = 6;//ENUM_INDEX++;
SvrMsg.NO_EVN_TILE = 7;//ENUM_INDEX++;
SvrMsg.HIDDEN_CH = 8;//ENUM_INDEX++;
SvrMsg.AUDIO_PROG = 9;//ENUM_INDEX++;
SvrMsg.NO_AUDIO_VIDEO = 10;//ENUM_INDEX++;
SvrMsg.NO_EVN_DTIL = 11;//ENUM_INDEX++;
SvrMsg.NO_CH_DTIL = 12;//ENUM_INDEX++;
SvrMsg.NO_AUDIO_STRM = 13;//ENUM_INDEX++;
SvrMsg.NO_VIDEO_STRM = 14;//ENUM_INDEX++;
SvrMsg.PLS_WAIT = 15;//ENUM_INDEX++;
SvrMsg.VIDEO_NOT_SUPPORT = 16;//ENUM_INDEX++;
SvrMsg.HD_VIDEO_NOT_SUPPORT = 17;//ENUM_INDEX++;
SvrMsg.NON_BRDCSTING = 18;//ENUM_INDEX++;
SvrMsg.NO_CH_IN_LIST = 19;//ENUM_INDEX++;
SvrMsg.TTX_SBTI_X_RATED_BLOCKED = 20;//ENUM_INDEX++;
SvrMsg.SCRAMBLED = 21;//ENUM_INDEX++;
SvrMsg.MAX_COUNT = 22//ENUM_INDEX;
SvrMsg.LAST_VAILD_ENTRY = 255;


function LogReportData(){

}
LogReportData.currentOperateTime = 0;
LogReportData.currentOperateName = "";
LogReportData.currentContentTime = 0;
LogReportData.currentContentName = "";
LogReportData.currentTagType = 0;
LogReportData.currentLauncherTime = 0;
LogReportData.currentLauncherPanelTime = 0;
LogReportData.currentHotKeyTime = 0;
LogReportData.GTLauncherTitleActionAddFlag=false;
LogReportData.LauncherRunCloseReason=2;
LogReportData.appStateAlreadyClosed=true;
LogReportData.LauncherPanelCloseReasonTimeOut=false;

function LogKeyArray(){

}
LogKeyArray.up="UP";
LogKeyArray.down="DOWN";
LogKeyArray.left="LEFT";
LogKeyArray.right="RIGHT";
LogKeyArray.volUp="VOLUME_UP";
LogKeyArray.volDown="VOLUME_DOWN";
