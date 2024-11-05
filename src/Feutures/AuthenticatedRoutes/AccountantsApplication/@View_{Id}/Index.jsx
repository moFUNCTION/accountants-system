const QuestionsTranslator = {
  branchesOfAccounting: {
    description: "ما هي فروع المحاسبة التي تعرفها؟",
  },
  suggestionsForCapitalFlow: {
    description:
      "ما الاقتراحات التي وفرتها/ستوفرها لتحسين تدفق رأس مال الشركة العامل؟",
  },
  handlingPressure: {
    description: "كيف تتعامل مع الضغط مع الحفاظ على دقة الحسابات؟",
  },
  purchasesToCapital: {
    description: "متى تتحول المشتريات إلى رأس مال لا مصروفات؟",
  },
  accrualVsCashAccounting: {
    description:
      "ما الفرق بين المحاسبة على أساس الاستحقاق والمحاسبة على الأساس النقدي؟",
  },
  negativeImpactFactors: {
    description:
      "ما هي الأسباب الرئيسية التي يمكن أن تؤثر بالسلب على إعداد القوائم المالية؟",
  },
  revenueVsCapitalExpenditures: {
    description: "ما الفرق بين المصروفات الإيرادية والمصروفات الرأسمالية؟",
  },
  costTypesInCostAccounting: {
    description: "ما هي أنواع التكاليف داخل محاسبة التكاليف؟",
  },
  analyzeVariableFixedCosts: {
    description: "كيف تقوم بتحليل التكاليف المتغيرة والثابتة؟",
  },
  treasuryChallenges: {
    description:
      "ما أبرز المشكلات والتحديات التي يُمكن أن يوجهها محاسب الخزينة؟ وكيف يُمكن التعامل معها؟",
  },
};
import {
  Skeleton,
  Stack,
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Flex,
  Button,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFetch } from "../../../../Hooks/useFetch/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/UserDataContextProvider/UserDataContextProvder";
import { formatDistanceToNow } from "date-fns";
import { ar, da } from "date-fns/locale";
import { MdAdd } from "react-icons/md";
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
  const Navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { user } = useAuth();
  const { id } = useParams();
  const { data, loading, error } = useFetch({
    endpoint: `accountantApplications/${id}`,
    headers: {
      Authorization: `Bearer ${user.data.token}`,
    },
  });

  const {
    user: userRequestedData,
    RequestStatus,
    createdAt,
    updatedAt,
    __v,
    _id,
    ...QuetionsFields
  } = data.data ? data?.data : {};

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

  const {
    sendRequest: ApproveRequest,
    loading: ApproveRequestLoading,
    error: ApproveRequestError,
  } = useApiRequest();
  const HandleApprove = async () => {
    await ApproveRequest({
      url: `/accountantApplications/${_id}/accept`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      method: "put",
    });
    Navigate("/accounants-applications");
    toast({
      title: "تم الموافقة علي الطلب بنجاح",
      status: "success",
    });
  };
  const [reason, setReason] = useState("");

  const {
    sendRequest: DisApproveRequest,
    loading: DisApproveRequestLoading,
    error: DisApproveRequestError,
  } = useApiRequest();
  const HandleDisApprove = async () => {
    await DisApproveRequest({
      url: `/accountantApplications/${_id}/reject`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      body: {
        reason,
      },
      method: "put",
    });
    Navigate("/accounants-applications");
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
        onSubmit={HandleDisApprove}
        isLoading={DisApproveRequestLoading}
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
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              تفاصيل المستخدم
            </Text>
            <Text>الاسم: {userRequestedData?.firstName}</Text>
            <Text>البريد الإلكتروني: {userRequestedData?.email}</Text>
            <Text>الوظيفة: {userRequestedData?.title}</Text>
            <Text>الدور: {userRequestedData?.role}</Text>
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
        </VStack>
        <Stack gap="3" p="4" bgColor="gray.100">
          <Heading size="md">اجابات الاسئلة</Heading>
          {Object.keys(QuetionsFields).map((item) => {
            return (
              <Stack gap="3" bgColor="white" p="3" key={item}>
                <Heading display="flex" alignItems="center" gap="3" size="sm">
                  <MdAdd />
                  {QuestionsTranslator[item].description}
                </Heading>
                <Text>الاجابة : {QuetionsFields[item]}</Text>
              </Stack>
            );
          })}
        </Stack>
        <Flex gap="3">
          {RequestStatus === "pending" && (
            <>
              <Button
                isLoading={ApproveRequestLoading}
                colorScheme="green"
                onClick={HandleApprove}
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
