/*global define */

define([
    'jquery',
    'text!ap-dataEntry/index.html',
    'underscore','bootstrap','handlebars',

    'js/renderAuthMenu',
    //'js/renderForm',
    'fx-common/jsonForm',
    'js/renderFormCustomFeature',
    'js/storeForm',

    'config/services',
    'ap-dataEntry/schemaUtils',
    'ap-dataEntry/dataEntryVariables',
    'domready!'
], function ($, DataEntryTemplate, _, bootstrap, Handlebars,
             renderAuthMenu,
             renderForm,
             renderFormCustomFeature,
             storeForm,
             Config,
            SchemaUtils, DataEntryVariables) {

    var o = {
        dataEntryVariables : ''
    };

    function Start(options) {
        $.extend(true, o, options);
    }

    Start.prototype.init = function (options) {

        var self = this;
        var dataEntryVariables = new DataEntryVariables();
        o.dataEntryVariables = dataEntryVariables;

        $.extend(true, o, options);
        $("#metadataEditorContainer").html(DataEntryTemplate);

        /* Apply FAOSTAT theme for json-editor. */
        //JSONEditor.defaults.themes.ap_dataEntry_theme = JSONEditor.AbstractTheme.extend(AP_DATAENTRY_THEME);

        /* Extend string editor. */
        //JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend(this.custom_string_editor);

        var authMenu =  renderAuthMenu('compile'),

        //TO REMOVE START
        //user = authMenu.auth.getCurrentUser();
        //user = {name: "" }
        user =  {
            "name" : "Guest",
            "password" : "guest"
        };
        //END TO REMOVE

        var formStore = new storeForm({
            prefix: user.name || 'unlogged',
            storeExpires: 100000,
            autosaveLoader: '#sectionstorage-loader'
        });
        id = "searchEditPolicy";
        //id = "cat1";
        if((options!=null)&&(typeof options!= "undefined")&&(options.fileName!=null)&&(typeof options.fileName!= "undefined")){
            require(['ap-dataEntry/json/'+ options.fileName ], function(schema) {

                var schemaUtils = new SchemaUtils();
                schemaUtils.init();
                schemaUtils.settingProperties(schema, options);
                renderFormCustomFeature('#'+ id, {
                    schema: schema,
                    iconlib: 'fontawesome4'
                });

                var disabled_fields = self.disabledOpenListFields(schema, dataEntryVariables, null);
                disabled_fields = self.disabledFields(schema, dataEntryVariables, disabled_fields);
                //var disabled_fields = [];
                console.log("schema!!")
                console.log(schema)
                self.render = new renderForm('#'+ id, {
                    schema: schema,
                    iconlib: 'fontawesome4',
                    theme: 'ap_dataEntry_theme',
                    disable_array_add: true,
                    disable_array_delete: true,
                    disable_array_reorder: true,
                    disabled:disabled_fields,
                    values: formStore.getSections(),
                    onChange: function(data) {
                        var path = dataEntryVariables.options.policyElement_path;
                        var field = self.render.editor.getEditor(path);
                        self.disableNameInOpenList(field, dataEntryVariables);
                        path = dataEntryVariables.options.unit_path;
                        var unit_field = self.render.editor.getEditor(path);
                        self.disableNameInOpenList(unit_field, dataEntryVariables);
                        path = dataEntryVariables.options.source_path;
                        field = self.render.editor.getEditor(path);
                        self.disableNameInOpenList(field, dataEntryVariables);
                        path = dataEntryVariables.options.secondGenerationSpecific_path;
                        field = self.render.editor.getEditor(path);
                        self.disableNameInOpenList(field, dataEntryVariables);
                        path = dataEntryVariables.options.localCondition_path;
                        field = self.render.editor.getEditor(path);
                        self.disableNameInOpenList(field, dataEntryVariables);
                        //Value and Value Text based on valueValueText selection
                        path = dataEntryVariables.options.valueValueText_path;
                        var valueValueTextField = self.render.editor.getEditor(path);
                        path = dataEntryVariables.options.value_path;
                        var valueField = self.render.editor.getEditor(path);
                        path = dataEntryVariables.options.valueText_path;
                        var ValueTextField = self.render.editor.getEditor(path);
                        self.valueValueTextChanged(valueValueTextField, valueField, ValueTextField, unit_field, dataEntryVariables);
                    }
                });
            }, function (err) {
                alert(err)
            });
        }
    };

    Start.prototype.valueValueTextChanged = function (valueValueTextField, valueField, ValueTextField, unit_field, dataEntryVariables) {
        if((valueValueTextField!=null)&&(typeof valueValueTextField!="undefined")){
            var valueText = valueValueTextField.getValue();
            switch (valueText){
                case o.dataEntryVariables.options.valueValueText_enum_values[0]:
                    //Value
                    //Disable Value Text
                    ValueTextField.setValue("");
                    ValueTextField.disable();
                    //Enable Value and Unit
                    valueField.enable();
                    if(unit_field.getValue().list==dataEntryVariables.options.OTHER){
                        unit_field.editors.name.enable();
                    }
                    unit_field.editors.list.enable();
                    break;
                case o.dataEntryVariables.options.valueValueText_enum_values[1]:
                    //Value Text
                    //Disable Value and Unit
                    valueField.setValue("");
                    valueField.disable();
                    unit_field.editors.name.setValue("");
                    unit_field.editors.name.disable();
                    unit_field.editors.list.setValue("");
                    unit_field.editors.list.disable();
                    //Enable Value Text
                    ValueTextField.enable();
                    break;
            }
        }
    };

    Start.prototype.disableNameInOpenList = function (field, dataEntryVariables) {

        if((field!=null)&&(typeof field!="undefined")){
            var value = field.getValue().list;
            if((value!=null)&&(typeof value !="undefined")){
                if(value==dataEntryVariables.options.OTHER){
                    field.editors.name.enable();
                }
                else{
                    //Empty Name
                    field.editors.name.setValue("");
                    field.editors.name.disable();
                }
            }
        }
    };

    Start.prototype.disabledOpenListFields = function (schema, dataEntryVariables, disabledElementArray) {
        var disabledElement = [];
        if(disabledElementArray!=null){
            disabledElement = disabledElementArray;
        }

        var toCheck = dataEntryVariables.options.openListfieldsToDisable;
        for(var i=0; i<toCheck.length; i++){
            var fieldName = toCheck[i];
            if((schema.properties[fieldName]!=null)&&(typeof schema.properties[fieldName]!= "undefined")){
                disabledElement.push(fieldName+'.name');
            }
        }
        return disabledElement;
    };

    Start.prototype.disabledFields = function (schema, dataEntryVariables, disabledElementArray) {
        var disabledElement = [];
        if(disabledElementArray!=null){
            disabledElement = disabledElementArray;
        }

        var toCheck = dataEntryVariables.options.fieldsToDisable;
        for(var i=0; i<toCheck.length; i++){
            var fieldName = toCheck[i];
            if((schema.properties[fieldName]!=null)&&(typeof schema.properties[fieldName]!= "undefined")){
                disabledElement.push(fieldName);
            }
        }
        return disabledElement;
    };

    Start.prototype.getValues = function () {
        return this.controller.getValues();
    };

    Start.prototype.add = function (modules, adapterMap) {

        this.controller.add(modules, adapterMap);
    };

    return Start;
});

