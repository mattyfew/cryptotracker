import axios from 'axios'
import * as type from './types';

const ROOT_URL = 'http://localhost:8080'

export function getAccounts() {
    return {
        type: type.GET_ACCOUNTS
    }
}
