import {AbstractInterface} from "./abstract.interface";

export interface ResumeInterface extends AbstractInterface{

  title?: string;
  description?: string;
  language?: string;
  type?: string;
  url?: string;
  embed?: string;

}
