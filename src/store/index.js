import { configureStore } from "@reduxjs/toolkit";
import moduleFiltersReducer from "./moduleFiltersSlice";
import usersReducer from "@modules/users/data/users.slice"
import productsReducer from "@modules/products/data/products.slice";
import categoriesReducer from "@modules/category/data/categories.slice";
import companyMasterReducer from "@modules/company-master/data/companyMaster.slice";
import menuMasterReducer from "@modules/menu-master/data/menuMaster.slice";
import visitsReducer from "@modules/visits/data/visits.slice";



export const store = configureStore({
  reducer: {
    moduleFilters: moduleFiltersReducer,
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    companyMaster: companyMasterReducer,
    menuMaster: menuMasterReducer,
    visits: visitsReducer,
  },
});

export default store;
