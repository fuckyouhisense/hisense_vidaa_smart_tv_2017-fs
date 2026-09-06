
function getVIDAAU2AppPageData(opts) {
    opts.CaE = [
        {
            "id": "VIDAAU2AppPageTitle",
            "description": "标题",
            "CaEType": "span"
        },
        {
            "id": "VIDAAU2AppPageInfo",
            "description": "info",
            "CaEType": "span"
        },
        {
            "id":"VIDAAU2AppPageDeleteBtn",
            "description":"Raname",
            "CaEType":"span",
            "classes":{
                "normal":"VIDAAU2AppPageBtnNormal","focus":"VIDAAU2AppPageBtnFocus","disable":"VIDAAU2AppPageBtnDisable"
            },
            "nav":{
                "rightTo":"VIDAAU2AppPageAddBtn","downTo":"VIDAAU2AppPageUl"
            },
            "handler":{
                "aftEnterHandler":"VIDAAU2AppPageToDeleteMode",
                "befLeftHandler": "VIDAAU2AppPageEscHandler"
            }
        },
        {
            "id":"VIDAAU2AppPageAddBtn",
            "description":"",
            "CaEType":"span",
            "classes":{
                "normal":"VIDAAU2AppPageBtnNormal","focus":"VIDAAU2AppPageBtnFocus","disable":"VIDAAU2AppPageBtnDisable"
            },
            "nav":{
                "leftTo":"VIDAAU2AppPageDeleteBtn","downTo":"VIDAAU2AppPageUl"
            },
            "handler":{
                "aftEnterHandler":"VIDAAU2AppPageAddMode"
            },
            "onFocusFun":"VIDAAU2AppBtnOnFocus",
            "onBlurFun":"VIDAAU2AppBtnOnBlur"
        },
        {
            "id": "VIDAAU2AppPageUl",//在页面中的按钮或者组件容器Id
            "description": "用于显示列表",
            "CaEType": "GridUl",
            "disable": false,
            "classes": {
                "normal": "VIDAAU2AppPageUl_li_Normal", "focus": "VIDAAU2AppPageUl_li_focus","dataSelected":"VIDAAU2AppPageUl_li_Normal","disable":"VIDAAU2AppPageUl_li_Normal"
            },
            "nav":{
                "rightTo":""
            },
            "handler": {
                "aftEnterHandler": "VIDAAU2AppPageUlEnter",
                "befUpHandler":"VIDAAU2AppPageUlUpHandle",
                "befLeftHandler": "VIDAAU2AppPageUlLeft"
            },
            "onFocusFun":"VIDAAU2AppUlFocus",
            "onBlurFun":"VIDAAU2AppUlOnBlur",
            "oriCaE": [//todo 需修改为oriCaE
                {
                    "id": "VIDAAU2AppPage_Ul_img1",
                    "description": "图标",
                    "CaEType": "img"
                },
                {
                    "id": "VIDAAU2AppPage_Ul_Text",
                    "description": "名称",
                    "CaEType": "span"
                }
            ],
            "GridUlConfig": {
                "GridUlDataItem": ["VIDAAU2AppPage_Ul_img1","VIDAAU2AppPage_Ul_Text"],
                "LineNum":3,
                "PageSize":12,
                "FlipType":'VER',
                "ArrowFlag":true
            }
        }
    ]
    VIDAAU2AppPageInit();
    return VIDAAU2AppPageData ;
}

var VIDAAU2AppPageData={
    "VIDAAU2AppPageTitle":{"Data": "Apps"},
    "VIDAAU2AppPageInfo":{"Data":"Apps"},
    "VIDAAU2AppPageDeleteBtn":{"Data": "Delete"},
    "VIDAAU2AppPageAddBtn":{"Data": "Add to home"},
    "VIDAAU2AppPageUl": {
        "Data":[],
        "SelectedIndex":0,
        "DataSelectedIndex":0
    },
    "operateData":{
        state:0,//0:normal,1:change
        title:"Apps",
        tagType:57,
        oriSelectedIdx:0,
        appInfo:{
            imgs: [VIDAAU2LauncherBaseDir + "img/app/launcher1/Tvitter.png", VIDAAU2LauncherBaseDir + "img/app/launcher1/facebook.png",
                VIDAAU2LauncherBaseDir + "img/app/launcher1/amazon.png", VIDAAU2LauncherBaseDir + "img/app/launcher1/nfb_films.png",VIDAAU2LauncherBaseDir + "img/app/launcher1/rock_swap.png"],
            txts: ["position1", "position2", "position3", "position4","position5"],
            urls: ["a", "b", "c", "d","e"],
            urlTypes: [37, 37, 36,36,36],
            canRemoves: [false, false, true,true,true],
            canMoves:[false, false, true,true,true],
            storeTypes:[95,95,95,95,95]
        },
        appInfoBak:{},
        addApps:[],
        storeTypeList : {
            "opera": 95,
            "foxxum": 81,
            "netrange": 93
        },
        mainTileData:[],
        DeleteMode:false,
        AddMode:false
    },
    "rewrite":VIDAAU2AppPageRewrite
}

function VIDAAU2AppPageInit(){
    var opData = VIDAAU2AppPageData.operateData;
        var currentData = getLauncherData();
        opData.mainTileData = currentData;
        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].cmd == LauncherCMD.ALLAPP) {
                opData.appInfo = currentData[i].data;
            }

        }
}
function VIDAAU2AppPageRewrite(data){
    var opData = data.operateData;
    data.VIDAAU2AppPageTitle.Data = opData.title;
        data.VIDAAU2AppPageInfo.Data = opData.appInfo.imgs.length +" "+getCurrentContentLanguage('Apps');
    if(data.VIDAAU2AppPageUl.Data.length > opData.appInfo.imgs.length){
        data.VIDAAU2AppPageUl.Data.splice(opData.appInfo.imgs.length);
    }else{
        while(data.VIDAAU2AppPageUl.Data.length < opData.appInfo.imgs.length){
            var listDataItem = {
                "VIDAAU2AppPage_Ul_img1":{"Data":""},
                "VIDAAU2AppPage_Ul_Text":{"Data":""}
            };
            data.VIDAAU2AppPageUl.Data.push(listDataItem);
        }
    }
    for(var i=0;i<opData.appInfo.imgs.length;i++){
        data.VIDAAU2AppPageUl.Data[i].VIDAAU2AppPage_Ul_img1.Data = opData.appInfo.imgs[i];
        data.VIDAAU2AppPageUl.Data[i].VIDAAU2AppPage_Ul_Text.Data = opData.appInfo.txts[i];
    }
    if(data.operateData.DeleteMode ||data.operateData.AddMode){
        data.VIDAAU2AppPageDeleteBtn.disable = true;
        data.VIDAAU2AppPageAddBtn.Data = "Cancel";
    }else{
        data.VIDAAU2AppPageDeleteBtn.disable = false;
        data.VIDAAU2AppPageAddBtn.Data = "Add to home";
    }

}
function VIDAAU2AppPageToDeleteMode(){
    var data = VIDAAU2AppPageData;
    data.operateData.DeleteMode  = true;
    hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
    hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageUl");
}
function VIDAAU2AppPageAddMode(){
    var data = VIDAAU2AppPageData;
    if(data.operateData.DeleteMode){
        data.operateData.DeleteMode  = false;
        hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
        hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageDeleteBtn");
    }else{
        if(data.operateData.AddMode){
            data.operateData.AddMode  = false;
            hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
            hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageDeleteBtn");
        }else{
            data.operateData.AddMode = true;
            hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
            hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageUl");
        }
    }
}
function VIDAAU2AppPageUlUpHandle(){
    var data = VIDAAU2AppPageData;
    if(data.operateData.DeleteMode ||data.operateData.AddMode){
        hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageAddBtn");
    }else{
        hiWebOsFrame.VIDAAU2AppPage.hiFocus("VIDAAU2AppPageDeleteBtn");
    }
}
function VIDAAU2AppPageUlEnter(){
    var opData = VIDAAU2AppPageData.operateData;
    debugPrint("opData.DeleteMode::"+opData.DeleteMode +"opData.AddMode::"+opData.AddMode +"opData.appInfo.urls::"+opData.appInfo.urls[this.SelectedIndex]);
    if(opData.DeleteMode){
        if(opData.appInfo.imgs.length == 1 || opData.appInfo.canRemoves[this.SelectedIndex] == false){
            $('#msg_title').css("display","none");
            showMsg("",
                '<div style="display: table-cell;vertical-align: middle;width: 800px;height:150px"'+'>'
                +getCurrentContentLanguage('Do not uninstall the pre-loaded application.')+'</div>'
                ,3,function (){
                    $('#msg_title').css("display","block");
                });
        }else{
            var appInfo = {
                "appName":opData.appInfo.txts[this.SelectedIndex],
                "appImg":opData.appInfo.imgs[this.SelectedIndex],
                "appUrl":opData.appInfo.urls[this.SelectedIndex],
                "appUrlType":opData.appInfo.urlTypes[this.SelectedIndex]
            }

            hiWebOsFrame.createPage("OEMLauncherAppDeleteDialog", null, this.page, null, function (a) {
                hiWebOsFrame.OEMLauncherAppDeleteDialog = a;
                initOEMAppDeleteDialog(appInfo);
                a.rewriteDataOnly();
                a.open();
                a.hiFocus();
            });
        }
    }else{
        if(opData.AddMode){
            var currentData = getRememberEditAppFromNativeFile();
            var AppData = currentData.appInfo;
            debugPrint(objToString(AppData));
            if(AppData.length == 20){
                $('#msg_title').css("display", "none");
                showMsg("",
                    '<div style="display: table-cell;vertical-align: middle;width: 800px;height:150px"' + '>'
                        + getCurrentContentLanguage("No more tiles can be added. Please remove one first.") + '</div>'
                    , 3, function () {
                        $('#msg_title').css("display", "block");
                    });
                return;
            }
            var isExitInLauncher = false;
            for(var i = 0; i < AppData.length; i++){
                if(AppData[i].cmd == LauncherCMD.APP){
                    debugPrint(objToString(AppData[i]));
                    if(AppData[i].url == opData.appInfo.urls[this.SelectedIndex]){
                        isExitInLauncher = true;
                        break;
                    }
                }

                if(AppData[i].cmd == LauncherCMD.INPUT){
                    if(opData.appInfo.urls[this.SelectedIndex] == "miracast" && AppData[i].id == 100){
                        isExitInLauncher = true;
                        break;
                    }
                }
            }
            if(isExitInLauncher || opData.appInfo.urls[this.SelectedIndex] == "media") {
                $('#msg_title').css("display", "none");
                showMsg("",
                    '<div style="display: table-cell;vertical-align: middle;width: 800px;height:150px"' + '>'
                    + getCurrentContentLanguage("You've already added this app/input.") + '</div>'
                    , 3, function () {
                        $('#msg_title').css("display", "block");
                    });
            }else{
                var curSelectData = {
                    Name:opData.appInfo.txts[this.SelectedIndex],
                    Icon:opData.appInfo.imgs[this.SelectedIndex],
                    url:opData.appInfo.urls[this.SelectedIndex],
                    urlType:opData.appInfo.urlTypes[this.SelectedIndex],
                    storeType:opData.appInfo.storeTypes[this.SelectedIndex],
                    cmd : LauncherCMD.APP
                };
                var ImgData = curSelectData.Icon;
                var ImgDataList = ImgData.split("/");
//                curSelectData.Icon= "img/title/app/his/"+ImgDataList[ImgDataList.length -1];
                curSelectData.Icon= opData.appInfo.appimgs[this.SelectedIndex];
                debugPrint(objToString(curSelectData));
                VIDAALiteLauncherAddfunc(curSelectData,true);
            }
        }else{
            sendCommndToTV(opData.appInfo.urlTypes[this.SelectedIndex], opData.appInfo.urls[this.SelectedIndex],
                false, opData.appInfo.storeTypes[this.SelectedIndex]);

        }
    }

}

function DeleteVIDAAU2LauncherApp(url){
    var opData = VIDAAU2AppPageData.operateData;
    var deleteIdx = $.inArray(url,opData.appInfo.urls);
    if(deleteIdx > -1){
        opData.appInfo.imgs.splice(deleteIdx,1);
        opData.appInfo.txts.splice(deleteIdx,1);
        opData.appInfo.urls.splice(deleteIdx,1);
        opData.appInfo.urlTypes.splice(deleteIdx,1);
        opData.appInfo.canRemoves.splice(deleteIdx,1);
        opData.appInfo.canMoves.splice(deleteIdx,1);
        opData.appInfo.storeTypes.splice(deleteIdx,1);
    }
    if(deleteIdx == opData.appInfo.imgs.length){
        hiWebOsFrame["VIDAAU2AppPage"].getCaE("VIDAAU2AppPageUl").setSelectedIndex(opData.appInfo.imgs.length - 1);
    }
}
var appsCloseReason = 1;
function U2LauncherAllAppUpdateDataByDestroy(){
    hiWebOsFrame.VIDAAU2AppPage.destroy();
    hiWebOsFrame.createPage("VIDAAU2AppPage", null, null, null, function (a) {
        hiWebOsFrame.VIDAAU2AppPage = a;
        a.open();
        a.hiFocus();
        var opData = VIDAAU2AppPageData.operateData;
        VIDAAU2InitMainTitlePageData(opData.mainTileData);
        hiWebOsFrame.myLauncher.rewrite();
//        var length = opData.mainTileData.length;
//        var index = VidaaU2GetCurrentSelectIndex()
//        DBG_INFO("index:"+index + "  length:"+length);
//        if(index>=length-1){
//            hiWebOsFrame["myLauncher"].getCaE("VidaaU2MainTitleList").setSelectedIndex(index-1);
//            VidaaU2ChangeFocusPosition(index-1);
//        }
        VidaaU2ChangeFocusPosition(VidaaU2GetCurrentSelectIndex());
        hiWebOsFrame.endLoading();
    })

}
function VIDAAU2AppPageOnOpen(){
    var needUpdate = launcherDataNeedToUpdate();
    DBG_ERROR("VIDAAU2MainTitleOnOpen  needUpdate :"+needUpdate);
    if(needUpdate == LauncherUpdate.SERVICE){
        hiWebOsFrame.startLoading();
        $("#VIDAAU2MainTitlePage").css("display", "none");
        $("#VIDAAU2TvInput").css("display", "none");
        $("#VIDAAU2AppPage").css("display", "none");
        $("#notification").css("display", "none");
        setTimeout(U2LauncherAllAppUpdateDataByDestroy, 20);
        return;
    }
    var data = VIDAAU2AppPageData;
    data.operateData.DeleteMode  = false;
    data.operateData.AddMode = false;
    appsCloseReason = 1;
    //hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
    if(!hiWebOsFrame.myLauncher){
        try{
            hiWebOsFrame.createPage("VIDAAU2MainTitlePage", null, null, null, function(page) {
                hiWebOsFrame.myLauncher = page;
                hiWebOsFrame.myLauncher.origin = null;
                hiWebOsFrame.createPage("VIDAAU2StatusPage", null, null, null, function (a) {
                    hiWebOsFrame.VIDAAU2StatusPage = a;
                });
            });
        }catch(e){
            debugPrint(e.message);
        }
    }
    try{
        var param={
            PanelName:"allApps",
            CloseReason:0
        };
        DBG_INFO("log report GTLauncherPanel "+param.PanelName+" is open");
        LGReport.GTLauncherPanelStart(param.PanelName,param.CloseReason);

        var imgsrc = VIDAAU2LauncherBaseDir+"img/title/"+GLOBAL.LAUNCHER_THEME+"apps.png";
        $('#VIDAAU2AppPageLeftMain').css('background-image', 'url(' + imgsrc + ')');
    }catch(ex){DBG_ERROR(ex.message);}
}
function VIDAAU2AppUlFocus(){
    try{
        var currId = $("#"+this.id+" li").eq(this.SelectedIndex).children()[1].id;
        var txt = $("#"+currId).html();
        var mar = $('#' + currId).children('marquee').is('marquee');
        if(txt.length > 20){
            if(!mar){
                $("#"+currId).html('<marquee scrollAmount=10 scrollDelay=150 style="width:280px">'+txt +'</marquee>');
            }
        }
    }catch(e){
        DBG_ERROR("VidaaLiteRecommendUlFocus:"+ e.message);
    }
}
function VIDAAU2AppUlOnBlur(){
    try{
        // del marquee
        var currId = $("#"+this.id+" li").eq(this.SelectedIndex).children()[1].id;
        var txt = $("#"+currId+" marquee").html();
        if(!!txt){
            $("#"+currId).html(txt);
        }
    }catch(e){
        DBG_ERROR("VIDAAU2TvInputUlOnBlur:"+ e.message);
    }
}

function VIDAAU2AppBtnOnFocus(){
    try{
        var txt = $("#"+this.id).html();
        var mar = $('#' + this.id).children('marquee').is('marquee');
        if(txt.length > 12){
            if(!mar){
                $("#"+this.id).html('<marquee scrollAmount=10 scrollDelay=150 style="width:170px">'+txt +'</marquee>');
            }
        }
    }catch(e){
        DBG_ERROR("VidaaLiteRecommendUlFocus:"+ e.message);
    }
}
function VIDAAU2AppBtnOnBlur(){
    try{
        // del marquee
        var txt = $("#"+this.id+" marquee").html();
        if(!!txt){
            $("#"+this.id).html(txt);
        }
    }catch(e){
        DBG_ERROR("VIDAAU2TvInputUlOnBlur:"+ e.message);
    }
}
function VIDAAU2AppPageUlLeft(){
    if(this.SelectedIndex % 3 == 0){
        VIDAAU2AppPageEscHandler();
    }
}
function VIDAAU2AppPageEscHandler(){
    appsCloseReason = 4;
    hiWebOsFrame.VIDAAU2AppPage.close();
//    hiWebOsFrame.VIDAAU2AppPage.destroy();
    if(VIDAAU2LauncherCreateFromAllAppsKey){
        hiWebOsFrame.blankPage.open();
        hiWebOsFrame.blankPage.hiFocus();
    }else{
        hiWebOsFrame.myLauncher.open();
        hiWebOsFrame.myLauncher.hiFocus();
    }

}
function VIDAAU2AppPageOnClose(){
    try{
        var param={
            PanelName:'allApps',
            CloseReason:1
        };
        param.CloseReason = appsCloseReason;
        appsCloseReason = 1;
        DBG_INFO("log report GTLauncherPanel "+param.PanelName+" is closed");
        LGReport.GTLauncherPanelClose(param.PanelName,param.CloseReason);
    }catch(ex){DBG_ERROR(ex.message);}
    var data = VIDAAU2AppPageData;
    data.operateData.DeleteMode  = false;
    data.operateData.AddMode = false;
    if(!!hiWebOsFrame.VIDAAU2AppPage){
        hiWebOsFrame.VIDAAU2AppPage.rewriteDataOnly();
    }
}
function VIDAAU2AppPageDestroy(){
    hiWebOsFrame.VIDAAU2AppPage = null;
}