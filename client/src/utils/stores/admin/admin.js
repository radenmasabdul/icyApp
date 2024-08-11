import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from "../../index.js"

export const useadminStore = defineStore('admin', {
    state: () => ({
        dataAdmin: [],
        searchQuery: "",
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
        }
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
                        search: this.searchQuery,
                        page: this.currentPage,
                        perPage: this.perPage,
                    }
                });
                console.log('hasil res:', res.data.data)

                this.dataAdmin = res.data.data
                this.totalRecords = res.data.total
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false;
            }
        },
        setSearchQuery(query) {
            this.searchQue = query
            this.dataListAdmin();
        },
        setCurrentPage(page) {
            this.currentPage = page
            this.dataListAdmin();
        },
        setPerPage(perPage) {
            this.perPage = perPage
            this.dataListAdmin();
        }
    },
});

