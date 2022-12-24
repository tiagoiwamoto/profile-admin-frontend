import {CourseCategoryInterface} from "./course_category.interface";
import {AbstractImageInterface} from "./abstract_image.interface";

export interface CourseInterface extends AbstractImageInterface{

  name?: string;
  school?: string;
  startDate?: Date;
  endDate?: Date;
  duration?: number;
  courseCategory?: CourseCategoryInterface;

}
