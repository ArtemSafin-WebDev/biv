import intro from "./intro";
import leaders from "./leaders";
import news from "./news";
import newsCatalog from "./news-catalog";
import newsDetail from "./news-detail";
import platform from "./platform";
import portfolio from "./portfolio";
import services from "./services";
import team from "./team";
import technologies from "./technologies";
import caseSliders from "./case-sliders";
import careerHero from "./career-hero";
import careerAbout from "./career-about";
import careerInterview from "./career-interview";
import careerOffices from "./career-offices";
import careerBlog from "./career-blog";
import careerStories from "./career-stories";

export default function sections() {
  intro();
  leaders();
  platform();
  services();
  news();
  newsCatalog();
  newsDetail();
  portfolio();
  technologies();
  team();
  caseSliders();
  careerHero();
  careerAbout();
  careerStories();
  careerInterview();
  careerOffices();
  careerBlog();
}
