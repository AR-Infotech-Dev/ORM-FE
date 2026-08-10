import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { companyMasterSchema } from "../data/module.schema";

import {
  getCompanyDetails,
  removeCompanyLogo,
  saveCompany,
  uploadCompanyLogo,
} from "../data/companyMaster.service";

import {
  getCompanyIdentifier,
  getLogoPathFromResponse,
  normalizeCompanyData,
} from "../utils/companyMaster.utils";

export const useCompanyMasterForm = ({ isOpen, onClose, selectedCompany, onAfterSave }) => {
  const [loading, setLoading] = useState(false);
  // const [testingConnection, setTestingConnection] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [fetchingCompany, setFetchingCompany] = useState(false);
  const [formData, setFormData] = useState(companyMasterSchema.form.initialValues);
  const [errors, setErrors] = useState({});

  const mode = selectedCompany ? "edit" : "create";
  const companyId = getCompanyIdentifier(selectedCompany);
  // const connectionEmailBadge = getEmailConnectionBadge(formData.mail_connection_status);
  // const connectionDBBadge = getDBConnectionBadge(formData.db_status);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!isOpen || !companyId) return;

      try {
        setFetchingCompany(true);
        const res = await getCompanyDetails(companyId);
        setFormData(normalizeCompanyData(res?.data || selectedCompany));
      } catch (error) {
        toast.error("Unable to fetch company details");
        setFormData(normalizeCompanyData(selectedCompany));
      } finally {
        setFetchingCompany(false);
      }
    };

    if (selectedCompany && isOpen) {
      fetchCompanyDetails();
      return;
    }

    setFormData(companyMasterSchema.form.initialValues);
    setErrors({});
  }, [selectedCompany, isOpen, companyId]);

  const handleClose = () => {
    setFormData(companyMasterSchema.form.initialValues);
    setErrors({});
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      toast.error("Please select image file only.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo size should be less than 2MB.");
      return;
    }

    try {
      setUploadingLogo(true);
      const res = await uploadCompanyLogo({ companyId, file });

      if (!res.success) {
        toast.error(res.message || "Unable to upload company logo.");
        return;
      }

      const logoPath = getLogoPathFromResponse(res);

      setFormData((current) => ({
        ...current,
        company_logo: logoPath || current.company_logo,
      }));

      toast.success(res.message || "Company logo uploaded successfully.");

      if (companyId) {
        onAfterSave?.();
      }
    } catch (error) {
      toast.error(error.message || "Unable to upload company logo.");
    } finally {
      setUploadingLogo(false);
    }
  };
  const handleRemoveLogo = async () => {
    try {
      setUploadingLogo(true);
      const res = await removeCompanyLogo(companyId);

      if (!res.success) {
        toast.error(res.message || "Unable to remove company logo.");
        return;
      }

      setFormData((current) => ({
        ...current,
        company_logo: "",
      }));
      toast.success(res.message || "Company logo removed successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to remove company logo.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const validatePayload = (payload) => {
    const result = companyMasterSchema.validationSchema.safeParse(payload);

    console.log("VALIDATION RESULT =", result);

    if (result.success) {
      setErrors({});
      return true;
    }

    console.log("VALIDATION ERRORS =", result.error.issues);

    const nextErrors = {};

    result.error.issues.forEach((issue) => {
      nextErrors[issue.path[0]] = issue.message;
    });

    setErrors(nextErrors);
    return false;
  };

  const handleSave = async () => {
  console.log("========== SAVE CLICKED ==========");
  console.log("FORM DATA =", formData);

  const payload = { ...formData };

  if (!validatePayload(payload)) {
    console.log("VALIDATION FAILED");
    return;
  }

  console.log("VALIDATION PASSED");
  console.log("PAYLOAD =", payload);

  console.log("BEFORE API CALL");

  try {
    setLoading(true);

    const res = await saveCompany({
      mode,
      companyId,
      payload,
    });
      console.log("AFTER API CALL");
    console.log("API RESPONSE =", res);

      if (res.success) {
        toast.success(
          res.message ||
          `Company ${mode === "create" ? "created" : "updated"} successfully`
        );

        setFormData(companyMasterSchema.form.initialValues);
        onClose();
        onAfterSave?.();
        return;
      }

      toast.error(res.message || "Something went wrong");
    } catch (error) {
      console.log("SAVE ERROR =", error);
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // const handleTestEmailConnection = async () => {
  //   const payload = {
  //     ...formData,
  //     status: formData.status || "active",
  //   };

  //   if (!validatePayload(payload)) return;

  //   try {
  //     setTestingConnection(true);
  //     const res = await testCompanyMailConnection({
  //       company_id: formData.company_id || companyId || null,
  //       company_name: formData.company_name,
  //       sender_name: formData.sender_name,
  //       sender_email: formData.sender_email,
  //       mail_provider: formData.mail_provider,
  //       ...buildMailConfigPayload(formData),
  //       email_app_password: formData.email_app_password,
  //     });

  //     if (res.success) {
  //       toast.success(res.message || "SMTP connection successful");
  //       setFormData((current) => ({
  //         ...current,
  //         mail_connection_status: "connected",
  //         mail_last_tested_at: res?.data?.mail_last_tested_at || new Date().toISOString(),
  //       }));
  //       return;
  //     }

  //     toast.error(res.message || "SMTP connection failed");
  //     setFormData((current) => ({
  //       ...current,
  //       mail_connection_status: "failed",
  //     }));
  //   } catch (error) {
  //     toast.error(error.message || "SMTP connection failed");
  //     setFormData((current) => ({
  //       ...current,
  //       mail_connection_status: "failed",
  //     }));
  //   } finally {
  //     setTestingConnection(false);
  //   }
  // };
  return {
    companyId,
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
  };
};