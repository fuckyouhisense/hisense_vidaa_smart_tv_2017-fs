/**
 * Created by BOB on 2014/11/3.
 */

function getTVStorePageData(opts) {

    return appTVStore.pageData;
}


function AppTVStore() {
    var self = this;

    self.pageData = {};

    var oprtData = {
        command: '',
        isRemoteKey: false,
        amName: "tv_store",
        commandType: 0,
        appStarted: false,
        storeType: 0
    };

    var storeTypeMap = {
        95: "tv_store",
        81: "[tv_store,-s,foxxum]",
        93: "[tv_store,-s,netrange]",
        94: "tv_store",
        10000: "tv_store"
    }

    var urlLauncherMap = {
        95: "",
        81: ",-s,foxxum",
        93: ",-s,netrange",
        94: "",
        96: ",-s,accedo",
        0: ",-s,other",
        10000: ",-s,emptyID"
    }

    self.pageData.operateData = oprtData;
    //var appOpened = false;
    self.onFocusTVStore = function () {
        hiWebOsFrame.registerKeyCodesForAppExcludeKey();
    }
    self.onOpenTVStore = function () {
        //hiWebOsFrame.registerKeyCodesForAppExcludeKey();
        if (oprtData.appStarted) return;
        oprtData.appStarted = true;
        opera4xType = "app_tv_store";
        if (!oprtData.storeType) {
            oprtData.storeType = 95;
        }

        DBG_INFO("start:[" + oprtData.command + "][" + oprtData.storeType + "]");
//        var cmd1 = storeTypeMap[oprtData.storeType];
//        var cmd2 = urlLauncherMap[oprtData.storeType];

        if ("tv_store" == oprtData.command) {    //Opera Store
            writeFileToNative("startfromappstore", " ", 0);
            // sendAM(":am,am,:start=" + cmd1);
            if (!oprtData.storeType) {
                oprtData.storeType = StoreType.FOXXUM;
            }
            if (oprtData.storeType == StoreType.FOXXUM) {
                sendAM(":am,opera4x,:resume=[-s,foxxum]");
            } else if (oprtData.storeType == StoreType.OPERA) {
                sendAM(":am,opera4x,:resume=[-s,opera]");
            }
        }
        else if ("wuaki" == oprtData.command) {
            sendAM(':am,opera4x,:resume=[-s,store,-u,' + HSAPPURL.WUAKI + "]");
        }
        else if (HSAPPURL.CATAL == oprtData.command || HSAPPURL.IPLAYER == oprtData.command ||
            HSAPPURL.NEWS == oprtData.command || HSAPPURL.SPORT == oprtData.command ||
            HSAPPURL.HDPLUS == oprtData.command || oprtData.command.indexOf("bbc.co.uk") > -1
            || oprtData.command.indexOf("bbctvapps.co.uk") > -1) {
            resumeHBBTV();
            setTimeout(function () {
                sendAM(":am,opera4x,:resume=[-s,hbbtv,-u," + oprtData.command + "]");
            }, 1000);
        }
        else {
            writeFileToNative("startfromappstore", " ", 0);
            // sendAM(':am,am,:start=[tv_store,-u,' + oprtData.command + cmd2);
            if (oprtData.storeType == StoreType.STORE) {
                sendAM(":am,opera4x,:resume=[-s,store,-u," + oprtData.command + "]");
            } else if (oprtData.storeType == StoreType.HISENSE) {
                sendAM(":am,opera4x,:resume=[-s,hisense,-u," + oprtData.command + "]");
            } else if (oprtData.storeType == StoreType.FOXXUM) {
                sendAM(":am,opera4x,:resume=[-s,foxxum,-u," + oprtData.command + "]");
            } else if (oprtData.storeType == StoreType.BROWSER) {
                sendAM(":am,opera4x,:resume=[-s,hibrowser,-u," + oprtData.command + "]");
            } else if (oprtData.storeType == StoreType.OPERA) {
                sendAM(":am,opera4x,:resume=[-s,opera,-u," + oprtData.command + "]");
            } else {
                sendAM(":am,opera4x,:resume=[-s,store,-u," + oprtData.command + "]");
            }
        }

//        if("tv_store" == oprtData.command){
//            sendAM(":am,am,:start=tv_store");
//        }
//        else{
//            sendAM(':am,am,:start=[tv_store,-u,' + oprtData.command + "]");
//        }
    }

    self.onCloseTVStore = function () {
        if (oprtData.appStarted) {
            sendAM(":am,opera4x,:pause=");
            deleteNativeFile("startfromappstore", 0);
        }
        else {
            DBG_INFO(oprtData.amName + " has been stopped", DebugLevel.WARNING);
        }
        releaseVar();
    }

    function releaseVar() {
        oprtData.command = '';
        oprtData.isRemoteKey = false;
        oprtData.commandType = CmdURLType.NONE;
        oprtData.storeType = 0;
        //oprtData.appStarted = false;
        hiWebOsFrame.registerKeyCodesNormal();
    }

}

var appTVStore = new AppTVStore();
