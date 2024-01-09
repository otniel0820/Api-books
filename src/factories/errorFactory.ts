
interface ErrorResponse {
    status: number;
    error: any
  }

  export const errorFactory = (options: any, status: number) => {
    console.log(options);
      const errorResponse: ErrorResponse = {
        status: status || 500,
        error: options || 'Unknown error'
      }
      
      return errorResponse
    
  }