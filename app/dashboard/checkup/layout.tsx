import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "건강검진 조회 결과 | Sakak",
  description:
    "건강검진 결과를 확인하고 건강 상태를 분석해보세요. 검사 항목별 상태, 건강 상태 요약, 검진 개요를 한눈에 확인할 수 있습니다.",
  keywords: [
    "건강검진",
    "건강검진 조회",
    "건강 상태",
    "검진 결과",
    "건강 분석",
  ],
  openGraph: {
    title: "건강검진 조회 결과 | Sakak",
    description:
      "건강검진 결과를 확인하고 건강 상태를 분석해보세요. 검사 항목별 상태, 건강 상태 요약, 검진 개요를 한눈에 확인할 수 있습니다.",
    type: "website",
  },
};

export default function CheckupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
