import { productsModuleSchema } from "../data/module.schema";

export function getProductIdentifier(product = {}) {
  return product?.product_id || product?.id;
}

export function normalizeProductData(product = {}) {
  return {
    ...productsModuleSchema.form.initialValues,
    ...product,
    product_name: product?.product_name || product?.productName || product?.name || null,
    product_type: product?.product_type || null,
    product_description: product?.product_description || null,
    sku: product?.sku || null,
    // category_id: product?.category_id || "",
    unit: product?.unit || null,
    mrp: product?.mrp || null,
    sale_price: product?.sale_price || null,
    tax_rate: product?.tax_rate || null,

    company_id: product?.company_id || null,
  };
}

export function normalizeProductSavePayload(formData = {}) {
  const payload = {
    product_name: formData.product_name ??"",
    product_type: formData.product_type ??"",
    product_description: formData.product_description ??"",
    sku: formData.sku ??"",
    category_id: formData.category_id ??"",
    unit: formData.unit ??"",
    mrp: formData.mrp ??"",
    sale_price: formData.sale_price ??"",
    tax_rate: formData.tax_rate ??"",
  };

  if (formData.product_id) payload.product_id = formData.product_id;
  if (formData.company_id) payload.company_id = formData.company_id;

  return payload;
}
