import Button from "@/src/components/common/Button/Button";

interface SignupButtonProps {
  onClick: () => void;
}

export default function SignupButton({ onClick }: SignupButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="full"
    >
      회원가입
    </Button>
  );
}
