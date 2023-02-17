import {SkillInterface} from "./skill.interface";
import {CertificationInterface} from "./certification.interface";
import {CourseCategoryInterface} from "./course_category.interface";
import {CourseInterface} from "./course.interface";
import {ExperienceInterface} from "./experience.interface";
import {ProfileInterface} from "./profile.interface";
import {ScholarityInterface} from "./scholarity.interface";
import {SoftwareInterface} from "./software.interface";
import {ProjectInterface} from "./project.interface";
import {CoursemetricInterface} from "./coursemetric.interface";

export interface HomeInterface{
  skills?: SkillInterface[];
  certifications?: CertificationInterface[];
  coursesCategories?: CourseCategoryInterface[];
  latestCourses?: CourseInterface[];
  experiences?: ExperienceInterface[];
  profiles?: ProfileInterface[];
  scholarities?: ScholarityInterface[];
  softwares?: SoftwareInterface[];
  projects?: ProjectInterface[];
  metrics?: CoursemetricInterface[];

}
