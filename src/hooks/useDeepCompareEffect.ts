import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

export const useDeepCompareEffect = (
  effect: () => void,
  dependencies: Array<unknown>
) => {
  const dependenciesRef = useRef(dependencies);

  useEffect(() => {
    if (
      !dependenciesRef.current.every((object: unknown, index: number) =>
        isEqual(object, dependencies[index])
      )
    )
      effect();

    dependenciesRef.current = dependencies;
  }, [dependencies, effect]);

  return [dependencies, dependenciesRef];
};
