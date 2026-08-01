import { makeRequest } from "@/api/httpClient";
import { DealersModuleSchema } from "./module.schema";
import { log } from "handlebars";

export const getDealersList = async ({ page, filterState }) => {
    return await makeRequest(DealersModuleSchema.api.list, {
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
}

export const deleteDealer = async (selectedRowIds) => {
    return await makeRequest(DealersModuleSchema.api.delete, {
        method: "POST",

        body: {
            action: "delete",
            ids: selectedRowIds,
        },
    });
}

export const getDealerDetails = async (dealerId) => {
    return await makeRequest(`${DealersModuleSchema.api.edit}/${dealerId}`, {
        method: "GET",
    });
}

export const saveDealer = async ({ mode, dealerId, payload }) => {
    const saveUrl =
        mode === "create"
            ? DealersModuleSchema.api.create
            : `${DealersModuleSchema.api.edit}/${dealerId}`;
    const method = mode === "create" ? "PUT" : "POST";

    return await makeRequest(saveUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}
