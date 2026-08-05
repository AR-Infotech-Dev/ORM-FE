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
    // { column_name: "category_id" },
    { column_name: "unit" },
    { column_name: "sale_price" },
    { column_name: "status", type: "tag" },



  ],
  defaultColumns: ["product_id", "product_name", "product_type", "sku", "category_id", "unit", "sale_price", "status",],
  skipFields: ["company_id", "created_by", "created_date", "modified_by", "modified_date"],
  columnMappings: [
    { product_id: "Product ID" },
    { product_name: "Product Name" },
    { product_type: "Product Type" },
    { product_description: "Description" },
    { sku: "SKU" },
    // { category_id: "Category" },
    { unit: "Unit" },
    { sale_price: "Sale Price" },
    { status: "Status" },
  ],
  savedFilters: [],
  form: {
    initialValues: {
      product_name: "",
      product_type: "",
      sku: "",
      unit: "",
      // category_id: "",
      sale_price: "",
      status: "active",
      product_description: "",
     

      company_id: null,
      created_by: null,
      created_date: null,
      modified_by: null,
      modified_date: null,

    },
    sections: [
      {
        columns: 2,
        fields: [
          { name: "product_name", label: "Product Name", type: "text", required: true, placeholder: "Enter product name", gridSpan: 6 },
          {
            name: "product_type",
            label: "Product Type",
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
        ],
      },
      {
        columns: 2,
        fields: [
          // {
          //   name: "category_id",
          //   label: "Category",
          //   type: "smartSelect",
          //   // required: true,
          //   id: "category-id",
          //   gridSpan: 6,
          //   config: {
          //     apiUrl: "/system/searchSlugList",
          //     tableName: "categories",
          //     selectFields: "category_id,categoryName",
          //     searchField: "categoryName",
          //     slug: "product-category",
          //     // status: "active",
          //     labelKey: "categoryName",
          //     valueKey: "category_id",
          //     placeholder: "Select Category",
          //     multi: false,
          //   },
          // },
          {
            name: "unit",
            label: "Unit",
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
          { name: "sku", label: "SKU", type: "text", required: false, placeholder: "Enter SKU", gridSpan: 4 },
          { name: "sale_price", label: "Sale Price", type: "number", required: false, placeholder: "Enter sale price", gridSpan: 4 },
          {
            name: "status", label: "Status", type: "select",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
            placeholder: "Select status",
            gridSpan: 4,
          }

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
    // category_id: z.coerce.number({ message: "Category is required", }),
    product_description: z.union([z.literal(null), z.string()]).optional(),
    sku: z.union([z.literal(""), z.string()]).optional(),
    sale_price: z.union([z.literal(""), z.coerce.number()]).optional(),
    company_id: z.any().optional(),
     status: z.enum(["active", "inactive"]),
  }),
};

export const productsFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(productsModuleSchema.defaultColumns, {
    columnMappings: productsModuleSchema.columnMappings,
    tableCellConfig: productsModuleSchema.tableCellConfig,
  }),
];