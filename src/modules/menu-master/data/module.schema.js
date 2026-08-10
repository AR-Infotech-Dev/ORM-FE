import { buildFallbackColumnsFromKeys } from "../../../utils/moduleStructure";
import {
  Accessibility,
  BriefcaseBusiness,
  Building2,
  ContactRound,
  FileText,
  Folder,
  Gauge,
  LayoutGrid,
  Mail,
  Map,
  MenuSquare,
  NotepadText,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Workflow,
} from "lucide-react";
import { z } from "zod";

export const ICONS = {
  Accessibility,
  BriefcaseBusiness,
  Building2,
  ContactRound,
  FileText,
  Folder,
  Gauge,
  LayoutGrid,
  Mail,
  Map,
  MenuSquare,
  NotepadText,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Workflow,
};

const FIXED_TABLE_COLUMNS = [
  { key: "select", className: "check-col", checkbox: true, width: 42, minWidth: 42, resizable: false },
];

export const menuMasterSchema = {
  title: "Menu Master",
  description: "Create and manage menus, modules, sidebar routes and dynamic system links.",
  menu_id: 3,
  primaryKey: "menu_id",
  api: {
    list: "/menus",
    delete: "/menus/changestatus",
    create: "/menus/create",
    edit: "/menus",
    definitions: "/system/getDefinations",
    definitionsFallback: "/system/getstructure",
  },

  definitionRequest: {
    menuIDField: "menu_id",
    modelNameField: "model_name",
    modelName: "menu",
  },

  staticJoined: [
    {
      field: "parent_id",
      fieldtype: "joined",
      joinedTable: "menu",
      select: "menu_id,menu_name",
      labelKey: "menu_name",
      primaryKey: "menu_id",
      slug: "",
      options: [],
    },
    {
      field: "parent_menu",
      fieldtype: "joined",
      joinedTable: "menu_master",
      select: "menu_id,menu_name",
      labelKey: "menu_name",
      primaryKey: "menu_id",
      slug: "",
      options: [],
    },




  ],
  defaultColumns: [
    "menu_name",
    "module_name",
    "menu_link",
    "status",
  ],
  skipFields: [],
  tableCellConfig: [],
  columnMappings: [],
  savedFilters: [],
  form: {
    initialValues: {
      menu_id: null,
      is_parent: "n",
      only_link:"n",
      parent_id: null,
      menu_name: "",
      module_name: "",
      module_description: "",
      menu_link: "",
      table_name: "",
      label: null,
      plural_label: null,
      icon_name: null,
      menuIndex: null,
      status: "active",
    },
    sections: [
      {
        columns: 3,
        fields: [
          {
            name: "menu_name",
            label: "Menu Name",
            type: "text",
            placeholder: "Ex: Users",
            required: true,
            gridSpan: 4,
          },
          {
            name: "module_name",
            label: "Module Name",
            type: "text",
            placeholder: "Ex: users",
            required: true,
            gridSpan: 4,
          },

          {
            name: "module_description",
            label: "Description",
            type: "text",
            gridSpan: 4,
            placeholder: "Enter description",
          },
          {
            name: "is_parent",
            label: "Is Parent",
            type: "radio",
            gridSpan: 4,
            required: true,
            options: [
              {
                label: "Yes",
                value: "y",
              },
              {
                label: "No",
                value: "n",
              },
            ],
          },
           {
            name: "only_link",
            label: "Is only link",
            type: "radio",
            gridSpan: 4,
            required: true,
            options: [
              {
                label: "Yes",
                value: "y",
              },
              {
                label: "No",
                value: "n",
              },
            ],
          },
          
          {
            name: "parent_id",
            label: "Parent Menu",
            type: "smartSelect",
            required: true,
            id: "menu_id",
            gridSpan: 4,
            visibleWhen: (values) => values.is_parent === "n",
            config: {
              apiUrl: "/system/searchList",
              tableName: "menu_master",
              selectFields: "menu_name ,menu_id" ,
              searchField: "roleName",
              labelKey: "menu_name",
              valueKey: "menu_id",
              placeholder: "Select Menu",
              multi: false
            }
          },
          {
            name: "status",
            label: "Status",
            type: "radio",
            gridSpan: 4,
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
         
        ],
      },
      {
        columns: 3,
        fields: [
          {
            name: "table_name",
            label: "Table Name",
            type: "text",
            placeholder: "Ex: admin",
            gridSpan: 4,
            visibleWhen: (values) => values.only_link === "n",
          },
          {
            name: "label",
            label: "Form Label",
            type: "text",
            placeholder: "Ex: User",
            gridSpan: 4,
            visibleWhen: (values) => values.only_link === "n",
          },
          {
            name: "plural_label",
            label: "Plural Label",
            type: "text",
            placeholder: "Ex: Users",
            gridSpan: 4,
            visibleWhen: (values) => values.only_link === "n",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            name: "menu_link",
            label: "Menu Link",
            type: "text",
            placeholder: "Ex: users",
            gridSpan: 4,
            visibleWhen: (values) => values.only_link === "n"
          },
        ]
      },

      {
        columns: 1,
        fields: [
          {
            name: "icon_name",
            label: "Menu Icon",
            type: "iconPicker",
            gridSpan: 12,
            visibleWhen: (values) => values.is_parent === "n",
            options: [
              "Gauge",
              "Ticket",
              "MenuSquare",
              "ContactRound",
              "Users",
              "LayoutGrid",
              "Map",
              "Building2",
              "ShieldCheck",
              "FileText",
              "BriefcaseBusiness",
              "Workflow",
              "Sparkles",
              "Mail",
              "NotepadText",
              "Accessibility",
            ],
          },
        ],
      },

    ],
  },

  // validationSchema: z.object({
  //   module_name: z.string().min(1, "Module name is required"),
  //   menu_name: z.string().min(1, "Menu name is required"),
  //   menu_link: z.string().min(1, "Menu link is required"),
  //   table_name: z.string().min(1, "Table name is required"),
  // }),
  validationSchema: z.object({
    is_parent: z.enum(["y", "n"]),
    only_link: z.enum(["y", "n"]),
    menu_name: z.string().optional(),
    module_name: z.string().optional(),
    parent_id: z.any().optional(),
    menu_link: z.string().nullable().optional(),
    module_description: z.string().optional().nullable(),
    icon_name: z.string().nullable().optional(),
    table_name: z.string().nullable().optional(),

  })
    .superRefine((data, ctx) => {

      // Menu Name
      if (!data.menu_name?.trim()) {
        ctx.addIssue({
          path: ["menu_name"],
          message: "Menu Name is required",
        });
      }

      // Module Name
      if (!data.module_name?.trim()) {
        ctx.addIssue({
          path: ["module_name"],
          message: "Module Name is required",
        });
      }

      // Description
      if (!data.module_description?.trim()) {
        ctx.addIssue({
          path: ["module_description"],
          message: "Description is required",
        });
      }


      if (data.is_parent === "n") {

        if (!data.parent_id) {
          ctx.addIssue({
            path: ["parent_id"],
            message: "Parent Menu is required",
          });
        }

        if (data.is_parent === "n") {
          if (!data.menu_link?.trim()) {
            ctx.addIssue({
              path: ["menu_link"],
              message: "Menu Link is required",
            });
          }
        }

        if (!data.icon_name) {
          ctx.addIssue({
            path: ["icon_name"],
            message: "Icon is required",
          });
        }
      }
    })



};

export const menuMasterFallbackColumns = [
  ...FIXED_TABLE_COLUMNS,
  ...buildFallbackColumnsFromKeys(
    menuMasterSchema.defaultColumns,
    {
      columnMappings:
        menuMasterSchema.columnMappings,
      tableCellConfig:
        menuMasterSchema.tableCellConfig,
    }
  ),
];
