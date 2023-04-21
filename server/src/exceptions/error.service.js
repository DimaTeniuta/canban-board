class ErrorService {
  setError(message) {
    return {
      errorMessage: message,
    };
  }
}

const errorService = new ErrorService();
export default errorService;
