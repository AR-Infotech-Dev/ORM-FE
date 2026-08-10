import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    fetchMyTeam,
    deleteMyTeamMember,
    selectMyTeamPagination,
    selectMyTeamPage,
    selectMyTeamLoading,
    selectMyTeamDeleting,
    selectMyTeamSelectedRowIds,
    selectMyTeamRows,
    selectHierarchyMode,
    setHierarchyMode,
} from "../data/myTeams.slice";
import * as myTeamActions from "../data/myTeams.slice";

export const useMyTeamsModule = ({ filterState }) => {
    const dispatch = useAppDispatch();
    const selectedRowIds = useAppSelector(selectMyTeamSelectedRowIds);
    const pagination = useAppSelector(selectMyTeamPagination);
    const loading = useAppSelector(selectMyTeamLoading);
    const deleting = useAppSelector(selectMyTeamDeleting);
    const page = useAppSelector(selectMyTeamPage);
    const myTeamList = useAppSelector(selectMyTeamRows);
    const hierarchyMode = useAppSelector(selectHierarchyMode);

    const getMyTeamList = async () => {
        const action = await dispatch(fetchMyTeam({ filterState, page, hierarchyMode, }));

        if (fetchMyTeam.rejected.match(action)) {
            toast.error(action.payload || "Error while fetching team members");
        }
    };

    const handlePageChange = (pageNumber) => {
        dispatch(myTeamActions.setMyTeamPage(pageNumber));
    }

    const handleToggleRow = (rowId, checked) => {
        const currentSelectedRowIds = Array.isArray(selectedRowIds) ? selectedRowIds : [];
        const nextSelectedRowIds = checked
            ? [...new Set([...currentSelectedRowIds, rowId])]
            : currentSelectedRowIds.filter((item) => item !== rowId);
        dispatch(myTeamActions.setMyTeamSelection(nextSelectedRowIds));
    };

    const handleToggleAllRows = (checked) => {
        if (!checked) {
            dispatch(myTeamActions.clearMyTeamSelection());
            return;
        }

        dispatch(myTeamActions.setMyTeamSelection(
            myTeamList.map((row) => row?._id ?? row?.id ?? row?.adminID).filter(Boolean)
        ))
    };

    const handleDeleteSelected = async () => {
        if (!selectedRowIds.length) {
            toast.error("Please select at least one team member to delete.");
            return;
        }
        const action = await dispatch(deleteMyTeamMember(selectedRowIds));

        if (deleteMyTeamMember.fulfilled.match(action)) {
            toast.success(action.payload.message);
            await getMyTeamList();
        }
        if (deleteMyTeamMember.rejected.match(action)) {
            toast.error(action.payload);
        }
    };

    const handleDeleteRow = async (row) => {
        const rowId = row?._id ?? row?.id ?? row?.adminID;
        if (!rowId) { toast.error("Team member id not found."); return; }
        if (!window.confirm("Delete this team member?")) return;

        const action = await dispatch(deleteMyTeamMember([rowId]));

        if (deleteMyTeamMember.fulfilled.match(action)) {
            toast.success(action.payload.message);
            await getMyTeamList();
        }
        if (deleteMyTeamMember.rejected.match(action)) {
            toast.error(action.payload);
        }
    };

    const handleExpandAll = () => {
        dispatch(setHierarchyMode(true));
    };

    const handleCollapse = () => {
        dispatch(setHierarchyMode(false));
    };

    return {
        pagination,
        page,
        loading,
        deleting,
        selectedRowIds,
        hierarchyMode,
        handlePageChange,
        getMyTeamList,
        handleExpandAll,
        handleCollapse,
        handleToggleRow,
        handleToggleAllRows,
        handleDeleteSelected,
        handleDeleteRow,
    }
}