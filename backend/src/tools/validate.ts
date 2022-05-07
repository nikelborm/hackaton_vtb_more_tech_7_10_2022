import { plainToInstance, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';

const validateConfig = {
  validationError: {
    target: false,
  },
  stopAtFirstError: true,
  whitelist: true,
  forbidNonWhitelisted: true,
};

export class BaseMessage<T> {
  @IsDefined()
  @IsObject()
  payload!: T;

  @IsDefined()
  @ValidateNested()
  @Type(() => BaseMessageReport)
  report!: BaseMessageReport;
}

export class BaseMessageReport {
  @IsBoolean()
  isOk!: boolean;

  @IsOptional()
  @IsPositive()
  code?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export function validate<P>(payload: P, payloadClass: { new (): P }) {
  const payloadInstance = plainToInstance(payloadClass, payload);
  return validateSync(payloadInstance as any, validateConfig);
}

export function validateWithBase<U>(
  entity: BaseMessage<U>,
  payloadClass: { new (): U },
) {
  const baseMessageInstance = plainToInstance(BaseMessage, entity);
  const baseErrors = validateSync(baseMessageInstance as any, validateConfig);

  const payloadErrors = validate(entity.payload, payloadClass);

  return [...baseErrors, ...payloadErrors];
}
