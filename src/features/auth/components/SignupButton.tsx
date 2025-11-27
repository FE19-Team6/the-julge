import Button from "@/src/components/common/Button/Button";

interface SignupButtonProps {
  type?: "button" | "submit"
  onClick?: () => void;
}

export default function SignupButton({ type = "button" }: SignupButtonProps) {
  return (
    <Button
      type={type}
      variant="primary"
      size="full"
    >
      회원가입
    </Button>
  );
}
