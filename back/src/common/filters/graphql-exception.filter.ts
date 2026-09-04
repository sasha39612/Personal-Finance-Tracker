import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphqlExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return exception;
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : exception,
    );

    return new GraphQLError('Internal server error.', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }
}
