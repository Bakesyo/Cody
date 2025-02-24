class ErrorHandler {
    static init() {
        window.addEventListener('error', this.handleError);
        window.addEventListener('unhandledrejection', this.handlePromiseError);
    }

    static handleError(error) {
        console.error('Application error:', error);
        // Add error reporting service integration here
    }

    static handlePromiseError(event) {
        console.error('Unhandled promise rejection:', event.reason);
    }
}

ErrorHandler.init(); 