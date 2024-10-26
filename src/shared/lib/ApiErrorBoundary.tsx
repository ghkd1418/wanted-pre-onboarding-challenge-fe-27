import React from "react";

interface ApiErrorBoundaryState {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error: Error | null;
}

class ApiErrorBoundary extends React.Component<{}, ApiErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    // state 초기화
    this.state = {
      shouldHandleError: false,
      shouldRethrow: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ApiErrorBoundaryState {
    // 여기서 에러 상태 설정
    console.log("에러바운더리에서 잡은", error);
    if (error.message.includes("Network")) {
      return { shouldHandleError: true, shouldRethrow: false, error };
    }
    // 처리하지 못하는 에러일 경우
    return { shouldHandleError: false, shouldRethrow: true, error };
  }

  render() {
    if (this.state.shouldRethrow) {
      throw this.state.error; // 상위 에러 바운더리로 재던지기
    }

    if (this.state.shouldHandleError) {
      return (
        <div>api 에러바운더리</div>
        // 여기에서 API 에러 관련 UI를 표시할 수 있음
        // <NetworkError onClickRetry={() => this.setState({ shouldHandleError: false })} />
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;
