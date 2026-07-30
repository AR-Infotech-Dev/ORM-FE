import MyTeamAccordion from "./MyTeamAccordion";

const MyTeamList = ({ rows = [] }) => {
    return (
        <div className="w-full overflow-hidden rounded-sm mb-2 border border-[#E5E7EB] bg-white">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr_1.4fr] items-center border-t border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2">
                <div className="text-[10px] font-semibold uppercase text-[#7E8391]">Member</div>
                <div className="text-center text-[10px] font-semibold uppercase text-[#7E8391]">Status</div>
                <div className="text-center text-[10px] font-semibold uppercase text-[#7E8391]">Direct Reports</div>
                <div className="text-center text-[10px] font-semibold uppercase text-[#7E8391]">Dealers</div>
                <div className="text-center text-[10px] font-semibold uppercase text-[#7E8391]">Order Value</div>
            </div>
            {/* ROOT MEMBERS */}
            {rows.map((row) => {
                return (
                    <MyTeamAccordion
                        key={row.adminID}
                        row={row}
                    />
                );
            })}
        </div>
    );
};
export default MyTeamList;