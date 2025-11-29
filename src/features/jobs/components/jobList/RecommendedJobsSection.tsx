"use client";

import CardList from "@/src/components/common/Card/CardList";
import { useNotices } from "../../hooks/useNotices";
import { useEffect, useState } from "react";
import { CardProps } from "@/src/components/common/Card/Card";

type Props = {
  initialData: CardProps[];
  initialAddress: string;
};

export const RecommendedJobsSection = ({
  initialData,
  initialAddress,
}: Props) => {
  const [address, setAddress] = useState(initialAddress);
  const { notices, isLoading, error, axiosNotices } = useNotices();

  useEffect(() => {
    axiosNotices({ address });
  }, [address]);

  const list = notices.length ? notices : initialData;

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <section className="w-full py-[60px] flex justify-center bg-red-10">
      <div className="w-full max-w-[964px]">
        <h2 className="mb-6 text-h2">맞춤 공고</h2>

        <CardList items={list}></CardList>
      </div>
    </section>
  );
};
