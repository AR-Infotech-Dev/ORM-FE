import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProduct, getDashboardList } from "./dashboard.service";

const initialState = {
    rows: [],           // -> list
    pagination: {},     // -> API pagination info
    page: 1,            // -> current page
    loading: false,     // -> dashboard fetch चालू आहे का
    deleting: false,    // -> delete चालू आहे का
    selectedRowIds: [], // -> selected user ids
    error: "",          // -> API error message
}

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async ({ filterState, page }, { rejectWithValue }) => {
        const res = await getDashboardList({ filterState, page });

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while fetching dashboard");
        }

        return {
            rows: res.data || [],
            pagination: res.pagination || {},
        };
    }
);
export const deleteDashboard = createAsyncThunk(
    "dashboard/deleteDashboard",
    async (selectedRowIds, { rejectWithValue }) => {
        const res = await deleteProduct(selectedRowIds);

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while deleting dashboard");
        }

        return {
            message: res?.message || "Dashboard deleted successfully",
            deletedIds: selectedRowIds,
        };
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardPage(state, action) {
            state.page = action.payload || 1;
        },
        setDashboardRows(state, action) {
            state.rows = action.payload || [];
        },
        setDashboardLoading(state, action) {
            state.loading = action.payload;
        },
        setDashboardDeleting(state, action) {
            state.deleting = action.payload;
        },
        setDashboardPagination(state, action) {
            state.pagination = action.payload;
        },
        setDashboardSelection(state, action) {
            state.selectedRowIds = Array.isArray(action.payload) ? action.payload : [];
        },
        clearDashboardSelection(state) {
            state.selectedRowIds = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.rows = action.payload.rows;
                state.pagination = action.payload.pagination;
                state.selectedRowIds = [];
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error while fetching dashboard";
            })
            .addCase(deleteDashboard.pending, (state) => {
                state.deleting = true;
                state.error = "";
            })
            .addCase(deleteDashboard.fulfilled, (state, action) => {
                state.deleting = false;
                state.selectedRowIds = [];
            })
            .addCase(deleteDashboard.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Error while deleting dashboard";
            });
    }
});

export const {
    setDashboardPage,
    setDashboardRows,
    setDashboardLoading,
    setDashboardDeleting,
    setDashboardPagination,
    setDashboardSelection,
    clearDashboardSelection,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const selectDashboardRows = (state) => state.dashboard.rows;
export const selectDashboardPagination = (state) => state.dashboard.pagination;
export const selectDashboardPage = (state) => state.dashboard.page;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardDeleting = (state) => state.dashboard.deleting;
export const selectDashboardSelectedRowIds = (state) => state.dashboard.selectedRowIds;
export const selectDashboardError = (state) => state.dashboard.error;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getDashboard } from "./dashboard.service";

// const initialState = {
//     data: null,
//     loading: false,
//     error: "",
// };

// export const fetchDashboard = createAsyncThunk(
//     "dashboard/fetchDashboard",
//     async (dashboardFilter = {}, { rejectWithValue }) => {
//         try {
//             const res = await getDashboard(dashboardFilter);

//             if (!res.success) {
//                 return rejectWithValue(
//                     res?.message || "Error while fetching dashboard"
//                 );
//             }

//             return res.data?.data || res.data || {};
//         } catch (error) {
//             return rejectWithValue(
//                 error?.message || "Error while fetching dashboard"
//             );
//         }
//     }
// );

// const dashboardSlice = createSlice({
//     name: "dashboard",
//     initialState,

//     reducers: {
//         clearDashboard(state) {
//             state.data = null;
//             state.error = "";
//         },
//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchDashboard.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })

//             .addCase(fetchDashboard.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })

//             .addCase(fetchDashboard.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Error while fetching dashboard";
//             });
//     },
// });

// export const { clearDashboard } = dashboardSlice.actions;

// export default dashboardSlice.reducer;

// export const selectDashboardData = (state) =>
//     state.dashboard.data;

// export const selectDashboardLoading = (state) =>
//     state.dashboard.loading;

// export const selectDashboardError = (state) =>
//     state.dashboard.error;