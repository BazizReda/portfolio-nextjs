'use client'
import store from "@/store";
import { Provider } from "react-redux";
// Composant pour lier le store a l'application, il est utilise dans le layout principal
const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default StoreProvider;