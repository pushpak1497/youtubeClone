class ApiResponse {
  constructor(message = "Success", data, statusCode) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
