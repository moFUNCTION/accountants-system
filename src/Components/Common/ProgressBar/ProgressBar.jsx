import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import SuccessAnimation from "../../../Assets/SuccessAnimation/SuccessAnimation.json";
import Lottie from "lottie-react";
import { numberToOrdinal } from "../../../Utils/NumberToOrdinal/NumberToOrdinal";
export const ProgressBar = ({ steps, colortheme, size, current, ...rest }) => {
  return (
    <Flex
      sx={{
        direction: "ltr !important",
      }}
      gap="3"
      {...rest}
    >
      {Array.from({ length: steps }).map((_, index) => {
        return (
          <Flex alignItems="center" gap="2" key={index}>
            <Tooltip label={`الخطوة ${numberToOrdinal(index + 1)}`}>
              <IconButton
                size={size}
                borderRadius="full"
                colorScheme={index + 1 < current ? "green" : "blue"}
                variant={index + 1 <= current ? "solid" : "outline"}
                transition="0.3s"
                pos="relative"
              >
                {index + 1 < current ? (
                  <Lottie
                    animationData={SuccessAnimation}
                    loop={false}
                    style={{
                      position: "absolute",
                      inset: "0px",
                      width: "100%",
                      height: "100%",
                      flexGrow: "1",
                    }}
                  />
                ) : (
                  <span>{index + 1}</span>
                )}
              </IconButton>
            </Tooltip>
            {index + 1 !== steps && <BsArrowRight style={{ color: "blue" }} />}
          </Flex>
        );
      })}
    </Flex>
  );
};
