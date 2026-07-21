import { z } from "zod";
import { buildFallbackColumnsFromKeys } from "../../../utils/moduleStructure";

const FIXED_TABLE_COLUMNS = [
  { key: "select", className: "check-col", checkbox: true, width: 42, minWidth: 42, resizable: false },
];

export const DealersModuleSchema = {
  title: "Dealers",
  description: "Manage Dealer names, Dealer types, and descriptions from one place.",
  menu_id: null,
  primaryKey: "dealer_id",
  api: {
    list: "/dealers",
    delete: "/dealers/delete",
    create: "/dealers/create",
    edit: "/dealers",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },
  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "Dealers",
  },
  staticJoined: [],
  tableCellConfig: [

  ],
  defaultColumns: ["name","assigned_salesman"],
  skipFields: ["company_id"],
  columnMappings: [
    { dealer_name: "Name" },
    {assigned_salesman: "Assigned Salesman"}
  ],
  savedFilters: [],
  form: {
    initialValues: {
      dealer_id: null,
      company_id: null,
      name: null,
      code: null,
      mobile: null,
      email: null,
      gstin: null,
      credit_limit: null,
      status: " ",
      assigned_salesman: null
    },
    sections: [
      {
        columns: 2,
        fields: [
          { name: "name", label: "Dealer name", type: "text", placeholder: "Enter Dealer name", gridSpan: 12 },
        ],
      },
      {
        columns: 2,
        fields: [
          { name: "code", label: "Dealer code", type: "value", required: true, placeholder: "", gridSpan: 6 },
          { name: "mobile", label: "Mobile no", type: "value", required: true, placeholder: "Enter mobile number", gridSpan: 6 },

        ],
      },
      {
        columns: 2,
        fields: [
          { name: "email", label: "Email", type: "text", placeholder: "Enter your Email", gridSpan: 6 },
          { name: "gstin", label: "GST NO", type: "text", placeholder: "Enter your GST NO", gridSpan: 6 }
        ]
      },
      {
        columns: 2,
        fields: [
          { name: "credit_limit", label: "Credit limit", type: "value", placeholder: "", gridSpan: 6 },
          {
            name: "status",
            label: "Status",
            type: "radio",
            options: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
        ]
      },
      {
        columns: 2,
        fields: [
          {
            name: "assigned_salesman",
            label: "Assigned by",
            type: "smartSelect",
            required: true,
            id: "adminID",
            config: {
              apiUrl: "/system/searchList",
              tableName: "admin",
              selectFields: "adminID,name",
              searchField: "name",
              labelKey: "name",
              valueKey: "adminID",
              placeholder: "Select Salsman",
              multi: false
            }
          },
        ]

      }

    ],
  },
  validationSchema: z.object({
    name: z.preprocess((value) => (value == null ? "" : String(value)), z.string().trim().min(1, "Dealer/Service name is required")),
    code: z.preprocess((value) => (value == null ? "" : String(value)), z.string().trim().min(1, "Dealer code is required")),
    // mobile: z.preprocess((value) => (value == null ? "" : String(value)), z.string().trim().min(1, "Mobile number is required").regex(/^[6-9]\d{9}$/, "Invalid mobile number")),
    mobile: z.preprocess((value) => (value == null ? "" : String(value).trim()), z.string().refine((value) => value === "" || /^[6-9]\d{9}$/.test(value), { message: "Invalid mobile number", })),
    email: z.preprocess((value) => (value == null ? "" : String(value)), z.string().trim().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")),
    // email: z.preprocess( (value) => (value == null ? "" : String(value)), z .string() .trim() .min(1, "Email is required") .email("Invalid email address") ),
    // gstin: z.preprocess((value) => (value == null ? "" : String(value).toUpperCase()), z.string().trim().min(1, "GSTIN is required").regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN")),
   gstin: z.preprocess( (value) => (value == null ? "" : String(value).toUpperCase()), z.string() .trim() .min(1, "GSTIN is required") ),
    // gstin: z.preprocess( (value) => { if (value == null || value === "") return undefined; return String(value).toUpperCase(); }, z.string() .regex( /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN" ) .optional() ),
    credit_limit: z.preprocess((value) => (value == null ? "" : String(value)), z.string().trim().min(1, "Credit limit is required").regex(/^\d+$/, "Invalid credit limit"))
  }),
};

export const DealersFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(DealersModuleSchema.defaultColumns, {
    columnMappings: DealersModuleSchema.columnMappings,
    tableCellConfig: DealersModuleSchema.tableCellConfig,
  }),
];
