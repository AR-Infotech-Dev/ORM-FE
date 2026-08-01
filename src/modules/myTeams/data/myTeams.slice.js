import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteMyTeamMember as deleteMyTeamMemberService, getMyTeamList, getMemberDetails, } from "./myTeams.service";

const initialState = {
    rows: [],           // -> list
    pagination: {},     // -> API pagination info
    page: 1,            // -> current page
    loading: false,     // -> Team members fetch चालू आहे का
    deleting: false,    // -> delete चालू आहे का
    selectedRowIds: [], // -> selected Team members ids
    hierarchyMode: false,
    error: "",          // -> API error message
    selectedMember: null,
}

export const fetchMyTeam = createAsyncThunk(
    "myTeam/fetchMyTeam",
    async ({ filterState, page, hierarchyMode }, { rejectWithValue }) => {
        const res = await getMyTeamList({ filterState, page, hierarchyMode, });

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while fetching team members");
        }

        return {
            rows: res.data || [],
            pagination: res.pagination || {},
        };
    }
);
export const deleteMyTeamMember = createAsyncThunk(
    "myTeam/deleteMyTeam",
    async (selectedRowIds, { rejectWithValue }) => {
        const res = await deleteMyTeamMemberService(selectedRowIds);

        if (!res.success) {
            return rejectWithValue(res?.message || "Error while deleting Team members");
        }

        return {
            message: res?.message || "Team members deleted successfully",
            deletedIds: selectedRowIds,
        };
    }
);
export const fetchMemberDetails = createAsyncThunk(
    "myTeam/fetchMemberDetails",
    async (userID, { rejectWithValue }) => {

        const res = await getMemberDetails(userID);

        if (!res.success) {
            return rejectWithValue(
                res?.message || "Error while fetching member details"
            );
        }

        return res.data;
    }
);
const myTeamSlice = createSlice({
    name: "myTeam",
    initialState,
    reducers: {
        setMyTeamPage(state, action) {
            state.page = action.payload || 1;
        },
        setMyTeamRows(state, action) {
            state.rows = action.payload || [];
        },
        setMyTeamLoading(state, action) {
            state.loading = action.payload;
        },
        setMyTeamDeleting(state, action) {
            state.deleting = action.payload;
        },
        setMyTeamPagination(state, action) {
            state.pagination = action.payload;
        },
        setMyTeamSelection(state, action) {
            state.selectedRowIds = Array.isArray(action.payload) ? action.payload : [];
        },
        clearMyTeamSelection(state) {
            state.selectedRowIds = [];
        },
        setHierarchyMode(state, action) {
            state.hierarchyMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyTeam.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchMyTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.rows = action.payload.rows;
                state.pagination = action.payload.pagination;
                state.selectedRowIds = [];
            })
            .addCase(fetchMyTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error while fetching Team members";
            })
            .addCase(deleteMyTeamMember.pending, (state) => {
                state.deleting = true;
                state.error = "";
            })
            .addCase(deleteMyTeamMember.fulfilled, (state, action) => {
                state.deleting = false;
                state.selectedRowIds = [];
            })
            .addCase(deleteMyTeamMember.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Error while deleting Team members";
            })
            .addCase(fetchMemberDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMemberDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMember = action.payload;
            })
            .addCase(fetchMemberDetails.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Error while fetching member details";
            });

    }
});
export const {
    setMyTeamPage,
    setMyTeamRows,
    setMyTeamLoading,
    setMyTeamDeleting,
    setMyTeamPagination,
    setMyTeamSelection,
    clearMyTeamSelection,
    setHierarchyMode,
} = myTeamSlice.actions;

export default myTeamSlice.reducer;

export const selectMyTeamRows = (state) => state.myTeam.rows;
export const selectMyTeamPagination = (state) => state.myTeam.pagination;
export const selectMyTeamPage = (state) => state.myTeam.page;
export const selectMyTeamLoading = (state) => state.myTeam.loading;
export const selectMyTeamDeleting = (state) => state.myTeam.deleting;
export const selectMyTeamSelectedRowIds = (state) => state.myTeam.selectedRowIds;
export const selectMyTeamError = (state) => state.myTeam.error;
export const selectHierarchyMode = (state) => state.myTeam.hierarchyMode;
export const selectSelectedMember = (state) => state.myTeam.selectedMember;