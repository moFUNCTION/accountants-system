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
  Image,
  Center,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";

export const CompanyApplicationBox = ({
  user,
  companyName,
  taxNumber,
  responsiblePersonName,
  responsiblePersonPhone,
  logo,
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
        transform: "translateY(-7px)",
        boxShadow: "xl",
      }}
    >
      <VStack align="stretch" spacing={4}>
        {logo ? (
          <Image
            w="100px"
            h="100px"
            src={logo}
            alt="Company Logo"
            borderRadius="md"
            boxSize="100px"
          />
        ) : (
          <Center p="1" w="100px" h="100px" bgColor="gray.200">
            <Text>شعار الشركة</Text>
          </Center>
        )}

        <Box>
          <Text fontWeight="bold" fontSize="lg">
            تفاصيل المستخدم
          </Text>
          <Text>الاسم: {user?.firstName}</Text>
          <Text>البريد الإلكتروني: {user?.email}</Text>
          <Text>الوظيفة: {user?.title}</Text>
          <Text>الدور: {user?.role}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg">
            تفاصيل الشركة
          </Text>
          <Text>اسم الشركة: {companyName}</Text>
          <Text>رقم الضريبة: {taxNumber}</Text>
          <Text>اسم المسؤول: {responsiblePersonName}</Text>
          <Text>هاتف المسؤول: {responsiblePersonPhone}</Text>
        </Box>

        <HStack>
          <Text fontWeight="bold">حالة الطلب:</Text>
          <Tag
            colorScheme={
              RequestStatus === "pending"
                ? "yellow"
                : RequestStatus === "approved"
                ? "green"
                : "red"
            }
          >
            <TagLabel>
              {RequestStatus === "pending"
                ? "قيد الانتظار"
                : RequestStatus === "approved"
                ? "تم الموافقة عليه"
                : "لم يتم الموافقة عليه"}
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
