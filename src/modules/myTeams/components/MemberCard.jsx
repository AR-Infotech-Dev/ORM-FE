import { useAppSelector } from "@store/hooks";
import { selectSelectedMember } from "../data/myTeams.slice";
import {
    User,
    Users,
    Store,
    FileText,
    IndianRupee,
    Target,
} from "lucide-react";

export default function MemberCard() {
    const member = useAppSelector(selectSelectedMember);
    const details = [
        {
            icon: Users,
            label: "Direct Reports",
            value: member?.directReports ?? 0,
            valueClass: "text-[#2A2B2F]",
        },
        {
            icon: Store,
            label: "Assigned Dealers",
            value: member?.dealers ?? 0,
            valueClass: "text-[#2A2B2F]",
        },
        {
            icon: FileText,
            label: "This Month Orders",
            value: member?.orderValue ?? "₹0",
            valueClass: "text-[#2A2B2F]",
        },
        {
            icon: IndianRupee,
            label: "This Month Collections",
            value: member?.collections ?? "₹0",
            valueClass: "text-[#2A2B2F]",
        },
        {
            icon: Target,
            label: "Target Progress",
            value: member?.target ?? "0%",
            valueClass: "text-[#469557]",
        },
    ];
    return (
        <div className="w-full rounded-md border border-[#E5E7EB] bg-white shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between  border-[#E5E7EB] px-5 py-1">
                <h3 className="text-sm leading-[21px] font-bold text-[#52586D]">Selected Member</h3>
                <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${member?.status?.toLowerCase() === "active"
                        ? "bg-[#E8F8EC] text-[#469557]"
                        : "bg-[#FDECEC] text-[#D32F2F]"
                        }`}>
                    {member?.status || "-"}
                </span>
            </div>
            {/* Profile */}
            <div className="flex items-center gap-4 px-5">
                <div className="flex w-[50px] h-[50px] items-center justify-center rounded-full bg-gray-200 border-2 border-[#E5E7EB]">
                    <User size={28} className="text-gray-500" />
                </div>
                <div>
                    <h4 className="text-[18px] font-bold text-[#2A2B2F]">
                        {member?.name || "-"}
                    </h4>
                    <p className="text-xs text-[#7E8391]">
                        {member?.roleName || "-"}
                    </p>
                </div>
            </div>
            {/* Reporting To */}
            <div className="mt-3 px-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={16} className="text-[#7E8391]" />
                        <span className="text-xs text-[#7E8391]">Reporting to</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-semibold text-[#2A2B2F]">
                            {member?.reporting_to_name || "-"}
                        </p>
                        <p className="text-xs text-[#919192]">
                            {member?.roleName || "-"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-1">
                <div className="w-[90%] border-t border-[#F3F4F6]"></div>
            </div>
            <div className="space-y-3 px-5 pb-2.5">
                {details.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Icon size={16} className="text-[#7E8391]" />
                                <span className="text-xs text-[#7E8391]">{item.label}</span>
                            </div>
                            <span className={`text-xs font-semibold ${item.valueClass}`}>{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}