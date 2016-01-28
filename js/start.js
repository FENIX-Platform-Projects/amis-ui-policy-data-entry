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

        $.extend(true, o, options);
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

        console.log(dataManagementToolObj)
        if(o.fileName =="searchEditPolicy"){
            o.policyId = dataManagementToolObj.policy_data.Policy_id;
            console.log(o.policyId)
        }
        o.dataManagementToolObj = dataManagementToolObj;

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
                    onSubmit: function(data) {self.saveActionFunction(data,self, dataEntryVariables)},
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
                            console.log("SEARCH ADD POLICY START")
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
            });
        }
    };

    Start.prototype.saveActionFunction = function(data, self, dataEntryVariables){
        //LOGGED_USER contains "OECD" or "12"(Country code)
        console.log(data)
        console.log(self.render.editor.schema.properties)
        if(self.mandatoryFields(data, dataEntryVariables)){
            if(o.fileName =="searchAddPolicy"){
                //In this case the policy is not there
                //So "o.dataManagementToolObj.policy.policy_data" is empty
                var obj = {};
                obj.editor_values = data;
                obj.base_ip_address = o.base_ip_address;
                obj.base_ip_port = o.base_ip_port;
                obj.datasource = o.datasource;
                obj.dataManagementToolObj = o.dataManagementToolObj;
                obj.dataManagementToolObj.policy_data = self.policyDataFieldCreation_byEditorValues(data,self);
                console.log("Before codeSettingInPolicyTable ")
                console.log(obj)
                console.log(obj.dataManagementToolObj.policy_data);
                self.codeSettingInPolicyTable(data, self, obj.dataManagementToolObj.policy_data);
                console.log("After codeSettingInPolicyTable ")
                console.log(obj.dataManagementToolObj.policy_data);

                obj.fileName = o.filename;
                console.log("DATA START ADD")
                console.log(data)
                console.log("DATA END ADD")
                console.log("OBJ START ADD")
                console.log(obj)
                console.log("OBJ END ADD")
                var typeOfChangeField = new TypeOfChangeField(obj);
                typeOfChangeField.init();
            }
            else if(o.fileName =="searchEditPolicy"){
                var obj = {};
                obj.editor_values = data;
                obj.base_ip_address = o.base_ip_address;
                obj.base_ip_port = o.base_ip_port;
                obj.datasource = o.datasource;
                console.log("In edit policy")
                console.log(o)
                console.log(o.policyId)
                obj.dataManagementToolObj = o.dataManagementToolObj;

                obj.dataManagementToolObj.policy_data = self.policyDataFieldCreation_byEditorValues(data,self);
                console.log(o.dataManagementToolObj)
                console.log(o)
                obj.dataManagementToolObj.policy_data.Policy_id = o.dataManagementToolObj.policy_data.Policy_id;
                obj.dataManagementToolObj.policy_data.Policy_id = o.policyId;
                console.log("Before codeSettingInPolicyTable ")
                console.log(o)
                console.log(obj.dataManagementToolObj.policy_data);
                self.codeSettingInPolicyTable(data, self, obj.dataManagementToolObj.policy_data);
                console.log("After codeSettingInPolicyTable ")
                console.log(obj.dataManagementToolObj.policy_data);

                obj.fileName = o.filename;
                console.log("DATA START")
                console.log(data)
                console.log("DATA END")
                console.log("OBJ START")
                console.log(obj)
                console.log("OBJ END")
                console.log(obj.dataManagementToolObj.policy_data);
                var typeOfChangeField = new TypeOfChangeField(obj);
                typeOfChangeField.init();
            }
        }
    };

    //This function is used in the Add Policy
    Start.prototype.policyDataFieldCreation_byEditorValues = function(data, self){
        var policyTableData = {};
        //policyElement
        //unit
        //source
        //secondGenerationSpecific
        //localCondition

        policyTableData.Link = data.link;
        policyTableData.LinkPdf = data.linkPdf;
        policyTableData.ValueText = '';
        policyTableData.Value = '';
        if(data.valueValueText == o.dataEntryVariables.options.valueValueText_enum_values[0]){
            //Value
            policyTableData.Value = data.value;
            policyTableData.ValueType = o.dataEntryVariables.options.valueValueText_enum_values[0];
        }
        else{
            //Value Text
            policyTableData.ValueText = data.valueText;
            policyTableData.ValueType = o.dataEntryVariables.options.valueValueText_enum_values[1];
        }
        policyTableData.Exemptions = data.exemptions;
        policyTableData.TaxRateBenchmark = data.taxRateBenchmark;
        policyTableData.BenchmarkLink = data.benchmarkLink;
        policyTableData.BenchmarkLinkPdf = data.benchmarkLinkPdf;
        policyTableData.Notes = data.notes;
        policyTableData.TitleOfNotice = data.titleOfNotice;
        policyTableData.LegalBasisName = data.legalBasisName;
        policyTableData.BenchmarkTax = data.benchmarkTax;
        policyTableData.BenchmarkProduct = data.benchmarkProduct;
        policyTableData.TaxRateBiofuel = data.taxRateBiofuel;
        policyTableData.MeasureDescription = data.measureDescription;
        policyTableData.ProductOriginalHs = data.productOriginalHs;
        policyTableData.ProductOriginalName = data.productOriginalName;
        policyTableData.PolicyElement = '';
        if((data.policyElement!=null)&&(typeof data.policyElement!='undefined')){
            if(data.policyElement.list==o.dataEntryVariables.options.OTHER){
                policyTableData.PolicyElement = data.policyElement.name;
            }
            else{
                policyTableData.PolicyElement = data.policyElement.list;
            }
        }

        policyTableData.Unit = '';
        if((data.unit!=null)&&(typeof data.unit!='undefined')){
            if(data.unit.list==o.dataEntryVariables.options.OTHER){
                policyTableData.Unit = data.unit.name;
            }
            else{
                policyTableData.Unit = data.unit.list;
            }
        }

        policyTableData.Source = data.source;
        if((data.source!=null)&&(typeof data.source!='undefined')&&(data.source.list==o.dataEntryVariables.options.OTHER)){
            policyTableData.Source = data.source.name;
        }
        else{
            policyTableData.Source = data.source.list;
        }
        policyTableData.SecondGenerationSpecific = '';
        if((data.secondGenerationSpecific!=null)&&(typeof data.secondGenerationSpecific!='undefined')){
            if(data.secondGenerationSpecific.list==o.dataEntryVariables.options.OTHER){
                policyTableData.SecondGenerationSpecific = data.secondGenerationSpecific.name;
            }
            else{
                policyTableData.SecondGenerationSpecific = data.secondGenerationSpecific.list;
            }
        }
        policyTableData.LocalCondition = "";
        if((data.localCondition!=null)&&(typeof data.localCondition!='undefined')){
            if(data.localCondition.list==o.dataEntryVariables.options.OTHER){
                policyTableData.LocalCondition = data.localCondition.name;
            }
            else{
                policyTableData.LocalCondition = data.localCondition.list;
            }
        }
        policyTableData.StartDate = data.startDate;
        policyTableData.EndDate = data.endDate;

        policyTableData.DateOfPublication = data.dateOfPublication;
        policyTableData.StartDateTax = data.startDateTax;

        //These fields should be calculated
        //policyTableData.TypeOfChangeName = data.type_of_change_name;
        //policyTableData.ImposedEndDate = data.imposed_end_date;

        return policyTableData;
    };

    Start.prototype.mandatoryFields = function(data, dataEntryVariables){
        var ris= false;
        var errorString ='';
        if((data!=null)&&(typeof data!="undefined")){
            if((data.startDate!=null)&&(typeof data.startDate!="undefined")&&(data.startDate.length==10)){
                if((data.dateOfPublication!=null)&&(typeof data.dateOfPublication!="undefined")&&(data.dateOfPublication.length==10)){
                    ris = true;
                }
                else{
                    errorString+= 'Please, before saving fill: DATE OF PUBLICATION (in DD-MM-YYY format)';
                }
            }
            else{
                errorString = 'Please, before saving fill: START DATE (in DD-MM-YYY format)';
            }
        }
        if(document.getElementById(dataEntryVariables.options.mandatoryFieldsError)!=null){
            document.getElementById(dataEntryVariables.options.mandatoryFieldsError).remove();
        }
        if(ris==false){
            //".fx-jsonform"
            $(dataEntryVariables.options.dataEntryToolClassDiv).append("<div id="+dataEntryVariables.options.mandatoryFieldsError+">"+errorString+"</div>");
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

    //This function is used to store the content of each enum in the form
    Start.prototype.codeSettingInPolicyTable = function (data, self, policyTableData) {
        console.log("saveName start")
        console.log(data)
        console.log(self)
        //Policy Element has to be considered
        //Loop on the array and create a new code greather than the last and smaller than '99'='n.a.'
        //If it'98 jumps to 100
        var listToCheck = o.dataEntryVariables.options.openListfieldsToDisable;
        //["policyElement", "unit", "source", "secondGenerationSpecific", "localCondition"]
        //Setting the codes to store in the database
        var field = data.policyElement;
        if((field!=null)&&(typeof field!='undefined')){
            var policyElement = self.render.opts.schema.properties.policyElement;
            var policyElementTitlesArray = policyElement.properties.list.options.enum_titles;
            if(data.policyElement.list==o.dataEntryVariables.options.OTHER){
                //The element is new
                policyTableData.PolicyElement = data.policyElement.name;
                var maxCode = parseInt(policyElement.properties.list.enum[0],10);
                for(var i=1;i<policyElement.properties.list.enum.length; i++){
                    if((policyElement.properties.list.enum[i]>maxCode)&&(policyElement.properties.list.enum[i]!='99')){
                        maxCode = parseInt(policyElement.properties.list.enum[i],10);
                    }
                }
                if(maxCode== 99){
                    //The new code cannot be set like '99' because it's used for none code
                    maxCode=100;
                }
                policyTableData.ElementCode = maxCode;
            }
            else{
                //The element is already in the list
                policyTableData.PolicyElement = data.policyElement.list;

                var indexEl = $.inArray(policyTableData.PolicyElement, policyElementTitlesArray);
                policyTableData.ElementCode = policyElement.properties.list.enum[indexEl];
            }
        }

        //Setting the ids
        //metadata_id                | integer                |
        //policy_id                  | integer                |
        //cpl_id                     | integer                |
        //commodity_id               | double precision       |
        //type_of_change_code        | double precision       |//Calculated by the algo
        //element_code               | integer                |

        policyTableData.CommodityId = o.dataManagementToolObj.master_data.CommodityId;
        policyTableData.CplId = o.dataManagementToolObj.master_data.CplId;
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