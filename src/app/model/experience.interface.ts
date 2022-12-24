import {AbstractInterface} from "./abstract.interface";

export interface ExperienceInterface extends AbstractInterface{

  job?: string;
  company?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}
