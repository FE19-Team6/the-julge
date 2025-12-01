"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import Badge from "@/src/components/common/Badge/Badge";
import LinkButton from "@/src/components/common/Button/LinkButton";
import Button from "@/src/components/common/Button/Button";
import Pagination from "@/src/components/Pagination/Pagination";
import Modal from "@/src/components/common/ModalPopup/Modal";
import { useState } from "react";
import type { ApplicantItem } from "./types";

interface NoticeDetailProps {
  notice: {
    id: string;
    storeName: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    imageUrl: string;
    address: string;
    badge: {
      variant: "increase" | "middle" | "ended";
      label: string;
    } | null;
  };
  applicants?: ApplicantItem[];
  shopId: string;
  userType?: "employee" | "employer" | undefined;
  hasApplied?: boolean; // 이미 신청했는지 여부
  applicationId?: string;
}

export default function NoticeDetailClient({
  notice,
  applicants = [],
  shopId,
  userType,
  hasApplied = false,
  applicationId,
}: NoticeDetailProps) {
  const {
    storeName,
    hourlyPay,
    startsAt,
    workhour,
    description,
    imageUrl,
    address,
    badge,
    id,
  } = notice;

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localApplicants, setLocalApplicants] = useState(applicants); // 승인, 거절 로컬상태
  const [localHasApplied, setLocalHasApplied] = useState(hasApplied); //신청하기, 취소하기 로컬 상태
  const [localApplicationId, setLocalApplicationId] = useState(applicationId); // 위에서 신청상태인지 아닌지 데이터 끌어온거 저장

  // 페이지네이션도 localApplicants 사용
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(localApplicants.length / pageSize));
  const paginatedApplicants = localApplicants.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // 승인/거절 핸들러
  const handleStatusChange = async (
    applicationId: string,
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          noticeId: id,
          applicationId,
          status: newStatus === "approved" ? "accepted" : newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMessage(data.message || "처리 실패");
        setIsModalOpen(true);
        return;
      }

      // 메시지 추가
      const messages = {
        approved: "승인되었습니다.",
        rejected: "거절되었습니다.",
        pending: "대기 상태로 변경되었습니다.",
      };
      setModalMessage(messages[newStatus]);
      setIsModalOpen(true);

      // 로컬 상태 업데이트
      setLocalApplicants((prev) =>
        prev.map((item) =>
          item.id === applicationId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      setModalMessage("처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 신청하기 핸들러
  const handleApply = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId, noticeId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMessage(data.message || "신청 실패");
        setIsModalOpen(true);
        return;
      }

      setModalMessage("신청이 완료되었습니다.");
      setIsModalOpen(true);
      setLocalHasApplied(true);
      setLocalApplicationId(data.item.id);
    } catch (error) {
      setModalMessage("신청 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 취소하기 핸들러 추가
  const handleCancel = async () => {
    if (isLoading) return;
    if (!confirm("정말 취소하시겠습니까?")) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          noticeId: id,
          applicationId: localApplicationId,
          status: "canceled",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMessage(data.message || "취소 실패");
        setIsModalOpen(true);
        return;
      }

      setModalMessage("취소되었습니다.");
      setIsModalOpen(true);
      setLocalHasApplied(false);
      setLocalApplicationId(undefined);
    } catch (error) {
      setModalMessage("취소 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 확인 버튼 핸들러
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // shouldReload 로직 삭제
  };

  // 비로그인 신청하기 핸들러
  const handleApplyUnauthenticated = () => {
    // 로그인 페이지로 이동
    window.location.href = "/login";
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1600px] px-[238px] py-[60px] flex flex-col gap-[60px]">
          <h1 className="text-xl font-bold">{storeName}</h1>

          {/* 공고 상세 카드 */}
          <DetailCardLayout
            type="wage"
            image={imageUrl}
            wage={hourlyPay}
            time={`${startsAt} · ${workhour}시간`}
            location={address}
            description={description}
            badgeSlot={
              badge ? (
                <Badge variant={badge.variant}>{badge.label}</Badge>
              ) : null
            }
            buttonSlot={
              // 3가지 분기
              userType === "employer" ? (
                // 1. 사장님 → 편집하기
                <LinkButton
                  href={`/jobs/${notice.id}/edit`}
                  variant="outline"
                  size="full"
                >
                  편집하기
                </LinkButton>
              ) : userType === "employee" ? (
                // 일반회원 → 신청하기/취소하기
                localHasApplied ? (
                  <Button
                    variant="outline"
                    size="full"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    취소하기
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="full"
                    onClick={handleApply}
                    disabled={isLoading}
                  >
                    신청하기
                  </Button>
                )
              ) : (
                // 비로그인 → 신청하기 (로그인으로 이동)
                <Button
                  variant="primary"
                  size="full"
                  onClick={handleApplyUnauthenticated}
                >
                  신청하기
                </Button>
              )
            }
          />

          {/* 공고 설명 */}
          <div className="w-full bg-gray-10 rounded-xl p-6 text-black leading-relaxed">
            <h2 className="text-lg font-semibold mb-2">공고 설명</h2>
            <p>{description}</p>
          </div>

          {/* 신청자 목록은 사장님만 */}
          {userType === "employer" && (
            <>
              <h2 className="text-lg font-semibold">신청자 목록</h2>
              <div className="w-full border rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 h-[52px] text-gray-700">
                    <tr>
                      <th className="px-4">신청자</th>
                      <th className="px-4">소개</th>
                      <th className="px-4">전화번호</th>
                      <th className="px-4 w-[150px]">상태</th>
                      <th className="px-4 w-[150px]">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localApplicants.length === 0 ? (
                      <tr className="h-[72px] border-t">
                        <td
                          colSpan={5}
                          className="text-center text-gray-500 py-6"
                        >
                          아직 신청자가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      paginatedApplicants.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t h-[72px] align-middle text-gray-800"
                        >
                          <td className="px-4 font-medium">{item.name}</td>
                          <td className="px-4">{item.message}</td>
                          <td className="px-4">{item.phone}</td>
                          <td className="px-4">
                            <Badge
                              variant={
                                item.status === "approved"
                                  ? "success"
                                  : item.status === "rejected"
                                    ? "ended"
                                    : "pending"
                              }
                            >
                              {item.status === "approved"
                                ? "승인됨"
                                : item.status === "rejected"
                                  ? "거절됨"
                                  : "대기중"}
                            </Badge>
                          </td>
                          <td className="px-4 flex gap-2">
                            {/* 조건부 버튼 표시 */}
                            {item.status === "pending" && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusChange(item.id, "approved")
                                  }
                                  disabled={isLoading}
                                >
                                  승인하기
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusChange(item.id, "rejected")
                                  }
                                  disabled={isLoading}
                                >
                                  거절하기
                                </Button>
                              </>
                            )}
                            {(item.status === "approved" ||
                              item.status === "rejected") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(item.id, "pending")
                                }
                                disabled={isLoading}
                              >
                                대기전환
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {localApplicants.length > 0 && (
                <Pagination
                  current={page}
                  total={totalPages}
                  onChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        option="confirm"
        message={modalMessage}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
