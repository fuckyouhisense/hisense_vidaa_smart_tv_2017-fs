
 function SoftwareupdateModelDefines() {
 }
 {
 	SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_CURRENT_PACKET_VERSION= "tvapi.str.software.update.current.packet";
 	SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_CURRENT_DESTINATION_VERSION= "tvapi.str.software.update.hisense.new.version";
	SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_SEARCH= "tvapi.action.software.update.start.search";
	//SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_CANCEL_SEARCH= "tvapi.action.software.update.cancel.search";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_SEARCH_STATE= "tvapi.i32.software.update.search.state";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_PROGRESS= "tvapi.i32.software.update.progress";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_AUTO_ANNOUNCEMENT= "tvapi.i32.software.update.auto.announcement";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_AUTO_ANNOUNCEMENT_ENABLED= "tvapi.i32.software.update.auto.announcement.enabled";
	SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_UPDATE= "tvapi.action.software.update.start.update";
    SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_NEVER_REMIND= "tvapi.action.software.update.never.remind";
	SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_HISENSE_CURRENT_VERSION= "tvapi.str.software.update.hisense.current.version";
	SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_HISENSE_VERSION_DESCRIPTION= "tvapi.str.software.update.hisense.version.description";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_HISENSE_UPGRADE_MODE= "tvapi.i32.software.update.hisense.upgrade.mode";
	SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_DOWNLOAD= "tvapi.action.software.update.start.download";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_DOWNLOAD_PROGRESS= "tvapi.i32.software.update.download.progress";
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_EULA_STATUS = "tvapi.i32.software.update.eula.status";
    SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_IS_DEL_FAC_VEDIO = "tvapi.i32.software.update.is.del.fac.movie";




	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_NONE  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_USB  =  1;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_INTERNET  =  2;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_DVBT  =  3;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_INTERNET_AUTO  =  4;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SOURCE_DVBS  =  5;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_STARTED  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_PACKET_IMAGES_FOUND  =  1;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_NO_PACKET_IMAGES_FOUND  =  2;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_NEW_PACKET_FOUND  =  3;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_NO_NEW_PACKET_FOUND  =  4;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_PACKET_IMAGES_SEARCHING  =  5;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_NOT_ENOUGH_STORAGE_SPACE  =  6;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_ERROR  =  7;
    SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_STATE_CANCELLED = 65535;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_PROGRESS_INITIAL  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_SEARCH_PROGRESS_COMPLETED  =  100;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_MAX_IMAGE  =  10;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_LOADING  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_PROGRAMMING  =  1;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_FINISHED  =  2;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HIS_USB_NOT_MOUNTED  =  100;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HIS_USB_SPACE_NOT_AVAIL  =  101;
    SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_ERROR = 65535;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_PROGRESS_INITIAL  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_PROGRESS_COMPLETED  =  100;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_AUTOMATIC_ANNOUNCEMENT_RESULT_LOAD_NOW  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_AUTOMATIC_ANNOUNCEMENT_RESULT_AT_STANDBY  =  1;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_AUTOMATIC_ANNOUNCEMENT_RESULT_LATER  =  2;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_AUTOMATIC_ANNOUNCEMENT_RESULT_DISMISS  =  3;


	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_SFB_ACTIVE_DISABLE  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_SFB_ACTIVE_ENABLE  =  1;


	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HISENSE_APP_INITIAL  =  0;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HISENSE_APP_INTERNAL_ERROR  =  1;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HISENSE_APP_DOWNLOAD_FINISH  =  2;
	SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HISENSE_APP_INSTALL_SUCCESS  =  3;
    SoftwareupdateModelDefines.SL2_TVAPI_SOFTWARE_UPDATE_STATE_HISENSE_APP_INSTALL_FAIL = 4
}
function SoftwareupdateModel(e) {
    SubModel.call(this, e, SoftwareupdateModelDefines);

    //this.registerSubObject = function () {
    this.registerSubObject = function () {
        this.registerStringObject(SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_CURRENT_PACKET_VERSION, "getCurrentPacket", "setCurrentPacket", "onCurrentPacketChaged", null, null);
        this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_SEARCH, [{
            name: "StartSearch",
            method: function (e, t) {
                return e.invoke(t)
            }
        }], "null");
        //this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_CANCEL_SEARCH, [{
        //    name: "CancelSearch",
        //    method: function (e) {
        //        return e.invoke()
        //    }
        //}], "null");
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_SEARCH_STATE, "getSearchState", "setSearchState", "onSearchStateChaged", null, null);
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_PROGRESS, "getProgress", "setProgress", "onProgressChaged", null, null);
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_AUTO_ANNOUNCEMENT, "getAutoAnnouncement", "setAutoAnnouncement", "onAutoAnnouncementChaged", null, null);
//        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_AUTO_ANNOUNCEMENT_ENABLED, "getAutoAnnouncementEnabled", "setAutoAnnouncementEnabled", "onAutoAnnouncementEnabledChaged", null, null);
        //this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_SHOW_SWITCH_OFF_DIALOG, "getShowSwitchOffDialog", "setShowSwitchOffDialog", "onShowSwitchOffDialogChaged", null, null);
      //  this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_CONFIRM_AUTO_ANNOUNCEMENT, [{
    //        name: "ConfirmAnnouncement",
    //        method: function (e) {
    //            return e.invoke()
    //        }
   //     }], "null");
        this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_UPDATE, [{
            name: "StartUpdate",
            method: function (e) {
                return e.invoke()
            }
        }], "null");
        this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_NEVER_REMIND, [{
            name: "NeverRemind",
            method: function (e) {
                return e.invoke()
            }
        }], "null");
        this.registerStringObject(SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_HISENSE_CURRENT_VERSION, "getHisenseCurrentVersion", "setHisenseCurrentVersion", "onHisenseCurrentVersionChaged", null, null);
        this.registerStringObject(SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_CURRENT_DESTINATION_VERSION, "getHisenseNewVersion", "setHisenseNewVersion", "onHisenseNewVersionChaged", null, null);
        this.registerStringObject(SoftwareupdateModelDefines.SL2_TVAPI_STR_SOFTWARE_UPDATE_HISENSE_VERSION_DESCRIPTION, "getHisenseVersionDescription", "setHisenseVersionDescription", "onHisenseVersionDescriptionChaged", null, null);
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_HISENSE_UPGRADE_MODE, "getHisenseUpgradeMode", "setHisenseUpgradeMode", "onHisenseUpgradeModeChaged", null, null);
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_EULA_STATUS, "getEulaFlag", "setEulaFlag", "onEulaFlagChaged", null, null);
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_IS_DEL_FAC_VEDIO, "getDelVideoFlag", null, null, null, null);
        this.registerActionObject(SoftwareupdateModelDefines.SL2_TVAPI_ACTION_SOFTWARE_UPDATE_START_DOWNLOAD, [{
            name: "StartDownload",
            method: function (e) {
                return e.invoke()
            }
        }], "null");
        this.registerIntegerObject(SoftwareupdateModelDefines.SL2_TVAPI_I32_SOFTWARE_UPDATE_DOWNLOAD_PROGRESS, "getDownloadProgress", "setDownloadProgress", "onDownloadProgressChaged", null, null)

    //}
}}
SoftwareupdateModel.prototype = new SubModel();
SoftwareupdateModel.prototype.constructor = SoftwareupdateModel;
{
    SubModel.registerStaticConstants(SoftwareupdateModel, SoftwareupdateModelDefines, [])
}