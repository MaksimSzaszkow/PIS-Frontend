import {createContext, Dispatch, ReactNode, SetStateAction} from "react";
import {useApi} from "../hooks/useApi";

export const ApiContext = createContext<{
    successMessage: string | null,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    errorMessage: string | null,
    setErrorMessage: Dispatch<SetStateAction<string | null>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
}>({
    successMessage: null,
    setSuccessMessage: () => {
    },
    errorMessage: null,
    setErrorMessage: () => {
    },
    loading: false,
    setLoading: () => {
    }
});

export function ApiProvider({children}: { children: ReactNode }) {
    const api = useApi()

    return (
        <ApiContext.Provider value={{...api}}>{children}</ApiContext.Provider>
    );
}
