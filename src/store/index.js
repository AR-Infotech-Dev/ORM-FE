import { configureStore } from "@reduxjs/toolkit";
import moduleFiltersReducer from "./moduleFiltersSlice";
import usersReducer from "@modules/users/data/users.slice"
import productsReducer from "@modules/products/data/products.slice";
import categoriesReducer from "@modules/category/data/categories.slice";
import companyMasterReducer from "@modules/company-master/data/companyMaster.slice";
import menuMasterReducer from "@modules/menu-master/data/menuMaster.slice";
import visitsReducer from "@modules/visits/data/visits.slice";
import dealerMasterReducer from "@modules/dealer/data/dealer.slice";
import userroleReducer from "@modules/user-role/data/userrole.slice";
import myTeamReducer from "@modules/myTeams/data/myTeams.slice";
import orderBookingReducer from "@modules/orders/booking/data/booking.slice";
import orderConfirmationReducer from "@modules/orders/confirmation/data/confirmation.slice";

export const store = configureStore({
  reducer: {
    moduleFilters: moduleFiltersReducer,
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    companyMaster: companyMasterReducer,
    menuMaster: menuMasterReducer,
    visits: visitsReducer,
    dealers: dealerMasterReducer,
    userrole: userroleReducer,
    myTeam: myTeamReducer,

    orderBooking: orderBookingReducer,
    orderConfirmation: orderConfirmationReducer,
  },
});

export default store;
