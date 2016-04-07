define([
    'jquery',
    'i18n!nls/dataEntry'
], function ($, DataEntry) {

    var optionsDefault = {
        NULL : null,
        OTHER : "Other",
        policyElement_path : 'root.policyElement',
        unit_path : 'root.unit',
        source_path : 'root.source',
        secondGenerationSpecific_path : 'root.secondGenerationSpecific',
        valueValueText_path : 'root.valueValueText',
        value_path : 'root.value',
        valueText_path : 'root.valueText',
        linkPdf_path : 'root.linkPdf',
        valueValueText_enum_values : [DataEntry['value'], DataEntry['valueText']],
        localCondition_path : 'root.localCondition',
        openListfieldsToDisable : ['policyElement', 'unit', 'source', 'secondGenerationSpecific', 'localCondition'],
        fieldsToDisable : ['valueText'],
        lang : 'EN',
        dataEntryToolClassDiv : '.fx-jsonform',
        mandatoryFieldsError : 'mandatoryFieldsErrorDiv',
        codes : {
            importTariffs : 11,
            tariffQuotas : 12
        }
    };

    function DataEntryVariables(o) {

        if (this.options === undefined) {
            this.options = {};
        }

        $.extend(true, this.options, optionsDefault, o);
    }

    DataEntryVariables.prototype.settingProperties = function (schema, options) {
    };

    return DataEntryVariables;
});
