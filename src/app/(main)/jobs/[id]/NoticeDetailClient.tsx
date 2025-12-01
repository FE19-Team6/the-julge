"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import Badge from "@/src/components/common/Badge/Badge";
import LinkButton from "@/src/components/common/Button/LinkButton";
import Button from "@/src/components/common/Button/Button";
import Modal from "@/src/components/common/ModalPopup/Modal";
import { useState } from "react";

import type { ApplicantItem } from "./types";
import NoticeApplicantList from "./NoticeApplicantList";

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
  userType?: "employee" | "employer";
  hasApplied?: boolean;
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

  /** 백엔드 → 프론트 status 매핑 */
  const mapStatus = (status: string): ApplicantItem["status"] => {
    if (status === "accepted") return "approved";
    if (status === "canceled") return "canceled";
    return status as ApplicantItem["status"];
  };

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [localApplicants, setLocalApplicants] = useState(
    applicants.map((a) => ({
      ...a,
      status: mapStatus(a.status),
    }))
  );

  const [localHasApplied, setLocalHasApplied] = useState(hasApplied);
  const [localApplicationId, setLocalApplicationId] = useState(applicationId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  /** 승인 / 거절 / 대기 */
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

      const msg = {
        approved: "승인되었습니다.",
        rejected: "거절되었습니다.",
        pending: "대기 상태로 변경되었습니다.",
      };
      setModalMessage(msg[newStatus]);
      setIsModalOpen(true);

      setLocalApplicants((prev) =>
        prev.map((item) =>
          item.id === applicationId ? { ...item, status: newStatus } : item
        )
      );
    } catch {
      setModalMessage("처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /** 신청하기 */
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
    } catch {
      setModalMessage("신청 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /** 신청 취소 */
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
    } catch {
      setModalMessage("취소 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /** 비로그인 시 로그인 이동 */
  const handleApplyUnauthenticated = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1600px] px-[238px] py-[60px] flex flex-col gap-[60px]">
          <h1 className="text-xl font-bold">{storeName}</h1>

          {/* 공고 상세 */}
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
              userType === "employer" ? (
                <LinkButton
                  href={`/jobs/${notice.id}/edit`}
                  variant="outline"
                  size="full"
                >
                  편집하기
                </LinkButton>
              ) : userType === "employee" ? (
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
          <div className="w-full bg-gray-10 rounded-xl p-6 leading-relaxed">
            <h2 className="text-lg font-semibold mb-2">공고 설명</h2>
            <p>{description}</p>
          </div>

          {/* 사장님만 → 신청자 목록 */}
          {userType === "employer" && (
            <NoticeApplicantList
              applicants={localApplicants}
              page={page}
              pageSize={5}
              isLoading={isLoading}
              onPageChange={setPage}
              onApprove={(id) => handleStatusChange(id, "approved")}
              onReject={(id) => handleStatusChange(id, "rejected")}
              onPending={(id) => handleStatusChange(id, "pending")}
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        option="confirm"
        message={modalMessage}
        onConfirm={() => setIsModalOpen(false)}
      />
    </>
  );
}
