import { z } from "zod";
import { buildFallbackColumnsFromKeys } from "../../../utils/moduleStructure";

const FIXED_TABLE_COLUMNS = [
  { key: "select", className: "check-col", checkbox: true, width: 42, minWidth: 42, resizable: false },
];

export const productsModuleSchema = {
  title: "Products",
  description: "Manage product names, product types, and descriptions from one place.",
  menu_id: null,
  primaryKey: "product_id",
  api: {
    list: "/products",
    delete: "/products/delete",
    create: "/products/create",
    edit: "/products",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },
  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "products",
  },
  staticJoined: [],
  tableCellConfig: [
    { column_name: "product_id" },
    { column_name: "product_name", type: "person" },
    { column_name: "product_type" },
    { column_name: "product_description", },
    { column_name: "sku" },
    { column_name: "category_id" },
    { column_name: "unit" },
    { column_name: "mrp" },
    { column_name: "sale_price" },
    { column_name: "tax_rate" },

  ],
  defaultColumns: ["product_id", "product_name", "product_type", "product_description"],
  skipFields: ["company_id", "created_by", "created_date", "modified_by", "modified_date", "category_id"],
  columnMappings: [
    { product_id: "Product id" },
    { product_description: "Description" },
    { sku: "SKU" },
  ],
  savedFilters: [],
  form: {
    initialValues: {
      product_id: null,
      product_name: null,
      product_type: null,
      product_description: null,
      sku: null,
      unit: null,
      mrp: null,
      sale_price: null,
      tax_rate: null,

      company_id: null,
      created_by: null,
      created_date: null,
      modified_by: null,
      modified_date: null,
      status: "active",
    },
    sections: [
      {
        columns: 2,
        fields: [
          { name: "product_name", label: "Product/Service Name", type: "text", required: true, placeholder: "Enter product name", gridSpan: 12 },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            name: "product_type",
            label: "Product/Service Type",
            type: "smartSelect",
            required: true,
            id: "product_type",
            gridSpan: 6,
            config: {
              apiUrl: "/system/searchSlugList",
              tableName: "categories",
              selectFields: "category_id,categoryName",
              searchField: "categoryName",
              slug: 'product-types',
               status: 'active',
              labelKey: "categoryName",
              valueKey: "category_id",
              placeholder: "Select Product Type",
              multi: false,
            },
          },
          {
            name: "unit",
            label: "Product Units",
             type: "smartSelect",
            required: true,
            id: "product_unit",
            gridSpan: 6,
            config: {
              apiUrl: "/system/searchSlugList",
              tableName: "categories",
              selectFields: "category_id,categoryName",
              searchField: "categoryName",
              slug: 'product-units',
              status: 'active',
              labelKey: "categoryName",
              valueKey: "category_id",
              placeholder: "Select Product Unit",
              multi: false,
            },
          },
        
        ],
      },
      {
        columns: 2,
        fields: [
          { name: "sku", label: "SKU", type: "text", required: false, placeholder: "Enter SKU", gridSpan: 3 },
          { name: "mrp", label: "mrp", type: "text", required: false, placeholder: "Enter mrp", gridSpan: 3 },
          { name: "sale_price", label: "sale price", type: "text", required: false, placeholder: "Enter sale price", gridSpan: 3 },
          { name: "tax_rate", label: "tax rate", type: "text", required: false, placeholder: "Enter tax rate", gridSpan: 3 },
        ],
      },
      {
        columns: 1,
        fields: [
          { name: "product_description", label: "Description", type: "textarea", rows: 8, placeholder: "Enter product description", gridSpan: 12 },
        ],
      },
    ],
  },
  validationSchema: z.object({

    product_name: z.string().trim().min(1, "Product/Service name is required"),
    // product_type: z.string().min(1, "Product/Service type is required"),
    product_type: z.coerce.number().min(1, "Product/Service type is required"),
    unit: z.coerce.number().min(1, "Product unit is required"),

    product_description: z.union([z.literal(null), z.string()]).optional(),
    sku: z.union([z.literal(""), z.string()]).optional(),
    mrp: z.union([z.literal(""), z.coerce.number().min(0, "Number must be positive")]).optional(),
    sale_price: z.union([z.literal(""), z.coerce.number()]).optional(),
    tax_rate: z.union([z.literal(""), z.coerce.number()]).optional(),
    company_id: z.any().optional(),
  }),
};

export const productsFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(productsModuleSchema.defaultColumns, {
    columnMappings: productsModuleSchema.columnMappings,
    tableCellConfig: productsModuleSchema.tableCellConfig,
  }),
];
