import { visitsModuleSchema } from "../data/module.schema";

export function getVisitIdentifier(visit = {}) {
  return visit?.visit_id || visit?.id;
}

export function normalizeVisitData(visit = {}) {
  return {
    ...visitsModuleSchema.form.initialValues,
    ...visit,

    visit_id: visit?.visit_id || null,
    dealer_id: visit?.dealer_id || "",
    user_id: visit?.user_id || "",
    latitude: visit?.latitude || "",
    longitude: visit?.longitude || "",
    notes: visit?.notes || "",
    visit_date: visit?.visit_date || "",
    visit_status: visit?.visit_status || "",
    company_id: visit?.company_id || null,
  };
}

export function normalizeVisitSavePayload(formData = {}) {
  const payload = {
    dealer_id:
  formData.dealer_id !== "" &&
  formData.dealer_id !== null &&
  formData.dealer_id !== undefined
    ? Number(formData.dealer_id)
    : null,
  user_id:
  formData.user_id !== "" &&
  formData.user_id !== null &&
  formData.user_id !== undefined
    ? Number(formData.user_id)
    : null,
    latitude: formData.latitude || null,
    longitude: formData.longitude || null,
    notes: formData.notes || null,
    visit_date: formData.visit_date,
   visit_status: formData.visit_status,
  };

  if (formData.visit_id) payload.visit_id = formData.visit_id;
  if (formData.company_id) payload.company_id = formData.company_id;

  return payload;
}