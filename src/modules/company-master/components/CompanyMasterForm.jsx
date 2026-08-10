import { useRef } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

import FlyoutPanel from "../../../components/ui/FlyoutPanel";
import ActionButton from "../../../components/ui/ActionButton";
import Spinner from "../../../components/ui/Spinner";
import DynamicModuleForm from "../../../components/ui/DynamicModuleForm";
import { companyMasterSchema } from "../data/module.schema";
import { useCompanyMasterForm } from "../hooks/useCompanyMasterForm";
import { getLogoUrl } from "../utils/companyMaster.utils";

function CompanyMasterForm({
  isOpen,
  onClose,
  selectedCompany,
  onAfterSave,
  menu_id,
}) {
  const logoInputRef = useRef(null);

  const {
    loading,
    uploadingLogo,
    fetchingCompany,
    formData,
    errors,
    handleClose,
    handleChange,
    handleLogoUpload,
    handleRemoveLogo,
    handleSave,
  } = useCompanyMasterForm({
    isOpen,
    onClose,
    selectedCompany,
    onAfterSave,
  });

  if (!isOpen) {
    return null;
  }
  console.log("handleSave =", handleSave);

  return (
    <FlyoutPanel
      isOpen={isOpen}
      onClose={handleClose}
      title={selectedCompany ? "Edit Company" : "Create Company"}
      panelClassName="!w-[640px] max-w-full"
      closeButton={
        <button
          className="flyout-close"
          onClick={handleClose}
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      }
      footer={
        <div className="flex w-full items-center justify-end gap-3">
          <ActionButton
            disabled={loading || fetchingCompany}
            variant="flyoutSecondary"
            onClick={handleClose}
          >
            Cancel
          </ActionButton>

          <ActionButton
            onClick={() => {
              console.log("Save button clicked");
              handleSave();
            }}
          >
            Save
          </ActionButton>
        </div>
      }
    >
      <div className="flyout-form-shell">
        <div className="ws-main-container">
          {fetchingCompany ? (
            <div className="p-5 text-center">
              <Spinner />
            </div>
          ) : (
            <div className="rounded-sm bg-white px-4 py-3">
              {/* Company Logo */}
              <section className="company-logo-uploader">
                <div className="company-logo-preview">
                  {formData.company_logo ? (
                    <img
                      src={getLogoUrl(formData.company_logo)}
                      alt={`${formData.company_name || "Company"} logo`}
                    />
                  ) : (
                    <ImagePlus size={28} />
                  )}
                </div>

                <div className="company-logo-copy">
                  <h3>Company Logo</h3>
                  <p>
                    Upload company logo. It will be displayed in invoices and
                    reports.
                  </p>

                  {formData.company_logo ? (
                    <span>{formData.company_logo}</span>
                  ) : null}
                </div>

                <div className="company-logo-actions">
                  {!formData.company_logo ? (
                    <ActionButton
                      disabled={
                        uploadingLogo || loading || fetchingCompany
                      }
                      variant="ghostPrimary"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      {uploadingLogo ? (
                        <Spinner />
                      ) : (
                        <Upload size={15} />
                      )}
                      Upload Logo
                    </ActionButton>
                  ) : null}

                  {formData.company_logo ? (
                    <button
                      type="button"
                      className="company-logo-remove"
                      onClick={handleRemoveLogo}
                      disabled={uploadingLogo || loading}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                {/* <input
                  ref={logoInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                  onChange={handleLogoUpload}
                /> */}
              </section>

              {/* Dynamic Form */}
              <DynamicModuleForm
                sections={companyMasterSchema.form.sections}
                values={formData}
                onChange={handleChange}
                errors={errors}
                menuId={menu_id}
              />
            </div>
          )}
        </div>
      </div>
    </FlyoutPanel>
  );
}

export default CompanyMasterForm;