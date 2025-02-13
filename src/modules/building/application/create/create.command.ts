import { CreateBuildingRequestBody } from './create.request-body';

export class CreateBuildingCommand {
  constructor(public readonly body: CreateBuildingRequestBody) {}
}
