"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";
import { CheckupStep1 } from "@/features/checkup/components/checkup-step1";
import { CheckupStep2 } from "@/features/checkup/components/checkup-step2";
import { CheckupStep3 } from "@/features/checkup/components/checkup-step3";
import { CheckupStep4 } from "@/features/checkup/components/checkup-step4";
import { CheckupStep5 } from "@/features/checkup/components/checkup-step5";
import { CheckupStep6 } from "@/features/checkup/components/checkup-step6";
import { CheckupStep7 } from "@/features/checkup/components/checkup-step7";
import { CheckupStep8 } from "@/features/checkup/components/checkup-step8";

type CheckupFormProps = {
  formRef?: React.RefObject<HTMLFormElement | null>;
};

const CheckupForm = ({ formRef }: CheckupFormProps) => {
  const { currentStep, prevStep, onSubmit, isSubmitting } = useCheckupForm();

  const STEPS = [
    { title: "기본 정보", component: <CheckupStep1 /> },
    { title: "통신사 선택", component: <CheckupStep2 /> },
    { title: "조회 기간 설정", component: <CheckupStep3 /> },
    { title: "조회 타입 선택", component: <CheckupStep4 /> },
    { title: "조회 중", component: <CheckupStep5 /> },
    { title: "본인인증 필요", component: <CheckupStep6 /> },
    { title: "조회 실패", component: <CheckupStep7 /> },
    { title: "조회 완료", component: <CheckupStep8 /> },
  ];

  const direction = currentStep > prevStep ? 1 : -1;
  const CURRENT_COMPONENT =
    STEPS[currentStep - 1]?.component || STEPS[0].component;

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isSubmitting && currentStep >= 1 && currentStep <= 4) {
          onSubmit();
        }
      }}
      className="min-h-full flex flex-col"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.3 }}
        >
          {CURRENT_COMPONENT}
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default CheckupForm;
