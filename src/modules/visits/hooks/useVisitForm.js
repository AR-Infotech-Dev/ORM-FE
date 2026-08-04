import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@auth/components/AuthProvider";
import { visitsModuleSchema } from "../data/module.schema";
import { getVisitDetails, saveVisit } from "../data/visits.service";

import {
  getVisitIdentifier,
  normalizeVisitData,
  normalizeVisitSavePayload,
} from "../utils/visits.utils";

export function useVisitForm({
  isOpen,
  onClose,
  selectedVisit,
  onAfterSave,
}) {
  const [loading, setLoading] = useState(false);
  const [fetchingVisit, setFetchingVisit] = useState(false);

  const [formData, setFormData] = useState(
    visitsModuleSchema.form.initialValues
  );

  const [errors, setErrors] = useState({});

  const mode = selectedVisit ? "edit" : "create";
  const visitId = getVisitIdentifier(selectedVisit);
  const { authSession } = useAuth();
  const loggedInUser = authSession?.user;
  user_id: loggedInUser?.adminID || "",
    useEffect(() => {
      const fetchVisitDetails = async () => {
        if (!isOpen || !visitId) return;

        try {
          setFetchingVisit(true);

          const res = await getVisitDetails(visitId);

          setFormData(
            normalizeVisitData(res?.data || selectedVisit)
          );
        } catch (error) {
          toast.error("Unable to fetch visit details");

          setFormData(
            normalizeVisitData(selectedVisit)
          );
        } finally {
          setFetchingVisit(false);
        }
      };

      if (selectedVisit && isOpen) {
        fetchVisitDetails();
        return;
      }

      setFormData(visitsModuleSchema.form.initialValues);
      setErrors({});
    }, [selectedVisit, isOpen, visitId]);

  const handleClose = () => {
    setFormData(visitsModuleSchema.form.initialValues);
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
    const payload = normalizeVisitSavePayload(formData);
    console.log("Form Data:", formData);
    console.log("Payload:", payload);
    console.log("VISIT PAYLOAD:", payload);
    const result =
      visitsModuleSchema.validationSchema.safeParse(payload);

    if (!result.success) {
      const nextErrors = {};

      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });

      setErrors(nextErrors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);

      const res = await saveVisit({
        mode,
        visitId,
        payload,
      });

      if (res.success) {
        toast.success(
          res?.message ||
          `Visit ${mode === "create"
            ? "created"
            : "updated"
          } successfully`
        );

        setFormData(
          visitsModuleSchema.form.initialValues
        );

        onClose();
        onAfterSave?.();

        return;
      }

      toast.error(
        res?.msg ||
        res?.message ||
        "Something went wrong"
      );
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchingVisit,
    formData,
    errors,
    handleClose,
    handleChange,
    handleSave,
  };
}