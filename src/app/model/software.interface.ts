import {AbstractImageInterface} from "./abstract_image.interface";

export interface SoftwareInterface extends AbstractImageInterface{

  name?: string;
  description?: string;
  url?: string;
  mirrorUrl?: string;

}
