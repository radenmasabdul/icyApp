import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from "../../index.js"

export const useadminStore = defineStore('admin', {
    state: () => ({
        dataAdmin: [],
        search: "",
        roles: "",
        currentPage: 1,
        perPage: 10,
        totalRecords: 0,
        isLoading: false,
    }),
    getters: {
        getDataAdmin(state) {
            return state.dataAdmin
        },
        getTotalRecords(state) {
            return state.totalRecords;
        },
        getCurrentPage(state) {
            return state.currentPage;
        },
        getPerPage(state) {
            return state.perPage;
        },
    },
    actions: {
        async dataListAdmin(forceRefresh = false) {
            try {

                if (this.isLoading || (!forceRefresh && this.dataAdmin.length > 0 && !forceRefresh)) return;

                this.isLoading = true;

                const token = Cookies.get("token");

                const res = await Api.get('/admin/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        search: this.search,
                        page: this.currentPage,
                        perPage: this.perPage,
                        role: this.roles,
                    }
                });

                this.dataAdmin = res.data.data
                this.totalRecords = res.data.total
                this.currentPage = res.data.current_page
                this.perPage = res.data.per_page

            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false;
            }
        },
    },
});

