import {AbstractImageInterface} from "./abstract_image.interface";

export interface CertificationInterface extends AbstractImageInterface{
  name?: string;
  earnDate?: Date;
  validateUrl?: string;

}
