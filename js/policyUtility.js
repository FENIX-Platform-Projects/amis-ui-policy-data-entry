/*global define */
define([
    'jquery',
    'js/policyVariables'
], function ($, PolicyVariables) {

    var o = {
    };

    function PolicyUtility(options) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, o, options);
    }

    PolicyUtility.prototype.init= function (options) {
        this.options.policyVariablesObj = new PolicyVariables();
    };

    PolicyUtility.prototype.originalDataset_OecdPseCse= function (options) {

        var isOecdPseCse = false;
        if((options!=null)&&(typeof options!='undefined')&&(options.length)){
            var commodityDomainCode = options.CommodityDomainCode;
            var policyDomainCode = options.PolicyDomainCode;
            var policyTypeCode = options.PolicyMeasureCode;
            var policyMeasureCode = options.PolicyMeasureCode;

            if(commodityDomainCode == this.options.policyVariablesObj.options.commodityDomains.codes.agricultural){
                if(policyDomainCode == this.options.policyVariablesObj.options.policyDomains.codes.domestic){
                    if(policyTypeCode == this.options.policyVariablesObj.options.policyTypes.codes.directPayments){
                        if((policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.transfersToConsumersFromTaxpayersForCommodities)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.areaPayments)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.consumerSingleCommodityTransfers)){
                            isOecdPseCse = true;
                        }
                    }
                    else if(policyTypeCode == this.options.policyVariablesObj.options.policyTypes.codes.inputSupport){
                        if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.variableInputUse){
                            isOecdPseCse = true;
                        }
                    }
                    else if(policyTypeCode == this.options.policyVariablesObj.options.policyTypes.codes.marketTransfers){
                        if((policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.marketPriceSupport)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.otherTransfersFromConsumers)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.transfersToProducersFromConsumers)){
                            isOecdPseCse = true;
                        }
                    }
                    else if(policyTypeCode == this.options.policyVariablesObj.options.policyTypes.codes.productionMeasures){
                        if(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.outputBasedPayments){
                            isOecdPseCse = true;
                        }
                    }
                    else if(policyTypeCode == this.options.policyVariablesObj.options.policyTypes.codes.relativeIndicators){
                        if((policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.producerSingleCommodityTransfers)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.producerNominalProtectionCoefficient)&&(policyMeasureCode == this.options.policyVariablesObj.options.policyMeasures.codes.consumerNominalProtectionCoefficient)){
                            isOecdPseCse = true;
                        }
                    }
                }
            }
        }

        return isOecdPseCse;
    };

    return PolicyUtility;
});