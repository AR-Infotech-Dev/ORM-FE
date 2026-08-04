import { useEffect, useState } from "react";
import { myTeamsModuleSchema } from "./data/module.schema";
import { useMyTeamsTableConfig } from "./hooks/useMyTeamsTableConfig";
import { useMyTeamsModule } from "./hooks/useMyTeamsModule";
import { getNextSortConfig } from "@utils/sorting";
import { useModuleFilters, useAppSelector } from "@store/hooks";
import { selectMyTeamRows } from "./data/myTeams.slice";

import ModuleControls from "@shared/ModuleControls";
import ModulePageLayout from "@shared/ModulePageLayout";
import ModulePagination from "@shared/ModulePagination";
import DynamicFilter from "@components/dynamic-filter";
import useMenuPermissions from "@auth/utils/useMenuPermissions";
import MyTeamCards from "./components/MyTeamCards";
import MyTeamList from "./components/MyTeamList";
import MemberCard from "./components/MemberCard";
import TeamAlertsCard from "./components/TeamAlertsCard";


function MyTeamsModulePage({ menu_id }) {

  const resolvedMenuID = menu_id || myTeamsModuleSchema.menu_id || null;
  const permissions = useMenuPermissions(resolvedMenuID);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const myTeamList = useAppSelector(selectMyTeamRows);
  const { filterState, setSearchText, applyFilterPayload, setSort, clearFilters, } = useModuleFilters("my-team", myTeamList);
  const { pagination, page, loading, deleting, selectedRowIds, hierarchyMode, teamStats, getMyTeamList, handlePageChange, handleExpandAll, handleCollapse, handleToggleRow, handleToggleAllRows, handleDeleteSelected, handleDeleteRow, } = useMyTeamsModule({ filterState });
  const { sortConfig, resolvedColumns, defaultVisibleColumnKeys, resolvedFilterFields, } = useMyTeamsTableConfig({ resolvedMenuID, filterState });

  const handleSortChange = (columnKey) => {
    const nextSort = getNextSortConfig(sortConfig, columnKey);

    if (page !== 1) {
      handlePageChange(1);
    }

    setSort({
      orderBy: nextSort.key,
      order: nextSort.direction.toUpperCase(),
    });
  };

  useEffect(() => {
    getMyTeamList();
  }, [page, hierarchyMode, filterState.searchText, filterState.order, filterState.order_by, JSON.stringify(filterState.filters)]);

  useEffect(() => {
    if (page !== 1) {
      handlePageChange(1)
    }
  }, [filterState.searchText, filterState.order, filterState.order_by, JSON.stringify(filterState.filters)]);

  return (
    <>
      <ModulePageLayout
        title={myTeamsModuleSchema.title}
        description={myTeamsModuleSchema.description}
        controls={
          <ModuleControls
            canCreate={false}
            canDelete={permissions.canDelete}
            loading={loading}
            onRefresh={getMyTeamList}
            onDeleteSelected={handleDeleteSelected}
            showDelete={selectedRowIds.length !== 0}
            deleteDisabled={
              deleting || loading || selectedRowIds.length === 0
            }
            deleting={deleting}
            filter={
              <DynamicFilter
                filterState={filterState}
                fields={resolvedFilterFields}
                savedFilters={myTeamsModuleSchema.savedFilters}
                onSearch={setSearchText}
                onApplyFilters={applyFilterPayload}
                onSaveFilter={() => { }}
                onDeleteFilter={() => { }}
                onSelectSavedFilter={() => { }}
                onClearFilters={clearFilters}
              />
            }
          >
          </ModuleControls>
        }
      >
        <div >
          <MyTeamCards />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <MyTeamList rows={myTeamList} />
              <ModulePagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="lg:col-span-4">
              <MemberCard />
              <TeamAlertsCard />
            </div>
          </div>
        </div>
      </ModulePageLayout>
    </>
  );
}
export default MyTeamsModulePage;




