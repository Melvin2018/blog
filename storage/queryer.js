import {
    pool
} from './pool.js';

export const queryer = (query, ...params) => {
    return pool.query(query, params);
}