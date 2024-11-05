import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Flex,
  Button,
  Modal,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";

export const AccountantApplicationBox = ({
  user,
  RequestStatus,
  createdAt,
  updatedAt,
  _id,
}) => {
  const createdAtRelative = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ar,
  });
  const updatedAtRelative = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    locale: ar,
  });

  return (
    <Box
      p={6}
      w="md"
      maxW="100%"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      textAlign="right"
      transition="0.3s"
      _hover={{
        translate: "0% -7px",
        boxShadow: "xl",
      }}
    >
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            تفاصيل المستخدم
          </Text>
          <Text>الاسم: {user?.firstName}</Text>
          <Text>البريد الإلكتروني: {user?.email}</Text>
          <Text>الوظيفة: {user?.title}</Text>
          <Text>الدور: {user?.role}</Text>
        </Box>

        <HStack>
          <Text fontWeight="bold">حالة الطلب:</Text>
          <Tag
            colorScheme={(() => {
              if (RequestStatus === "pending") {
                return "yellow";
              } else if (RequestStatus === "approved") {
                return "green";
              } else {
                return "red";
              }
            })()}
          >
            <TagLabel>
              {(() => {
                if (RequestStatus === "pending") {
                  return "قيد الانتظار";
                } else if (RequestStatus === "approved") {
                  return "تم الموافقة عليه";
                } else {
                  return "لم يتم الموافقة عليه";
                }
              })()}
            </TagLabel>
          </Tag>
        </HStack>

        <HStack>
          <Text fontWeight="bold">تاريخ الإنشاء:</Text>
          <Text>{createdAtRelative}</Text>
        </HStack>

        <HStack>
          <Text fontWeight="bold">آخر تحديث:</Text>
          <Text>{updatedAtRelative}</Text>
        </HStack>

        <Flex wrap="wrap" gap="3">
          <Button colorScheme="blue" as={Link} to={_id}>
            المشاهدة
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
