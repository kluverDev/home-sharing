import { useState, useEffect } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  console.log("i am runnin");

  const [state, setState] = useState<State<TData>>({
    data: null,
  });
  useEffect(() => {
    console.log("i am running inside effect1");

    const fetchApi = async () => {
      console.log("i am running inside happy");

      const { data } = await server.fetch<TData>({ query });
      console.log("i am baby girl");

      setState({ data });
      console.log("i am running inside effect");
    };
    console.log("i am running inside effect2");

    fetchApi();
  }, [query]);
  console.log("i am running near state");
  console.log(state, "fromstate");

  return state;
};
