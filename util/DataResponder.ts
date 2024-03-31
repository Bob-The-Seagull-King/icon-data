
import abilitiesdata from '../data/player/abilities.json'
import addonsdata from '../data/player/addons.json'

interface IDataRequest {
    type: string
}

interface IDataRequestID extends IDataRequest {
    id: string
}

interface IDataRequestComplexSearch extends IDataRequest {
    request: IDataRequestSearchParam
}

interface IDataRequestSearchParam {
    operator: string, // AND, OR
    terms: IDataRequestSearchTerm[],
    subparams: IDataRequestSearchParam[]
}

interface IDataRequestSearchTerm {
    item: string,
    value: any,
    equals: boolean, // true -> check if item == value, false -> check if item != value
    istag?: boolean, // true -> checks if a tag with tag_name=value has tagvalue
    tagvalue?: any, // if left blank, just checks if tag_name exists
}

class DataResponder {

    public static GetSingleEntry(request: IDataRequestID) {
        const dataSet = DataResponder.GetDataType(request.type)

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {
            if (dataSet[i].id == request.id) {
                return dataSet[i]
            }
        }
        return []
    }

    public static GetFullDataEntry(request: IDataRequest) {
        const dataSet = DataResponder.GetDataType(request.type)
        return dataSet;
    }

    private static GetDataType(type: string) {
        switch(type) {
            case "abilities": {
                return abilitiesdata
                break;
            }
            case "addons": {
                return addonsdata
                break;
            }
            default: {
                return []
                break;
            }
        }
    }

    public static ComplexSearch(search: IDataRequestComplexSearch) {
        const dataSet = DataResponder.GetDataType(search.type)
        const dataSelect = []

        let i = 0;
        for (i = 0; i < dataSet.length; i++) {
            if (DataResponder.ValidateComplexSearch(search.request, dataSet[i])) {
                dataSelect.push(dataSet[i]);
            }
        }

        return dataSelect;
    }

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

    public static ValidateBySearch(term: IDataRequestSearchTerm, data: any) {
        if (!term.istag) {
            const dynamicKey = term.item as keyof (typeof data);
            if (term.equals) {
                return (data[dynamicKey] == term.value)
            } else {
                return (data[dynamicKey] != term.value)
            }
        } else {
            const dynamicKey = term.item as keyof (typeof data);
            if (term.tagvalue == "") {
                let i = 0;
                for (i = 0; i < data[dynamicKey].length; i++) {
                    if (data[dynamicKey][i].tag_name == term.value) {
                        return (term.equals == true)
                    }
                }
                return (term.equals == false);
            } else {
                
                let i = 0;
                for (i = 0; i < data[dynamicKey].length; i++) {
                    if (data[dynamicKey][i].tag_name == term.value) {
                        if (data[dynamicKey][i].val == term.tagvalue) {
                            return (term.equals == true)
                        }
                    }
                }
                return false;
            }
        }
    }
    // Turn search term into check

    // Run through data, for each entry, do all the above checks
}

export {DataResponder}