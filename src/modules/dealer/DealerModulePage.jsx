import { useEffect, useState } from "react";

import { useAppSelector, useModuleFilters } from "../../store/hooks";
import { getNextSortConfig } from "../../utils/sorting";

import ModuleControls from "../shared/ModuleControls";
import ModulePageLayout from "../shared/ModulePageLayout";
import ModulePagination from "../shared/ModulePagination";

import DynamicFilter from "../../components/dynamic-filter";
import ResizableTable from "../../components/table/ResizableTable";
import useMenuPermissions from "@auth/utils/useMenuPermissions";
import { selectDealersRows } from "./data/dealer.slice";

import DealerForm from "./components/DealerForm";
import DealerTableRow from "./components/DealerTableRow";
import { DealersModuleSchema } from "./data/module.schema";
import { useDealersModule } from "./hooks/useDealerModule";
import { useDealersTableConfig } from "./hooks/useDealerTableConfig";

function DealerModulePage({ menu_id }) {
  const resolvedMenuID = menu_id || DealersModuleSchema.menu_id || null;
  const permissions = useMenuPermissions(resolvedMenuID);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);


  const DealerList = useAppSelector(selectDealersRows);
  const { filterState, setSearchText, applyFilterPayload, setSort, clearFilters } = useModuleFilters(
    "Dealers",
    DealerList
  );
  const {
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
  } = useDealersModule({ filterState });
  const {
    sortConfig,
    resolvedColumns,
    defaultVisibleColumnKeys,
    resolvedFilterFields,
  } = useDealersTableConfig({ resolvedMenuID, filterState });

  useEffect(() => {
    getDealerList();
  }, [page, filterState.searchText, filterState.order, filterState.order_by, JSON.stringify(filterState.filters)]);

  useEffect(() => {
    if (page !== 1) {
      handlePageChange(1);
    }
  }, [filterState.searchText, filterState.order, filterState.order_by, JSON.stringify(filterState.filters)]);

  return (
    <>
      <ModulePageLayout
        title={DealersModuleSchema.title}
        description={DealersModuleSchema.description}
        controls={
          <ModuleControls
            canCreate={permissions.canAdd}
            canDelete={permissions.canDelete}
            loading={loading}
            onRefresh={getDealerList}
            onCreate={() => {
              setSelectedDealer(null);
              setIsFlyoutOpen(true);
            }}
            onDeleteSelected={handleDeleteSelected}
            showDelete={selectedRowIds.length > 0}
            deleteDisabled={deleting || loading || selectedRowIds.length === 0}
            deleting={deleting}
            createLabel="Add Dealer"
            filter={
              <DynamicFilter
                filterState={filterState}
                fields={resolvedFilterFields}
                savedFilters={DealersModuleSchema.savedFilters}
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
            rows={DealerList}
            storageKey="Dealers-module-column-widths"
            defaultVisibleColumnKeys={defaultVisibleColumnKeys}
            sortConfig={sortConfig}
            onSortChange={(columnKey) => {
              const nextSort = getNextSortConfig(sortConfig, columnKey);
              if (page !== 1) {
                handlePageChange(1);
              }
              setSort({
                order_by: nextSort.key,
                order: nextSort.direction.toUpperCase(),
              });
            }}
            editRow={permissions.canEdit ? (Dealer) => {
              
              
              setSelectedDealer(Dealer);
              setIsFlyoutOpen(true);
            } : undefined}
            onDeleteRow={permissions.canDelete ? handleDeleteRow : undefined}
            allowSelection={permissions.canDelete}
            selectedRowIds={selectedRowIds}
            onToggleRow={handleToggleRow}
            onToggleAllRows={handleToggleAllRows}
            renderRow={(row, index, columns, table) => (
              <DealerTableRow
                row={row}
                index={index}
                columns={columns}
                table={table}
              />
            )}
          />
        }
        footer={<ModulePagination pagination={pagination} onPageChange={handlePageChange} />}
      />

      <DealerForm
        isOpen={isFlyoutOpen}
        onClose={() => {
          setIsFlyoutOpen(false);
          setSelectedDealer(null);
        }}
        selectedDealer={selectedDealer}
        onAfterSave={getDealerList}
        menu_id={resolvedMenuID}
      />
    </>
  );
}

export default DealerModulePage;
