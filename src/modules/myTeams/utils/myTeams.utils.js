import { myTeamsModuleSchema } from "../data/module.schema";

export function buildJoinedOptions(joinConfig, selectedValue, selectedLabel) {
  const configuredOptions = (joinConfig?.options || []).map((option) => ({
    value: option.value ?? option[joinConfig.primaryKey],
    label: option.label ?? option[joinConfig.labelKey],
  }));

  if (selectedValue && !configuredOptions.some((option) => String(option.value) === String(selectedValue))) {
    return [
      ...configuredOptions,
      {
        value: selectedValue,
        label: selectedLabel || selectedValue,
      },
    ];
  }

  return configuredOptions;
}
export function getSelectedLabel(field, value, selectedUser) {
  if (!value) {
    return "";
  }

  if (field.name === "roleID") {
    return selectedUser?.roleName || selectedUser?.role_name || selectedUser?.roleID || value;
  }

  if (field.name === "default_company") {
    return selectedUser?.company_name || selectedUser?.default_company_name || selectedUser?.default_company || value;
  }

  if (field.name === "reporting_to_user_id") {
    return (
      selectedUser?.reporting_to_name ||
      selectedUser?.reporting_name ||
      selectedUser?.reportingToName ||
      value
    );
  }

  return value;
}
export function getMyTeamIdentifier(myTeam = {}) {
  return myTeam?.adminID;
}
export function normalizeUserData(selectedUser = {}) {
  return {
    ...myTeamsModuleSchema.form.initialValues,
    ...selectedUser,
    userName: selectedUser?.userName || selectedUser?.user_name || "",
    contactNo: selectedUser?.contactNo || selectedUser?.contactno || "",
    whatsappNo: selectedUser?.whatsappNo || selectedUser?.whatsappno || "",
    // dateOfBirth: selectedUser?.dateOfBirth || selectedUser?.dateofbirth || "",
    roleID: selectedUser?.roleID || selectedUser?.roleid || selectedUser?.roleId || "",
    default_company: selectedUser?.default_company || selectedUser?.company_id || "",

    reporting_to: selectedUser?.reporting_to || selectedUser?.reportingTo || "",

    is_approver: selectedUser?.is_approver || "no",
    time_zone: selectedUser?.time_zone || "Asia/Kolkata",
    google_location: selectedUser?.google_location || "",
    address: selectedUser?.address || "",
    status: selectedUser?.status || "active",
    dateOfBirth: selectedUser?.dateOfBirth
      ? new Date(selectedUser.dateOfBirth).toISOString().split("T")[0]
      : "",
  };
}
export const generateCredentials = (name, birthDate) => {
  const cleanName = name.trim().toLowerCase().replace(/\s+/g, "");

  const dob = new Date(birthDate);
  const day = String(dob.getDate()).padStart(2, "0");
  const month = String(dob.getMonth() + 1).padStart(2, "0");
  const year = dob.getFullYear();
  const username = cleanName.split("_")[0] + "@" + year;
  const password = cleanName.charAt(0).toUpperCase() + day + month + "@" + String(year).slice(-2);

  return {
    userName: username,
    password: password,

  };
};
