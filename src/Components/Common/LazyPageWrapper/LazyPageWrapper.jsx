import React, { Suspense } from "react";
import { CenteredCircularProgress } from "../CenteredCircularProgress/CenteredCircularProgress";
import { Progress } from "@chakra-ui/react";

export const LazyPageWrapper = ({
  children,
  Loader = <CenteredCircularProgress />,
}) => {
  return (
    <Suspense
      fallback={
        <>
          <Progress
            pos="fixed"
            top="0"
            w="100%"
            size="xs"
            h="5px"
            isIndeterminate
          />
          {Loader}
        </>
      }
    >
      {children}
    </Suspense>
  );
};