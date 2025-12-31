import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { ChevronRight as ArrowRightIcon } from "lucide-react";
import threadsIcon from "@assets/threads-icon.svg";
import postIcon from "@assets/post-icon.svg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const LoginActionModal = NiceModal.create(({
  titleModal,
  descriptionModal,
  showIconPost,
}) => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const modal = useModal();

  const handleContinueLogin = () => {
    modal.hide();
    navigate("/login");
  };

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide} className={"p-0"}>
      <DialogContent showCloseButton={false} className={"p-0 bg-background text-foreground transition-colors"}>
        <DialogHeader
          className={
            "flex flex-col items-center justify-center gap-0 p-14 pt-12"
          }
        >
          {showIconPost && (
            <div className="mb-5 filter dark:invert dark:opacity-80 transition-all">
              <img src={postIcon} alt="Post Icon" />
            </div>
          )}
          <DialogTitle
            className={"mb-3 w-full text-center text-[2rem] font-extrabold text-foreground"}
          >
            {titleModal}
          </DialogTitle>
          <DialogDescription
            className={"mb-8 w-[80%] text-center text-[15px] text-muted-foreground"}
          >
            {descriptionModal}
          </DialogDescription>
          <DialogDescription asChild>
            <div
              onClick={handleContinueLogin}
              className={
                "flex w-full cursor-pointer items-center justify-between rounded-xl border border-border p-5 hover:border-muted-foreground hover:shadow-xl transition-all"
              }
            >
              <div>
                <img className="size-11" src={threadsIcon} alt="Threads Icon" />
              </div>
              <div className="text-[15px] text-muted-foreground">
                {t("common:continueWithUsernameOrEmail")}
              </div>
              <div>
                <ArrowRightIcon className="text-muted-foreground" />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});

export default LoginActionModal;
