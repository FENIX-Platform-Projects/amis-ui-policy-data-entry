define({

    "root": {
        "summary":{
            "country": "Country",
            "subnational": "Subnational Level",
            "commodityClass": "Commodity Class",
            "commodityId": "Commodity Id",
            "policyDomain": "Policy Domain",
            "policyType": "Policy Type",
            "policyMeasure": "Policy Measure",
            "policyCondition": "Policy Condition"
        },
        "link": "Link",
        "linkDescription": "Enter the hyperlink(s) of the webpage(s) with the legal notice or official document which contains the information on the measure. Separate multiple links with a ;",
        "linkPdf": "Link Pdf",
        "linkPdfDescription": "Save the webpage as a pdf, give it a name and upload it here. If there are multiple links, save each of them separately as a pdf. Saving the website as a pdf document guarantees that the relevant information remains available when the website is no longer active.",
        "policyElement": "Policy Element",
        "policyElementAdditionalName": "Policy Element Additional Name",
        "policyElementDescription": "Select the policy element that further characterizes the policy measure.",
        "startDate": "Start Date [MANDATORY]",
        "startDateDescription": "Enter the date (in DD-MM-YYY format) when the policy measure enters into force, is extended or is modified, as determined in the legal document.",
        "endDate": "End Date",
        "endDateDescription": "Enter the expiration date (in DD-MM-YYY format) of the policy measure as determined in the legal document. The end date can be left empty if it is not specified in the legal document.",
        "unit": "Unit",
        "unitAdditionalName": "Unit Additional Name",
        "unitDescription": "Select or enter the units as provided in the official source. This field has to be filled in if the policy measure has a numeric value. Leave this field empty if you are filling in the field Value_Text.",
        "value": "Value",
        "valueDescription": "Enter the quantitative or numerical value of the policy measure. This field should always be considered in conjunction with the field “Units”. The fields “Value” and “Value_Text” are mutually exclusive. For example, if the tax is 15% then the field Value=15, the field Units=% and the field Value_Text=empty. However, if the tax is \"15% plus €7.50 per MT\", then the field Value=empty, field Units=empty, and the field Value_Text=15% plus €7.50 per MT.",
        "valueText": "Value Text",
        "valueTextDescription": "Enter the qualitative value or text description of the policy measure. When this field is filled in, the field “Units” is empty. The fields “Value” and “Value_Text” are mutually exclusive. For example, if the tax is 15% then the field Value=15, the field Units=% and the field Value_Text=empty. However, if the tax is \"15% plus €7.50 per MT\", then the field Value=empty, field Units=empty, and the field Value_Text=15% plus €7.50 per MT",
        "source": "Source",
        "sourceAdditionalName": "Source Additional Name",
        "sourceDescription": "Select or enter the name of the agency hosting the information. For example: Ministry of Trade.",
        "exemptions": "Exemptions",
        "exemptionsDescription": "Specify which countries, firms or commodities are exempted from a particular policy measure. This field is empty when no exemptions are granted.",
        "dateOfPublication": "Date Of Publication [MANDATORY]",
        "dateOfPublicationDescription": "Enter the date (in DD-MM-YYY format) on which the measure was officially published. This date is not necessarily the same as the start date.",
        "taxRateBenchmark": "Tax Rate Benchmark",
        "taxRateBenchmarkDescription": "Enter the tax rate for the benchmark product.",
        "benchmarkLink": "Benchmark Link",
        "benchmarkLinkDescription": "Enter the hyperlink(s) of the webpage(s) with the information on the benchmark-related fields. Separate multiple links with a ; ",
        "benchmarkLinkPdf": "Benchmark Link Pdf",
        "benchmarkLinkPdfDescription": "Save the webpage with information on the benchmark-related fields as a pdf, give it a name and upload it here. If there are multiple links, save each of them separately as a pdf. Saving the website as a pdf document guarantees that the relevant information remains available when the website is no longer active.",
        "secondGenerationSpecific":"Second Generation Specific",
        "secondGenerationAdditionalName": "Second Generation Additional Name",
        "secondGenerationSpecificDescription": "If the biofuel policy measure relates to second-generation biofuels, select \"yes\". Otherwise, leave this field empty.",
        "notes": "Notes",
        "notesDescription": "Enter relevant information that could not be recorded in any of the other fields.",
        "localCondition": "Local Condition",
        "localConditionAdditionalName": "Local Condition Additional Name",
        "localConditionDescription": "If the policy measure has been issued at the national level but with different values for different areas, select or enter the names of these locations. This field is rarely filled in.",
        "titleOfNotice": "Title Of Notice",
        "titleOfNoticeDescription": "Title of the notice/document providing information about the measure.",
        "legalBasisName": "Legal Basis Name",
        "legalBasisNameDescription": "Enter the title of the law, regulation, or decree authorising or mandating the measure.",
        "benchmarkTax": "Benchmark Tax",
        "benchmarkTaxDescription": "Enter the quantitative value of the benchmark tax that was used to calculate the Value of the policy measure. For example, the gasoline tax for a tax concession on ethanol.",
        "benchmarkProduct": "Benchmark Product",
        "benchmarkProductDescription": "Enter the benchmark product that was used to calculate the Value of the policy measure. For example, regular diesel for a tax concession on biodiesel.",
        "taxRateBiofuel": "Tax Rate Biofuel",
        "taxRateBiofuelDescription": "Enter the tax rate for the original biofuel product.",
        "startDateTax": "Start Date Tax",
        "startDateTaxDescription": "Select the date when the benchmark tax rates entered into force.",
        "measureDescription": "Measure Description",
        "measureDescriptionDescription": "Enter additional information on the policy measure as specified in the legal document.",
        "productOriginalHs":"Product Original HS",
        "productOriginalHsDescription": "Product Original HS tooltip",
        "productOriginalName": "Product Original Name",
        "productOriginalNameDescription": "Product Original Name tooltip",
        "valueOrValueText": "Value or Value Text",
        "valueOrValueTextDescription": "One of Value and Value Text can be inserted.",
        "value": "Value",
        "valueText": "valueText"

        //options.properties.exemptions
        //options.properties.taxRateBenchmark
        //options.properties.benchmarkLink
        //options.properties.benchmarkLinkPdf
        //options.properties.notes
        //options.properties.titleOfNotice
        //options.properties.legalBasisName
        //options.properties.benchmarkTax
        //options.properties.benchmarkProduct
        //options.properties.taxRateBiofuel
        //options.properties.measureDescription
        //options.properties.productOriginalHs
        //options.properties.productOriginalName
        //options.properties.typeOfChangeName
        //options.properties.valueType
        //options.properties.policyElement
        //options.properties.unit
        //options.properties.source
        //options.properties.secondGenerationSpecific
        //options.properties.localCondition
        //options.properties.imposedEndDate
        //options.properties.startDate
        //options.properties.endDate
        //options.properties.dateOfPublication
        //options.properties.startDateTax
    }
});
