import { getImagePath } from "@/lib/utils";
import { Blog } from "@/types/blog";

const getBlogData = (): Blog[] => [
  {
    id: 1,
    title: "OptiMind vs Traditional Comparison Sites",
    paragraph:
      "Discover why OptiMind's personalized, weighted approach beats one-size-fits-all comparison charts. You choose what matters, not us.",
    image: getImagePath("/images/blog/blog-01.jpg"),
    author: {
      name: "Alex Johnson",
      image: getImagePath("/images/blog/author-01.png"),
      designation: "Product Researcher",
    },
    tags: ["comparison"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Why OptiMind Beats Spreadsheets for Decision Making",
    paragraph:
      "No more formula errors or formatting headaches. OptiMind gives you spreadsheet power with an intuitive interface anyone can use.",
    image: getImagePath("/images/blog/blog-02.jpg"),
    author: {
      name: "Maria Garcia",
      image: getImagePath("/images/blog/author-02.png"),
      designation: "Decision Analyst",
    },
    tags: ["productivity"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "AI-Powered Shopping: The Future of Product Research",
    paragraph:
      "See how AI suggestions help you consider factors you might have missed. Make smarter purchases with OptiMind's intelligent recommendations.",
    image: getImagePath("/images/blog/blog-03.jpg"),
    author: {
      name: "David Chen",
      image: getImagePath("/images/blog/author-03.png"),
      designation: "AI Specialist",
    },
    tags: ["ai"],
    publishDate: "2025",
  },
];
export default getBlogData;
