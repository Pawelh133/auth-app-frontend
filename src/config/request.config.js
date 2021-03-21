import { getHeaderToken } from '../helpers/api/token-header.helper';

const requestConfig = {
    headers: {
        applicationJson: {
            'Content-Type': 'application/json'
        },
        urlencoded: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        formData: {
            'Content-Type': 'multipart/form-data'
        },
        fileType: (fileTypeName) => ({
            'Content-Type': fileTypeName,
        }),
        authorization: () => ({
            'Authorization': getHeaderToken(),
        })
    }
};

export default requestConfig;
