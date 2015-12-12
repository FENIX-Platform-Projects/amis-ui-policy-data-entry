/*global define */
define([
    'jquery',
    'calculated_values_algorithms/policyDataObject',
    'calculated_values_algorithms/typeOfChangeField_algorithms',
    'calculated_values_algorithms/valueTypeField',
    'js/policyVariables'
], function ($, ap_policyDataObject, TypeOfChangeFieldAlgorithms, ValueTypeField, PolicyVariables) {

    var o = {
        dataEntryVariables : '',
        base_ip_address : '',
        base_ip_port : '',
        datasource : '',
        dataManagementToolObj: '',
        fileName: '',

        url : {
            getPolicyByCplId_url : '/wdspolicy/rest/policyservice/dataManagementTool/getPolicyByCplId',
            getCpl_id_url : '/wdspolicy/rest/policyservice/dataManagementTool/getCpl_id',
            get_cplIdMaxCode : '/wdspolicy/rest/policyservice/dataManagementTool/cplIdMaxCode',
            save : '/wdspolicy/rest/policyservice/dataManagementTool/save'
        }
    };

    function TypeOfChangeField(options) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, o, options);
    }

    TypeOfChangeField.prototype.init = function (options) {
        this.options.policyVariablesObj = new PolicyVariables();
        var alghoritm_to_apply = this.alghoritm_calculator(options);
    };

    TypeOfChangeField.prototype.alghoritm_calculator = function (options) {
        console.log("alghoritm_calculator start")
        console.log(this.options)
        var self = this;
        var data = ap_policyDataObject.init();
        data.datasource = this.options.datasource;
        data.dataManagementToolObj = this.options.dataManagementToolObj;
        data.commodity_id = this.options.dataManagementToolObj.master_data.CommodityId;
        data.commodity_id = this.options.dataManagementToolObj.master_data.CommodityId;
        data.country_code = this.options.dataManagementToolObj.master_data.CountryCode;
        data.subnational_code = this.options.dataManagementToolObj.master_data.SubnationalCode;
        if(this.options.dataManagementToolObj.master_data.SubnationalCode=='n.a.'){
            data.subnational_code = '99';
            if(this.options.fileName=="searchAddPolicy"){
                data.dataManagementToolObj.master_data.SubnationalCode = '99';
            }
        }
        data.commodity_domain_code = this.options.dataManagementToolObj.master_data.CommodityDomainCode;
        data.commodity_class_code = this.options.dataManagementToolObj.master_data.CommodityClassCode;
        data.policy_domain_code = this.options.dataManagementToolObj.master_data.PolicyDomainCode;
        data.policy_type_code = [];
        data.policy_type_code.push(this.options.dataManagementToolObj.master_data.PolicyTypeCode);
        data.policy_measure_code = [];
        data.policy_measure_code.push(this.options.dataManagementToolObj.master_data.PolicyMeasureCode);
        data.condition_code = this.options.dataManagementToolObj.master_data.PolicyConditionCode;
        if(this.options.dataManagementToolObj.master_data.PolicyConditionCode=='n.a.'){
            data.condition_code = '105';
            if(this.options.fileName=="searchAddPolicy"){
                data.dataManagementToolObj.master_data.PolicyConditionCode = '105';
            }
        }
        data.individualpolicy_code = this.options.dataManagementToolObj.master_data.IndividualPolicyCode;
        if(this.options.dataManagementToolObj.master_data.IndividualPolicyCode=='n.a.'){
            data.individualpolicy_code = '999';
            if(this.options.fileName=="searchAddPolicy"){
                data.dataManagementToolObj.master_data.IndividualPolicyCode = '999';
            }
        }
        else{
            console.log("Individual Policy ELSE")
        }
        data.date_of_publication = this.options.dataManagementToolObj.policy_data.DateOfPublication;

        var cpl_id = '';
        var alghoritm =0;
        if(this.options.fileName =="searchAddPolicy"){
            //Checks if the cpl was already in the system
            var url = 'http://'+this.options.base_ip_address +':'+this.options.base_ip_port + this.options.url.getCpl_id_url;
            var payloadrest = JSON.stringify(data);

            $.ajax({
                type: 'POST',
                url: url,
                data: {"pdObj": payloadrest},
                async: false,

                success: function (response) {

                    /* Convert the response in an object, if needed. */
                    var json = response;
                    if (typeof(response) == 'string')
                        json = $.parseJSON(response);
                    //Could be "NOT_FOUND"
                    console.log("json ***"+json+"***");
                    if((json.indexOf("NOT_FOUND") > -1)){
                        //The cpl has not been found
                        var options ={};
                        options.policyN = {};
                        options.policyN.master_data = data;
                        options.algorithm_index = 0;
                        //Get the last cpl_id stored in the database and increment it by one
                        var urlCplMax = 'http://'+self.options.base_ip_address +':'+self.options.base_ip_port + self.options.url.get_cplIdMaxCode+"/"+self.options.datasource;
                        $.ajax({
                            type: 'GET',
                            url: urlCplMax,
                            dataType: 'json',

                            success: function (response) {
                                if((response!=null)&&(typeof response!='undefined')){
                                    var cplIdResponseInt = parseInt(response,10);
                                    var newCplId = cplIdResponseInt+1;
                                    options.policyN.master_data.cpl_id= ""+newCplId;
                                    options.policyN.master_data.dataManagementToolObj.master_data.CplId= ""+newCplId;
                                    self.alghoritm_setting(options,self);
                                }
                            },

                            error: function (err, b, c) {
                                alert(err.status + ", " + b + ", " + c);
                            }
                        });
                    }
                    else{
                        self.loadPolicyByCplId(data, self);
                    }
                },
                error : function(err,b,c) {
                    alert(err.status + ", " + b + ", " + c);
                }
            });
        }
        else if(this.options.fileName =="searchEditPolicy"){

            //The cpl is always there
            var cpl_id = this.options.dataManagementToolObj.master_data.CplId;
            data.cpl_id = cpl_id;
            data.commodity_id = this.options.dataManagementToolObj.master_data.CommodityId;

            if((cpl_id!=null)&&(typeof cpl_id!="undefined")&&(cpl_id.length>0)){
                //Getting Policy(n-1)
                self.loadPolicyByCplId(data, self);
            }
            else{
                //policy(n-1) does not exist
                var options ={};
                options.algorithm_index = 0;
                options.policyN = {};
                options.policyN.master_data = data;
                self.alghoritm_setting(options,self);
            }
        }

        return alghoritm;
    };

    TypeOfChangeField.prototype.loadPolicyByCplId = function (data, self) {
        var url = 'http://'+this.options.base_ip_address +':'+this.options.base_ip_port + this.options.url.getPolicyByCplId_url;
        var payloadrest = JSON.stringify(data);

        $.ajax({

            type: 'POST',
            url: url,
            data: {"pdObj": payloadrest},

            success: function (response) {

                /* Convert the response in an object, if needed. */
                var json = response;
                if (typeof(response) == 'string')
                    json = $.parseJSON(response);
                if(json.length>0){
                    var metadata_id = [];
                    var policy_id = [];
                    var cpl_id = [];
                    var commodity_id = [];
                    var hs_version = [];
                    var hs_code = [];
                    var hs_suffix = [];
                    var policy_element = [];
                    var start_date = [];
                    var end_date = [];
                    var units = [];
                    var value = [];
                    var value_text = [];
                    var value_type = [];
                    var exemptions = [];
                    var location_condition = [];
                    var notes = [];
                    var link = [];
                    var source = [];
                    var title_of_notice = [];
                    var legal_basis_name = [];
                    var date_of_publication = [];
                    var imposed_end_date = [];
                    var second_generation_specific = [];
                    var benchmark_tax = [];
                    var benchmark_product = [];
                    var tax_rate_biofuel = [];
                    var tax_rate_benchmark = [];
                    var start_date_tax = [];
                    var benchmark_link = [];
                    var original_dataset = [];
                    var type_of_change_code = [];
                    var type_of_change_name = [];
                    var measure_description = [];
                    var product_original_hs = [];
                    var product_original_name = [];
                    //var implementationprocedure = [];
                    //var xs_yeartype = [];
                    var link_pdf = [];
                    var benchmark_link_pdf = [];
                    var short_description = [];
                    var shared_group_code = [];
                    var description = [];

                    var policytable_data = new Array();
                    for (var i = 0; i < json.length; i++) {
                    // /for (var i = 0; i < json.length; i++) {
                        var row = {};
                        for (var j = 0; j < json[i].length; j++) {
                            if ((json[i][j] == null) || (typeof json[i][j] == 'undefined')) {
                                json[i][j] = "";
                            }
                            switch (j) {
                                case 0:
                                    metadata_id[i] = json[i][j];
                                    break;
                                case 1:
                                    policy_id[i] = json[i][j];
                                    row["Policy_id"]= policy_id[i];
                                    break;
                                case 2:
                                    cpl_id[i] = json[i][j];
                                    row["CplId"] = json[i][j];
                                    break;
                                case 3:
                                    commodity_id[i] = json[i][j];
                                    //This is important for the Shared Group
                                    row["CommodityId"] = json[i][j];
                                    break;
                                case 4:
                                    hs_version[i] = json[i][j];
                                    row["HsVersion"] = json[i][j];
                                    break;
                                case 5:
                                    hs_code[i] = json[i][j];
                                    row["HsCode"] = json[i][j];
                                    break;
                                case 6:
                                    hs_suffix[i] = json[i][j];
                                    row["HsSuffix"] = json[i][j];
                                    break;
                                case 7:
                                    policy_element[i] = json[i][j];
                                    row["PolicyElement"] = json[i][j];
                                    break;
                                case 8:
                                    start_date[i] = json[i][j];
                                    row["StartDate"] = json[i][j];
                                    break;
                                case 9:
                                    end_date[i] = json[i][j];
                                    row["EndDate"] = json[i][j];
                                    break;
                                case 10:
                                    units[i] = json[i][j];
                                    row["Unit"] = json[i][j];
                                    break;
                                case 11:
                                    value[i] = json[i][j];
                                    row["Value"] = json[i][j];
                                    break;
                                case 12:
                                    value_text[i] = json[i][j];
                                    row["ValueText"] = json[i][j];
                                    break;
                                case 13:
                                    value_type[i] = json[i][j];
                                    row["ValueType"] = json[i][j];
                                    break;
                                case 14:
                                    exemptions[i] = json[i][j];
                                    row["Exemptions"] = json[i][j];
                                    break;
                                case 15:
                                    location_condition[i] = json[i][j];
                                    row["LocalCondition"] = json[i][j];
                                    break;
                                case 16:
                                    notes[i] = json[i][j];
                                    row["Notes"] = json[i][j];
                                    break;
                                case 17:
                                    link[i] = json[i][j];
                                    row["Link"] = json[i][j];
                                    break;
                                case 18:
                                    source[i] = json[i][j];
                                    row["Source"] = json[i][j];
                                    break;
                                case 19:
                                    title_of_notice[i] = json[i][j];
                                    row["TitleOfNotice"] = json[i][j];
                                    break;
                                case 20:
                                    legal_basis_name[i] = json[i][j];
                                    row["LegalBasisName"] = json[i][j];
                                    break;
                                case 21:
                                    date_of_publication[i] = json[i][j];
                                    row["DateOfPublication"] = json[i][j];
                                    break;
                                case 22:
                                    imposed_end_date[i] = json[i][j];
                                    row["ImposedEndDate"] = json[i][j];
                                    break;
                                case 23:
                                    second_generation_specific[i] = json[i][j];
                                    break;
                                case 24:
                                    benchmark_tax[i] = json[i][j];
                                    break;
                                case 25:
                                    benchmark_product[i] = json[i][j];
                                    break;
                                case 26:
                                    tax_rate_biofuel[i] = json[i][j];
                                    break;
                                case 27:
                                    tax_rate_benchmark[i] = json[i][j];
                                    row["TaxRateBenchmark"] = json[i][j];
                                    break;
                                case 28:
                                    start_date_tax[i] = json[i][j];
                                    row["StartDateTax"] = json[i][j];
                                    break;
                                case 29:
                                    benchmark_link[i] = json[i][j];
                                    row["BenchmarkLink"] = json[i][j];
                                    break;
                                case 30:
                                    original_dataset[i] = json[i][j];
                                    row["OriginalDataset"] = json[i][j];
                                    break;
                                case 31:
                                    type_of_change_code[i] = json[i][j];
                                    break;
                                case 32:
                                    type_of_change_name[i] = json[i][j];
                                    row["TypeOfChangeName"] = json[i][j];
                                    break;
                                case 33:
                                    measure_description[i] = json[i][j];
                                    row["MeasureDescription"] = json[i][j];
                                    break;
                                case 34:
                                    product_original_hs[i] = json[i][j];
                                    row["ProductOriginalHs"] = json[i][j];
                                    break;
                                case 35:
                                    product_original_name[i] = json[i][j];
                                    row["ProductOriginalName"] = json[i][j];
                                    break;
                                case 36:
                                    link_pdf[i] = json[i][j];
                                    row["LinkPdf"] = json[i][j];
                                    break;
                                case 37:
                                    benchmark_link_pdf[i] = json[i][j];
                                    row["BenchmarkLinkPdf"] = json[i][j];
                                    break;
                                case 38:
                                    short_description[i] = json[i][j];
                                    row["ShortDescription"] = json[i][j];
                                    break;
                                case 39:
                                    shared_group_code[i] = json[i][j];
                                    row["SharedGroupCode"] = json[i][j];
                                    break;
                                case 40:
                                    shared_group_code[i] = json[i][j];
                                    row["Description"] = json[i][j];
                                    break;
                            }
                        }
                        //row["MasterIndex"] = index;
                        policytable_data[i]= row;
                    }
                    var policy_record = policytable_data[0];
                    //self.alghoritm_chooser(policy_record)
                    self.alghoritm_chooser(policytable_data,self)
                }
                else{
                    //There is no Policy(n-1) for the Policy(n)
                    var options ={};
                    options.algorithm_index = 0;
                    options.policyN = {};
                    options.policyN.master_data = data;
                    self.alghoritm_setting(options,self);
                }
            },
            error : function(err,b,c) {
                alert(err.status + ", " + b + ", " + c);
            }
        });
    };

    //options contains always the Policy N-1
    TypeOfChangeField.prototype.alghoritm_chooser = function (options, self) {
        var row = options[0];
        var value = row["Value"];
        var valueText = row["ValueText"];
        var optionsObj ={};
        optionsObj.policyN_1 = row;
        console.log("Value = "+ value+" and Value Text = "+ valueText)

        //Checking Value field
        if((value!=null)&&(typeof value!="undefined")&&(value.length>0)){
            //Case B
            optionsObj.algorithm_index = 1;
            self.alghoritm_setting(optionsObj,self);
        }
        else{
            //Checking Value Type field
            if((valueText!=null)&&(typeof valueText!="undefined")&&(valueText.length>0)){
                //Case C
                optionsObj.algorithm_index = 2;
                self.alghoritm_setting(optionsObj,self);
            }
            else{
                //Checking Value Text field
                //Case D
                optionsObj.algorithm_index = 3;
                self.alghoritm_setting(optionsObj,self);
            }
        }
    };

    TypeOfChangeField.prototype.alghoritm_setting = function (options, self) {
        var algo = new TypeOfChangeFieldAlgorithms();
        var valueTypeFieldObj = new ValueTypeField();
        valueTypeFieldObj.init();
        algo.init();
        console.log("alghoritm_setting")
        console.log(options)
        console.log(self)
        console.log(self.options)
        var algorithm_index = options.algorithm_index;
        var policyN_1 = options.policyN_1;
        options.policyN = this.options.dataManagementToolObj;
        var policyN = options.policyN;

        //Set "Type Of Change" Field
        var typeOfChange = '';

        //Options now contains Policy(n) and Policy(n-1)
        switch (algorithm_index) {
            case 0:
                //Case A
                typeOfChange = algo.algorithmA(options);
                break;
            case 1:
                //Case B
                typeOfChange = algo.algorithmB(options);
                break;
            case 2:
                //Case C
                typeOfChange = algo.algorithmC(options);
                break;
            case 3:
                //Case D
                typeOfChange = algo.algorithmD(options);
                break;
            default:
                break;
        }

        options.policyN.policy_data.typeOfChangeCode = typeOfChange;
        options.policyN.policy_data.typeOfChangeName = this.options.policyVariablesObj.options.result.mapping[typeOfChange];

        if (policyN_1) {
            var policy_data = policyN.policy_data;
            var endDate_policyN_1 = policyN_1["EndDate"];
            if ((endDate_policyN_1 != null) && (typeof endDate_policyN_1 != 'undefined') && (endDate_policyN_1.length > 0)) {
                var startDate_policyN = policy_data.StartDate;
                var startDateIndex = startDate_policyN.indexOf(startDate_policyN);
                var startDateArray = startDate_policyN.split('/');
                var start_date_day = startDateArray[0];
                var start_date_month = startDateArray[1];
                var start_date_year = startDateArray[2];
                var d = new Date(start_date_year, start_date_month, start_date_day);
                //Remove one day from the start date to update the end date of the previous policy
                var new_end_date = d.getDate() - 1;
                new_end_date = new Date(new_end_date);
                //var imposed_end_date = 'true';
                var imposed_end_date = 'Yes';
                options.policyN_1.EndDate = new_end_date.getDate();
                options.policyN_1.ImposedEndDate = imposed_end_date;
            }
        }

        //Value Type Field
        var valueType = valueTypeFieldObj.field_calculator(options);
        options.policyN.policy_data.ValueType = valueType;

        alert("Before LAST SAVE")
        console.log("Before Save!!!")
        console.log(options)
        console.log(("PolicyN Start"))
        console.log(options.policyN)
        console.log(("PolicyN End"))
        console.log(("PolicyN_1 Start"))
        console.log(options.policyN_1)
        console.log(("PolicyN_1 Start"))
        //Prepare object to Save
        var app ={};
        app.policyN = options.policyN;
        app.policyN_1 = options.policyN_1;
        var objToSave = {};
        objToSave.loggedUser = options.policyN.LOGGED_USER;
        //objToSave.policyN = options.policyN;
        //objToSave.policyN_1 = options.policyN_1;
        if (self.options.fileName == "searchAddPolicy"){
            objToSave.saveAction = "ADD";
        }
        else{
            objToSave.saveAction = "EDIT";
        }
        objToSave.save_fields = self.policyObjCreation(app);
        objToSave.dataSource = 'POLICY';
        console.log(objToSave)

        alert("End LAST SAVE")
        //Save in the policytable PolicyN_1(overwrite) and PolicyN(can be overwrite or add)
        //Save in the historical changes
        //Recreate the view

        var url = 'http://'+self.options.base_ip_address +':'+self.options.base_ip_port + self.options.url.save;
        var payloadrest = JSON.stringify(objToSave);
        $.ajax({
            type: 'POST',
            url: url,
            data: {"pdObj": payloadrest},

            success: function (response) {
                alert("In success save")
            },
            error : function(err,b,c) {
                alert(err.status + ", " + b + ", " + c);
            }
        });
    };

    TypeOfChangeField.prototype.policyObjCreation = function (options) {
        console.log(options)
        var policiesToSave = {};
        policiesToSave["master"] = {};
        policiesToSave["policyN"] = {};
        policiesToSave["policyN_1"] = {};
       // policyTypesInfo[policy_types_array[z].value][policy_measure_codes[j]] = policy_measure_names[j];
        var data = options.policyN.master_data;
        var key = "master";
        if((data!=null)&&(typeof data!="undefined")){
            policiesToSave[key]["CommodityClassCode"] = data.CommodityClassCode;
            policiesToSave[key]["CommodityClassName"] = data.CommodityClassName;
            policiesToSave[key]["CommodityDomainCode"] = data.CommodityDomainCode;
            policiesToSave[key]["CommodityDomainName"] = data.CommodityDomainName;
            policiesToSave[key]["CommodityId"] = data.CommodityId;
            policiesToSave[key]["CountryCode"] = data.CountryCode;
            policiesToSave[key]["CountryName"] = data.CountryName;
            policiesToSave[key]["CplId"] = data.CplId;
            policiesToSave[key]["IndividualPolicyCode"] = data.IndividualPolicyCode;
            policiesToSave[key]["IndividualPolicyName"] = data.IndividualPolicyName;
            policiesToSave[key]["PolicyCondition"] = data.PolicyCondition;
            policiesToSave[key]["PolicyConditionCode"] = data.PolicyConditionCode;
            policiesToSave[key]["PolicyDomainCode"] = data.PolicyDomainCode;
            policiesToSave[key]["PolicyDomainName"] = data.PolicyDomainName;
            policiesToSave[key]["PolicyMeasureCode"] = data.PolicyMeasureCode;
            policiesToSave[key]["PolicyMeasureName"] = data.PolicyMeasureName;
            policiesToSave[key]["PolicyTypeCode"] = data.PolicyTypeCode;
            policiesToSave[key]["PolicyTypeName"] = data.PolicyTypeName;
            policiesToSave[key]["PolicyDomainName"] = data.PolicyDomainName;
            policiesToSave[key]["SubnationalCode"] = data.SubnationalCode;
            policiesToSave[key]["SubnationalName"] = data.SubnationalName;
        }

        data = options.policyN.policy_data;
        var policy = "policyN";
        if((data!=null)&&(typeof data!="undefined")) {
            policiesToSave[policy]["BenchmarkLink"] = data.BenchmarkLink;
            policiesToSave[policy]["BenchmarkLinkPdf"] = data.BenchmarkLinkPdf;
            policiesToSave[policy]["DateOfPublication"] = data.DateOfPublication;
            policiesToSave[policy]["Description"] = data.Description;
            policiesToSave[policy]["EndDate"] = data.EndDate;
            policiesToSave[policy]["HsCode"] = data.HsCode;
            policiesToSave[policy]["HsVersion"] = data.HsVersion;
            policiesToSave[policy]["HsSuffix"] = data.HsSuffix;
            policiesToSave[policy]["ImposedEndDate"] = data.ImposedEndDate;
            policiesToSave[policy]["LegalBasisName"] = data.LegalBasisName;
            policiesToSave[policy]["Link"] = data.Link;
            policiesToSave[policy]["LinkPdf"] = data.LinkPdf;
            policiesToSave[policy]["Exemptions"] = data.Exemptions;
            policiesToSave[policy]["LocalCondition"] = data.LocalCondition;
            policiesToSave[policy]["MasterIndex"] = data.MasterIndex;
            policiesToSave[policy]["MeasureDescription"] = data.MeasureDescription;
            policiesToSave[policy]["Notes"] = data.Notes;
            policiesToSave[policy]["OriginalDataset"] = data.OriginalDataset;
            policiesToSave[policy]["PolicyElement"] = data.PolicyElement;
            policiesToSave[policy]["Policy_id"] = data.Policy_id;
            policiesToSave[policy]["ProductOriginalHs"] = data.ProductOriginalHs;
            policiesToSave[policy]["ProductOriginalName"] = data.ProductOriginalName;
            policiesToSave[policy]["SharedGroupCode"] = data.SharedGroupCode;
            policiesToSave[policy]["ShortDescription"] = data.ShortDescription;
            policiesToSave[policy]["Source"] = data.Source;
            policiesToSave[policy]["StartDate"] = data.StartDate;
            policiesToSave[policy]["StartDateTax"] = data.StartDateTax;
            policiesToSave[policy]["TaxRateBenchmark"] = data.TaxRateBenchmark;
            policiesToSave[policy]["TitleOfNotice"] = data.TitleOfNotice;
            policiesToSave[policy]["TypeOfChangeName"] = data.TypeOfChangeName;
            policiesToSave[policy]["Unit"] = data.Unit;
            policiesToSave[policy]["Value"] = data.Value;
            policiesToSave[policy]["ValueText"] = data.ValueText;
            policiesToSave[policy]["ValueType"] = data.ValueType;
            policiesToSave[policy]["typeOfChangeCode"] = data.typeOfChangeCode;
            policiesToSave[policy]["typeOfChangeName"] = data.typeOfChangeName;
            policiesToSave[policy]["uid"] = data.uid;
        }

        //In the PolicyN_1 the field in the master are the same
        data = options.policyN_1;
        policy = "policyN_1";
        if ((data != null) && (typeof data != 'undefined')) {
            data = options.policyN_1.policy_data;
            if ((data != null) && (typeof data != "undefined")) {
                policiesToSave[policy]["BenchmarkLink"] = data.BenchmarkLink;
                policiesToSave[policy]["BenchmarkLinkPdf"] = data.BenchmarkLinkPdf;
                policiesToSave[policy]["DateOfPublication"] = data.DateOfPublication;
                policiesToSave[policy]["Description"] = data.Description;
                policiesToSave[policy]["EndDate"] = data.EndDate;
                policiesToSave[policy]["HsCode"] = data.HsCode;
                policiesToSave[policy]["HsVersion"] = data.HsVersion;
                policiesToSave[policy]["HsSuffix"] = data.HsSuffix;
                policiesToSave[policy]["ImposedEndDate"] = data.ImposedEndDate;
                policiesToSave[policy]["LegalBasisName"] = data.LegalBasisName;
                policiesToSave[policy]["Link"] = data.Link;
                policiesToSave[policy]["LinkPdf"] = data.LinkPdf;
                policiesToSave[policy]["Exemptions"] = data.Exemptions;
                policiesToSave[policy]["LocalCondition"] = data.LocalCondition;
                policiesToSave[policy]["MasterIndex"] = data.MasterIndex;
                policiesToSave[policy]["MeasureDescription"] = data.MeasureDescription;
                policiesToSave[policy]["Notes"] = data.Notes;
                policiesToSave[policy]["OriginalDataset"] = data.OriginalDataset;
                policiesToSave[policy]["PolicyElement"] = data.PolicyElement;
                policiesToSave[policy]["Policy_id"] = data.Policy_id;
                policiesToSave[policy]["ProductOriginalHs"] = data.ProductOriginalHs;
                policiesToSave[policy]["ProductOriginalName"] = data.ProductOriginalName;
                policiesToSave[policy]["SharedGroupCode"] = data.SharedGroupCode;
                policiesToSave[policy]["ShortDescription"] = data.ShortDescription;
                policiesToSave[policy]["Source"] = data.Source;
                policiesToSave[policy]["StartDate"] = data.StartDate;
                policiesToSave[policy]["StartDateTax"] = data.StartDateTax;
                policiesToSave[policy]["TaxRateBenchmark"] = data.TaxRateBenchmark;
                policiesToSave[policy]["TitleOfNotice"] = data.TitleOfNotice;
                policiesToSave[policy]["TypeOfChangeName"] = data.TypeOfChangeName;
                policiesToSave[policy]["Unit"] = data.Unit;
                policiesToSave[policy]["Value"] = data.Value;
                policiesToSave[policy]["ValueText"] = data.ValueText;
                policiesToSave[policy]["ValueType"] = data.ValueType;
                policiesToSave[policy]["typeOfChangeCode"] = data.typeOfChangeCode;
                policiesToSave[policy]["typeOfChangeName"] = data.typeOfChangeName;
                policiesToSave[policy]["secondGenerationSpecific"] = data.secondGenerationSpecific;
                policiesToSave[policy]["benchmark_tax"] = data.benchmark_tax;
                policiesToSave[policy]["benchmark_product"] = data.benchmark_product;
                policiesToSave[policy]["tax_rate_biofuel"] = data.tax_rate_biofuel;
                policiesToSave[policy]["tax_rate_biofuel"] = data.tax_rate_biofuel;
                policiesToSave[policy]["tax_rate_biofuel"] = data.tax_rate_biofuel;
                policiesToSave[policy]["tax_rate_biofuel"] = data.tax_rate_biofuel;
                policiesToSave[policy]["uid"] = data.uid;


            }
        }
        return policiesToSave;
    }

    return TypeOfChangeField;
});