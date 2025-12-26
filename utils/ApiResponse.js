class APiResponse {
  constructor(statusCode, success, message = "Success", data, meta) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
    this.meta = meta;
  }
}

export default APiResponse;
