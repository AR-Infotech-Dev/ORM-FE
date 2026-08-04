import { DealersModuleSchema } from "../data/module.schema";

export function getDealerIdentifier(Dealer = {}) {
  return Dealer?.dealer_id || Dealer?.id;
}

export function normalizeDealerData(Dealer = {}) {
  return {
    ...DealersModuleSchema.form.initialValues,
    ...Dealer,
    Dealer_name: Dealer?.Dealer_name || Dealer?.DealerName || Dealer?.name || "",
    Dealer_type: Dealer?.Dealer_type || "",
    Dealer_description: Dealer?.Dealer_description || "",
    company_id: Dealer?.company_id || null,
  };
}

export function normalizeDealerSavePayload(formData = {}) {
  const payload = {
    name: formData.name || null,
    code: formData.code || null,
    mobile: formData.mobile || null,
    email: formData.email || null,
    gstin: formData.gstin || null,
    credit_limit: formData.credit_limit || null,
    assigned_salesman: formData.assigned_salesman || null,
    dealer_type: formData.dealer_type || null,
    pan_number: formData.pan_number || null,
   
    

    status: formData.status || null,
  };

  if (formData.dealer_id) payload.dealer_id = formData.dealer_id;
  if (formData.company_id) payload.company_id = formData.company_id;

  return payload;
}
