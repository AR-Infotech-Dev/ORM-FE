import { X } from "lucide-react";
import DynamicModuleForm from "@components/ui/DynamicModuleForm";
import ActionButton from "@components/ui/ActionButton";
import FlyoutPanel from "@components/ui/FlyoutPanel";
import Spinner from "@components/ui/Spinner";
import { useMyTeamForm } from "../hooks/useMyTeamForm";
import { myTeamsModuleSchema } from "../data/module.schema";

function MyTeamForm({ isOpen, onClose, selectedUser, onAfterSave, menu_id }) {
  if (!isOpen) {
    return null;
  }

  const {
    loading,
    fetchingUser,
    formData,
    errors,
    handleClose,
    handleChange,
    handleSave,
  } = useMyTeamForm({ isOpen, onClose, selectedUser, onAfterSave });


  return (
    <FlyoutPanel
      isOpen={isOpen}
      onClose={handleClose}
      title={selectedUser ? "Edit Team Member" : "Create Team Member"}
      panelClassName="!w-[640px] max-w-full"
      closeButton={
        <button className="flyout-close" onClick={handleClose} aria-label="Close panel">
          <X size={18} />
        </button>
      }
      footer={
        <ActionButton
          className={loading ? "bg-purple-200 cursor-not-allowed" : ""}
          disabled={loading}
          variant="flyoutPrimary"
          onClick={handleSave}
        >
          {loading || fetchingUser ? <Spinner /> : null} Save
        </ActionButton>
      }
    >
      <div className="flyout-form-shell px-4 py-3">
        <div className="ws-main-container">
          {fetchingUser ? (
            <div className="p-5 text-center">
              <Spinner />
            </div>
          ) : (
            <DynamicModuleForm
              sections={myTeamsModuleSchema.form.sections}
              values={formData}
              onChange={handleChange}
              errors={errors}
              menuId={menu_id}
            />
          )}
        </div>
      </div>
    </FlyoutPanel>
  );
}

export default MyTeamForm;
