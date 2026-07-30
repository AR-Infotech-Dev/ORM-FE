import { makeRequest } from "@/api/httpClient";
import { myTeamsModuleSchema } from "@modules/myTeams/data/module.schema";

export const getMyTeamList = async ({ filterState, page, hierarchyMode }) => {
    return await makeRequest(myTeamsModuleSchema.api.list, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
            status: "active",
            page,
            searchText: filterState.searchText,
            filters: filterState.filters,
            order: filterState.order,
            orderBy: filterState.orderBy,
            depth: hierarchyMode ? "all" : "direct",
        },
    });
}
export const deleteMyTeamMember = async (selectedRowIds) => {
    return await makeRequest(myTeamsModuleSchema.api.delete, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
            action: 'delete',
            ids: selectedRowIds,
        },
    });
}
export const getMemberDetails = async (userID) => {
    return await makeRequest(
        `${myTeamsModuleSchema.api.memberDetails}/${userID}`,
        {
            method: "GET",
        }
    );
}
export const getMyTeamDetails = async (userID) => {
    return await makeRequest(
        `${myTeamsModuleSchema.api.edit}/${userID}`,
        {
            method: "GET",
        }
    );
}
export const saveMyTeamMember = async ({ mode, userID, formData }) => {
    const saveUrl = mode === "create" ? myTeamsModuleSchema.api.create : `${myTeamsModuleSchema.api.edit}/${userID}`;
    const method = mode === "create" ? "PUT" : "POST";

    return makeRequest(saveUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
};
