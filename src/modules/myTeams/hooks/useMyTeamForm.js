import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getMyTeamIdentifier, normalizeUserData, generateCredentials } from "../utils/myTeams.utils";
import { getMyTeamDetails, saveMyTeamMember } from "../data/myTeams.service";
import { myTeamsModuleSchema } from "../data/module.schema";

export const useMyTeamForm = ({ isOpen, onClose, onAfterSave, selectedUser }) => {
    const [loading, setLoading] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(false);
    const [formData, setFormData] = useState(myTeamsModuleSchema.form.initialValues);
    const [errors, setErrors] = useState({});
    const mode = selectedUser ? "edit" : "create";
    const userID = getMyTeamIdentifier(selectedUser);

    useEffect(() => {
        const fetchMyTeamDetails = async () => {
            if (!isOpen || !userID) { return; }
            try {
                setFetchingUser(true);
                const res = await getMyTeamDetails(userID)
                const userData = res?.data;
                setFormData(normalizeUserData(userData));
            } catch (error) {
                toast.error("Unable to fetch Team members details");
                setFormData(normalizeUserData(selectedUser));
            } finally {
                setFetchingUser(false);
            }
        };
        // EDIT MODE
        if (selectedUser && isOpen) { fetchMyTeamDetails(); return; }
        // CREATE MODE
        setFormData(myTeamsModuleSchema.form.initialValues);
    }, [selectedUser, isOpen, userID]);

    const handleClose = () => {
        setFormData(myTeamsModuleSchema.form.initialValues);
        setErrors({});
        onClose();
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        let nextData = {
            ...formData,
            [name]: value,
        };

        if ((name === "name" || name === "dateOfBirth") && nextData.name && nextData.dateOfBirth) {
            const credentials = generateCredentials(nextData.name, nextData.dateOfBirth);
            nextData = {
                ...nextData,
                ...credentials,
            };
        }

        setFormData(nextData);
    };
    const handleSave = async () => {
        const result = myTeamsModuleSchema.validationSchema.safeParse(formData);
        if (result.success == false) {
            const newErrors = {};
            result.error.issues.forEach((item) => {
                newErrors[item.path[0]] = item.message;
            });
            setErrors(newErrors);
            return;
        }
        try {
            setErrors({});
            setLoading(true);
            const res = await saveMyTeamMember({ mode, userID, formData });
            if (res.success) {
                toast.success(
                    res?.message ||
                    `Team member ${mode === "create" ? "created" : "updated"} successfully`
                );
                setFormData(myTeamsModuleSchema.form.initialValues);
                onClose();
                onAfterSave?.();
                return;
            }
            toast.error(res?.message || "Something went wrong");
        } catch (error) {
            toast.error(error.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        fetchingUser,
        formData,
        errors,
        handleClose,
        handleChange,
        handleSave,
    }
}
