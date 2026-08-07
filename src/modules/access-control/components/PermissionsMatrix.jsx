import { useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { accessPermissionColumns } from "../data/accessControlData";
import PermissionToggle from "./PermissionToggle";




function PermissionsEmptyState() {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-6 py-10">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-32 w-44 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
          <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
            <span className="text-4xl font-bold">ID</span>
          </div>
        </div>
        <h3 className="mt-6 text-lg font-semibold text-slate-700">Select User or Role</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Select a user or role from the sidebar to begin managing their specific permissions across the platform modules.
        </p>
      </div>
    </div>
  );
}

function PermissionsMatrix({
  modules,
  loadingMenus,
  selectedIdentity,
  loadingPermissions,
  onEnableAll,
  enableAllLabel = "Enable All",
  onConfigure,
  onPermissionChange,
}) {
  const [expandedModules, setExpandedModules] = useState([]);

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const parentModules = modules.filter(
    (m) => !m.parent_id || m.parent_id === 0
  );

  const moduleTree = parentModules.map((parent) => ({
    ...parent,
    children: modules.filter(
      (child) => child.parent_id === parent.menu_id
    ),
  }));
  return (
    <section className="min-w-0 border border-slate-200 bg-white flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-700">Module Permissions</h3>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          {loadingMenus && <span>Loading menus...</span>}
          {loadingPermissions && <span>Loading permissions...</span>}
          {selectedIdentity && (
            <>
              <span>Bulk Actions:</span>
              <button type="button" className="font-semibold text-blue-600 hover:text-blue-700" onClick={onEnableAll}>
                {enableAllLabel}
              </button>
            </>
          )}
        </div>
      </div>

      {!selectedIdentity ? (
        <PermissionsEmptyState />
      ) : loadingPermissions ? (
        <div className="flex min-h-[420px] items-center justify-center text-sm text-slate-500">
          Loading permissions...
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="min-w-[600px]">
            <div className="sticky top-0 z-10 grid grid-cols-[minmax(180px,1fr)_80px_80px_80px_80px_110px] border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <div>Module</div>
              {accessPermissionColumns.map((column) => (
                <div key={column.key} className="text-center">
                  {column.label}
                </div>
              ))}
              <div className="text-center">Advanced</div>
            </div>

            {moduleTree.map((module) => {
             const Icon = module.icon;
              return (
                <div key={module.id}>
                  <div
                    className="grid min-h-11 grid-cols-[minmax(180px,1fr)_80px_80px_80px_80px_110px] items-center border-b border-slate-100 px-4 text-xs text-slate-700 transition-all duration-300 ease-in-out hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-2 font-medium text-slate-800">

                      {module.children?.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => toggleModule(module.id)}
                          className="rounded p-1 text-slate-400 transition-all duration-300 hover:bg-slate-200 hover:text-gray-500"
                        >
                          {expandedModules.includes(module.id) ? (
                            <ChevronRight
                              size={15}
                              className={`transition-transform duration-300 ${expandedModules.includes(module.id) ? "rotate-90" : ""
                                }`}
                            />
                          ) : (
                            <ChevronRight
                              size={15}
                              className={`transition-transform duration-300 ${expandedModules.includes(module.id) ? "rotate-90" : ""
                                }`}
                            />
                          )}
                        </button>
                      ) : (
                        <span className="w-6" />
                      )}

                      <Icon size={15} className="shrink-0 text-slate-400" />
                      <span className="truncate">{module.name}</span>

                    </div>

                    {accessPermissionColumns.map((column) => {
                      const supported = Boolean(module.supports[column.key]);
                      const disabled =
                        !supported ||
                        (column.key !== "view" && !module.permissions.view);

                      return (
                        <div key={column.key} className="text-center">
                          {supported ? (
                            <PermissionToggle
                              checked={Boolean(module.permissions[column.key])}
                              disabled={disabled}
                              onChange={(nextValue) =>
                                onPermissionChange(module.id, column.key, nextValue)
                              }
                            />
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </div>
                      );
                    })}

                    <div className="text-center">
                      <button
                        type="button"
                        disabled={!module.permissions.view}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-300"
                        onClick={() => onConfigure(module.id)}
                      >
                        Configure
                      </button>
                    </div>
                  </div>


      {expandedModules.includes(module.id) &&
  module.children?.map((child) => {
    const ChildIcon = child.icon || Icon;

    return (
      <div
        key={child.id}
        className="grid min-h-11 grid-cols-[minmax(180px,1fr)_80px_80px_80px_80px_110px] items-center border-b border-slate-100 bg-slate-50 px-4 text-xs text-slate-700 hover:bg-slate-100"
      >
        <div className="flex items-center gap-2 pl-8">
          <ChildIcon
            size={15}
            className="shrink-0 text-slate-400"
          />

          <span>
            {child.name.includes("/")
              ? child.name.split("/").pop().trim()
              : child.name}
          </span>
        </div>

        {accessPermissionColumns.map((column) => {
          const supported = Boolean(child.supports?.[column.key]);
          const disabled =
            !supported ||
            (column.key !== "view" && !child.permissions?.view);

          return (
            <div key={column.key} className="text-center">
              {supported ? (
                <PermissionToggle
                  checked={Boolean(child.permissions?.[column.key])}
                  disabled={disabled}
                  onChange={(nextValue) =>
                    onPermissionChange(child.id, column.key, nextValue)
                  }
                />
              ) : (
                <span className="text-slate-300">-</span>
              )}
            </div>
          );
        })}

        <div className="text-center">
          <button
            type="button"
            disabled={!child.permissions?.view}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:text-slate-300"
            onClick={() => onConfigure(child.id)}
          >
            Configure
          </button>
        </div>
      </div>
    );
  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default PermissionsMatrix;
