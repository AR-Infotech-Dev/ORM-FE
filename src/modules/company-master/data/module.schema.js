import { z } from "zod";
import { buildFallbackColumnsFromKeys } from "../../../utils/moduleStructure";
import { Building, Settings, ShoppingCart, Receipt } from "lucide-react";
const FIXED_TABLE_COLUMNS = [
  { key: "select", className: "check-col", checkbox: true, width: 42, minWidth: 42, resizable: false },
];

const DATE_FORMAT_OPTIONS = [
  { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
  { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

const TIME_FORMAT_OPTIONS = [
  { value: "12 Hours", label: "12 Hours" },
  { value: "24 Hours", label: "24 Hours" },
];

const MAIL_PROVIDER_OPTIONS = [
  { value: "gmail", label: "Gmail" },
  { value: "yahoo", label: "Yahoo" },
  { value: "outlook", label: "Outlook / Microsoft 365" },
  { value: "custom", label: "Custom SMTP" },
];

// const SMTP_ENCRYPTION_OPTIONS = [
//   { value: "tls", label: "TLS" },
//   { value: "ssl", label: "SSL" },
//   { value: "none", label: "None" },
// ];

export const companyMasterSchema = {
  title: "Company Master",
  description: "Manage company profile, contact emails, address details, and formatting preferences from one place.",
  menu_id: null,
  primaryKey: "company_id",
  api: {
    list: "/companies",
    delete: "/companies/delete",
    create: "/companies/create",
    edit: "/companies",
    // testMail: "/companies/mail-config/test",
    // testDB: "/companies/db-config/test",
    logoUpload: "/companies/logo",
    logoRemove: "/companies/:id/logo/remove",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },
  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "companyMaster",
  },
  staticJoined: [],
  tableCellConfig: [
    { column_name: "company_name", type: "person" },
    // { column_name: "email", type: "clip" },
    { column_name: "status", type: "badge" },
  ],
  defaultColumns: ["company_name",
    // "email",
    "mobile_number",
    "city",
    "status",],
  skipFields: ["created_by", "created_date", "modified_by", "modified_date"],
  columnMappings: [
    { company_logo: "Company Logo" },
    // { email: "Email" },
    { legal_name: "Legal Name" },
    { gstin: "GSTIN" },
  ],
  savedFilters: [],

  form: {
    initialValues: {
      initialValues: {
        company_id: null,
        company_name: null,
        legal_name: null,
        // email:null,
        sender_email: "",
        sender_name: "",
        cc_email: "",
        mail_provider: "gmail",
        email_app_password: "",
        mobile_number: null,
        company_address: null,
        company_logo: null,
        gstin: null,
        pan_number: null,
        date_format: "DD-MM-YYYY",
        time_format: "24 Hours",
        order_prefix: null,
        order_prefix_padding: null,
        order_include_year: "y",
        order_no_reset: "yearly",
        finacial_year: null,
        default_currency: null,
        order_validation: null,
        terms_and_conditions: null,
        // tax_code: null,
        // gst_rate: null,
        // cgst_rate: null,
        // sgst_rate: null,
        // igst_rate: null,
        // hsn_code: null,
        // status: "active",
      }
    },
    sections: [
      {
        title: "Company Details",
        icon: Building,
        columns: 3,
        fields: [
          { name: "company_name", label: "Company Name", type: "text", required: true, placeholder: "Enter Company Name", gridSpan: 6 },
          { name: "legal_name", label: "Legal Name", type: "text", required: true, placeholder: "Enter Legal Name", gridSpan: 6 },
        ]
      },
      {
        columns: 3,
        fields: [
          // { name: "email", label: "Email", type: "email", placeholder: "Enter Email", gridSpan: 6 },
          { name: "mobile_number", label: "Mobile Number", type: "text", placeholder: "Enter Mobile number", gridSpan: 6 },
        ]
      },
      {
        columns: 3,
        fields: [
          { name: "gstin", label: "GSTIN", type: "text", placeholder: "Enter GSTIN", gridSpan: 6 },
          { name: "pan_number", label: "PAN", type: "text", placeholder: "Pan Number", gridSpan: 6 },
        ]
      },
      {
        columns: 3,
        fields: [
          { name: "company_logo", label: "Company Logo", type: "file", accept: "image/*", gridSpan: 12 },
          { name: "company_address", label: "Company Address", type: "textarea", gridSpan: 12 },
        ]
      },
      {
        columns: 3,
        fields: [
          {
            name: "status", label: "Status", type: "radio", gridSpan: 12,
            options: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
        ],
      },
      {
        title: 'Application Settings',
        icon: Settings,
        columns: 4,
        fields: [
          { name: "mail_provider", label: "Mail Provider", type: "select", required: true, gridSpan: 4, options: MAIL_PROVIDER_OPTIONS },
          { name: "sender_email", label: "Sender Email", type: "email", required: true, placeholder: "Enter sender email", gridSpan: 4 },
          { name: "sender_name", label: "Sender Name", type: "text", placeholder: "Enter sender name", gridSpan: 4 },
          { name: "cc_email", label: "CC Email", type: "email", placeholder: "Enter CC email", gridSpan: 4 },
          { name: "email_app_password", label: "Email App Password", type: "password", placeholder: "Enter email app password", gridSpan: 4 },
        ],
      },
      {
        columns: 3,
        fields: [
          { name: "date_format", label: "Date Format", type: "select", gridSpan: 4, options: DATE_FORMAT_OPTIONS },
          { name: "time_format", label: "Time Format", type: "select", gridSpan: 4, options: TIME_FORMAT_OPTIONS },
        ],
      },
      {
        title: "Order Settings",
        icon: ShoppingCart,
        columns: 2,
        fields: [
          //   { name: "order_prefix", label: "Order Prefix", type: "text", required: true, placeholder: "e.g. ORD-", gridSpan: 6 },
          //   { name: "next_order_number", label: "Next Order Number", type: "number", required: true, placeholder: "e.g. 1001", gridSpan: 6 },
          // ]
          { name: "order_prefix", label: "Order Prefix", type: "text", placeholder: "ORD", required: true, gridSpan: 4 },
          { name: "order_prefix_padding", label: "Padding", type: "text", placeholder: "ORD", gridSpan: 4 },
          { name: "finacial_year", label: "Finacial Year", type: "text", required: true, placeholder: "e.g. 2026-27", gridSpan: 4 },
        ]
      },
      {
        columns: 2,
        fields: [
          { name: "order_include_year", label: "Include Date", type: "radio", options: [{ label: "Yes", value: "y" }, { label: "No", value: "n" },], gridSpan: 4 },
          { name: "order_no_reset", label: "Reset preference", type: "radio", options: [{ label: "Daily", value: "daily" }, { label: "Monthly", value: "monthly" }, { label: "Yearly", value: "yearly" },], gridSpan: 6 },
        ]
      },
    
      {
        columns: 2,
        fields: [
           {
            name: "default_currency", label: "Default Currency", type: "select", required: true, gridSpan: 4,
            options: [
              { value: "INR", label: "INR (₹)" },
              { value: "USD", label: "USD ($)" },
              { value: "EUR", label: "EUR (€)" },
            ],
          },
          { name: "default_payment_term", label: "Default Payment Term", type: "text", placeholder: "e.g. Net 30 Days", gridSpan: 4 },
          { name: "order_validation", label: "Order Validition (Days)", type: "number", placeholder: "e.g. 30", gridSpan: 4 },
        ],
      },
      {
        columns: 2,
        fields: [
          { name: "terms_and_conditions", label: "Terms & Conditions", type: "textarea", gridSpan: 12 },
        ]
      },


      // {
      //   title: "Tax / GST Settings",
      //   icon: Receipt,
      //   columns: 1,
      //   fields: [
      //     { name: "tax_name", label: "Tax Name", type: "text", placeholder: "Enter Tax Name", required: true, gridSpan: 6 },
      //     { name: "tax_code", label: "Tax Code", type: "text", placeholder: "Enter Tax Code", required: true, gridSpan: 6 },
      //   ]
      // },
      // {
      //   columns: 1,
      //   fields: [
      //     { name: "gst_rate", label: "GST Rate (%)", type: "number", placeholder: "GST Rate", gridSpan: 4 },
      //     { name: "cgst_rate", label: "CGST Rate (%)", type: "number", placeholder: "CGST Rate", gridSpan: 4 },
      //     { name: "sgst_rate", label: "SGST Rate (%)", type: "number", placeholder: "SGST Rate", gridSpan: 4 },

      //   ]
      // },

      // {
      //   columns: 1,
      //   fields: [
      //     { name: "igst_rate", label: "IGST Rate (%)", type: "number", placeholder: "IGST Rate", gridSpan: 4 },
      //     { name: "hsn_code", label: "HSN Code", type: "text", placeholder: "HSN Code", gridSpan: 4 },
      //     { name: "effective_from", label: "Effective From", type: "date", required: true, gridSpan: 4, },
      //   ]
      // },
      // {
      //   columns: 1,
      //   fields: [
      //     {
      //       name: "tax_status", label: "Status", type: "select", required: true, gridSpan: 4,
      //       options: [
      //         {
      //           value: "active",
      //           label: "Active",
      //         },
      //         {
      //           value: "inactive",
      //           label: "Inactive",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],

  },

  validationSchema: z.object({
    company_name: z
      .string()
      .trim()
      .min(1, "Company name is required"),

    legal_name: z.string().optional(),

    // email: z
    //   .union([
    //     z.literal(""),
    //     z.string().trim().email("Invalid email address"),
    //   ])
    //   .optional(),

    mobile_number: z.string().optional(),

    gstin: z.string().optional(),

    pan_number: z
      .union([
        z.literal(""),
        z.string().trim().regex(
          /^[A-Z]{5}[0-9]{4}[A-Z]$/,
          "Invalid PAN number"
        ),
      ])
      .optional(),

    company_logo: z.string().optional(),

    company_address: z.string().optional(),

    status: z.enum(["active", "inactive"]),

    mail_provider: z.enum(["gmail", "yahoo", "outlook", "custom"]),

    sender_email: z
      .union([
        z.literal(""),
        z.string().trim().email("Invalid sender email"),
      ])
      .optional(),

    sender_name: z.string().optional(),

    // cc_email: z
    //   .union([
    //     z.literal(""),
    //     z.string().trim().email("Invalid CC email"),
    //   ])
    //   .optional(),

    email_app_password: z.string().optional(),

    // smtp_host: z.string().optional(),

    // smtp_username: z.string().optional(),

    // smtp_port: z.string().optional(),

    // smtp_encryption: z.enum(["tls", "ssl", "none"]).optional(),

    // date_format: z.enum([
    //   "DD/MM/YYYY",
    //   "MM/DD/YYYY",
    //   "YYYY-MM-DD",
    // ]),

    time_format: z.enum([
      "12 Hours",
      "24 Hours",
    ]),

    // ================= Order Settings =================

    order_prefix: z
      .string()
      .trim()
      .min(1, "Ticket Prefix is required"),

    order_prefix_padding: z.string().optional(),

    finacial_year: z
      .string()
      .trim()
      .min(1, "Financial Year is required"),

    order_include_year: z.enum(["y", "n"]),

    order_no_reset: z.enum([
      "daily",
      "monthly",
      "yearly",
    ]),
    // ================= Order Settings =================

    // order_prefix: z.string().trim().min(1, "Order Prefix is required"),

    // next_order_number: z.union([z.string(), z.number()])
    //   .refine((val) => val !== "", {
    //     message: "Next Order Number is required",
    //   }),

    // order_number_format: z
    //   .string()
    //   .trim()
    //   .min(1, "Order Number Format is required"),

    // financial_year: z
    //   .string()
    //   .trim()
    //   .min(1, "Financial Year is required"),

    date_format: z.enum([
      "DD/MM/YYYY",
      "MM/DD/YYYY",
      "YYYY-MM-DD",
    ]),

    default_currency: z.enum([
      "INR",
      "USD",
      "EUR",
    ]),

    default_payment_term: z.string().optional(),

    order_validation: z.union([z.string(), z.number()]).optional(),

    terms_and_conditions: z.string().optional(),

    // ================= Tax / GST Settings =================

    // tax_name: z
    //   .string()
    //   .trim()
    //   .min(1, "Tax Name is required"),

    // tax_code: z
    //   .string()
    //   .trim()
    //   .min(1, "Tax Code is required"),

    // gst_rate: z
    //   .union([z.string(), z.number()])
    //   .refine((val) => val !== "", {
    //     message: "GST Rate is required",
    //   }),

    // cgst_rate: z
    //   .union([z.string(), z.number()])
    //   .refine((val) => val !== "", {
    //     message: "CGST Rate is required",
    //   }),

    // sgst_rate: z
    //   .union([z.string(), z.number()])
    //   .refine((val) => val !== "", {
    //     message: "SGST Rate is required",
    //   }),

    // igst_rate: z
    //   .union([z.string(), z.number()])
    //   .refine((val) => val !== "", {
    //     message: "IGST Rate is required",
    //   }),

    // hsn_code: z.string().optional(),

    // effective_from: z
    //   .string()
    //   .min(1, "Effective From Date is required"),

    // tax_status: z.enum(["active", "inactive"]),
  }),
};
export const companyMasterFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(companyMasterSchema.defaultColumns, {
    columnMappings: companyMasterSchema.columnMappings,
    tableCellConfig: companyMasterSchema.tableCellConfig,
  }),
];