import _ from "axios";
//axios configurations
export const axios = _.create({
    baseURL: "http://localhost:3450/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }

})