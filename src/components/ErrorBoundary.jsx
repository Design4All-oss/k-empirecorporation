import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center text-center p-[100px]">
          <h1 className="font-display text-[2.5rem] mb-4">Une erreur s'est produite</h1>
          <pre className="text-accent mb-8 max-w-[600px] text-left text-xs whitespace-pre-wrap">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent px-6 py-3 rounded-lg text-primary font-bold cursor-pointer transition-opacity hover:opacity-90"
          >
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
