import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Flex,
  Button,
  Stack,
  Heading,
  Skeleton,
  Image,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { useAuth } from "../../../../Context/UserDataContextProvider/UserDataContextProvder";
import { useFetch } from "../../../../Hooks/useFetch/useFetch";
import { useApiRequest } from "../../../../Hooks/useApiRequest/useApiRequest";
const DisapproveModal = ({
  isOpen,
  onClose,
  onSubmit,
  onChangeReason,
  reason,
  isLoading,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>عدم الموافقة علي الطلب</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={reason}
            placeholder="السبب"
            onChange={onChangeReason}
          />
        </ModalBody>
        <ModalFooter gap="3">
          <Button colorScheme="blue" onClick={onClose}>
            غلق
          </Button>
          <Button colorScheme="red" onClick={onSubmit} isLoading={isLoading}>
            ارسال
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default function Index() {
  const navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { user } = useAuth();
  const { id } = useParams();
  const { data, loading, error } = useFetch({
    endpoint: `company/${id}`,
    headers: {
      Authorization: `Bearer ${user.data.token}`,
    },
  });

  const {
    user: userRequestedData,
    RequestStatus,
    createdAt,
    updatedAt,
    companyName,
    taxNumber,
    responsiblePersonName,
    responsiblePersonPhone,
    logo,
    _id,
  } = data?.data || {};

  const createdAtRelative =
    data?.data &&
    formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
      locale: ar,
    });
  const updatedAtRelative =
    data?.data &&
    formatDistanceToNow(new Date(updatedAt), {
      addSuffix: true,
      locale: ar,
    });

  const { sendRequest: ApproveRequest, loading: ApproveRequestLoading } =
    useApiRequest();
  const handleApprove = async () => {
    await ApproveRequest({
      url: `/company/${_id}/accept`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      method: "put",
    });
    navigate("/accounants-applications");
    toast({
      title: "تم الموافقة علي الطلب بنجاح",
      status: "success",
    });
  };

  const [reason, setReason] = useState("");

  const { sendRequest: DisapproveRequest, loading: DisapproveRequestLoading } =
    useApiRequest();
  const handleDisapprove = async () => {
    await DisapproveRequest({
      url: `/company/${_id}/reject`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      body: {
        reason,
      },
      method: "put",
    });
    navigate("/companies-applications");
    toast({
      title: "تم رفض الطلب بنجاح",
      status: "success",
    });
  };

  const {
    isOpen: isOpenDisapprovalModal,
    onOpen: onOpenDisapprovalModal,
    onClose: onCloseDisapprovalModal,
  } = useDisclosure();

  return (
    <>
      <DisapproveModal
        isOpen={isOpenDisapprovalModal}
        onClose={onCloseDisapprovalModal}
        onChangeReason={(e) => setReason(e.target.value)}
        reason={reason}
        onSubmit={handleDisapprove}
        isLoading={DisapproveRequestLoading}
      />
      <Stack w="100%" p="4" as={Skeleton} isLoaded={!loading}>
        <Heading
          color="blue.900"
          size="lg"
          borderBottom="2px"
          p="3"
          borderBottomColor="blue.900"
        >
          تفاصيل الطلب
        </Heading>
        <VStack p="4" align="stretch" spacing={4}>
          {logo && (
            <Image
              src={logo}
              alt="Company Logo"
              borderRadius="md"
              boxSize="100px"
            />
          )}

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              تفاصيل المستخدم
            </Text>
            <Text>الاسم: {userRequestedData?.firstName}</Text>
            <Text>البريد الإلكتروني: {userRequestedData?.email}</Text>
            <Text>الوظيفة: {userRequestedData?.title}</Text>
            <Text>الدور: {userRequestedData?.role}</Text>
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
        </VStack>

        <Flex gap="3">
          {RequestStatus === "pending" && (
            <>
              <Button
                isLoading={ApproveRequestLoading}
                colorScheme="green"
                onClick={handleApprove}
              >
                الموافقة عليه
              </Button>
              <Button onClick={onOpenDisapprovalModal} colorScheme="red">
                الرفض
              </Button>
            </>
          )}
          {RequestStatus === "rejected" && (
            <Button colorScheme="red">تم رفضو</Button>
          )}
          {RequestStatus === "approved" && (
            <Button colorScheme="green">تم قبولو</Button>
          )}
          <Button colorScheme="red" variant="outline">
            حذف
          </Button>
        </Flex>
      </Stack>
    </>
  );
}
