
// Data File Imports -----------------------------------
import abilitiesdata from '../data/tactical/abilities.json'
import addonsdata from '../data/tactical/addons.json'
import summonsdata from '../data/tactical/summons.json';
import talentsdata from '../data/tactical/talents.json';
import masteriesdata from '../data/tactical/masteries.json';
import limitbreaksdata from '../data/tactical/limitbreaks.json'
import traitsdata from '../data/tactical/traits.json'
import jobsdata from '../data/tactical/jobs.json'
import classesdata from '../data/tactical/classes.json'
import relicsdata from '../data/tactical/relics.json'
import trophydata from '../data/tactical/trophy.json'

import powerdata from '../data/narrative/powers.json'
import actiondata from '../data/narrative/actions.json'
import bonddata from '../data/narrative/bonds.json'
import geardata from '../data/narrative/gear.json'
import secondwinddata from '../data/narrative/secondwind.json'
import specialabilitydata from '../data/narrative/specialability.json'

import glossarydata from '../data/general/glossary.json'
import tabledata from '../data/general/table.json'
import kindata from '../data/general/kins.json'
import culturedata from '../data/general/cultures.json'
import campitemdata from '../data/general/campitems.json'
import campupgradedata from '../data/general/campupgrades.json'
import rulesetdata from '../data/general/rules.json'
import imagedata from '../data/general/images.json'

import foetraitsdata from '../data/foes/foetraits.json'
import foeabilitiesdata from '../data/foes/foeabilities.json'
import foesummonsdata from '../data/foes/foesummons.json'
import foeclassdata from '../data/foes/foeclasses.json'
import foefactiondata from '../data/foes/foefactions.json'
import foefactionclassdata from '../data/foes/foefactionclasses.json'
import foejobdata from '../data/foes/foejobs.json'
// -----------------------------------------------------

/**
 * Basic request interface
 */
interface IDataRequest {
    type: string // The data file to search within
    data: []
}

/**
 * Used for single-id collection and return-all-values-by-key collection
 */
interface IDataRequestID extends IDataRequest {
    id: string // The ID value being selected for
}

/**
 * Used for complex searches
 */
interface IDataRequestComplexSearch extends IDataRequest {
    request: IDataRequestSearchParam // The search reques to filter items by
}

/**
 * Used for complex searches to combine and contain search terms
 */
interface IDataRequestSearchParam {
    operator: string, // Can be 'and' (true if all terms and subparams return true) or 'or' (true if one term or subparam returns true)
    terms: IDataRequestSearchTerm[],
    subparams: IDataRequestSearchParam[]
}

/**
 * Used to validate if a given data item fits search criteria
 */
interface IDataRequestSearchTerm {
    item: string, // The string name of the key being checked
    value: any, // The desired value of the key
    equals: boolean, // true -> check if item == value, false -> check if item != value
    strict: boolean, // true -> exact match of value, false -> item includes value
    istag?: boolean, // true -> checks if a tag with tag_name=value has tagvalue
    tagvalue?: any, // if left blank, just checks if tag_name exists
}

/**
 * Static-only class that returns desired JSON data
 */
class DataResponder {

    /**
     * Grabs the correct json file to search.
     * @param type The type of data to be searched
     * @returns JSON array of data to search
     */
    private static GetDataType(type: string, data : any[]) {
        switch(type) {
            case "abilities": {
                return abilitiesdata.concat(data)
            }
            case "foeabilities": {
                return foeabilitiesdata.concat(data)
            }
            case "addons": {
                return addonsdata.concat(data)
            }
            case "summons": {
                return summonsdata.concat(data)
            }
            case "foesummons": {
                return foesummonsdata.concat(data)
            }
            case "talents": {
                return talentsdata.concat(data)
            }
            case "traits": {
                return traitsdata.concat(data)
            }
            case "foetraits": {
                return foetraitsdata.concat(data)
            }
            case "masteries": {
                return masteriesdata.concat(data)
            }
            case "jobs": {
                return jobsdata.concat(data)
            }
            case "classes": {
                return classesdata.concat(data)
            }
            case "limitbreaks": {
                return limitbreaksdata.concat(data)
            }
            case "relics": {
                return relicsdata.concat(data)
            }
            case "trophies": {
                return trophydata.concat(data)
            }
            case "glossary": {
                return glossarydata.concat(data)
            }
            case "table": {
                return tabledata.concat(data)
            }
            case "powers": {
                return powerdata.concat(data)
            }
            case "actions": {
                return actiondata.concat(data)
            }
            case "foeclass": {
                return foeclassdata.concat(data)
            }
            case "bonds": {
                return bonddata.concat(data)
            }
            case "gears": {
                return geardata.concat(data)
            }
            case "secondwinds": {
                return secondwinddata.concat(data)
            }
            case "specialabilities": {
                return specialabilitydata.concat(data)
            }
            case "kins": {
                return kindata.concat(data)
            }
            case "cultures": {
                return culturedata.concat(data)
            }
            case "campitems": {
                return campitemdata.concat(data)
            }
            case "campupgrades": {
                return campupgradedata.concat(data)
            }
            case "rules": {
                return rulesetdata.concat(data)
            }
            case "foefaction": {
                return foefactiondata.concat(data)
            }
            case "foefactionclass": {
                return foefactionclassdata.concat(data)
            }
            case "foejobs": {
                return foejobdata.concat(data)
            }
            case "images": {
                return imagedata.concat(data)
            }
            default: {
                return data
            }
        }
    }

    /**
     * Grabs a single entry based on ID value
     * @param request JSON structure that provides the file to search and the ID to search by
     * @returns JSON object, either empty or containing the found entry
     */
    public static GetSingleEntry(request: IDataRequestID) {
        const dataSet = DataResponder.GetDataType(request.type, request.data)

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {
            if (dataSet[i].id == request.id) {
                return dataSet[i]
            }
        }
        return {}
    }

    /**
     * Gets an entire data file
     * @param request Contains the name of the file to grab
     * @returns JSON array of all data in the specified file
     */
    public static GetFullDataEntry(request: IDataRequest) {
        const dataSet = DataResponder.GetDataType(request.type, request.data)
        return dataSet;
    }

    /**
     * Grabs all values of a given key in a data file
     * @param request The file to search and the name of the key to get values from
     * @returns Array of all values associated with the requested key in the requested file
     */
    public static GetAllOfKeyInData(request: IDataRequestID) {
        const dataSet = DataResponder.GetDataType(request.type, request.data)
        const valueSet: any = []

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {
            const data = dataSet[i];
            const dynamicKey = request.id as keyof (typeof data);
            if (!valueSet.includes(data[dynamicKey])) {
                valueSet.push(data[dynamicKey])
            }
        }

        return valueSet;
    }

    /**
     * Grab all the different types of tag found in a given file
     * @param request The file to search the tags of
     * @returns Array of string names of tags
     */
    public static GetAllTagsInData(request: IDataRequest) {
        const dataSet = DataResponder.GetDataType(request.type, request.data)
        const valueSet: any = []

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {

            Object.entries(dataSet[i].tags).forEach(
                ([key]) => {
                    if (!valueSet.includes(key)) {
                        valueSet.push(key)
                    }
                }
            );

        }

        return valueSet;
    }

    /**
     * Performs a complex search with a variety of filtering terms
     * by iterating through each entry in a data file and validating
     * if they meet the criteria
     * @param search Determines the file to search and criteria to search by
     * @returns JSON array of entries in a data file that match the criteria
     */
    public static ComplexSearch(search: IDataRequestComplexSearch) {
        const dataSet = DataResponder.GetDataType(search.type, search.data)
        const dataSelect = []

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {
            if (DataResponder.ValidateComplexSearch(search.request, dataSet[i])) {
                dataSelect.push(dataSet[i]);
            }
        }
        return dataSelect;
    }

    /**
     * Validates if a data object should be included in the search based on a
     * parameter that combines multiple search terms with AND or OR operators.
     * @param term the list of search terms and sub-params
     * @param data the data object to check
     * @returns boolean if the data match all search criteria
     */
    public static ValidateComplexSearch(term: IDataRequestSearchParam, data: any) {
        let isvalid = false;
        let i = 0;
        
        for (i = 0; i < term.terms.length; i++) {
            const isSearch = DataResponder.ValidateBySearch(term.terms[i], data)
            if (term.operator == "and") {
                if (isSearch == false) {
                    return false;
                } else {
                    isvalid = true;
                }
            } else {
                if (isSearch) {
                    isvalid = true;
                }
            }
        }

        for (i = 0; i < term.subparams.length; i++) {
            const isSearch = DataResponder.ValidateComplexSearch(term.subparams[i], data)
            if (term.operator == "and") {
                if (isSearch == false) {
                    return false;
                } else {
                    isvalid = true;
                }
            } else {
                if (isSearch) {
                    isvalid = true;
                }
            }
        }

        return isvalid;
    }

    /**
     * Checks if the values of a data object match a single desired search term
     * @param term The desired key to check, value to want, and other requirements
     * @param data The data object being validated
     * @returns boolean if the data object matches the search term
     */
    public static ValidateBySearch(term: IDataRequestSearchTerm, data: any) {
        if (!term.istag) {
            const dynamicKey = term.item as keyof (typeof data);
            let isvalid = false;
            if (term.strict) {
                if (data[dynamicKey] != undefined) {
                    isvalid = data[dynamicKey].toString().toLowerCase() == term.value.toString().toLowerCase()

                }
            } else {
                if (data[dynamicKey] != undefined) {
                    isvalid = data[dynamicKey].toString().toLowerCase().includes(term.value.toString().toLowerCase())
                }
            }
            if (term.equals) {
                return (isvalid)
            } else {
                return (!isvalid)
            }
        } else {
            const dynamicKey = term.item as keyof (typeof data);
            
            if (data[dynamicKey] != undefined) {
                if (data[dynamicKey][term.value]) {
                    if (term.tagvalue === "") {
                        return (term.equals === true)
                    } else {
                        if (term.strict) {
                            if (Array.isArray(data[dynamicKey][term.value])) {
                                return (term.equals === (data[dynamicKey][term.value].toString().toLowerCase().includes(term.tagvalue.toString().toLowerCase())))
                            }
                            return (term.equals === (term.tagvalue.toString().toLowerCase() === data[dynamicKey][term.value].toString().toLowerCase()))
                        } else {
                            return (term.equals === (data[dynamicKey][term.value].toString().toLowerCase()).includes(term.tagvalue.toString().toLowerCase()))
                        }
                    }
                } else {
                    return (term.equals === false)
                }
            }
        }
    }
}

export {DataResponder}