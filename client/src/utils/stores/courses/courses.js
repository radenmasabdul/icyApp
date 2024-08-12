import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from '../..';

export const usecoursesStore = defineStore('courses', {
    state: () => ({
        dataCourses: [],
        search: "",
        level: "",
        currentPage: 1,
        perPage: 10,
        totalRecords: 0,
        isLoading: false,
    }),
    getters: {
        getDataCourses(state) {
            return state.dataCourses
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
        async dataListCourses(forceRefresh = false) {
            try {

                if (this.isLoading || (!forceRefresh && this.dataCourses.length > 0)) return;

                this.isLoading = true;

                const token = Cookies.get("token");

                const res = await Api.get('/course/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        search: this.search,
                        page: this.currentPage,
                        perPage: this.perPage,
                        level: this.level,
                    }
                });

                this.dataCourses = res.data.data
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

