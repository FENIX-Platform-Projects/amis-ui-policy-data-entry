/*global define */
define([
    'jquery'
], function ($) {

    var o = {
        result : {
            mapping: {
                6 : 'n.a.',
                5 : 'Introduction',
                2 : 'Elimination',
                4 : 'Increase',
                1 : 'Decrease',
                3 : 'Extension'
            },
            code :{
                introduction : 5,
                elimination : 2,
                increase : 4,
                decrease : 1,
                extension : 3
            },
            label : {
                n_a : 'n.a.',
                introduction : 'Introduction',
                elimination : 'Elimination',
                increase : 'Increase',
                decrease : 'Decrease',
                extension : 'Extension'
            }
        },
        commodityDomains : {
            codes : {
                agricultural : 1,
                biofuels : 2
            }
        },
        policyDomains : {
            codes : {
                trade : 1,
                domestic : 2
            }
        },
        policyTypes : {
            codes : {
                directPayments : 6,
                inputSupport : 5,
                marketTransfers : 3,
                productionMeasures : 12,
                relativeIndicators : 7
            }
        },
        policyMeasures : {
            codes : {
                //3;Export subsidies
                exportSubsidies : 3,
                //11;Import tariffs
                importTariffs : 11,
                //12;Tariff quotas
                tariffQuotas : 12,
                //31;Licensing requirement
                licensingRequirement : 31,
                //1;Export prohibition
                exportProibition : 1,
                //9;Restriction on customs clearance point for exports
                restrictionOnCustomsClearancePointForExports :9,

                //16;Transfers to consumers from taxpayers, for commodities (TCTC)
                transfersToConsumersFromTaxpayersForCommodities : 16,
                //21;Area payments
                areaPayments : 12,
                //49;Consumer Single Commodity Transfers (CSCT)
                consumerSingleCommodityTransfers : 49,
                //18;Variable input use (PIV)
                variableInputUse : 18,
                //13;Market price support (MPS)
                marketPriceSupport : 13,
                //14;Transfers to producers from consumers(-) (TPC)
                transfersToProducersFromConsumers : 14,
                //15;Other transfers from consumers(-) (OTC)
                otherTransfersFromConsumers : 15,
                //17;Output-based payments
                outputBasedPayments : 17,
                //23;% Producer Single Commodity Transfers (%PSCT)
                producerSingleCommodityTransfers : 23,
                //24;Producer Nominal Protection Coefficient (Producer NPC)
                producerNominalProtectionCoefficient : 24,
                //26;Consumer Nominal Protection Coefficient (Consumer NPC)
                consumerNominalProtectionCoefficient : 26
            }
        },
        originalDataset:{
            pseCse : 'OECD PSE/CSE'
        },
        valueType: {
          estimated : 'Estimated',
          bound : 'Bound',
          calculated : 'Calculated',
          committed : 'Committed',
          notified : 'Notified',
          observed : 'Observed'
        },
        policyElement : {
            mapping: {
                8 : 'MFN applied tariff',
                7 : 'Initial Bound Quantity',
                10 : 'Notified TRQ Quantity',
                1: 'BudgetaryOutlay_Commitment',
                2 : 'BudgetaryOutlay_Notified',
                5 : 'Final bound tariff ODC',
                99 : 'n.a.',
                13 : 'SDT_BudgetaryOutlay_Notified',
                3 : 'Final Bound Quantity',
                6 : 'In Quota bound tariff',
                11 : 'Quantity_Commitment',
                4 : 'Final bound tariff',
                14 : 'SDT_Quantity_Notified',
                9 : 'Notified Import Quantity',
                12 : 'Quantity_Notified'
            },
            code :{
                MFNAppliedTariff : 8,
                initialBoundQuantity : 7,
                notifiedTRQQuantity : 10,
                budgetaryOutlay_Commitment : 1,
                budgetaryOutlay_Notified : 2,
                finalBoundTariffODC : 5,
                n_a : 99,
                SDTBudgetaryOutlayNotified : 13,
                finalBoundQuantity : 3,
                inQuotaBoundTariff : 6,
                quantityCommitment : 11,
                finalBoundTariff : 4,
                sDTQuantityNotified : 14,
                notifiedImportQuantity : 9,
                quantityNotified : 12
            },
            label : {
                MFNAppliedTariff : 'MFN applied tariff',
                initialBoundQuantity : 'Initial Bound Quantity',
                notifiedTRQQuantity : 'Notified TRQ Quantity',
                budgetaryOutlay_Commitment : 'BudgetaryOutlay_Commitment',
                budgetaryOutlay_Notified : 'BudgetaryOutlay_Notified',
                finalBoundTariffODC : 'Final bound tariff ODC',
                n_a : 'n.a.',
                SDTBudgetaryOutlayNotified : 'SDT_BudgetaryOutlay_Notified',
                finalBoundQuantity : 'Final Bound Quantity',
                inQuotaBoundTariff : 'In Quota bound tariff',
                quantityCommitment : 'Quantity_Commitment',
                finalBoundTariff : 'Final bound tariff',
                sDTQuantityNotified : 'SDT_Quantity_Notified',
                notifiedImportQuantity : 'Notified Import Quantity',
                quantityNotified : 'Quantity_Notified'
            }
        },
        ELIM : 'elim'
    };

    function PolicyVariables(options) {
        if (this.options === undefined) {
            this.options = {};
        }
        $.extend(true, this.options, o, options);
    }

    return PolicyVariables;
});