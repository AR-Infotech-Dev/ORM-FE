import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  fetchVisits,
  deleteVisits,
  selectVisitsPagination,
  selectVisitsPage,
  selectVisitsLoading,
  selectVisitsDeleting,
  selectVisitsSelectedRowIds,
  selectVisitsRows,
} from "../data/visits.slice";
import * as visitsActions from "../data/visits.slice";

export const useVisitsModule = ({ filterState }) => {
  const dispatch = useAppDispatch();
  const selectedRowIds = useAppSelector(selectVisitsSelectedRowIds);
  const pagination = useAppSelector(selectVisitsPagination);
  const loading = useAppSelector(selectVisitsLoading);
  const deleting = useAppSelector(selectVisitsDeleting);
  const page = useAppSelector(selectVisitsPage);
  const visitList = useAppSelector(selectVisitsRows);

  const getVisitList = async () => {
    const action = await dispatch(fetchVisits({ filterState, page }));

    if (fetchVisits.rejected.match(action)) {
      toast.error(action.payload || "Error while fetching visits");
    }
  };

  const handlePageChange = (pageNumber) => {
    dispatch(visitsActions.setVisitsPage(pageNumber));
  };

const handleToggleRow = (rowId, checked) => {
  const id = Number(rowId);

  if (!id) return;

  const currentSelectedRowIds = Array.isArray(selectedRowIds)
    ? selectedRowIds
    : [];

  if (checked) {
    dispatch(
      visitsActions.setVisitsSelection([
        ...new Set([...currentSelectedRowIds, id]),
      ])
    );
  } else {
    dispatch(
      visitsActions.setVisitsSelection(
        currentSelectedRowIds.filter(
          (selectedId) => Number(selectedId) !== id
        )
      )
    );
  }
};

  const handleToggleAllRows = (checked) => {
  if (!checked) {
    dispatch(visitsActions.clearVisitsSelection());
    return;
  }

  const allVisitIds = visitList
    .map((row) => Number(row?.visit_id))
    .filter((id) => id > 0);

  dispatch(
    visitsActions.setVisitsSelection(allVisitIds)
  );
};

 const handleDeleteSelected = async () => {
  if (!selectedRowIds.length) {
    toast.error("Please select at least one visit to delete.");
    return;
  }

  console.log("Selected Visit IDs:", selectedRowIds);

  const action = await dispatch(
    deleteVisits(selectedRowIds)
  );

  if (deleteVisits.fulfilled.match(action)) {
    toast.success(action.payload.message);

    dispatch(
      visitsActions.clearVisitsSelection()
    );

    await getVisitList();
  }

  if (deleteVisits.rejected.match(action)) {
    toast.error(action.payload);
  }
};

  const handleDeleteRow = async (row) => {
    const rowId = row?.visit_id ?? row?._id ?? row?.id;

    if (!rowId) {
      toast.error("Visit id not found.");
      return;
    }

    if (!window.confirm("Delete this visit?")) return;

    const action = await dispatch(deleteVisits([rowId]));

    if (deleteVisits.fulfilled.match(action)) {
      toast.success(action.payload.message);
      dispatch(visitsActions.clearVisitsSelection());

      await getVisitList();
    }

    if (deleteVisits.rejected.match(action)) {
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
    getVisitList,
    handleToggleRow,
    handleToggleAllRows,
    handleDeleteSelected,
    handleDeleteRow,
  };
};