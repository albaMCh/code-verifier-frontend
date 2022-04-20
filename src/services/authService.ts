import axios from '../utils/config/axios.config';


/**
 * 
 * @param {string} email Email to login a user
 * @param {string} password 
 * @returns 
 */

export const login = (email:string, password: string) => {

    // Declare Body to POST
    let body = {
        email: email,
        password:password
    }

    // Send POST to login endpoint
    return axios.post('auth/login', body)
}

/**
 * Register method
 * @param {string}name 
 * @param {string}email Email of user
 * @param {string}password Password of user
 * @param {number}age Age of user
 * @returns 
 */

export const register = (name: string, email:string, password: string, age:number) => {

    // Declare Body to POST
    let body = {
        name: name,
        email: email,
        password:password,
        age: age
    }

    // Send POST to login endpoint
    return axios.post('auth/register', body)
}