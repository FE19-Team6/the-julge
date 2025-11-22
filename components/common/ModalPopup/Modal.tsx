"use client";

import Button from "../Button/Button";

import CheckIcon from "@/src/assets/check.svg";
import ExclamationIcon from "@/src/assets/exclamation.svg";

export interface ModalProps {
  isOpen: boolean;
  option: "confirm" | "action";
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Modal = ({
  isOpen,
  option,
  message,
  onConfirm,
  onCancel,
}: ModalProps) => {
  if (!isOpen) return null;

  const isConfirm = option === "confirm";
  const isAction = option === "action";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[320px] rounded-xl shadow-lg p-6 flex flex-col items-center gap-6">
        {/* SVG Component */}
        <div className="w-10 h-10 flex items-center justify-center">
          {isConfirm ? (
            <ExclamationIcon className="w-full h-full" />
          ) : (
            <CheckIcon className="w-full h-full" />
          )}
        </div>

        {/* Text */}
        <p className="text-center text-base text-gray-800 whitespace-pre-line">
          {message}
        </p>

        {/* Buttons */}
        {isConfirm && (
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={onConfirm}
          >
            확인
          </Button>
        )}

        {isAction && (
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onCancel}
            >
              아니오
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={onConfirm}
            >
              예
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
