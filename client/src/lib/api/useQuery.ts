import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  console.log("i am runnin");
  const [state, setState] = useState<State<TData>>({
    data: null,
  });

  const fetch = useCallback(() => {
    console.log("i am runnin2");

    const fetchApi = async () => {
      console.log("i am runnin3");

      const { data } = await server.fetch<TData>({
        query,
      });
      console.log("i am runnin4 data is back");

      setState({ data });
      console.log("i am runnin5");
    };
    console.log("i am runnin6 and fetch api");

    fetchApi();
    console.log("i am runnin7");
  }, [query]);

  useEffect(() => {
    console.log("i am runnin8");

    fetch();
    console.log("i am runnin9");
  }, [fetch]);
  console.log("i am runnin10");
  console.log(state, "from state");

  return { ...state, refetch: fetch };
};
