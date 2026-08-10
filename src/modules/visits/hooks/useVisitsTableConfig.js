import { toast } from "react-toastify";
import { useMemo, useState, useEffect } from "react";

import { defaultSortConfig } from "@utils/sorting";
import {
  getDefinitions,
  buildFilterFieldsFromStructure,
  buildTableColumnsFromStructure,
} from "@utils/moduleStructure";

import {
  visitsFallbackColumns,
  visitsModuleSchema,
} from "../data/module.schema";

export const useVisitsTableConfig = ({
  resolvedMenuID,
  filterState,
}) => {
  const [fields, setFields] = useState([]);

  const sortConfig = {
    key: filterState.order_by || defaultSortConfig.key,
    direction: String(
      filterState.order || defaultSortConfig.direction
    ).toLowerCase(),
  };

  const columnOptions = {
    skipFields: visitsModuleSchema.skipFields,
    columnMappings: visitsModuleSchema.columnMappings,
    tableCellConfig: visitsModuleSchema.tableCellConfig,
  };

  const resolvedColumns = useMemo(
    () =>
      buildTableColumnsFromStructure(
        fields,
        visitsFallbackColumns,
        columnOptions
      ),
    [fields]
  );

  const defaultVisibleColumnKeys = useMemo(
    () => visitsFallbackColumns.map((column) => column.key),
    []
  );

  const resolvedFilterFields = useMemo(
    () =>
      buildFilterFieldsFromStructure(
        fields,
        visitsModuleSchema.defaultColumns.map((key) => ({
          label:
            visitsFallbackColumns.find(
              (column) => column.key === key
            )?.label || key,
          value: key,
          type: "text",
        })),
        columnOptions
      ),
    [fields]
  );

  const getColumnList = async () => {
    try {
      if (!resolvedMenuID) {
        return;
      }

      const res = await getDefinitions(resolvedMenuID);

      if (!res) {
        toast.error("No response from server");
        return;
      }

      if (res?.success) {
        setFields(res.data || []);
        return;
      }

      setFields([]);

      toast.error(
        res?.message || "Error while fetching model fields"
      );
    } catch (error) {
      console.error("getColumnList Error:", error);
      setFields([]);
      toast.error("Error while fetching model fields");
    }
  };

  useEffect(() => {
    getColumnList();
  }, [resolvedMenuID]);

  return {
    sortConfig,
    resolvedColumns,
    defaultVisibleColumnKeys,
    resolvedFilterFields,
  };
};