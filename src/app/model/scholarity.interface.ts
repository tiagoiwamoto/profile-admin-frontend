import {AbstractImageInterface} from "./abstract_image.interface";

export interface ScholarityInterface extends AbstractImageInterface{

  schoolName?: string;
  courseName?: string;
  titleReceivedCourse?: string;
  duration?: number;
  startDate?: Date;
  dateOfConclusion?: Date;

}
