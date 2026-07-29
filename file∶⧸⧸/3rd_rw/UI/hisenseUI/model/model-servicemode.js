function ServiceModeModelDefines() {
}
{
    ServiceModeModelDefines.SL2_TVAPI_VINT32_SERVICEMODE_TUNERSIGNALINFO_SIGNALLEVELS = "tvapi.vint32.servicemode.tunerinfo.signallevels";
    ServiceModeModelDefines.SL2_TVAPI_VINT32_SERVICEMODE_TUNERSIGNALINFO_SIGNALQUALITIES = "tvapi.vint32.servicemode.tunerinfo.signalqualities"
}
function ServiceModeModel(parentModel) {
    SubModel.call(this, parentModel, ServiceModeModelDefines);
    this.registerSubObject = function () {
    this.registerIntegerVectorObject(ServiceModeModelDefines.SL2_TVAPI_VINT32_SERVICEMODE_TUNERSIGNALINFO_SIGNALLEVELS, "getSignalMainLevels", "setSignalMainLevels", "onSignalMainLevelsChanged", null, null);
    this.registerIntegerVectorObject(ServiceModeModelDefines.SL2_TVAPI_VINT32_SERVICEMODE_TUNERSIGNALINFO_SIGNALQUALITIES, "getTunersignalinfoSignalqualities", "setTunersignalinfoSignalqualities", "onTunersignalinfoSignalqualitiesChaged", null, null)
}}


ServiceModeModel.prototype = new SubModel();
ServiceModeModel.prototype.constructor = ServiceModeModel;
{
    // --------------------------------------------------------------
    // Static constants
    // --------------------------------------------------------------
    SubModel.registerStaticConstants(
        ServiceModeModel, ServiceModeModelDefines,
        [] );
}