import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import { fetchMemberDetails } from "../data/myTeams.slice";

function MyTeamAccordion({
  row = {},
  level = 0,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleMemberClick = (userID) => { dispatch(fetchMemberDetails(userID)); };

  return (
    <>
      <div className={`grid grid-cols-[2.2fr_1fr_1fr_1fr_1.4fr] items-center px-4 py-2 hover:bg-slate-50${level !== 0 ? "" : "border border-zinc-100 shadow-xs"} bg-white text-xs`}>
        <div
          className="flex items-center gap-3 text-center cursor-pointer"
          style={{ paddingLeft: `${level * 20}px` }}
          onClick={() => handleMemberClick(row.adminID)}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center">
            {(row.children?.length ?? 0) > 0 ? (
              isOpen ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )
            ) : (
              <span className="w-3" />
            )}
          </button>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 shrink-0">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{row.name}</span>
            <span className="text-xs text-gray-500">{row.roleID}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <span className={`inline-flex items-center justify-center min-h-[18px] whitespace-nowrap rounded-sm border px-2.5 text-[8px] font-medium ${row.status?.trim().toLowerCase() === "active"
            ? "border-green-200 bg-green-100 text-green-600"
            : "border-red-200 bg-red-100 text-red-600"
            }`}>{row.status}</span>
        </div>
        <div className="text-center">{row.directReports ?? 0}</div>
        <div className="text-center">{row.dealers ?? 0}</div>
        <div className="text-center font-semibold">{row.orderValue ?? "₹0"}</div>
      </div>
      {/* Children */}
      {isOpen && row.children?.length > 0 && (
        <div>
          {row.children.map((child) => (
            <MyTeamAccordion
              key={child.adminID}
              row={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default MyTeamAccordion;