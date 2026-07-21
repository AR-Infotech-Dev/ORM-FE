import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DealersModuleSchema } from "../data/module.schema";
import { getDealerDetails, saveDealer } from "../data/dealer.service";
import {
  getDealerIdentifier,
  normalizeDealerData,
  normalizeDealerSavePayload,
} from "../utils/dealer.utils";

export function useDealerForm({ isOpen, onClose, selectedDealer, onAfterSave }) {
  const [loading, setLoading] = useState(false);
  const [fetchingDealer, setFetchingDealer] = useState(false);
  const [formData, setFormData] = useState(DealersModuleSchema.form.initialValues);
  const [errors, setErrors] = useState({});

  const mode = selectedDealer ? "edit" : "create";
  const dealerId = getDealerIdentifier(selectedDealer);

  useEffect(() => {
    const fetchDealerDetails = async () => {
      if (!isOpen || !dealerId) return;

      try {
        setFetchingDealer(true);
        const res = await getDealerDetails(dealerId);
        setFormData(normalizeDealerData(res?.data || selectedDealer));
      } catch (error) {
        toast.error("Unable to fetch Dealer details");
        setFormData(normalizeDealerData(selectedDealer));
      } finally {
        setFetchingDealer(false);
      }
    };

    if (selectedDealer && isOpen) {
      fetchDealerDetails();
      return;
    }

    setFormData(DealersModuleSchema.form.initialValues);
    setErrors({});
  }, [selectedDealer, isOpen, dealerId]);

  const handleClose = () => {
    setFormData(DealersModuleSchema.form.initialValues);
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

  const handleSave = async () => {
    const payload = normalizeDealerSavePayload(formData);
    const result = DealersModuleSchema.validationSchema.safeParse(payload);

    if (!result.success) {
      const nextErrors = {};
      result.error.issues.forEach((issue) => {
        console.log(issue.path[0],' : ',issue.message);
        
        nextErrors[issue.path[0]] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      const res = await saveDealer({ mode, dealerId, payload });

      if (res.success) {
        toast.success(res?.message || `Dealer ${mode === "create" ? "created" : "updated"} successfully`);
        setFormData(DealersModuleSchema.form.initialValues);
        onClose();
        onAfterSave?.();
        return;
      }

      toast.error(res?.msg || res?.message || "Something went wrong");
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchingDealer,
    formData,
    errors,
    handleClose,
    handleChange,
    handleSave,
  };
}
