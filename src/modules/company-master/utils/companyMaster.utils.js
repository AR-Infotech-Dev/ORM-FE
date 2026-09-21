import { API_SERVER_URL } from "@/api/config";
import { companyMasterSchema } from "../data/module.schema";

export const getCompanyIdentifier = (company = {}) =>
  company?.company_id;

export const getLogoUrl = (logo = "") => {
  if (!logo) return "";
  if (/^https?:\/\//i.test(logo)) return logo;

  return `${API_SERVER_URL}${
    String(logo).startsWith("/") ? logo : `/${logo}`
  }`;
};

export const getLogoPathFromResponse = (response = {}) =>
  response?.data?.company_logo ||
  response?.data?.data?.company_logo ||
  response?.data?.logo ||
  response?.data?.data?.logo ||
  response?.data?.path ||
  response?.data?.data?.path ||
  response?.data?.url ||
  response?.data?.data?.url ||
  response?.company_logo ||
  response?.logo ||
  response?.path ||
  response?.url ||
  "";

export const normalizeCompanyData = (company = {}) => {
  return {
    ...companyMasterSchema.form.initialValues,
    ...company,

    company_id: company?.company_id ?? null,
    company_name: company?.company_name || "",
    legal_name: company?.legal_name || "",
    email: company?.email || "",
    mobile_number: company?.mobile_number || "",
    gstin: company?.gstin || "",
    company_logo: company?.company_logo || "",
    order_prefix: company?.order_prefix || "",
    next_order_number: company?.next_order_number || "",
    order_number_format: company?.order_number_format || "",
    financial_year: company?.financial_year || "",
    date_format: company?.date_format || "",
    default_currency: company?.default_currency || "",
    default_payment_term: company?.default_payment_term || "",
    order_validity_days: company?.order_validity_days || "",
    terms_condition: company?.terms_condition || "",

    tax_name: company?.tax_name || "",
    tax_code: company?.tax_code || "",
    gst_rate: company?.gst_rate || "",
    cgst_rate: company?.cgst_rate || "",
    sgst_rate: company?.sgst_rate || "",
    igst_rate: company?.igst_rate || "",
    hsn_sac_code: company?.hsn_sac_code || "",
    effective_from: company?.effective_from || "",
    tax_status: company?.tax_status || "active",
  };
};
  