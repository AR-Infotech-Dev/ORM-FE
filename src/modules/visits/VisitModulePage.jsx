import { useEffect, useState } from "react";

import { useAppSelector, useModuleFilters } from "../../store/hooks";
import { getNextSortConfig } from "../../utils/sorting";

import ModuleControls from "../shared/ModuleControls";
import ModulePageLayout from "../shared/ModulePageLayout";
import ModulePagination from "../shared/ModulePagination";

import DynamicFilter from "../../components/dynamic-filter";
import ResizableTable from "../../components/table/ResizableTable";
import useMenuPermissions from "@auth/utils/useMenuPermissions";

import { selectVisitsRows } from "./data/visits.slice";

import VisitForm from "./components/VisitForm";
import VisitTableRow from "./components/VisitTableRow";

import { visitsModuleSchema } from "./data/module.schema";
import { useVisitsModule } from "./hooks/useVisitsModule";
import { useVisitsTableConfig } from "./hooks/useVisitsTableConfig";

function VisitModulePage({ menu_id }) {
  const resolvedMenuID = menu_id || visitsModuleSchema.menu_id || null;

  const permissions = useMenuPermissions(resolvedMenuID);

  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const visitList = useAppSelector(selectVisitsRows);

  const {
    filterState,
    setSearchText,
    applyFilterPayload,
    setSort,
    clearFilters,
  } = useModuleFilters("visits", visitList);

  const {
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
  } = useVisitsModule({ filterState });

  const {
    sortConfig,
    resolvedColumns,
    defaultVisibleColumnKeys,
    resolvedFilterFields,
  } = useVisitsTableConfig({
    resolvedMenuID,
    filterState,
  });

  useEffect(() => {
    getVisitList();
  }, [
    page,
    filterState.searchText,
    filterState.order,
    filterState.order_by,
    JSON.stringify(filterState.filters),
  ]);

  useEffect(() => {
    if (page !== 1) {
      handlePageChange(1);
    }
  }, [
    filterState.searchText,
    filterState.order,
    filterState.order_by,
    JSON.stringify(filterState.filters),
  ]);
  return (
    <>
      <ModulePageLayout
        title={visitsModuleSchema.title}
        description={visitsModuleSchema.description}
        controls={
          <ModuleControls
            canCreate={permissions.canAdd}
            canDelete={permissions.canDelete}
            loading={loading}
            onRefresh={getVisitList}
            onCreate={() => {
              setSelectedVisit(null);
              setIsFlyoutOpen(true);
            }}
            onDeleteSelected={handleDeleteSelected}
            showDelete={selectedRowIds.length > 0}
            deleteDisabled={
              deleting ||
              loading ||
              selectedRowIds.length === 0
            }
            deleting={deleting}
            createLabel="Add Visit"
            filter={
              <DynamicFilter
                filterState={filterState}
                fields={resolvedFilterFields}
                savedFilters={visitsModuleSchema.savedFilters}
                onSearch={setSearchText}
                onApplyFilters={applyFilterPayload}
                onSaveFilter={() => { }}
                onDeleteFilter={() => { }}
                onSelectSavedFilter={() => { }}
                onClearFilters={clearFilters}
              />
            }
          />
        }
        table={
          <ResizableTable
            loading={loading}
            menuId={resolvedMenuID}
            columns={resolvedColumns}
            rows={visitList}
            storageKey="visits-module-column-widths"
            defaultVisibleColumnKeys={defaultVisibleColumnKeys}
            sortConfig={sortConfig}
            onSortChange={(columnKey) => {
              const nextSort = getNextSortConfig(
                sortConfig,
                columnKey
              );

              if (page !== 1) {
                handlePageChange(1);
              }

              setSort({
                order_by: nextSort.key,
                order: nextSort.direction.toUpperCase(),
              });
            }}
            editRow={
              permissions.canEdit
                ? (visit) => {
                  setSelectedVisit(visit);
                  setIsFlyoutOpen(true);
                }
                : undefined
            }
            onDeleteRow={
              permissions.canDelete
                ? handleDeleteRow
                : undefined
            }
            allowSelection={permissions.canDelete}
            selectedRowIds={selectedRowIds}
            onToggleRow={handleToggleRow}
            onToggleAllRows={handleToggleAllRows}
            renderRow={(row, index, columns, table) => (
              <VisitTableRow
                row={row}
                index={index}
                columns={columns}
                table={table}
              />
            )}
          />
        }
        footer={
          <ModulePagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        }
      />

      <VisitForm
        isOpen={isFlyoutOpen}
        onClose={() => {
          setIsFlyoutOpen(false);
          setSelectedVisit(null);
        }}
        selectedVisit={selectedVisit}
        onAfterSave={getVisitList}
        menu_id={resolvedMenuID}
      />
    </>
  );
}

export default VisitModulePage;