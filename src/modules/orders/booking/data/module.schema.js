import { buildFallbackColumnsFromKeys } from "@utils/moduleStructure";
import { readonly, z } from "zod";

const FIXED_TABLE_COLUMNS = [
  { key: "select", className: "check-col", checkbox: true, width: 42, minWidth: 42, resizable: false },
  // { key: "favorite", className: "icon-col", width: 42, minWidth: 42, resizable: false },
];
export const ordersModuleSchema = {
  title: "Orders",
  description: "Manage orders here.",
  menu_id: 20,
  primaryKey: 'order_id',
  api: {
    list: "/orders",
    delete: "/orders/delete",
    create: "/orders/create",
    edit: "/orders",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },
  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "order",
  },
  staticJoined: [
    {
      field: "roleID",
      fieldtype: "joined",
      joinedTable: "order_role_master",
      select: "roleID,roleName",
      primaryKey: "roleID",
      labelKey: "roleName",
      slug: "",
      options: [],
    },
    {
      field: "default_company",
      fieldtype: "company",
      joinedTable: "company_master",
      select: "company_id,company_name",
      primaryKey: "company_id",
      labelKey: "company_name",
      slug: "",
      options: [],
    },
  ],
  defaultColumns: [],
  skipFields: [],
  tableCellConfig: [
    { column_name: "name", type: "person" },
    { column_name: "orderName", type: "person" },
    { column_name: "roleID", type: "tag" },
    { column_name: "order_status", type: "badge", color_field: "order_status_color" },
    // { column_name: "priority", type: "badge", color_field: "priority_color" },
    { column_name: "status", type: "badge", color_field: "status_color" },
  ],
  columnMappings: [
    { is_sys_order: "System Order" },
    { isEmailSend: "Verification Email Sent" },
    { contactNo: "Contact No" },
    { whatsappNo: "Whatsapp No" },
    { dateOfBirth: "Date Of Birth" },
    { lastLogin: "Last Login" },
    { company_id: "Assigned Company" },
    { orderName: "Order Name" },
    { roleID: "Order Role" },
    { is_approver: "Approval Privileges" },
    { otp: "OTP" },
  ],
  savedFilters: [],
  form: {
    initialValues: {
      order_id: null,
      dealer_id: null,
      sales_person: null,
      // dealer_name: null,
      // adminID: null,
      // userName: null,
      order_no: "",
      order_date: "",
      subtotal: 0,
      tax_amount: 0,
      total_amount: 0,
      company_id: null,
      // created_by: null,
      // created_date: null,
      // modified_by: null,
      // modified_date: null,
      order_status: "draft",
      status: "active",
    },
    sections: [
      {
        columns: 3,
        fields: [
          {
            name: "dealer_id",
            label: "Dealer Name",
            type: "smartSelectInput",
            required: true,
            id: "dealer_id",
            gridSpan: 12,
            readOnlyWhen: (values) => values.order_status !== "draft",
            // readOnlyWhen: (values) => Boolean(values.order_id),
            config: {
              type: "dealers",
              source: "dealers",
              list: "dealer_id,name,created_date,mobile,email",
              placeholder: "Select Dealer ",
              allowAddNew: true,
              multi: false,
              getValue: (item) => item.dealer_id,
              getLabel: (item) => item.name,
              placeholder: "Select Dealer",
              multi: false,
            },
          },
        ]
      },
      {
        columns: 3,
        fields: [
          { name: "order_date", label: "Order Date", type: "date", required: true, placeholder: "Order date", gridSpan: 12, },
        ]
      },
      // {
      //   columns: 3,
      //   fields: [
      //     { name: "expected_delivery_date", label: "Expected delivery Date", type: "date", required: true, placeholder: "Expected delivery date", gridSpan: 12 },
      //   ]
      // },
      // {
      //   columns: 3,
      //   fields: [
      //     { name: "order_week", label: "Order Week", type: "date", required: true, placeholder: "Order week", gridSpan: 12 },
      //   ],
      // },
      // {
      //   columns: 3,
      //   fields: [
      //     { name: "order_month", label: "Order Week", type: "date", required: true, placeholder: "Order month", gridSpan: 12 },
      //   ],
      // },
      // {
      //   columns: 3,
      //   fields: [
      //     {
      //       name: "priority",
      //       label: "Order Priority",
      //       type: "smartSelect",
      //       id: "priority",
      //       gridSpan: 12,
      //       config: {
      //         apiUrl: "/system/searchSlugList",
      //         tableName: "categories",
      //         selectFields: "category_id,categoryName,slug",
      //         searchField: "categoryName",
      //         labelKey: "categoryName",
      //         slug: 'order-priority',
      //         isCompanyWise: true,
      //         status: 'active',
      //         valueKey: "slug",
      //         placeholder: "Select Order Priority",
      //         multi: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   columns: 3,
      //   fields: [
      //     {
      //       name: "order_status",
      //       label: "Order Status",
      //       type: "smartSelect",
      //       id: "order_status",
      //       // readonly: false,
      //       gridSpan: 12,
      //       readOnlyWhen: (values) => values.order_status !== "draft",
      //       config: {
      //         apiUrl: "/system/searchSlugList",
      //         tableName: "categories",
      //         selectFields: "category_id,categoryName,slug",
      //         searchField: "categoryName",
      //         labelKey: "categoryName",
      //         slug: 'order-status',
      //         isCompanyWise: true,
      //         status: 'active',
      //         valueKey: "slug",
      //         placeholder: "Select order status",
      //         multi: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   columns: 1,
      //   fields: [
      //     {
      //       name: "adminID",
      //       label: "Users",
      //       type: "smartSelectInput",
      //       required: true,
      //       id: "adminID",
      //       gridSpan: 12,
      //       config: {
      //         apiUrl: "/system/searchAssignee",
      //         type: "adminID",
      //         source: "admin",
      //         list: "adminID,name,status",
      //         check: "name",
      //         getValue: (item) => item.adminID,
      //         getLabel: (item) => item.name || "Unnamed User",
      //         placeholder: "Select User",
      //         multi: false
      //       }
      //     },
      //   ]
      // },
      // {
      //   columns: 1,
      //   fields: [
      //     { gridSpan: 12, name: "remarks", label: "Remark", type: "textarea", placeholder: "Provide remark about the order...", rows: 1 },
      //   ]
      // },
    ],
  },
  validationSchema: z.object({
    dealer_id: z.coerce.number({ required_error: "Dealer is required", invalid_type_error: "Dealer is required", }).int("Invalid Dealer").positive("Dealer is required"),
    order_date: z.coerce.date().nullable()
      .refine((val) => val !== null, {
        message: "Order date is required",
      })
      .refine((val) => val && val <= new Date(), {
        message: "Order date cannot be in the future",
      }),
    // adminID: z.any().refine((value) => value !== "" && value !== null && value !== undefined, {
    //   message: "Role is required",
    // }),
  })
};

export const ordersFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(ordersModuleSchema.defaultColumns, {
    columnMappings: ordersModuleSchema.columnMappings,
    tableCellConfig: ordersModuleSchema.tableCellConfig,
  }),
];
export const productSmartSelectConfig = {
  type: "product",
  source: "products",
  label: "product",
  placeholder: "Select products",
  apiUrl: "",
  check: "product_name",
  list: "product_id,product_name,unit,sale_price,tax_rate",
  preload: true,
  cache: true,
  showRecent: true,
  multi: false,
  statusCheck: true,
  allowAddNew: false,
  customParameters: {},
  getValue: (product) => product.product_id,
  getLabel: (product) => {
    return product.product_name || "Unnamed product";
  },
};
