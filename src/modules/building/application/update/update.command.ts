import { UpdateBuildingRequestBody } from './update.request-body';

export class UpdateLocationCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateBuildingRequestBody,
  ) {}
}
