import { ReactElement } from "react";
import { BarChart2, Search, FilePlus, Users } from "react-feather";

type AppLink = {
  id: number;
  text: string;
  path: string;
  icon: ReactElement;
  reload?: boolean; // test
};

// this will be relative to nested (parent) route
const links: AppLink[] = [
  { id: 1, text: "stats", path: "stats", icon: <BarChart2 size={32} /> },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <Search size={32} />,
    reload: true,
  },
  { id: 3, text: "add job", path: "./", icon: <FilePlus size={32} /> },
  { id: 4, text: "profile", path: "profile", icon: <Users size={32} /> },
  { id: 5, text: "admin", path: "admin", icon: <Users size={32} /> },
];

export default links;
