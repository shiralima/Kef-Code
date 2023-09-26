import { create } from "zustand";

import { ColumnsNameEnum, JsonKeysEnum, ViewOptionEnum } from "@/types/enum";
import { Task as problemType } from "@/components/table/data/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface GenerationState {
  solutionState: String | null | any,
  setSolution: (solutionState: String | null) => void
}

export const useGenerationStore = create<GenerationState>()((set) => ({
  solutionState: null,
  setSolution: (solutionState: any) => set({ solutionState })
}))

interface GenerationStatee {
  page: number
  setPage: (solutionState: number) => void
}

export const useGenerationStoree = create<GenerationStatee>()((set) => ({
  page: 1,
  setPage: (page: number) => set({ page })
}))

export const useDevelop = create<any>()((set) => ({
  development: process.env.NODE_ENV === "development",
  setDevelop: (development: string) => set({ development })
}))

export type ColumnViewStateType = {
  columnName: string
  viewOption: ViewOptionEnum
}

interface TableViewState {
  columnsView: ColumnViewStateType[]
  setColumnsView: (viewState: ColumnViewStateType) => void
}

// Create default view for all the columns

const defaultTableViewOption =
  Object.values(ColumnsNameEnum).map((columnName) => {
    return (
      {
        columnName,
        viewOption: ViewOptionEnum.NO_SORTING
      }
    )
  })

export const useTableViewStore = create<TableViewState>()((set) => ({
  columnsView: defaultTableViewOption,

  setColumnsView: ({ columnName, viewOption: newView }: ColumnViewStateType) => {
    set(({ columnsView: prevColumnsView }) => {
      const updatedColumnsView = prevColumnsView.map((column) =>
        column.columnName === columnName ? { ...column, viewOption: newView } : column
      )
      localStorage.setItem(JsonKeysEnum.TABLE_VIEW, JSON.stringify(updatedColumnsView))
      return { columnsView: updatedColumnsView }
    })
  }
}))

interface problemsListState {
  problemsList: problemType | null
  setProblemList: (course: string, chapter: string) => void
}

// In the store we hold the problem list by course and chapter  
export const useProblemsStore = create<problemsListState>()((set) => ({
  problemsList: null,

  setProblemList: (chapter: string, course: string) => {

    const development = useDevelop()
    const { data, isLoading } = useQuery({
      queryKey: ["topbar", course, chapter],
      queryFn: async () => {
        if (development) return null;
        const query = `/api/getTopBar?course=${course}&chapter=${chapter}`;
        const { data } = await axios.get(query);
        return data;
      },
    })

    if (!isLoading) {
      set(() => ({
        problemsList: data as problemType,
      }));
    }
  },
}));