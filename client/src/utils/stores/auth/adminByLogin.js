import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from '../../index.js';

export const useadminByLoginStore = defineStore('adminByLogin', {
    state: () => ({
        dataAdminLogin: [],
    }),
    getters: {
        getDataAdminLogin(state) {
            return state.dataAdminLogin
        }
    },
    actions: {
        async dataAdmin() {
            try {

                const token = Cookies.get("token");

                const res = await Api.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.dataAdminLogin = res.data
            } catch (error) {
                console.error(error)
            }
        }
    },
});

