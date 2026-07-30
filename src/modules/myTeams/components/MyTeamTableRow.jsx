import { isAmcActive } from "@utils/amc";

function MyTeamTableRow({
  row,
  index,
  columns,
  table,
  level = 0,
}) {
  const rowKey = table.getRowIdentifier(row) ?? row?.name ?? index;
  const activeAmc = isAmcActive(row);

  return (
    <>
      <tr
        key={rowKey}
        className={`group ${activeAmc ? "table-row-amc-active" : ""}`}
      >
        {columns.map((column) => (
          <td
            key={column.key}
            className={`${column.className || ""} ${column.isActionsColumn ? "table-actions-cell" : ""
              }`.trim()}
            style={table.getCellStyle(column)}
            onClick={table.getRowClick(column, row)}
          >
            {column.isActionsColumn ? (
              table.renderActionCell(row, index)
            ) : column.key === "name" ? (
              <div style={{ paddingLeft: `${level * 24}px` }}>
                {table.renderCell(column, row, index)}
              </div>
            ) : (
              table.renderCell(column, row, index)
            )}
          </td>
        ))}
        <td></td>
      </tr>

      {row.children?.map((child, childIndex) => (
        <MyTeamTableRow
          key={child.adminID}
          row={child}
          index={childIndex}
          columns={columns}
          table={table}
          level={level + 1}
        />
      ))}
    </>
  );
}
export default MyTeamTableRow;
