import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDealer, getDealersList } from "./dealer.service";

const initialState = {
    rows: [],           // -> list
    pagination: {},     // -> API pagination info
    page: 1,            // -> current page
    loading: false,     // -> Dealers fetch चालू आहे का
    deleting: false,    // -> delete चालू आहे का
    selectedRowIds: [], // -> selected user ids
    error: "",          // -> API error message
}

export const fetchDealers = createAsyncThunk(
    "dealers/fetchDealers",
    async ({ filterState, page }, { rejectWithValue }) => {
        const res = await getDealersList({ filterState, page });

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while fetching Dealers");
        }

        return {
            rows: res.data || [],
            pagination: res.pagination || {},
        };
    }
);
export const deleteDealers = createAsyncThunk(
    "dealers/deleteDealers",
    async (selectedRowIds, { rejectWithValue }) => {
        const res = await deleteDealer(selectedRowIds);

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while deleting Dealers");
        }

        return {
            message: res?.message || "Dealers deleted successfully",
            deletedIds: selectedRowIds,
        };
    }
);

const dealersSlice = createSlice({
    name: "dealers",
    initialState,
    reducers: {
        setDealersPage(state, action) {
            state.page = action.payload || 1;
        },
        setDealersRows(state, action) {
            state.rows = action.payload || [];
        },
        setDealersLoading(state, action) {
            state.loading = action.payload;
        },
        setDealersDeleting(state, action) {
            state.deleting = action.payload;
        },
        setDealersPagination(state, action) {
            state.pagination = action.payload;
        },
        setDealersSelection(state, action) {
            state.selectedRowIds = Array.isArray(action.payload) ? action.payload : [];
        },
        clearDealersSelection(state) {
            state.selectedRowIds = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDealers.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchDealers.fulfilled, (state, action) => {
                state.loading = false;
                state.rows = action.payload.rows;
                state.pagination = action.payload.pagination;
                state.selectedRowIds = [];
            })
            .addCase(fetchDealers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error while fetching Dealers";
            })
            .addCase(deleteDealers.pending, (state) => {
                state.deleting = true;
                state.error = "";
            })
            .addCase(deleteDealers.fulfilled, (state, action) => {
                state.deleting = false;
                state.selectedRowIds = [];
            })
            .addCase(deleteDealers.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Error while deleting Dealers";
            });
    }
});

export const {
    setDealersPage,
    setDealersRows,
    setDealersLoading,
    setDealersDeleting,
    setDealersPagination,
    setDealersSelection,
    clearDealersSelection,
} = dealersSlice.actions;

export default dealersSlice.reducer;

export const selectDealersRows = (state) => state.dealers.rows;
export const selectDealersPagination = (state) => state.dealers.pagination;
export const selectDealersPage = (state) => state.dealers.page;
export const selectDealersLoading = (state) => state.dealers.loading;
export const selectDealersDeleting = (state) => state.dealers.deleting;
export const selectDealersSelectedRowIds = (state) => state.dealers.selectedRowIds;
export const selectDealersError = (state) => state.dealers.error;