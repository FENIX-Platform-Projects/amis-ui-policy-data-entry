/*global define */
define([
    'jquery',
    'calculated_values_algorithms/policyDataObject',
    'js/policyVariables',
    'js/policyUtility'
], function ($, ap_policyDataObject, PolicyVariables, PolicyUtility) {

    var o = {
        policyVariablesObj : ''
    };

    function TypeOfChangeFieldAlgorithms(options) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, o, options);
    }

    TypeOfChangeFieldAlgorithms.prototype.init = function (options) {
        this.options.policyVariablesObj = new PolicyVariables();
        this.options.policyUtilityObj = new PolicyUtility();
        //console.log(this.options.policyVariablesObj)
    };

    TypeOfChangeFieldAlgorithms.prototype.algorithmA = function (options) {
        console.log("Algo A")
        console.log(options)
        //Cpl_id does not exist or Policy(n-1) does not exist
        //Value(n-1) does not exist and ValueText(n-1) does not exist
        var policyN = options.policyN;
        console.log(policyN)
        var masterData = '';
        var policyData = '';
        if((policyN!=null)&&(typeof policyN!= 'undefined')){
            masterData = policyN.master_data;
            policyData = policyN.policy_data;
        }

        var typeOfChangeField = '';
        var policyMeasureCode = masterData.PolicyMeasureCode;
        if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.exportSubsidies){
            typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
        }
        else{
            if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.importTariffs){
                typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
            }
            else{
                if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.tariffQuotas){
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                }
                else{
                    //Original Dataset is Oecd Pse Cse
                    var isOecdPseCse = this.options.policyUtilityObj.originalDataset_OecdPseCse(masterData);
                    if(isOecdPseCse==true){
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                    }
                    else{
                        if((policyData.Value!=null)&&(typeof policyData.Value!="undefined")&&(policyData.Value.length>0)){
                            //Introduction
                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                        }
                        else{
                            if((policyData.ValueText!=null)&&(typeof policyData.ValueText!="undefined")&&(policyData.ValueText.length>0)){
                                //Introduction
                                typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                            }
                            else{
                                if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.exportProibition){
                                    //Introduction
                                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                                }
                                else{
                                    if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.licensingRequirement){
                                        //Introduction
                                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                                    }
                                    else{
                                        if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.restrictionOnCustomsClearancePointForExports){
                                            //Introduction
                                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                                        }
                                        else{
                                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return typeOfChangeField;
    };

    TypeOfChangeFieldAlgorithms.prototype.algorithmB = function (options) {

        console.log("Algo B")
        console.log(options)
        //Value(n-1) IS NOT EMPTY
        var policyN_1 = options.policyN_1;
        var policyN = options.policyN;
        var masterData = policyN.master_data;
        var policyData = policyN.policy_data;
        var valueN = policyData.Value;
        var valueN_1 = options.policyN_1.Value;
        var valueTextN = policyData.ValueText;
        var typeOfChangeField = '';

        if((valueN != null)&&(typeof valueN!= 'undefined')&&(valueN.length>0)){
            if(valueN>valueN_1){
                typeOfChangeField = this.options.policyVariablesObj.options.result.code.increase;
            }
            else{
                if(valueN<valueN_1){
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.decrease;
                }
                else{
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.extension;
                }
            }
        }
        else{
            //Value(n) IS EMPTY
            if((valueTextN != null)&&(typeof valueTextN!= 'undefined')&&(valueTextN.length>0)){
                if(valueTextN == this.options.policyVariablesObj.options.ELIM){
                    typeOfChangeField = this.options.policyVariablesObj.options.elimination;
                }
                else{
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                }
            }
            else{
                typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
            }
        }

        return typeOfChangeField;
    };

    TypeOfChangeFieldAlgorithms.prototype.algorithmC = function (options) {
        console.log("Algo C")
        console.log(options)
        //Value(n-1) is empty and ValueText(n-1) is not empty
        var policyN_1 = options.policyN_1;
        var policyN = options.policyN;

        var masterData = policyN.master_data;
        var policyData = policyN.policy_data;
        var valueTextN = policyData.ValueText;
        var valueN = policyData.Value;
        var valueN_1 = options.policyN_1.Value;
        var typeOfChangeField = '';
        var policyMeasureCode = masterData.PolicyMeasureCode;

        if(valueTextN==this.options.policyVariablesObj.options.ELIM){
            typeOfChangeField = this.options.policyVariablesObj.options.result.code.elimination;
        }
        else{
            if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.exportProibition){
                //Introduction
                typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
            }
            else{
                if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.licensingRequirement){
                    //Introduction
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                }
                else{
                    if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.restrictionOnCustomsClearancePointForExports){
                        //Introduction
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                    }
                    else{
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                    }
                }
            }
        }

        return typeOfChangeField;
    };

    TypeOfChangeFieldAlgorithms.prototype.algorithmD = function (options) {
        console.log("Algo D")
        console.log(options)
        //Value(n-1) is empty and ValueText(n-1) is empty
        var policyN_1 = options.policyN_1;
        var policyN = options.policyN;

        var masterData = policyN.master_data;
        var policyData = policyN.policy_data;
        var policyMeasureCode = masterData.PolicyMeasureCode;
        var valueTextN = policyData.ValueText;
        var typeOfChangeField = '';
        var startDateN = policyData.StartDate;
        //var startDateNDATE = new Date('2011-04-11')
        var startDateNDATE = new Date(startDateN);
        //11/11/2007
        var endDateN_1 = policyN_1.EndDate;
        var app_endDate = endDateN_1.split("/");
        console.log(endDateN_1)
        var endDateOtherFormat = app_endDate[2]+"-"+app_endDate[1]+"-"+app_endDate[0];
        var endDateOtherFormatDate = new Date(endDateOtherFormat);
        var endDateN_1pLUS31 = new Date('2011-04-11');
        endDateN_1pLUS31.setDate(endDateOtherFormatDate.getDate() + 31);

        if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.exportProibition){
            if((valueTextN!=null)&&(typeof valueTextN!='undefined')&&(valueTextN.length>0)){
                if(valueTextN==this.options.policyVariablesObj.options.ELIM){
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.elimination;
                }
                else{
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                }
            }
            else{
                //ValueText is empty
               if(startDateN>endDateN_1pLUS31){
                   typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
               }
                else{
                   typeOfChangeField = this.options.policyVariablesObj.options.result.code.extension;
               }
            }
        }
        else{
            if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.licensingRequirement){
                if((valueTextN!=null)&&(typeof valueTextN!='undefined')(valueTextN.length>0)){
                    if(valueTextN==this.options.policyVariablesObj.options.ELIM){
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.elimination;
                    }
                    else{
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                    }
                }
                else{
                    if(startDateN>endDateN_1pLUS31){
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                    }
                    else{
                        typeOfChangeField = this.options.policyVariablesObj.options.result.code.extension;
                    }
                }
            }
            else{
                if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.restrictionOnCustomsClearancePointForExports){
                    if((valueTextN!=null)&&(typeof valueTextN!='undefined')(valueTextN.length>0)){
                        if(valueTextN==this.options.policyVariablesObj.options.ELIM){
                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.elimination;
                        }
                        else{
                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                        }
                    }
                    else{
                        if(startDateN>endDateN_1pLUS31){
                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.introduction;
                        }
                        else{
                            typeOfChangeField = this.options.policyVariablesObj.options.result.code.extension;
                        }
                    }
                }
                else{
                    typeOfChangeField = this.options.policyVariablesObj.options.result.code.n_a;
                }
            }
        }
        console.log("typeOfChangeField= "+typeOfChangeField)

        return typeOfChangeField;
    };

    return TypeOfChangeFieldAlgorithms;
});