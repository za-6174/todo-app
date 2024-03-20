import { toast } from 'react-toastify';

export const showSuccessToast = (message) => {
    toast.success(message, { position: "bottom-right" });
};

export const showErrorToast = (error) => {
    toast.error(error, { position: "bottom-right" });
};