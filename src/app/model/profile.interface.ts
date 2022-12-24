import {AbstractInterface} from "./abstract.interface";

export interface ProfileInterface extends AbstractInterface{
  name?: string;
  title?: string;
  subTitle?: string;
  email?: string;
  phone?: string;

  isActive?: boolean;
  description?: string;
}
