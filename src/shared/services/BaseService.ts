import { sp } from '@pnp/sp/presets/all';
import { IApiResponse, IAppError } from '@models/index';
import { APP_CONSTANTS } from '@constants/index';

export abstract class BaseService {
  protected readonly timeout = APP_CONSTANTS.API.TIMEOUT;
  protected readonly retryAttempts = APP_CONSTANTS.API.RETRY_ATTEMPTS;

  protected async executeWithRetry<T>(
    operation: () => Promise<T>,
    attempts: number = this.retryAttempts
  ): Promise<IApiResponse<T>> {
    try {
      const data = await operation();
      return {
        data,
        success: true,
        timestamp: new Date()
      };
    } catch (error) {
      if (attempts > 1) {
        await this.delay(1000);
        return this.executeWithRetry(operation, attempts - 1);
      }
      
      return {
        data: null as T,
        success: false,
        error: this.formatError(error),
        timestamp: new Date()
      };
    }
  }

  protected formatError(error: any): string {
    if (error?.data?.responseBody?.error?.message) {
      return error.data.responseBody.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }

  protected delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected createAppError(message: string, code?: string, details?: any): IAppError {
    return {
      message,
      code,
      details,
      timestamp: new Date()
    };
  }
}
