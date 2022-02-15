import { Address } from './address.model';

import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Person extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public birthDate?: Date,
    public address?: Address
  ) {
    super();
  }

  static fromJson(jsonData: any): Person {
    return Object.assign(new Person(), jsonData);
  }
}
