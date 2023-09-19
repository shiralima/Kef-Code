import React, { FC } from "react";
import { BsList } from "react-icons/bs";
import { Select, SelectItem } from "@nextui-org/react";

import { difficulties, statuses } from "../table/data/data";
import problemJson from "../table/data/tasks.json";
import { Task } from "../table/data/schema";

type problemListProps = {
  problemListData?: any
}

const ProblemList: FC<problemListProps> = ({ problemListData }) => {

  return (
    <>
      <Select
        label="רשימת שאלות"
        className="max-w-lg"
        isDisabled={!problemJson}
        selectorIcon={<BsList />}
        dir='rtl'
        classNames={{ label: "pr-7 pt-0.5" }}
      >
        {problemJson.map(({ difficulty, status, title, id }) => {
          return (
            <SelectItem
              key={id}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-sky-900"
            >
              <div className="items-center flex">
                {difficulties.map(({ value, label }) =>
                  value === difficulty ? label : null
                )}
                {statuses.map((statusItem) =>
                  status === statusItem.value ? (
                    <div title={statusItem.label}>
                      <statusItem.icon
                        key={statusItem.value}
                        className={`${difficulty === 'EASY' ? 'ml-9' : 'ml-5'}`}
                      />
                    </div>
                  ) : null
                )}
                <div className="ml-auto">
                  <div className="max-w-xs truncate">{title}</div>
                </div>
              </div>
            </SelectItem>
          )
        })}
      </Select>
    </>
  );
};
export default ProblemList;
