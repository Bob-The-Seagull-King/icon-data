
import abilitiesdata from '../data/player/abilities.json'
import addonsdata from '../data/player/addons.json'

interface IDataRequest {
    type: string
}

interface IDataRequestID extends IDataRequest {
    id: string
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
}

export {DataResponder}