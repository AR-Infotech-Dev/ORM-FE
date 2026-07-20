import { makeRequest } from "@/api/httpClient";
import { visitsModuleSchema } from "./module.schema";

export const getVisitsList = async ({ page, filterState }) => {
  return await makeRequest(visitsModuleSchema.api.list, {
    method: "POST",
    body: {
      status: "active",
      page,
      searchText: filterState.searchText,
      filters: filterState.filters,
      order: filterState.order,
      order_by: filterState.order_by,
    },
  });
};

export const deleteVisit = async (selectedRowIds) => {
  return await makeRequest(visitsModuleSchema.api.delete, {
    method: "POST",
    body: {
      action: "delete",
      ids: selectedRowIds,
    },
  });
};

export const getVisitDetails = async (visitId) => {
  return await makeRequest(
    `${visitsModuleSchema.api.edit}/${visitId}`,
    {
      method: "GET",
    }
  );
};

export const saveVisit = async ({ mode, visitId, payload }) => {
  const saveUrl =
    mode === "create"
      ? visitsModuleSchema.api.create
      : `${visitsModuleSchema.api.edit}/${visitId}`;

  const method = mode === "create" ? "PUT" : "POST";

  return await makeRequest(saveUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};