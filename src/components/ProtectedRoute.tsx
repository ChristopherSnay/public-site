import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const devModeEnabled = import.meta.env.MODE === 'development';

    if (!devModeEnabled) {
        return <Navigate to="/" replace />;
    } else {
        return children;
    }
}