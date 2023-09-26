"use client";

import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";

import Breadcrumbs from "../Breadcrumbs";
import Timer from "./Timer";
import FullScreen from "./FullScreen";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDevelop } from "@/store/store";
import axios from "axios";
import Link from "next/link";
import ProblemList from "./ProblemList";

const mockData = [
  {
    id: 1,
    title: "שאלה במטריצות",
    difficulty: "קשה",
    status: "FINISH",
  },
  {
    id: 6,
    title: "אי רציפות",
    difficulty: "קל",
    status: "BEGIN",
  },
  {
    id: 24,
    title: "משפט לופיטל",
    difficulty: "בינוני",
    status: "STUCK",
  },
];

const TopBar = () => {
  const pathname = usePathname().split("/");
  const course = pathname[2];
  const chapter = pathname[3];
  const problemId = pathname[4];
  const { development } = useDevelop();

  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ["topbar", course, chapter],
    queryFn: async () => {
      if (development) return null;
      const query = `/api/getTopBar?course=${course}&chapter=${chapter}&problemId=${problemId}`;
      const { data } = await axios.get(query);
      return data;
    },
  });

  return (
    <section>
      <div className="text-center mx-auto rounded px-12 my-5">
        <div className="flex justify-between gap-2 rounded bg-gradient-to-b from-body to-theme-light px-8  dark:from-darkmode-body dark:to-darkmode-theme-light">
          <div className="container-left-top-bar">
            {data ? (
              <Link href={data.prevLink}>
                <BiSolidChevronLeftCircle size={23} className="ml-1" />
              </Link>
            ) : (
              <BiSolidChevronLeftCircle size={23} className="ml-1" />
            )}
            <ProblemList />

            {/* <div className="rounded hover:bg-gray-400 bg-gray-400">
              {data ? (
                <button onClick={()=>openSelect(data)}>
                  <BsList />
                </button>
              ) : (
                <button onClick={()=>openSelect(mockData)}>
                  <BsList />
                </button>
              )}
            </div> */}
            {data ? (
              <Link href={data.nextLink}>
                <BiSolidChevronRightCircle size={23} className="mr-1 ml-4" />
              </Link>
            ) : (
              <BiSolidChevronRightCircle size={23} className="mr-1 ml-4" />
            )}
          </div>
          <Breadcrumbs />
          <div className="container-right-top-bar">
            <Timer />
            <FullScreen />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
