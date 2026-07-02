import intro from "./intro";
import leaders from "./leaders";
import news from "./news";
import newsCatalog from "./news-catalog";
import platform from "./platform";
import portfolio from "./portfolio";
import services from "./services";
import team from "./team";
import technologies from "./technologies";
import caseSliders from "./case-sliders";

export default function sections() {
  intro();
  leaders();
  platform();
  services();
  news();
  newsCatalog();
  portfolio();
  technologies();
  team();
  caseSliders();
}
