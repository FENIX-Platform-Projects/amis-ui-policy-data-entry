/*global define */
define([
    'jquery',
    'calculated_values_algorithms/policyDataObject',
    'calculated_values_algorithms/typeOfChangeField_algorithms',
    'js/policyVariables',
    'js/policyUtility'
], function ($, ap_policyDataObject, TypeOfChangeFieldAlgorithms, PolicyVariables, PolicyUtility) {

    var o = {
        dataEntryVariables : '',
        base_ip_address : '',
        base_ip_port : '',
        datasource : '',
        dataManagementToolObj: '',
        fileName: ''
    };

    function ValueTypeField(options) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, o, options);
    }

    ValueTypeField.prototype.init = function (options) {
        this.options.policyVariablesObj = new PolicyVariables();
        this.options.policyUtilityObj = new PolicyUtility();
    };

    ValueTypeField.prototype.field_calculator = function (options) {

        var valueType = this.options.policyVariablesObj.options.valueType.observed;
        var policyN = options.policyN;
        var policy_data = policyN.policy_data;
        var master_data = policyN.master_data;

        var isOecdPseCse = this.options.policyUtilityObj.originalDataset_OecdPseCse(master_data);
        if(isOecdPseCse==true){
            valueType = this.options.policyVariablesObj.options.valueType.estimated;
        }

        var taxRateBenchmarkFound = false;
        var benchmarkLinkFound = false;
        if((policy_data.TaxRateBenchmark!=null)&&(typeof policy_data.TaxRateBenchmark!='undefined')&&(policy_data.TaxRateBenchmark.length>0)){
            taxRateBenchmarkFound = true;
        }
        if((policy_data.BenchmarkLink!=null)&&(typeof policy_data.BenchmarkLink!='undefined')&&(policy_data.BenchmarkLink.length>0)){
            benchmarkLinkFound = true;
        }

        if((taxRateBenchmarkFound)||(benchmarkLinkFound)){
            valueType = this.options.policyVariablesObj.options.valueType.calculated;
        }

        //Checking Policy Element Field... test element_code is the code associated to the Policy Element
        if((policy_data.ElementCode!=null)&&(typeof policy_data.ElementCode!='undefined')&&(policy_data.ElementCode.length>0)){

            var policyElementCode = policy_data.ElementCode;
            if((policyElementCode==this.options.policyVariablesObj.options.policyElement.code.budgetaryOutlay_Commitment)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.quantityCommitment)){
                valueType = this.options.policyVariablesObj.options.valueType.committed;
            }
            else if((policyElementCode==this.options.policyVariablesObj.options.policyElement.code.budgetaryOutlay_Notified)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.quantityNotified)||
                (policyElementCode==this.options.policyVariablesObj.options.policyElement.code.SDTBudgetaryOutlayNotified)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.sDTQuantityNotified)||
                (policyElementCode==this.options.policyVariablesObj.options.policyElement.code.notifiedImportQuantity)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.notifiedTRQQuantity)
            ){
                valueType = this.options.policyVariablesObj.options.valueType.notified;
            }
            else if((policyElementCode==this.options.policyVariablesObj.options.policyElement.code.finalBoundTariff)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.finalBoundTariffODC)||
                (policyElementCode==this.options.policyVariablesObj.options.policyElement.code.finalBoundQuantity)||(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.inQuotaBoundTariff)||
                (policyElementCode==this.options.policyVariablesObj.options.policyElement.code.initialBoundQuantity)){
                valueType = this.options.policyVariablesObj.options.valueType.bound;
            }
            //It's not necessary because by default it's already so
            //else if(policyElementCode==this.options.policyVariablesObj.options.policyElement.code.MFNAppliedTariff){
            //    valueType = this.options.policyVariablesObj.options.valueType.observed;
            //}
        }

        return valueType;
    };

    return ValueTypeField;
});