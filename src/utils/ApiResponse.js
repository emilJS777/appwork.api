const httpStatus = require('http-status');

class ApiResponse{
    constructor(obj) {
      this.statusCode = httpStatus.OK;
      this.success = true;
      this.obj = obj;

    }
  }
  
  module.exports = ApiResponse;