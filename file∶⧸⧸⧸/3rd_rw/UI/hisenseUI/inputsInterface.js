/**
 * Created by Administrator on 16-2-3.
 */
var ITEM_NUM = 6;
function initAllInputsData(){
    var signalSourceList = [], allSourceList = [], sourceArr = [],noSignalSourceList = [];
    var inputsData = {};
    var sourceItem = [
        "0", "ANT/CABLE", "0", "1", "ANT/CABLE","0",
        "1", "AV", "0", "1", "AV","1",
//        "2", "COMPONENT", "0", "0", "COMPONENT","1",
        "2", "HDMI1", "0", "0", "HDMI 1","1",
        "3", "HDMI2", "0", "0", "HDMI 2","0",
        "4", "HDMI3", "0", "0", "HDMI 3","0",
        "5", "HDMI4", "0", "0", "HDMI 4","0"
    ];
    try{
        if(tv) sourceItem = model.source.getInputName();
        DBG_INFO("sourceItem:" + objToString(sourceItem));
        var locked = false;
        var sMode = tv?model.parentlock.getSModel():1;
        var lockTime =  tv?model.source.getCurrentTimeInLock():1;
        var isLock = false;
        if(sMode!=0 && lockTime==1){
            isLock = true;
        }
        var TVNoSignal = tv ? livetvchlist.hasChannels() : false;
        for (var i = 0; i < sourceItem.length / ITEM_NUM; i++) {
            if (sourceItem[i * ITEM_NUM] == 0 && !TVNoSignal)sourceItem[i * ITEM_NUM + 2] = 1;
            if(sourceItem[i * ITEM_NUM + 3] == 1 && isLock){
                locked = true;
            }else{
                locked = false;
            }
            sourceArr.push({
                id: sourceItem[i * ITEM_NUM],
                name:sourceItem[i * ITEM_NUM + 1],
                signal: sourceItem[i * ITEM_NUM + 2],
                lock: sourceItem[i * ITEM_NUM + 3],
                locked: locked,
                rename: sourceItem[i * ITEM_NUM + 4],
                hotelLock: sourceItem[i * ITEM_NUM + 5]
            });
            allSourceList.push(sourceItem[i * ITEM_NUM]);
            if (sourceItem[i * ITEM_NUM + 2] == 0) {
                signalSourceList.push(sourceItem[i * ITEM_NUM]);
            }else {
                noSignalSourceList.push(sourceItem[i * ITEM_NUM]);
            }
        }
        inputsData.allSourceList = allSourceList;
        inputsData.signalSourceList = signalSourceList;
        inputsData.noSignalSourceList = noSignalSourceList;
        inputsData.sourceList = sourceArr;

        return inputsData;
    }catch(e){
        DBG_ERROR(e.message);
    }
}

function getInputsDataForLauncher(){
    GLOBAL.LAUNCHER_THEME = getLauncherTheme();
    var inputsData = initAllInputsData();
    var list = getRecentInputs(inputsData);
    var showData = [];
    try{
        var info ={"signal":true,"uid":0,"channelName":"TV12345678WWWWWWWWWTTTTT"};
        var sourceInfo = tv?model.source.getCurrentSource():0;
        DBG_INFO("getCurrentSourceObj:"+ sourceInfo);
//        var sourceInfo = info;
    }catch(e){
        DBG_ERROR(e.message);
    }
    var hotelStatus = tv ? model.hotel.getHotelMode() : 0;

    for(var i = 0; i < list.length; i++) {
        var item ={};
        if(list[i].id == sourceInfo){
            item = list[i];
            if(list[i].id == 0) {
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img =VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_tv_normal.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/"+"la_ic_tv_active.png";
                }
                else{
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/la_ic_tv_active.png";
                }

            }else{
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_" + list[i].uid + "_normal.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/la_ic_" + list[i].uid + "_active.png";
                }
                else{
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/la_ic_" + list[i].uid + "_active.png";
                }

            }
            item.signal = true;
            showData.push($.extend(true,{},item));
            break;
        }
    }
    var addCast = false;
    var addMedia = false;
    for(var i = 0; i < list.length; i++) {
        if(list[i].id == sourceInfo){
            continue;
        }
        if(hotelStatus ==1 && parseInt(list[i].hotelLock) == 1) {
            continue;
        }
        var item ={};
        item = list[i];
        if(list[i].signal == 0) {
            if(list[i].id == 0) {
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_tv_normal.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/"+"la_ic_tv_connected.png";
                }
                else{
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/la_ic_tv_connected.png";
                }
            }else{
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_" + list[i].uid + "_normal.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/la_ic_" + list[i].uid + "_connected.png";
                }
                else{
                    item.img =VIDAAU2LauncherBaseDir +"img/inputs/la_ic_" + list[i].uid + "_connected.png";
                }
            }
            item.signal = true;
        }else{
//            if(hiWebOsFrame.getCurrentBrand() == "shp"){
//                if(!addMedia){
//                    var media ={
//                        "id":"200",
//                        "name":"Media",
//                        "rename":"",
//                        "uid":"Media",
//                        "signal":true,
//                        "img":"launcher/sharp/input/media.png"};
//                    showData.push($.extend(true,{},media));
//                    addMedia = true;
//                }
//            }
            if(!addCast){
                var cast ={
                    "id":"100",
                    "name":"Anyview Cast",
                    "rename":"Anyview Cast",
                    "uid":"AnyviewCast",
                    "signal":true,
                    "img":VIDAAU2LauncherBaseDir +"img/inputs/Anyview.png"};
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    cast.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_cast.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    cast.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/input_cast.png";
                }
                showData.push($.extend(true,{},cast));
                addCast = true;
            }
            if(hotelStatus ==1 && parseInt(list[i].hotelLock) == 1){
                continue;
            }
            item.signal = false;
            if(list[i].id == 0){
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_tv_disable.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/la_ic_tv_disconnected.png";
                }
                else{
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/la_ic_tv_disconnected.png";
                }

            }else{
                if(hiWebOsFrame.getCurrentBrand() == "shp"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_" + list[i].uid + "_disable.png";
                }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/la_ic_" + list[i].uid + "_disconnected.png";
                }
                else{
                    item.img = VIDAAU2LauncherBaseDir +"img/inputs/la_ic_" + list[i].uid + "_disconnected.png";
                }
            }
        }
        showData.push($.extend(true,{},item));
    }
//    if(hiWebOsFrame.getCurrentBrand() == "shp"){
//        if(!addMedia){
//            var media ={
//                "id":"200",
//                "name":"Media",
//                "rename":"",
//                "uid":"Media",
//                "signal":true,
//                "img":"launcher/sharp/input/media.png"};
//            showData.push($.extend(true,{},media));
//            addMedia = true;
//        }
//    }
    if(!addCast){
        var cast ={
            "id":"100",
            "name":"Anyview Cast",
            "rename":"Anyview Cast",
            "uid":"AnyviewCast",
            "signal":true,
            "img":VIDAAU2LauncherBaseDir +"img/inputs/Anyview.png"};
        if(hiWebOsFrame.getCurrentBrand() == "shp"){
            cast.img = VIDAAU2LauncherBaseDir +"img/inputs/sharp/input_cast.png";
        }else if(hiWebOsFrame.getCurrentBrand() == "nob"){
            cast.img = VIDAAU2LauncherBaseDir +"img/inputs/nob/input_cast.png";
        }
        showData.push($.extend(true,{},cast));
        addCast = true;
    }
    DBG_INFO("return data:" + objToString(showData));
    return showData;
}

function getRecentInputs(inputsData){
    var ret = {},
        showSourceList = [],
        recentArr = [],
        list = [];

//    ret = {'source': ['3', '4','5','6','0','2','1']};
    ret = {'source': ['2', '3','4','5','0','1']};

//    if (!tv) {
//        var ret = {'source': ['2', '3']};
//    }
//    else {
//        ret = readFileFromNative('hisenseUI/recentinput.txt', 1);
//    }
    if (ret != null) {
        try {
            recentArr = ret.source;
        }
        catch (ex) {
            DBG_ERROR('err:' + ex);
        }
    }
    showSourceList = getShowSourceList(recentArr,inputsData);
    try{
        $.each(showSourceList, function (index, item) {
            var jsonObj = getSourceJsonObjById(item,inputsData);
            list[index] = {};
            list[index].id = jsonObj.id;
            list[index].name = jsonObj.name;
            list[index].signal = jsonObj.signal;
            list[index].lock = jsonObj.lock;
            list[index].locked = jsonObj.locked;
            list[index].rename = jsonObj.rename;
            list[index].uid = jsonObj.name.toLowerCase().replace(" ", "");
            list[index].hotelLock = jsonObj.hotelLock;
        });
    }catch(e){
        DBG_ERROR(e.message);
    }
    return list;
}

function getSourceJsonObjById(id,inputsData){
    var sourceObj = {};
    $.each(inputsData.sourceList, function (index, item) {
        if (item.id == id) {
            sourceObj = item;
            return false;
        }
    });
    return sourceObj;
}

function getShowSourceList(recentArr,inputsData){
    var showSourceList = [];
    LauncherSortSignalList(recentArr,inputsData);
    LauncherSortAllList(recentArr,inputsData);
    LauncherSortAllList(inputsData.signalSourceList,inputsData);
    for(var i=0;i<inputsData.allSourceList.length;i++){
        showSourceList.push(inputsData.allSourceList[i]);
    }
    return showSourceList;
}

function LauncherSortSignalList(recentArr,inputsData){
    var signalSourceList = inputsData.signalSourceList;
    var list = [];
    for(var i = 0;i<recentArr.length;i++){
        var index = $.inArray(recentArr[i], signalSourceList);
        if ( index > -1) {
            list.push(recentArr[i]);
            signalSourceList.splice(index, 1);
        }
    }
    list = list.concat(signalSourceList);
    inputsData.signalSourceList = list;
}
function LauncherSortAllList(recentArr,inputsData){
    var sourceList = inputsData.allSourceList;
    var list = [];
    for(var i = 0;i<recentArr.length;i++){
        var index = $.inArray(recentArr[i], sourceList);
        if ( index > -1) {
            list.push(recentArr[i]);
            sourceList.splice(index, 1);
        }
    }
    list = list.concat(sourceList);
    inputsData.allSourceList = list;
}
function getInputsDataForMixBar(){
    var inputsData = initAllInputsData();
    var list = getRecentInputs(inputsData);
    var showData = [];
    try{
        var info ={"signal":true,"uid":0,"channelName":"TV12345678WWWWWWWWWTTTTT"};
        var sourceInfo = tv?model.source.getCurrentSource():0;
//        var sourceInfo = info;
    }catch(e){
        DBG_ERROR(e.message);
    }
    for(var i = 0; i < list.length; i++) {
        var item ={};
        if(list[i].id == sourceInfo){
            item = list[i];
//            if(list[i].signal == 0) {
//            item.img = "mixBar/la_ic_" + list[i].uid + "_active.png";
            item.color = "#ffffff";
//            }
            if(list[i].id == 0){
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_tv_active.png";
            }else{
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_" + list[i].uid + "_active.png";
            }
            showData.push($.extend(true,{},item));
            break;
        }
    }
    for(var i = 0; i < list.length; i++) {
        if(list[i].id == sourceInfo){
            continue;
        }
        var hotelmode = tv ?model.hotel.getHotelMode():0;
        if(hotelmode ==1 && parseInt(list[i].hotelLock) == 1) {
            continue;
        }
        var item ={};
        item = list[i];
        if(list[i].signal == 0) {
            if(list[i].id == 0){
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_tv_connected.png";
            }else{
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_" + list[i].uid + "_connected.png";
            }

            item.color = "rgba(255,255,255,.6)";
        }else{
            if(hotelmode ==1 && parseInt(list[i].hotelLock) == 1) {
                continue;
            }
            if(list[i].id == 0){
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_tv_disconnected.png";
            }else{
                item.img = "mixBar/"+GLOBAL.LAUNCHER_THEME+"la_ic_" + list[i].uid + "_disconnected.png";
            }

            item.color = "rgba(255,255,255,.3)";
        }
        showData.push($.extend(true,{},item));
    }
    return showData;
}

function getInputRenameByID(id){
    var sourceItem = [
        "0", "ANT/CABLE", "0", "1", "ANT/CABLE","0",
        "1", "AV", "0", "1", "AV3333","1",
//        "2", "COMPONENT", "0", "0", "COMPONENT","1",
        "2", "HDMI1", "0", "0", "HDMI1","1",
        "3", "HDMI2", "0", "0", "HDMI2","0",
        "4", "HDMI3", "0", "0", "HDMI3","0",
        "5", "HDMI4", "0", "0", "HDMI4","0"
    ];
    if(tv){
        sourceItem = model.source.getInputName();
    }
    var sourceArr = [];
    for (var i = 0; i < sourceItem.length /ITEM_NUM; i++) {
        sourceArr.push({
            id: sourceItem[i * ITEM_NUM],
            name:sourceItem[i * ITEM_NUM + 1],
            signal: sourceItem[i * ITEM_NUM + 2],
            rename: sourceItem[i * ITEM_NUM + 4]
        });
    }
    for(var j=0;j<sourceArr.length;j++){
        if(sourceArr[j].id == id){
            return sourceArr[j].rename;
        }
    }

    return " ";
}

function changeSourceForEPOS(){
    var inputsData = initAllInputsData();
    var list = getRecentInputs(inputsData);
    try{
        var crtSource = tv?model.source.getCurrentSource():0;
    }catch(e){
        DBG_ERROR(e.message);
    }
    for(var i = 0; i < list.length; i++) {
        if(list[i].id == crtSource){
            if(list[i].signal == 0){
                return;
            }
        }
    }
    for(var i = 0; i < list.length; i++) {
        if(list[i].id == crtSource){
            continue;
        }
        if(model.hotel.getHotelMode() ==1 && parseInt(list[i].hotelLock) == 1) {
            continue;
        }
        if(list[i].signal == 0) {
            model.source.InputSet(list[i].id);
            return;
        }
    }
}
