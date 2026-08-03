import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteVisit, getVisitsList } from "./visits.service";

const initialState = {
  rows: [],
  pagination: {},
  page: 1,
  loading: false,
  deleting: false,
  selectedRowIds: [],
  error: "",
};

export const fetchVisits = createAsyncThunk(
  "visits/fetchVisits",
  async ({ filterState, page }, { rejectWithValue }) => {
    const res = await getVisitsList({ filterState, page });

    if (!res.success) {
      return rejectWithValue(
        res?.message || "Error while fetching visits"
      );
    }

    return {
      rows: res.data || [],
      pagination: res.pagination || {},
    };
  }
);

export const deleteVisits = createAsyncThunk(
  "visits/deleteVisits",
  async (selectedRowIds, { rejectWithValue }) => {
    const res = await deleteVisit(selectedRowIds);

    if (!res.success) {
      return rejectWithValue(
        res?.message || "Error while deleting visits"
      );
    }

    return {
      message: res?.message || "Visits deleted successfully",
      deletedIds: selectedRowIds,
    };
  }
);

const visitsSlice = createSlice({
  name: "visits",

  initialState,

  reducers: {
    setVisitsPage(state, action) {
      state.page = action.payload || 1;
    },

    setVisitsRows(state, action) {
      state.rows = action.payload || [];
    },

    setVisitsLoading(state, action) {
      state.loading = action.payload;
    },

    setVisitsDeleting(state, action) {
      state.deleting = action.payload;
    },

    setVisitsPagination(state, action) {
      state.pagination = action.payload;
    },

    setVisitsSelection(state, action) {
      state.selectedRowIds = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    clearVisitsSelection(state) {
      state.selectedRowIds = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVisits.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload.rows;
        state.pagination = action.payload.pagination;
        state.selectedRowIds = [];
      })

      .addCase(fetchVisits.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Error while fetching visits";
      })

      .addCase(deleteVisits.pending, (state) => {
        state.deleting = true;
        state.error = "";
      })

      .addCase(deleteVisits.fulfilled, (state) => {
        state.deleting = false;
        state.selectedRowIds = [];
      })

      .addCase(deleteVisits.rejected, (state, action) => {
        state.deleting = false;
        state.error =
          action.payload || "Error while deleting visits";
      });
  },
});

export const {
  setVisitsPage,
  setVisitsRows,
  setVisitsLoading,
  setVisitsDeleting,
  setVisitsPagination,
  setVisitsSelection,
  clearVisitsSelection,
} = visitsSlice.actions;

export default visitsSlice.reducer;

export const selectVisitsRows = (state) => state.visits.rows;

export const selectVisitsPagination = (state) =>
  state.visits.pagination;

export const selectVisitsPage = (state) => state.visits.page;

export const selectVisitsLoading = (state) =>
  state.visits.loading;

export const selectVisitsDeleting = (state) =>
  state.visits.deleting;

export const selectVisitsSelectedRowIds = (state) =>
  state.visits.selectedRowIds;

export const selectVisitsError = (state) =>
  state.visits.error;