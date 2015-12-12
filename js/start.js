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
    'calculated_values_algorithms/typeOfChangeField',
    'domready!'
], function ($, DataEntryTemplate, _, bootstrap, Handlebars,
             renderAuthMenu,
             renderForm,
             renderFormCustomFeature,
             storeForm,
             Config,
            SchemaUtils, DataEntryVariables, TypeOfChangeField) {

    var o = {
        dataEntryVariables : '',
        base_ip_address: '',
        base_ip_port: '',
        datasource: '',
        dataManagementToolObj: ''
    };

    function Start(options) {
        $.extend(true, o, options);
    }

    Start.prototype.init = function (options, dataManagementToolObj) {

        console.log("START INIT")
        console.log(options)
        console.log(dataManagementToolObj)
        console.log("END INIT")
        var self = this;
        var dataEntryVariables = new DataEntryVariables();
        o.dataEntryVariables = dataEntryVariables;
        o.base_ip_address = options.base_ip_address;
        o.base_ip_port = options.base_ip_port;
        o.datasource = options.datasource;
        o.dataManagementToolObj = dataManagementToolObj;

        $.extend(true, o, options);
        $("#metadataEditorContainer").html(DataEntryTemplate);

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
        if((options!=null)&&(typeof options!= "undefined")&&(options.fileName!=null)&&(typeof options.fileName!= "undefined")){

            //This is used to identify
            o.filename = options.fileName;
            //This is used to make the module undefined
            require.undef('ap-dataEntry/json/'+ options.fileName);
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
                //console.log(JSON.stringify(schema))
                console.log("Before render form ")
                console.log(console.log(schema.properties));
                self.render = new renderForm('#'+ id, {
                    schema: schema,
                    iconlib: 'fontawesome4',
                    theme: 'ap_dataEntry_theme',
                    //theme: 'bootstrap3',
                    disable_array_add: true,
                    disable_array_delete: true,
                    disable_array_reorder: true,
                    disabled:disabled_fields,
                    //values: formStore.getSections(),
                    tmpl: {reset :'', submit: 'Save'},
                    //tmpl: {reset :'', submit: ''},
                    onSubmit: function(data) {self.saveActionFunction(data,self)},
                    onChange: function(data) {
                        console.log('onChange',data)
                        console.log(self.render.editor.getValue())
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
                    },
                    onReady: function() {
                        if(options.fileName =="searchAddPolicy"){
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
                    }
                });
            }, function (err) {
                alert(err)
            });
        }
    };

    Start.prototype.saveActionFunction = function(data, self){
        alert("saveActionFunction start")
        //LOGGED_USER contains "OECD" or "12"(Country code)
        console.log(data)
        //console.log(this.editor)
        //console.log(this.editor.getValue())
        //var editor_values = this.editor.getValue();
        if(self.mandatoryFields(data)){
            if(o.fileName =="searchAddPolicy"){
                var obj = {};
                obj.editor_values = data;
                obj.base_ip_address = o.base_ip_address;
                obj.base_ip_port = o.base_ip_port;
                obj.datasource = o.datasource;
                obj.dataManagementToolObj = o.dataManagementToolObj;
                obj.fileName = o.filename;
                alert("Add Policy .... save action!!!")
                console.log("DATA START ADD")
                console.log(data)
                console.log("DATA END ADD")
                console.log("OBJ START ADD")
                console.log(obj)
                console.log("OBJ END ADD")
                alert("In add End ADD!!!!")
                var typeOfChangeField = new TypeOfChangeField(obj);
                typeOfChangeField.init();
            }
            else if(o.fileName =="searchEditPolicy"){
                alert("Edit Policy .... save action!!!")
                var obj = {};
                obj.editor_values = data;
                obj.base_ip_address = o.base_ip_address;
                obj.base_ip_port = o.base_ip_port;
                obj.datasource = o.datasource;
                obj.dataManagementToolObj = o.dataManagementToolObj;
                obj.fileName = o.filename;
                console.log("DATA START")
                console.log(data)
                console.log("DATA END")
                console.log("OBJ START")
                console.log(obj)
                console.log("OBJ END")
                alert("End!!!!")

                var typeOfChangeField = new TypeOfChangeField(obj);
                typeOfChangeField.init();
            }
        }
    };

    Start.prototype.mandatoryFields = function(data){
        console.log(data)
        var ris= false;
        if((data!=null)&&(typeof data!="undefined")){
            if((data.startDate!=null)&&(typeof data.startDate!="undefined")){
                if((data.dateOfPublication!=null)&&(typeof data.dateOfPublication!="undefined")){
                    ris = true;
                }
            }
        }
        return ris;
    };

    Start.prototype.valueValueTextChanged = function (valueValueTextField, valueField, ValueTextField, unit_field, dataEntryVariables) {
        if((valueValueTextField!=null)&&(typeof valueValueTextField!="undefined")){
            var valueText = valueValueTextField.getValue();
            switch (valueText){
                case o.dataEntryVariables.options.valueValueText_enum_values[0]:
                    //Value
                    //Disable Value Text
                    //ValueTextField.setValue("");
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
                    //valueField.setValue("");
                    valueField.disable();
                    //unit_field.editors.name.setValue("");
                    unit_field.editors.name.disable();
                    //unit_field.editors.list.setValue("");
                    unit_field.editors.list.disable();
                    //Enable Value Text
                    ValueTextField.enable();
                    break;
                default : break;
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