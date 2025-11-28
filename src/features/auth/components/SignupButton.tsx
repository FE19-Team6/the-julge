import Button from "@/src/components/common/Button/Button";

interface SignupButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function SignupButton({ onClick, type = "button" }: SignupButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={type}         
      variant="primary"
      size="full"
    >
      회원가입
    </Button>
  );
}
