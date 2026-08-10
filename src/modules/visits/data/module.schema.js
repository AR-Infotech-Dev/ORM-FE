import { readonly, z } from "zod";
import { buildFallbackColumnsFromKeys } from "../../../utils/moduleStructure";

const FIXED_TABLE_COLUMNS = [
  {
    key: "select",
    className: "check-col",
    checkbox: true,
    width: 42,
    minWidth: 42,
    resizable: false,
  },
];

export const visitsModuleSchema = {
  title: "Visits",
  description: "Manage dealer visits from one place.",
  menu_id: null,
  primaryKey: "visit_id",
  api: {
    list: "/visits",
    delete: "/visits/delete",
    create: "/visits/create",
    edit: "/visits",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },

  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "visits",
  },

  staticJoined: [],
  tableCellConfig: [
    {
      column_name: "dealer_id",
      type: "person",
    },
    {
      column_name: "visit_date",
      type: "date",
    },
    {
      column_name: "visit_status",
      type: "tag",
    },
    {
      column_name: "notes",
      type: "clip",
    },
  ],

  defaultColumns: [
    "dealer_id",
    "visit_date",
    "visit_status",
    "notes",
  ],

  skipFields: [
    "company_id",
    "created_by",
    "created_date",
    "modified_by",
    "modified_date",
  ],

  columnMappings: [
    { dealer_id: "Dealer", },
    {
      visit_date: "Visit Date",
    },
    {
      visit_status: "Visit Status",
    },
    {
      notes: "Notes",
    },
  ],

  savedFilters: [

  ],
  form: {
    initialValues: {
      visit_id: null,
      dealer_id: "",
      user_id: "",
      latitude: "",
      longitude: "",
      notes: "",
      visit_date: "",
      visit_status: "",
      company_id: null,
    },

    sections: [

      {
        columns: 2,
        fields: [
          {
            name: "dealer_id",
            label: "Dealer",
            type: "smartSelect",
            required: true,
            id: "dealer_id",
            config: {
              apiUrl: "/system/searchList",
              tableName: "dealers",
              selectFields: "name,dealer_id",
              searchField: "name",
              labelKey: "name",
              valueKey: "dealer_id",
              placeholder: "Select Dealer",
              multi: false,
            },
          },

          {
            name: "user_id",
            label: "User",
            type: "smartSelect",
            required: true,
            id: "adminID",
            config: {
              apiUrl: "/system/searchList",
              tableName: "admin",
              selectFields: "name,adminID",
              searchField: "name",
              labelKey: "name",
              valueKey: "adminID",
              placeholder: "Select User",
              multi: false,
            },

          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            name: "visit_date",
            label: "Visit Date",
            type: "date",
            required: true,
            gridSpan: 6,
          },
          {
            name: "visit_status",
            label: "Visit Status",
            type: "select",
            required: true,
            placeholder: "Select Visit Status",
            gridSpan: 6,
            options: [
              { label: "Scheduled", value: "scheduled" },
              { label: "Visited", value: "visited" },
            ],
          }
        ],
      },

      {
        columns: 2,
        fields: [
          {
            name: "latitude",
            label: "Latitude",
            type: "text",
            placeholder: "Latitude",
            gridSpan: 6,
            visibleWhen: (values) => values.visit_status === "visited"
          },
          {
            name: "longitude",
            label: "Longitude",
            type: "text",
            placeholder: "Longitude",
            gridSpan: 6,
            visibleWhen: (values) => values.visit_status === "visited"
          },
        ],
      },

      {
        columns: 1,
        fields: [
          {
            name: "notes",
            label: "Notes",
            type: "textarea",
            rows: 3,
            placeholder: "Enter Notes",
            gridSpan: 12,
          },
        ],
      },
    ],
  },

  validationSchema: z.object({
    dealer_id: z.any(),
    user_id: z.any().optional(),
    visit_date: z.string().min(1, "Visit Date is required"),
    visit_status: z.enum(
      ["scheduled", "visited"],
      "Please select a valid visit status"
    ),
    latitude: z.union([z.literal(null), z.string()]).optional(),
    longitude: z.union([z.literal(null), z.string()]).optional(),
    notes: z.union([z.literal(null), z.string()]).optional(),
    company_id: z.any().optional(),
  }),
};

export const visitsFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(visitsModuleSchema.defaultColumns, {
    columnMappings: visitsModuleSchema.columnMappings,
    tableCellConfig: visitsModuleSchema.tableCellConfig,
  }),
];