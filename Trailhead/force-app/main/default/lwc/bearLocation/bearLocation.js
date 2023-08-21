import { LightningElement,api,wire} from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
//Set Bear Object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {
    @api recordId;
    name;
    mapMarkers=[];
    @wire(getRecord,{recordId: '$recordId',fields:bearFields})
    loadBear({error,data})
    {
        if(error)
        {
            //TODO: handle error
        }
        else if(data)
        {
            //Get Bear Data
            this.name = getFieldValue(data,NAME_FIELD);
            const Latitiude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            //Transform bear data into map markers
            this.mapMarkers = [{
                location: {Latitiude, Longitude},
                title: this.name,
                description: `Coords: ${Latitiude}, ${Longitude}`
            }];
        }
    }
    get cardTitle()
    {
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}