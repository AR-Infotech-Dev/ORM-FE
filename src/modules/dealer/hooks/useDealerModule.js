import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    fetchDealers,
    deleteDealers,
    selectDealersPagination,
    selectDealersPage,
    selectDealersLoading,
    selectDealersDeleting,
    selectDealersSelectedRowIds,
    selectDealersRows,
} from "../data/dealer.slice";
import * as DealersActions from "../data/dealer.slice";

export const useDealersModule = ({ filterState }) => {
    const dispatch = useAppDispatch();

    const selectedRowIds = useAppSelector(selectDealersSelectedRowIds);
    const pagination = useAppSelector(selectDealersPagination);
    const loading = useAppSelector(selectDealersLoading);
    const deleting = useAppSelector(selectDealersDeleting);
    const page = useAppSelector(selectDealersPage);
    const DealerList = useAppSelector(selectDealersRows);

    const getDealerList = async () => {
        const action = await dispatch(fetchDealers({ filterState, page }));

        if (fetchDealers.rejected.match(action)) {
            toast.error(action.payload || "Error while fetching Dealers");
        }
    };

    const handlePageChange = (pageNumber) => {
        dispatch(DealersActions.setDealersPage(pageNumber));
    }

    const handleToggleRow = (rowId, checked) => {
        const currentSelectedRowIds = Array.isArray(selectedRowIds) ? selectedRowIds : [];
        const nextSelectedRowIds = checked
            ? [...new Set([...currentSelectedRowIds, rowId])]
            : currentSelectedRowIds.filter((item) => item !== rowId);
        dispatch(DealersActions.setDealersSelection(nextSelectedRowIds));
    };

    const handleToggleAllRows = (checked) => {
        if (!checked) {
            dispatch(DealersActions.clearDealersSelection());
            return;
        }

        dispatch(DealersActions.setDealersSelection(
            DealerList.map((row) => row?.dealer_id ?? row?._id ?? row?.id).filter(Boolean)
        ))
    };

    const handleDeleteSelected = async () => {
        if (!selectedRowIds.length) {
            toast.error("Please select at least one Dealer to delete.");
            return;
        }
        const action = await dispatch(deleteDealers(selectedRowIds));

        if (deleteDealers.fulfilled.match(action)) {
            toast.success(action.payload.message);
            await getDealerList();
        }
        if (deleteDealers.rejected.match(action)) {
            toast.error(action.payload);
        }
    };

    const handleDeleteRow = async (row) => {
        const rowId = row?.Dealer_id ?? row?._id ?? row?.id;
        if (!rowId) { toast.error("Dealer id not found."); return; }
        if (!window.confirm("Delete this Dealer?")) return;

        const action = await dispatch(deleteDealers([rowId]));

        if (deleteDealers.fulfilled.match(action)) {
            toast.success(action.payload.message);
            await getDealerList();
        }
        if (deleteDealers.rejected.match(action)) {
            toast.error(action.payload);
        }
    };

    return {
        pagination,
        page,
        loading,
        deleting,
        selectedRowIds,
        handlePageChange,
        getDealerList,
        handleToggleRow,
        handleToggleAllRows,
        handleDeleteSelected,
        handleDeleteRow,
    }
}
