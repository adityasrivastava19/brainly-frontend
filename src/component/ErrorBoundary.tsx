import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught render error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold">Something went wrong.</h2>
                    <p>Please refresh the page and try again.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
