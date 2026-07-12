import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Section crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="card mx-auto my-4 max-w-md p-5 text-center text-sm text-plum/60">
            This part couldn't load. The rest of the page still works fine.
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
