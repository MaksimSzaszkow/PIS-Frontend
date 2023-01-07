import {useState} from "react";

export function useApi() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return {
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        loading,
        setLoading
    }
}