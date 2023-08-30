const {v4: uuidv4} = require('uuid');
const FarmModel = require('../model/farm');

class Farm {
    constructor(farmConstruct = {}, farmModel = null) {
        const now = new Date().toISOString();
        const farm = this.__findValues(farmConstruct);
        this.__id = farm.id;
        this.__name = farm.name;
        this.__address = farm.address;
        this.__city = farm.city;
        this.__state = farm.state;
        this.__zip = farm.zip;
        this.__created = farm.created || now;
        this.__modified = farm.modified || now;
        this.__model = farmModel || new FarmModel();

    }

    static convertFromRequest(request){
        const copied = JSON.parse(JSON.stringify(request));
        copied.id = uuidv4();
        return new Farm(copied);
    }

    static async getByID(id){
        const model = new FarmModel();
        const result = await model.getFarmFromID(id);
        return new Farm(result);
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.__name;
    }

    get address() {
        return this.__address;
    }

    get city() {
        return this.__city;
    }

    get state() {
        return this.__state;
    }

    get created() {
        return this.__created;
    }

    get modified() {
        return this.__modified;
    }

    merge(updatedOrg) {
        const blacklist = ['id', 'created', 'modified'];
        for (const key in this) {
            const property = key.replace('__', '');
            if (updatedOrg[property] && updatedOrg[property] !== '' && !blacklist.includes(property)) {
                this[key] = updatedOrg[property];
            }
        }
    }

    export() {
        const exported = {};
        for (const key of Object.getOwnPropertyNames(Farm.prototype)) {
            if (typeof this[key] !== 'function') {
                exported[key] = this[key];
            }
        }
        return exported;
    }

    async create(){
        return this.__model.create(this.export())
    }

    async update(){
        return this.__model.update(this.export())
    }

    async delete(){
        return this.__model.delete(this.id);
    }

    __findValues(farm){
        const values = farm.body ? farm.body : farm;
        values.id = farm.body ? farm.pathParams.farmId : farm.id;
        return values;
    }
}

module.exports = Farm;
