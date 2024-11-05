import {
  Flex,
  Heading,
  HStack,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdQuiz } from "react-icons/md";
import { Pagination } from "../../../../Components/Common/Pagination/Pagination";
import { useFetch } from "../../../../Hooks/useFetch/useFetch";
import { useAuth } from "../../../../Context/UserDataContextProvider/UserDataContextProvder";
import { CompanyApplicationBox } from "./Components/CompanyApplicationBox/CompanyApplicationBox";
import NoDataImage from "../../../../Assets/NoData/9264822.jpg";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export default function Index() {
  const { user } = useAuth();
  const [RequeistedStatus, setRequestedStatus] = useState("pending");
  const [page, setPage] = useState(1);

  const { data, loading } = useFetch({
    endpoint: "/company",
    params: {
      RequestStatus: RequeistedStatus || "pending",
      limit: 6,
      page,
    },
    headers: {
      Authorization: `Bearer ${user.data.token}`,
    },
  });

  return (
    <Stack w="100%" p="3">
      <HStack
        justifyContent="space-between"
        p="4"
        borderRadius="md"
        bgColor="gray.100"
        flexWrap="wrap"
        gap="5"
      >
        <Heading
          color="blue.800"
          display="flex"
          gap="3"
          alignItems="center"
          size="md"
        >
          اهلا بك في طلبيات الشركات
          <MdQuiz />
        </Heading>
        <Flex>
          <Flex gap="3" alignItems="center">
            <Text>حالة الطلب</Text>
            <Select
              onChange={(e) => {
                setRequestedStatus(e.target.value);
                setPage(1);
              }}
              w="200px"
              bgColor="white"
            >
              <option value="pending">معلق</option>
              <option value="approved">تم الوفوق عليه</option>
              <option value="rejected">تم رفضه</option>
            </Select>
          </Flex>
        </Flex>
      </HStack>
      <Flex
        h="auto"
        flexShrink="0"
        minH="400px"
        flexWrap="wrap"
        as={Skeleton}
        gap="4"
        w="100%"
        isLoaded={!loading}
        justifyContent="center"
        alignItems="center"
      >
        {data?.data?.map((application) => {
          return (
            <CompanyApplicationBox key={application._id} {...application} />
          );
        })}
        {data?.data?.length === 0 && (
          <Stack gap="3" alignItems="center">
            <LazyLoadedImage w="100%" maxW="400px" src={NoDataImage} />
            <Heading size="md">لا يوجد بيانات لعرضها</Heading>
          </Stack>
        )}
      </Flex>

      <Pagination
        totalPages={data?.paginationResult?.numberOfPages}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </Stack>
  );
}
