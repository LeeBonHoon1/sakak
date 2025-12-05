import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검진 결과 리스트 | Sakak",
  description:
    "건강검진 결과 리스트를 확인하세요. 검진일, 기관명 등 검진 이력을 한눈에 볼 수 있습니다.",
  keywords: ["건강검진", "검진 결과", "검진 이력", "건강검진 리스트"],
  openGraph: {
    title: "검진 결과 리스트 | Sakak",
    description:
      "건강검진 결과 리스트를 확인하세요. 검진일, 기관명 등 검진 이력을 한눈에 볼 수 있습니다.",
    type: "website",
  },
};

export default function CheckupListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
