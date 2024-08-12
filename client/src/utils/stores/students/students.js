import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from '../../index.js';

export const usestudentsStore = defineStore('students', {
    state: () => ({
        dataStudents: [],
        search: "",
        currentPage: 1,
        perPage: 10,
        totalRecords: 0,
        isLoading: false,
    }),
    getters: {
        getDataStudents(state) {
            return state.dataStudents
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
        async dataListStudent(forceRefresh = false) {
            try {
                if (this.isLoading || (!forceRefresh && this.dataStudents.length > 0 && !forceRefresh)) return;

                this.isLoading = true;

                const token = Cookies.get("token");

                const res = await Api.get('/students/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        search: this.search,
                        page: this.currentPage,
                        perPage: this.perPage,
                    }
                });

                this.dataStudents = res.data.data
                this.totalRecords = res.data.total
                this.currentPage = res.data.current_page
                this.perPage = res.data.per_page

            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false;
            }
        }
    },
});

