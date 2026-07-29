// --------------------------------------------------------
/**
 * @brief Convenience model for accessing
 * the middleware model via modeljs browser plugin.
 * This implementation hides all access to the actual modeljs
 * browser plugin and allows easy access to the model. The
 * model must be extended with sub models.
 *
 * @author Sascha Radike
 *
 * Copyright (c) 2014 LOEWE Opta GmbH, Kronach. All rights reserved. */
//--------------------------------------------------------
var TVMode = ("undefined" != typeof (modeljs));
// --------------------------------------------------------
/**
 * TableIterator class.
 * Represents an iterator returned by sub models which
 * provide access to table objects.
 *
 * @param table
 *      The table object the iterator will be created for.
 * @param readOnly
 *      Whether read-only access (true) or read-write (false)
 * @param selections
 *      The selections.
 * @param fields
 *      The requested fields to return in the iterator results.
 * @param orders
 *      The requested orders.
 * @param handler
 *      The handler to notify of iterator events.
 */
// --------------------------------------------------------

var InitArea = "SA";
var initCountry = "Egypt";//"Egypt"
var initCountryCode;
//预定义EM和EU国家，防止上传修改出错
if("EM" == InitArea){
    initCountry = "Egypt";
} else if("EU" == InitArea){
    initCountry = "Germany";
} else if("SA" == InitArea){
    initCountry = "Brazil";
}else if("COL" == InitArea){
    initCountry = "Colombia";
}

var g_launcherBrand = "VIDAALite";

var initBrand = "his";
var sysBrandlist = ["his", "wel", "nob", "jvc", "san", "phi", "ilo", "pio", "sma", "bgh", "blu",
    "dev", "kal", "cha", "pan", "tel", "riv", "con", "gen", "haa", "tit", "kmc", "vuz", "llo",
    "inn", "sho", "enf", "dlc", "hya", "dex", "sup", "oke", "rol", "sha", "har", "ezy", "ame","avi",
    "dik", "cyb", "hyu", "gfo", "sei", "ton", "psc", "tho", "ora","tat","ben","cmo", "vtb", "ros", "del", "str", "cor", "mtx",
    "dam","oro", "gua", "bec","idh","viv","mag","xvi","hisense", "Hisense", "shp","adm","fam", "off"];


function TableIterator(table, readOnly, selections, fields, orders, handler) {
    /** The modeljs iterator instance */
    var m_iterator = null;
    /** The stored handler */
    var m_handler = handler;


    // --------------------------------------------------------------
    // Notification handlers
    // --------------------------------------------------------------

    /**
     * Handles the notifyReadRow event received from modeljs iterator.
     * Converts the event and forwards it to the registered handler.
     *
     * @param rowRead
     *      The row read
     */
    var handleReadRow = function (rowRead) {
        var convertedRow = new Array();
        // For every column of row
        for (var i = 0; i < rowRead.length; i++) {
            convertedRow.push(rowRead[i]);
        }
        var event = {
            type: TableIterator.EVENT_TYPE_ROWS_READ,
            rows: [convertedRow]
        };
        m_handler && m_handler(event);
    }.bind(this);

    /**
     * Handles the notifyReadRowChunk event received from modeljs iterator.
     * Converts the event and forwards it to the registered handler.
     *
     * @param rowsRead
     *      The rows read
     */
    var handleReadRowChunk = function (rowsRead) {

        //DBG_ERROR("enter handleReadRowChunk...11111");
        /*
        var convertedRows = new Array();
            // For every row
            for (var i = 0; i < rowsRead.length; i++) {
                var rowRead = rowsRead[i];
                var convertedRow = new Array();
                // For every column in row
                for (var j = 0; j < rowRead.length; j++) {
                    convertedRow.push(rowRead[j]);
                }
                convertedRows.push(convertedRow);
            }
        */
        //DBG_ERROR("enter handleReadRowChunk...222");
        var convertedRows;
        try {
            convertedRows = JSON.parse(rowsRead.getallstrings)
        }
        catch (ex) {
            DBG_ERROR("handleReadRowChunk: " + ex.message);
        }
        if (!Array.isArray(convertedRows)) {
            convertedRows = rowsRead;
        }
        var event = {
            type: TableIterator.EVENT_TYPE_ROWS_READ,
            rows: convertedRows
        };
        m_handler && m_handler(event);
    }.bind(this);

    /**
     * Handles the notifyTotalCount event received from modeljs iterator.
     * Converts the event and forwards it to the registered handler.
     *
     * @param count
     *      The total count of rows
     */
    var handleTotalCount = function (count) {
        var event = {
            type: TableIterator.EVENT_TYPE_TOTAL_COUNT,
            totalCount: count
        };
        m_handler && m_handler(event);
    }.bind(this);

    /**
     * Handles the notifySeekToRow event received from modeljs iterator.
     * Converts the event and forwards it to the registered handler.
     *
     * @param count
     *      The total count of rows
     */
    var handleSeekToRow = function (seekResult) {
        var event = {
            type: TableIterator.EVENT_TYPE_SEEK_TO_ROW,
            result: seekResult
        };
        m_handler && m_handler(event);
    }.bind(this);


    var handleCursorPosition = function (cursor) {
        var event = {
            type: TableIterator.EVENT_TYPE_CURSOR,
            cursor: cursor
        };
        m_handler && m_handler(event);
    }.bind(this);

    var handlerTableUpdated = function (result) {
        var event = {
            type: TableIterator.EVENT_TYPE_UPDATE,
            result: result
        };
        m_handler && m_handler(event);
    }.bind(this);
    // --------------------------------------------------------------
    // Iterator methods
    // --------------------------------------------------------------

    /**
     * Reads the next "count" rows. Result will be received as event.
     *
     * @param count
     *      The number of rows to read.
     */
    this.readNextRows = function (count) {
        m_iterator.readNextRows(count);
    }

    this.readNextRow = function () {
        m_iterator.readNextRow();
    }

    /**
     * Reads the previous "count" rows. Result will be received as event.
     *
     * @param count
     *      The number of rows to read.
     */
    this.readPreviousRows = function (count) {
        m_iterator.readPrevRows(count);
    }

    /**
     * Fetches the total count of available rows. Result will be received as event.
     */
    this.fetchTotalCount = function () {
        m_iterator.totalCount();
    }

    /**
     * Seeks to a certain row. Result will be received as event.
     *
     * @param offset
     *      The offset to seek to - depending on type
     * @param type
     *      The seek type: SEEK_SET/SEEK_CUR/SEEK_END
     */
    this.seekToRow = function (offset, type) {
        m_iterator.seekToRow(offset, type);
    }

    this.getCurrentRow = function () {
        return m_iterator.getCurrentRow();
    }

    this.getCurrentRows = function () {
        return m_iterator.getCurrentRows();
    }

    this.readCursorPosition = function () {
        m_iterator.readCursorPosition();
    }
    this.getTotalCount = function () {
        return m_iterator.getTotalCountFromCache();
    }

    this.disconnect = function () {
        //DBG_ALWAYS("MTK product do not need disconnect");
        //return true;
        m_iterator.removeEventListener("notifyReadRow", handleReadRow);
        m_iterator.removeEventListener("notifyReadRowChunk", handleReadRowChunk);
        m_iterator.removeEventListener("notifyTotalCount", handleTotalCount);
        m_iterator.removeEventListener("notifySeekToRow", handleSeekToRow);
        m_iterator.removeEventListener("notifyCursorPosition", handleCursorPosition);
        m_iterator.removeEventListener("notifyUpdate", handlerTableUpdated);
        !!m_iterator.disconnect && m_iterator.disconnect();
        m_iterator = null;

        return true;

    }


    // --------------------------------------------------------------
    // Init
    // --------------------------------------------------------------

    /**
     * Initializes the iterator.
     */
    var initialize = function (table, readOnly, selections, fields, orders, handler) {
        // Convert selections

        var convertedSelections = modeljs.createTableSelectionVector();
        if (selections) {
            for (var i = 0; i < selections.length; i++) {
                var selection = selections[i];
                var convertedSelection = modeljs.createTableSelection(
                    selection.field, selection.condition, selection.value);
                convertedSelections.push(convertedSelection);
            }
        }

        // Convert fields
        var convertedFields = modeljs.createNumberVector();
        if (fields) {
            for (var i = 0; i < fields.length; i++) {
                convertedFields.push(fields[i]);
            }
        }

        // Convert orders
        var convertedOrders = modeljs.createTableOrderVector();
        if (orders) {
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var convertedSelection = modeljs.createTableOrder(
                    order.field, order.direction);
                convertedOrders.push(convertedSelection);
            }
        }

        // Create and connect iterator
        m_iterator = table.createIterator(
            (readOnly ? modeljs.ITERATOR_TYPE_READONLY_AUTOMATIC : modeljs.ITERATOR_TYPE_READWRITE_AUTOMATIC),
            convertedSelections,
            convertedFields,
            convertedOrders);

        m_iterator.addEventListener("notifyReadRow", handleReadRow);
        m_iterator.addEventListener("notifyReadRowChunk", handleReadRowChunk);
        m_iterator.addEventListener("notifyTotalCount", handleTotalCount);
        m_iterator.addEventListener("notifySeekToRow", handleSeekToRow);
        // ...
        m_iterator.addEventListener("notifyCursorPosition", handleCursorPosition);
        m_iterator.addEventListener("notifyUpdate", handlerTableUpdated);
        m_iterator.connect();

    }
    initialize(table, readOnly, selections, fields, orders);

    this.tableFlag = 'table created';

}

{
    try {
        // --------------------------------------------------------------
        // Static constants
        // --------------------------------------------------------------
        TableIterator.EVENT_TYPE_ROWS_READ = 1;
        TableIterator.EVENT_TYPE_TOTAL_COUNT = 2;
        TableIterator.EVENT_TYPE_SEEK_TO_ROW = 3;
        TableIterator.EVENT_TYPE_CURSOR = 4;
        TableIterator.EVENT_TYPE_UPDATE = 5;
        TableIterator.EVENT_TYPE_READY = 6;

        TableIterator.SEEK_SET = modeljs.LOMODEL_SEEK_SET;
        TableIterator.SEEK_CUR = modeljs.LOMODEL_SEEK_CUR;
        TableIterator.SEEK_END = modeljs.LOMODEL_SEEK_END;
    }
    catch (ex) {
        //log.error("_______________model error" + ex.message);
    }
}


// --------------------------------------------------------
/**
 * SubModel class. This class is a base class for
 * all sub models.
 *
 * @param parentModel
 *      The main model the submodel belongs to.
 */
// --------------------------------------------------------
function SubModel(parentModel, definesClass) {
    /** The parent model instance */
    var m_parentModel = parentModel;
    /** The class with internal model value defines. */
    var m_definesClass = definesClass;
    /** Registered model objects */
    var m_registrations = {};
    /** Whether sub model is ready */
    var m_isReady = false;

    var currentLoadType = MDLOADTYPE.PRELOAD;
    this.setCurrentLoadType = function(v){
        currentLoadType = v;
    }
    function checkContinueRegister(name){
        return true;
        //if (MDLOADTYPE.PRELOAD == currentLoadType) {
        //    return modelConfig.preloadVal.indexOf(name) > -1
        //}
        ////else if (MDLOADTYPE.DYNAMIC == currentLoadType) {
        ////    return name == modelConfig.dynamicVal;
        ////}
        //else {
        //    return modelConfig.preloadVal.indexOf(name) < 0;
        //}
    }
    /**
     * Returns the modeljs root interface.
     *
     * @returns the modeljs root interface.
     */
    this.getRootInterface = function () {
        return m_parentModel.getRootInterface();
    }

    /**
     * Registers a model object for this sub model.
     *
     * @param name
     *      The name of the object.
     * @param l
     *      The listeners to register. [ { event: x, handler: y } ]
     */
    this.registerObject = function (name, l) {
        //console.error("register object: " + name);
            m_registrations[name] = {
                object: null,
                listeners: l
            };

        // TODO: mtk has no biz...
        this.handleApiObjectAdded(name, -1);
    }

    /**
     * Internal method for registering a simple model object ( integer, string )
     */
    var registerSimpleObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter) {
        if(!checkContinueRegister(name)) return false;
        // Set default getterConverter if none specified
        if (!getterConverter) {
            getterConverter = function (value) {
                return value;
            }
        }

        // Set default setterConverter if none specified
        if (!setterConverter) {
            setterConverter = function (value) {
                return value;
            }
        }

        var handleValueChanged = function (value) {
            if (GLOBAL.DISABLE_MESSAGE) {
                return;
            }
            var handler = this[handlerName];
            if (handler) {
                handler(getterConverter(value));
            }
        }.bind(this);
        if (!this.hasOwnProperty(handlerName)) {
            this['_' + handlerName] = null;
            Object.defineProperty(this, handlerName,
                {
                    get: function () {
                        return this['_' + handlerName];
                    },
                    set: function (cb) {
                        if (!m_registrations[name]) {
                            // Register object
                            this.registerObject(
                                name, [
                                    {
                                        event: "notifyNewValue",
                                        handler: handleValueChanged
                                    }
                                ]);
                        }
                        this['_' + handlerName] = cb;
                    }
                });
        }
        // Register getter if specified
        if (getterName) {
            this[getterName] = function () {
                try {
                    if (!m_registrations[name]) {
                        // Register object
                        this.registerObject(
                            name, [
                                {
                                    event: "notifyNewValue",
                                    handler: handleValueChanged
                                }
                            ]);
                    }
                    var object = this.getObject(name);
                    return getterConverter(object.getValue());
                }
                catch (ex){
                    DBG_ERROR(ex.stack);
                    return "";
                }
            }
        }

        // Register setter if specified
        if (setterName) {
            this[setterName] = function (value) {
                try {

                    if (!m_registrations[name]) {


        // Register object
        this.registerObject(
            name, [
                {
                    event: "notifyNewValue",
                    handler: handleValueChanged
                }
            ]);
                    }
                    var object = this.getObject(name);
                    object.setValue(setterConverter(value));
                }
                catch (ex) {
                    DBG_ERROR(ex.stack);
                }
            }
        }
        // Register handler if specified
        //if (handlerName) {
        //    this[handlerName] = null;
        //}
        if (name in modelConfig.preload) {
            // Register object
            this.registerObject(
                name, [
                    {
                        event: "notifyNewValue",
                        handler: handleValueChanged
                    }
                ]);
        }

    }.bind(this);

    /**
     * Registers an integer model object.
     *
     * @param name
     *      The name of the object.
     * @param getterName
     *      The name of the get method "getX" or null.
     * @param setterName
     *      The name of the set method "setX" or null.
     * @param handlerName
     *      The name of the handler "onX" or null.
     * @param getterConverter
     *      The optional converter for converting from
     *      modeljs value to javascript value.
     * @param getterConverter
     *      The optional converter for converting from
     *      javascript value to modeljs value.
     */
    this.registerIntegerObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter) {
        registerSimpleObject(name, getterName, setterName, handlerName, getterConverter, setterConverter);
    }

    /**
     * Registers a string model object.
     *
     * @param name
     *      The name of the object.
     * @param getterName
     *      The name of the get method "getX" or null.
     * @param setterName
     *      The name of the set method "setX" or null.
     * @param handlerName
     *      The name of the handler "onX" or null.
     * @param getterConverter
     *      The optional converter for converting from
     *      modeljs value to javascript value.
     * @param getterConverter
     *      The optional converter for converting from
     *      javascript value to modeljs value.
     */
    this.registerStringObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter) {
        registerSimpleObject(name, getterName, setterName, handlerName, getterConverter, setterConverter);
    }

    /**
     * Internal method for registering a vector model object (IntegerVector or StringVector).
     */
    var registerVectorObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter, isInteger) {
        if(!checkContinueRegister(name)) return false;
        // Set default getterConverter if none specified
        if (!getterConverter) {
            getterConverter = function (value) {
                // Convert modeljs vector to javascript array
                var convertedValue = new Array();
                for (var i = 0; i < value.length; i++) {
                    var element = value[i];
                    convertedValue.push(element);
                }
                return convertedValue;
            }
        }

        // Set default setterConverter if none specified
        if (!setterConverter) {
            setterConverter = function (value) {
                // Convert javascript array to modeljs vector
                var convertedValue = (isInteger ? modeljs.createNumberVector() : modeljs.createStringVector());
                for (var i = 0; i < value.length; i++) {
                    var element = value[i];
                    convertedValue.push(element);
                }
                return convertedValue;
            }
        }
        var handleValueChanged = function (value) {

            if (GLOBAL.DISABLE_MESSAGE) {
                return;
            }
            if (handlerName) {
                var handler = this[handlerName];
                if (handler) {
                    handler(getterConverter(value));
                }
            }
        }.bind(this);
        if (!this.hasOwnProperty(handlerName)) {
            this['_' + handlerName] = null;
            Object.defineProperty(this, handlerName,
                {
                    get: function () {
                        return this['_' + handlerName];
                    },
                    set: function (cb) {
                        if (!m_registrations[name]) {
                            // Register object
                            this.registerObject(
                                name, [
                                    {
                                        event: (isInteger ? "notifyIntegerVector" : "notifyStringVector"),
                                        handler: handleValueChanged
                                    }
                                ]);
                        }
                        this['_' + handlerName] = cb;
                    }
                });
        }
        // Register getter if specified
        if (getterName) {
            this[getterName] = function () {
                if (!m_registrations[name]) {
                    // Register object
                    this.registerObject(
                        name, [
                            {
                                event: (isInteger ? "notifyIntegerVector" : "notifyStringVector"),
                                handler: handleValueChanged
                            }
                        ]);
                }
                var object = this.getObject(name);
                return getterConverter(object.getVector());
            }
        }

        // Register setter if specified
        if (setterName) {
            this[setterName] = function (value) {
                if (!m_registrations[name]) {
                    if (!m_registrations[name]) {
                        // Register object
                        this.registerObject(
                            name, [
                                {
                                    event: (isInteger ? "notifyIntegerVector" : "notifyStringVector"),
                                    handler: handleValueChanged
                                }
                            ]);
                    }
                }
                var object = this.getObject(name);
                object.setVectorElements(setterConverter(value));
            }
        }

        // Register handler if specified
        //if (handlerName) {
        //    this[handlerName] = null;
        //}


        if (name in modelConfig.preload) {

        // Register object
        this.registerObject(
            name, [
                {
                    event: (isInteger ? "notifyIntegerVector" : "notifyStringVector"),
                    handler: handleValueChanged
                }
            ]);
        }

    }.bind(this);

    /**
     * Registers an integer vector model object.
     *
     * @param name
     *      The name of the object.
     * @param getterName
     *      The name of the get method "getX" or null.
     * @param setterName
     *      The name of the set method "setX" or null.
     * @param handlerName
     *      The name of the handler "onX" or null.
     * @param getterConverter
     *      The optional converter for converting from
     *      modeljs value to javascript value.
     * @param getterConverter
     *      The optional converter for converting from
     *      javascript value to modeljs value.
     */
    this.registerIntegerVectorObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter) {
        registerVectorObject(name, getterName, setterName, handlerName, getterConverter, setterConverter, true);
    }

    /**
     * Registers an integer vector model object.
     *
     * @param name
     *      The name of the object.
     * @param getterName
     *      The name of the get method "getX" or null.
     * @param setterName
     *      The name of the set method "setX" or null.
     * @param handlerName
     *      The name of the handler "onX" or null.
     * @param getterConverter
     *      The optional converter for converting from
     *      modeljs value to javascript value.
     * @param getterConverter
     *      The optional converter for converting from
     *      javascript value to modeljs value.
     */
    this.registerStringVectorObject = function (name, getterName, setterName, handlerName, getterConverter, setterConverter) {
        registerVectorObject(name, getterName, setterName, handlerName, getterConverter, setterConverter, false);
    }

    /**
     * Registers an action model object.
     *
     * @param name
     *      The name of the object.
     * @param methods
     *      The action methods [ {name: x, method: y} ]. First parameter of
     *      the method is "object".
     * @param handlerName
     *      The name of the result handler "onX" or null.
     */
    this.registerActionObject = function (name, methods, handlerName, handlerError) {
        if(!checkContinueRegister(name)) return false;

        var handleResult = function (actionId, result) {

            if (GLOBAL.DISABLE_MESSAGE) {
                return;
        }


            if (handlerName && this[handlerName]) {
                // Convert result from modeljs map to normal JS map:
                var convertedResult = new Array();
                for (var i = 0; i < result.keys.length; i++) {
                    var key = result.keys[i];
                    convertedResult[key] = result[key];
                }

                // Call handler
                this[handlerName](actionId, convertedResult);
            }
        }.bind(this);

        if (handlerError) {
            this[handlerError] = null;
        }

        var handleError = function (actionId, errorCode) {
            if (GLOBAL.DISABLE_MESSAGE) {
                return;
            }
            if (handlerError && this[handlerError]) {

                this[handlerError](actionId, errorCode);

            }
        }.bind(this);

        // Register methods
        for (var i = 0; i < methods.length; i++) {
            var method = methods[i];
            this[method.name] = function (boundMethod) {
                if (!m_registrations[name]) {
        // Register object
        this.registerObject(
            name, [
                {
                    event: "notifyResult",
                    handler: handleResult
                },
                {
                    event: 'notifyExecutionError',
                    handler: handleError
                }
            ]);
                }
                newArguments = Array.prototype.slice.call(arguments);
                newArguments[0] = this.getObject(name);
                boundMethod.method.apply(this, newArguments);
            }.bind(this, method);
        }
        // Register handler if specified
        //if (handlerName) {
        //    this[handlerName] = null;
        //}
        if (name in modelConfig.preload) {
            // Register object
            this.registerObject(
                name, [
                    {
                        event: "notifyResult",
                        handler: handleResult
                    },
                    {
                        event: 'notifyExecutionError',
                        handler: handleError
                    }
                ]);
        }
    }

    /**
     * Registers a table model object.
     *
     * @param name
     *      The name of the object.
     * @param iteratorCreatorName
     *      The name of the iterator creator method "createX" or null.
     */
    this.registerTableObject = function (name, iteratorCreatorName) {
        if(!checkContinueRegister(name)) return false;
        // Register iterator creator if specified
        if (iteratorCreatorName) {
            this[iteratorCreatorName] = function (readOnly, selections, fields, orders, handler) {
                if (!m_registrations[name]) {
                    // Register object
                    this.registerObject(
                        name, []);
                }
                var object = this.getObject(name);
                return new TableIterator(object, readOnly, selections, fields, orders, handler);
            }.bind(this);
        }

        if (name in modelConfig.preload) {
        // Register object
        this.registerObject(
            name, []);
    }
    };

    /**
     * Returns the actual modeljs object for the given name.
     *
     * @param name
     *      The name of the registered model object.
     * @returns bool
     *      The modeljs object instance.
     */
    this.getObject = function (name) {
        return m_registrations[name].object;
    }

    /**
     * Returns whether sub model is ready (i.e. for all
     * registered model objects a modeljs object instance
     * has been received.
     *
     * @returns bool
     *      Whether the sub model is ready.
     */
    this.isReady = function () {
        if (m_isReady) {
            return m_isReady;
        }
        for (var key in m_registrations) {
            var object = m_registrations[key].object;
            if (!object) {
                return false;
            }
        }
        return true;
    }

    /**
     * Handler for notifications of object instances which
     * are now available.
     *
     * @param name
     *      The name of the available object.
     * @param spec
     *      The type of the object.
     */
    this.handleApiObjectAdded = function (name, spec) {

        if (name in m_registrations) {
            var registration = m_registrations[name];

            // Create object
            var object = TVMode ? m_parentModel.getRootInterface().createObject(name) : {};

            //  Register event listeners
            if (registration.listeners) {
                for (var i = 0; i < registration.listeners.length; i++) {
                    var listener = registration.listeners[i];
                    TVMode && object.addEventListener(listener.event, listener.handler);
                }
            }


            TVMode && object.connect();

            registration.object = object;

            // Ready
            if (!m_isReady) {
                m_isReady = this.isReady();
                m_isReady && m_parentModel.handleSubModelReady();
            }
        }
    }
}

{
    // --------------------------------------------------------------
    // Static functions
    // --------------------------------------------------------------
    /**
     * Registers all static constants starting with groupPrefix from definesClass
     * with modelClass. In modelClass the stripPrefix will be stripped from
     * the name.
     */
    SubModel.registerStaticConstants = function (modelClass, definesClass, groups) {
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var groupPrefix = group.groupPrefix;
            var stripPrefix = group.stripPrefix;
            for (var key in definesClass) {
                if (key.indexOf(groupPrefix) == 0) {
                    var strippedKey = key.substr(stripPrefix.length);
                    modelClass[strippedKey] = definesClass[key];
                }
            }
        }

    }

}


/**
 * The main Model class.
 */
function Model() {
    /** The registered sub models. */
    var m_registrations = {};
    /** Number of sub models which are not yet ready. */
    var m_registrationsNotReady = 0;

    // --------------------------------------------------------------
    // Methods
    // --------------------------------------------------------------
    /**
     * Registers a sub model.
     * @param name
     *       The name of the sub model.
     * @param modelClass
     *       The class to instantiate in order to create
     *       the sub model.
     */
    var registerModel = function (name, modelClass, loadType) {
        if (!m_registrations[name]) {
            if (TVMode && -1 == modeljs.createmodel("servicemode" == name ? ".servicemode." : name))return;
            this[name] = m_registrations[name] = new modelClass(this);
        }
        this[name].setCurrentLoadType(loadType);
        if (this[name].registerSubObject) this[name].registerSubObject(loadType);
    }.bind(this);

    this.createSubModel = function (configArr, loadType) {
        configArr.forEach(function (v, k) {
            //if (!TVMode) console.log("create sub model: " + v.name + ", " + v.modelClass);
            registerModel(v.name, eval(v.modelClass), loadType);
        });
    };
    /**
     * Initializes the model. This method must be called
     * after registering all event listeners but before
     * accessing the model.
     */
    this.initialize = function () {
        if (TVMode) rootInterface.connect();
    }

    /**
     * Handles a sub model ready notfication and calls
     * the onModelReady handler if all sub models are ready.
     */
    this.handleSubModelReady = function () {
        m_registrationsNotReady--;

        if (m_registrationsNotReady == 0) {
            this.onModelReady && this.onModelReady();
        }
        return true;
    };

    /**
     * Returns the modeljs root interface.
     */
    this.getRootInterface = function () {
        return rootInterface;
    };

    /** Handler to be called when model is ready. */
    this.onModelReady = null;

    // --------------------------------------------------------------
    // Init
    // --------------------------------------------------------------


    // Create model root interface
    var rootInterface = TVMode ? modeljs.createRootInterface() : {};
    //rootInterface.addEventListener("apiObjectAdded", handleApiObjectAdded);
}








{

    try {
        // --------------------------------------------------------------
        // Static constants
        // --------------------------------------------------------------
        Model.FIELD_COND_NONE = modeljs.FIELD_COND_NONE;
        Model.FIELD_COND_EQUAL = modeljs.FIELD_COND_EQUAL;
        Model.FIELD_COND_CONTAINS = modeljs.FIELD_COND_CONTAINS;
        Model.FIELD_COND_LESS = modeljs.FIELD_COND_LESS;
        Model.FIELD_COND_LESSEQUAL = modeljs.FIELD_COND_LESSEQUAL;
        Model.FIELD_COND_GREATER = modeljs.FIELD_COND_GREATER;
        Model.FIELD_COND_GREATEREQUAL = modeljs.FIELD_COND_GREATEREQUAL;
        Model.FIELD_COND_ALL_BITS_SET = modeljs.FIELD_COND_ALL_BITS_SET;
        Model.FIELD_COND_ALL_BITS_CLEARED = modeljs.FIELD_COND_ALL_BITS_CLEARED;
        Model.FIELD_COND_ANY_BIT_SET = modeljs.FIELD_COND_ANY_BIT_SET;
        Model.FIELD_COND_ANY_BIT_CLEARED = modeljs.FIELD_COND_ANY_BIT_CLEARED;
        Model.FIELD_COND_NOT_EQUAL = modeljs.FIELD_COND_NOT_EQUAL;
        Model.FIELD_COND_END = modeljs.FIELD_COND_END;
    }
    catch (ex) {
        //debugPrint("_______________model error" + ex.message);
    }
}


/**
 * ModelLoader class responsible for loading
 * all sub model javascript files.
 * 加入load模块数组判断
 */
function ModelLoader(onLoadedHandler, configArr) {

    /// List of modules to load in given order

    var MODEL_MODULES = [];
    configArr.forEach(function (v, k) {
        MODEL_MODULES.push(v.path);
    });

    /// Number of loaded modules
    var loadedModules = 0;

    for (var i = 0; i < MODEL_MODULES.length; i++) {
        var module = MODEL_MODULES[i];
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = module;
        script.onload = function () {
            loadedModules++;
            if (loadedModules == MODEL_MODULES.length) {
                onLoadedHandler();
            }
        };
        document.head.appendChild(script);
    }
}
var modelConfig = {
    "preload" : [
        "tvapi.table.favouritelist.list",
        "tvapi.table.servicelist.list",
        "tvapi.i32.hotel.hotel.mode",
        "tvapi.i32.system.open.from.standby"
    ],
    "common": [
        {name: "sound", modelClass: "SoundModel", path: "model/model-sound.js"},
        {name: "system", modelClass: "SystemModel", path: "model/model-system.js"},
        {name: "servicelist", modelClass: "ServicelistModel", path: "model/model-servicelist.js"},
        {name: "hisfactory", modelClass: "His_factoryModel", path: "model/model-hisfactory.js"},
        {name: "basicSetting", modelClass: "Basic_settingsModel", path: "model/model-basic-settings.js"},
        {name: "usb", modelClass: "UsbModel", path: "model/model-usb.js"},
        {name: "tvservice", modelClass: "TvserviceModel", path: "model/model-tvservice.js"},
        {name: "closedcaption", modelClass: "ClosedcaptionModel", path: "model/model-closedcaption.js"},
        {name: "appsetting", modelClass: "App_settingModel", path: "model/model-app-setting.js"},
        {name: "language", modelClass: "LanguageModel", path: "model/model-language.js"},
        {name: "parentlock", modelClass: "Parental_lockModel", path: "model/model-parental-lock.js"},
        {name: "softupdate", modelClass: "SoftwareupdateModel", path: "model/model-softwareupdate.js"},
        {name: "cec", modelClass: "CecModel", path: "model/model-cec.js"},
        {name: "timerfunc", modelClass: "Timer_functionsModel", path: "model/model-timer-functions.js"},
        {name: "source", modelClass: "SourceModel", path: "model/model-source.js"},
        {name: "network", modelClass: "NetworkModel", path: "model/model-network.js"},
        {name: "video", modelClass: "VideoModel", path: "model/model-video.js"},
        {name: "miracast", modelClass: "MiracastModel", path: "model/model-miracast.js"},
        {name: "picture", modelClass: "PictureModel", path: "model/model-picture.js"},
        {name: "mpctrl", modelClass: "MpCtrlModel", path: "model/model-mpctrl.js"},
        {name: "volume", modelClass: "VolumeModel", path: "model/model-volume.js"},
        {name: "directory", modelClass: "DirectoryModel", path: "model/model-directory.js"},
        {name: "bluetooth", modelClass: "BluetoothModel", path: "model/model-bluetooth.js"},
        {name: "servicemode", modelClass: "ServiceModeModel", path: "model/model-servicemode.js"},
        {name: "hotel", modelClass: "HotelModel", path: "model/model-hotel.js"}
        //{name: "tts", modelClass: "TtsModel", path: "model/model-tts.js"}
    ],
    "NA": [
        {name: "channelSearch", modelClass: "Channelsearch_atscModel", path: "model/model-channelsearch-atsc.js"}
    ],
    "SA": [
        {name: "epg", modelClass: "EpgModel", path: "model/model-epg.js"},
        // {name: "timerlist", modelClass: "TimerlistModel", path: "model/model-timerlist.js"},
        {name: "tshift", modelClass: "TimeshiftModel", path: "model/model-timeshift.js"},
        {name: "ci", modelClass: "Common_interfaceModel", path: "model/model-ci.js"},
        {name: "channelSearch", modelClass: "Channelsearch_isdbModel", path: "model/model-channelsearch-isdb.js"},
        {name: "ginga", modelClass: "GingaModel", path: "model/model-ginga.js"},
        {name: "mheg5", modelClass: "Mheg5Model", path: "model/model-mheg5.js"},
//        {name: "bluetooth", modelClass: "BluetoothModel", path: "model/model-bluetooth.js"},
        {name: "speech", modelClass: "SpeechModel", path: "model/model-speech.js"},
        {name: "pvr", modelClass: "PvrModel", path: "model/model-pvr.js"}
        //{name: "hotel", modelClass: "HotelModel", path: "model/model-hotel.js"}

    ],
    "COL": [
        {name: "epg", modelClass: "EpgModel", path: "model/model-epg.js"},
        {name: "timerlist", modelClass: "TimerlistModel", path: "model/model-timerlist.js"},
        {name: "tshift", modelClass: "TimeshiftModel", path: "model/model-timeshift.js"},
        {name: "ci", modelClass: "Common_interfaceModel", path: "model/model-ci.js"},
        {name: "channelSearch", modelClass: "Channelsearch_dvbModel", path: "model/model-channelsearch.js"},
        {name: "pvr", modelClass: "PvrModel", path: "model/model-pvr.js"}
        //{name: "hotel", modelClass: "HotelModel", path: "model/model-hotel.js"}
    ],
    "EU": [
        {name: "fvpepg", modelClass: "FVPEpgModel", path: "model/model-fvpepg.js"},
        {name: "epg", modelClass: "EpgModel", path: "model/model-epg.js"},
//        {name: "timerlist", modelClass: "TimerlistModel", path: "model/model-timerlist.js"},
        {name: "tshift", modelClass: "TimeshiftModel", path: "model/model-timeshift.js"},
        {name: "ci", modelClass: "Common_interfaceModel", path: "model/model-ci.js"},
        {name: "channelSearch", modelClass: "Channelsearch_dvbModel", path: "model/model-channelsearch.js"},
        {name: "mheg5", modelClass: "Mheg5Model", path: "model/model-mheg5.js"},
        {name: "bluetooth", modelClass: "BluetoothModel", path: "model/model-bluetooth.js"},
        {name: "satellite", modelClass: "SatelliteModel", path: "model/model-satellite.js"},
//        {name: "speech", modelClass: "SpeechModel", path: "model/model-speech.js"},
        {name: "pvr", modelClass: "PvrModel", path: "model/model-pvr.js"},
        //{name: "hotel", modelClass: "HotelModel", path: "model/model-hotel.js"},
        {name: "oad", modelClass: "OadModel", path: "model/model-oad.js"}
        //    {name: "hbbtv", modelClass: "HbbtvModel", path: "model/model-hbbtv.js"}


    ],
    "EM": [
        {name: "epg", modelClass: "EpgModel", path: "model/model-epg.js"},
        {name: "timerlist", modelClass: "TimerlistModel", path: "model/model-timerlist.js"},
        {name: "tshift", modelClass: "TimeshiftModel", path: "model/model-timeshift.js"},
        {name: "ci", modelClass: "Common_interfaceModel", path: "model/model-ci.js"},
        {name: "channelSearch", modelClass: "Channelsearch_dvbModel", path: "model/model-channelsearch.js"},
        {name: "mheg5", modelClass: "Mheg5Model", path: "model/model-mheg5.js"},
        {name: "bluetooth", modelClass: "BluetoothModel", path: "model/model-bluetooth.js"},
        {name: "speech", modelClass: "SpeechModel", path: "model/model-speech.js"},
        {name: "pvr", modelClass: "PvrModel", path: "model/model-pvr.js"},
        {name: "hotel", modelClass: "HotelModel", path: "model/model-hotel.js"}
    ]
};

// Load modules and create global model instance when finished
//var model = null;
//var modelLoader = new ModelLoader(function () {
//    model = new Model();
//    model.createSubModel(modelConfig.preload);
//}, modelConfig.preload);

function MDLOADTYPE() {
}
var model = new Model();
function createModel(callback, loadType) {
    var modelArr = modelConfig.common.concat(modelConfig[GLOBAL.CURRENT_AREA]);
        new ModelLoader(function () {
            model.createSubModel(modelArr, loadType);
            callback();
        }, modelArr);
}



// Load modules and create global model instance when finished


if(!tv){
    initCountry="Poland";//PC版本写入国家
//    initCountry = "South Africa";
//    initCountry="Philippines";//SA
}

function SystemInitBrand()
{
	try{
		var brand=model.system.getCurBrand();
	}catch (e){
		debugE(e.message);
		brand="his";
	}
    var index=sysBrandlist.indexOf(brand);
    if(index<0)
    {
        brand=sysBrandlist[0];
        debugE(" the brand error ,fix it");
    }
	initBrand = brand;//set the uisdk the brand
     debugE("the tv brand is "+brand);
    if("SA" == InitArea){
        switch(brand){
            case "jvc":
            case "pio":
            case "psc":
            case "nob":
            case "san":
            case "phi":
            case "ilo":
            case "sei":
            case "ton":
//	        case "blu":
//            case "pan":
//            case "riv":
                g_launcherBrand = "VIDAALiteU2";
                break;
            case "shp":
                g_launcherBrand = "VIDAALite";
                VIDAALiteLauncherBaseDir = '../../VIDAALiteLauncher/';
                break;
            case "his":
            case "dev":
            case "pan":
            case "riv":
            case "kal":
            case "fam":
            case "blu":
            case "avi":
            case "ezy":
            case "ame":
            case "bgh":
            case "cha":
            case "adm":
                g_launcherBrand = "VIDAALiteU2";
                break;
            default :
                g_launcherBrand = "VIDAALiteU2";
                break;
        }
    }
    else if("COL" == InitArea) {
        if("kal" == brand || "cha" == brand || "cor" == brand || "mtx" == brand) {
            g_launcherBrand = "SA_OEM";
        }
        else {
            g_launcherBrand = "VIDAALite";
        }
    }else{
        g_launcherBrand = "VIDAALiteU2";
    }

	var string=Hisense.File.read("brandcode",1);
	if((typeof string!="string")||(string!=brand))
	{
		Hisense.File.write("brandcode",brand,1);
	}

}

function InitCountry()
{
    try{
    if(!tv) return;
    var country=model.basicSetting.getTvsetLocation();
    var countrylist=[];
    var index=-1;
    var newareaindex=0;
    debugPrint("getTvsetLocation"+country);
    if(InitArea=="EM")
    {
        newareaindex=model.hisfactory.getNewAreaIndex();
        debugPrint("newareaindex"+newareaindex);
    }
    countrylist=getsettingsyscountrylist(InitArea,newareaindex);
    debugPrint("333333333333");
    for (var i = 0; i < countrylist.length; i++) {
        if (countrylist[i].code.toLowerCase() == country.toLowerCase())
        {
            index=i;
            break;
        }
    }
    debugPrint("4444444444"+index);
    if(index>=0)
    {
        initCountry=countrylist[index].name;
        debugPrint("current country"+initCountry);
        initCountryCode = countrylist[index].code;
        GLOBAL.CURRENT_COUNTRY =countrylist[index].code;
    }
    else
    {
       // "name": "South Africa",//南非
       // "code": "ZAF"
        initCountry=countrylist[0].name;
        model.basicSetting.setTvsetLocation(countrylist[0].code);
        DBG_ALWAYS("the country is error ,to fix it "+initCountry);
        initCountryCode = countrylist[0].code;
        GLOBAL.CURRENT_COUNTRY =countrylist[0].code;
    }
    }catch (e)
    {
        debugE(e.message)
    }

}
function getsettingsyscountrylist(verArea,CurrentSubArea)
{
    var countryMapList=[];
    if(verArea=="SA")
    {
        countryMapList = [
            {


                "name": "Argentina",//阿根廷
                "code": "ARG"
            },
            {
                "name": "Bolivia",//玻利维亚
                "code": "BOL"
            },
            {

                "name": "Brazil",//巴西
                "code": "BRA"
            },
            {
                "name": "Chile",//智利
                "code": "CHL"
            },
            {

                "name": "Colombia",//哥伦比亚
                "code": "COL"
            },
            //{
            //
            //    "name": "Costa Rica",//哥斯达黎加
            //    "code": "CRI"
            //},
            {

                "name": "Ecuador",//厄瓜多尔
                "code": "ECU"
            },
            {

                "name": "Paraguay",//巴拉圭
                "code": "PRY"
            },
            {

                "name": "Peru",//秘鲁
                "code": "PER"
            },
            {

                "name": "Philippines",//菲律宾
                "code": "PHL"
            },
            {

                "name": "Uruguay",//乌拉圭
                "code": "URY"
            },
            {
                "name":"Venezuela",//委内瑞拉
                "code": "VEN"
            }
        ];

    }
    else  if(verArea=="COL")
    {
        countryMapList = [{

            "name": "Colombia",
            "code": "COL"
        }]
    }
    else  if(verArea=="NA")
    {
        countryMapList = [
            {

                "name": "USA",
                "code": "USA"
            },
            {

                "name": "Canada",
                "code": "CAN"
            },
            {

                "name": "Mexico",
                "code": "MEX"
            }]
    }
    else  if(verArea=="EU")
    {
        countryMapList = [
            {
                "name": "Germany",
                "code": "DEU"
            },
            {

                "name": "Austria",
                "code": "AUT"
            },
            {

                "name": "Italy",
                "code": "ITA"
            },
            {

                "name": "UK",
                "code": "GBR"
            },
            {

                "name": "Spain",
                "code": "ESP"
            },
            {

                "name": "France",
                "code": "FRA"
            },
            {

                "name": "Switzerland",
                "code": "CHE"
            },
            {

                "name": "Portugal",
                "code": "PRT"
            },
            {

                "name": "Sweden",
                "code": "SWE"
            },
            {

                "name": "Denmark",
                "code": "DNK"
            },
            {

                "name": "Finland",
                "code": "FIN"
            },
            {

                "name": "Norway",
                "code": "NOR"
            },
            {

                "name": "Turkey",
                "code": "TUR"
            },
            {

                "name": "Czech Republic",
                "code": "CZE"
            },
            {

                "name": "Slovakia",
                "code": "SVK"
            },
            {

                "name": "Poland",
                "code": "POL"
            },
            {

                "name": "Hungary",
                "code": "HUN"
            },
            {

                "name": "Bulgaria",
                "code": "BGR"
            },
            {
                "name": "Russia_EU",//俄罗斯
                "code": "RUS"
            },
            {
                "name": "Uzbekistan_EU",//乌兹别克斯坦(Hisense)
                "code": "UZB"
            },
            {
                "name": "Kirghizstan_EU",//吉尔吉斯斯坦(Hisense)
                "code": "KGZ"
            },
            {
                "name": "Tajikistan_EU",// 塔吉克斯坦(Hisense)
                "code": "TJK"
	    },

	    {
		    "name": "Croatia",// 克罗地亚(Hisense)
		    "code": "HRV"
	    },
	    {
		    "name": "Latvia",// 拉脱维亚(Hisense)
		    "code": "LVA"
	    },
	    {
		    "name": "Estonia",// 爱沙尼亚(Hisense)
		    "code": "EST"
	    },
	    {
                    "name": "Lithuanija",// 立陶宛(Hisense)
		    "code": "LTU"
	    }
        ]
        //["Germany", "Austria", "Italy", "England", "Spain", "France", "Switzerland", "Portuguesa",
        // "Sweden", "Denmark", "Finland", "Norway", "Turkish", "Czech", "Slovakia", "Poland", "Hungary", "Bulgaria"]

    }
    else  //if(verArea=="EM")
    {
        if(CurrentSubArea=="MiddleEast"||CurrentSubArea==0)
        {
            countryMapList = [
                {
                    "name": "Egypt", //埃及
                    "code": "EGY"
                },
                {
                    "name": "Algeria", //阿尔及利亚
                    "code": "DZA"
                },
                {
                    "name": "Iran", //伊朗
                    "code": "IRN"
                },
                {
                    "name": "Iraq", //伊拉克
                    "code": "IRQ"
                },
                {
                    "name": "Saudi Arabia", //沙特阿拉伯
                    "code": "SAU"
                },
                {
                    "name": "UAE", //阿联酋
                    "code": "ARE"
                },
                {
                    "name": "Kuwait", //科威特
                    "code": "KWT"
                },
                {
                    "name": "Yemen", //也门
                    "code": "YEM"
                },
                {
                    "name": "Oman", //阿曼
                    "code": "OMN"
                },
                {
                    "name": "Qatar", //卡塔尔
                    "code": "QAT"
                },
                {
                    "name": "Jordan", //约旦
                    "code": "JOR"
                },
                {
                    "name": "Dubai", //迪拜
                    "code": "DXB"
                }
                ,
                {
                    "name": "Palestine", //巴勒斯坦
                    "code": "PSE"
                }
                ,
                {
                    "name": "Bahrain", //巴林
                    "code": "BHR"
                },
                {
                    "name": "Lebanon", //黎巴嫩
                    "code": "LBN"
                },
                {
                    "name": "Syria", //叙利亚
                    "code": "SYR"
                }
            ]
        }
        else if(CurrentSubArea=="CIS"||CurrentSubArea==1)
        {
            countryMapList = [
                {
                    "name": "Israel", //以色列
                    "code": "ISR"
                },
                {
                    "name": "Russia",//俄罗斯
                    "code": "RUS"
                },
                {
                    "name": "Uzbekistan",//乌兹别克斯坦(Hisense)
                    "code": "UZB"
                },
                {
                    "name": "Kirghizstan",//吉尔吉斯斯坦(Hisense)
                    "code": "KGZ"
                },
                {
                    "name": "Turkmenistan",//土库曼斯坦(Hisense)
                    "code": "TKM"
                },
                {
                    "name": "Kazakhstan",//哈萨克斯坦(Hisense)
                    "code": "KAZ"
                },
                {
                    "name": "Ukraine",//乌克兰(Hisense)
                    "code": "UKR"
                },
                {
                    "name": "Azerbaijan",//阿塞拜疆(Hisense)
                    "code": "AZE"
                },
                {
                    "name": "Georgia",//格鲁吉亚(Hisense)
                    "code": "GEO"
                },
                {
                    "name": "Armenia",// 亚美尼亚(Hisense)
                    "code": "ARM"
                },
                {
                    "name": "Serbia",// 塞尔维亚(Hisense)
                    "code": "SRB"
                },
                {
                    "name": "Tajikistan",// 塔吉克斯坦(Hisense)
                    "code": "TJK"
                },
                {
                    "name": "Belarus",// 白俄罗斯(Hisense)
                    "code": "BLR"
                },
                {
                    "name": "Moldova",// 摩尔多瓦(Hisense)
                    "code": "MDA"
                }

            ]
        }
        else if(CurrentSubArea=="Asian"||CurrentSubArea==2)
        {
            countryMapList = [
                {

                    "name": "Taiwan",//台湾（OEM)
                    "code": "TWN"
                },
                {

                    "name": "Australia",//澳大利亚（OEM)
                    "code": "AUS"
                },
                {

                    "name": "Thailand",//泰国（OEM)
                    "code": "THA"
                },
                {

                    "name": "Vietnam",// 越南
                    "code": "VNM"
                },
                {

                    "name": "Myanmar",//缅甸
                    "code": "MMR"
                },
                {

                    "name": "Malaysia",//马来西亚
                    "code": 'MYS'
                    //"MYS"
                },
                {
                    "name": "India",//印度
                    "code": "IND"
                },
                {
                    "name": "Indonesia",//印度尼西亚
                    "code": "IDN"
                },
                {
                    "name": "Sri Lanka",//斯里兰卡
                    "code": "LKA"
                },
                {
                    "name": "Maldives", //马尔代夫
                    "code": "MDV"
                },
                {
                    "name": "Fiji",//斐济
                    "code": "FJI"
                }
                ,
                {
                    "name": "Bengal",//孟加拉
                    "code": "BGD"
                },
                           // 巴基斯坦
                {
                    "name": "Pakistan",
                    "code": "PAK"
                },
                                  //  尼泊尔
                {
                    "name": "Nepal",
                    "code": "NPL"
                },
                                    //  柬埔寨
                {
                    "name": "Cambodia",
                    "code": "KHM"
                },
                {
                    "name": "Mongolia",//蒙古
                    "code": "MNG"
                },
                {
                    "name": "Others",//其他
                    "code": "ZZZ"
                }
            ]
        }
        else
        {
            countryMapList = [
                {

                    "name": "South Africa",//南非
                    "code": "ZAF"
                },
                {

                    "name": "Morocco",//摩洛哥(Hisense)
                    "code": "MAR"
                },
                {

                    "name": "Nigeria",//尼日利亚(Hisense)
                    "code": "NGA"
                },
                {

                    "name": "Libya",//利比亚(Hisense)
                    "code": "LBY"
                },
                {
                    "name": "Tunisia",//突尼斯
                    "code": "TUN"
                },
                {

                    "name": "Ghana",//加纳(Hisense+OEM)
                    "code": "GHA"
                },
                {

                    "name": "Sierra Leone",//塞拉利昂(Hisense)
                    "code": "SLE"
                },
                {

                    "name": "Cote d'Ivoire",// 科特迪瓦(Hisense+OEM)
                    "code": "CIV"
                },
                {

                    "name": "Angola",// 安哥拉(Hisense+OEM)
                    "code": "AGO"
                }
                ,
                {

                    "name": "Benin",// 贝宁(Hisense)
                    "code": "BEN"
                },
                {

                    "name": "Liberia",// 利比里亚(Hisense)
                    "code": "LBR"
                },
                {

                    "name": "Guinea",// 几内亚(Hisense)
                    "code": "GIN"
                },
                {
                    "name": "Senegal",// 塞内加尔(Hisense)
                    "code": "SEN"
                },
                {
                    "name": "Congo (DRC)",//  刚果（金）(Hisense+OEM)
                    "code": "COD"
                },
                {

                    "name": "Cameroon",//喀麦隆(Hisense+OEM)
                    "code": "CMR"
                },
                {

                    "name": "Zimbabwe",// 津巴布韦(Hisense)
                    "code": "ZWE"
                },
                {

                    "name": "Congo-Brazzaville",// 刚果布(Hisense)
                    "code": "COG"
                },
                {
                    "name": "Burundi",// 布隆迪(Hisense)
                    "code": "BDI"
                },
                {
                    "name": "Somalia",// 索马里(Hisense)
                    "code": "SOM"
                },
                {

                    "name": "Uganda",//乌干达(Hisense)
                    "code": "UGA"
                },
                {

                    "name": "Tanzania",//坦桑尼亚(Hisense)
                    "code": "TZA"
                },
                {

                    "name": "Mauritius",//  毛里求斯(Hisense)
                    "code": "MUS"
                },
                {

                    "name": "Sudan",//苏丹(Hisense)
                    "code": "SDN"
                },
                {

                    "name": "Djibouti",//吉布提(Hisense)
                    "code": "DJI"
                },
                {

                    "name": "Ethiopia",// 埃塞俄比亚(Hisense)
                    "code": "ETH"
                },
                {

                    "name": "Kenya",// 肯尼亚(Hisense+OEM)
                    "code": "KEN"
                },
                {

                    "name": "Mozambique",// 莫桑比克(Hisense)
                    "code": "MOZ"
                },
                {

                    "name": "Madagascar",// 马达加斯加(Hisense)
                    "code": "MDG"
                }
                //        {
                //            "name": "Dubai", //迪拜
                //            "code": "DXB"
                //        },
                //        {
                //            "name": "Russia",//俄罗斯
                //            "code": "RUS"
                //        },
                //        {
                //            "name": "Uzbekistan",//乌兹别克斯坦(Hisense)
                //            "code": "UZB"
                //        },
                //        {
                //            "name": "Kyrgyz",//吉尔吉斯斯坦(Hisense)
                //            "code": "KGZ"
                //        },
                //        {
                //            "name": "Turkmenistan",//土库曼斯坦(Hisense)
                //            "code": "TKM"
                //        },
                //        {
                //            "name": "Turkey",//土耳其(Hisense)
                //            "code": "TUR"
                //        },
                //        {
                //            "name": "Ukraine",//乌克兰(Hisense)
                //            "code": "UKR"
                //        },
                //        {
                //            "name": "Azerbaijan",//阿塞拜疆(Hisense)
                //            "code": "AZE"
                //        },
                //        {
                //            "name": "Georgia",//格鲁吉亚(Hisense)
                //            "code": "GEO"
                //        },
                //        {
                //            "name": "Armenia",// 亚美尼亚(Hisense)
                //            "code": "ARM"
                //        },
                //        {
                //            "name": "India",//印度
                //            "code": "IND"
                //        },
                //        {
                //            "name": "Indonesia",//印度尼西亚
                //            "code": "IDN"
                //        },
                //        {
                //            "name": "Sri Lanka",//斯里兰卡
                //            "code": "LKA"
                //        }
            ]
        }
    }
    debugPrint("the countryMapList "+JSON.stringify(countryMapList))
    return countryMapList;
}

//载入时直接执行
createModel(function(){InitCountry();
    SystemInitBrand();});




