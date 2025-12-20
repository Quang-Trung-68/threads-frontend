import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/Common/ui/dialog";
import { ChevronRight, X, ChevronLeft } from "lucide-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const REPORT_REASONS = [
  "spam",
];

const Modal = NiceModal.create(({ postId, onReport }) => {
  const modal = useModal();

  const handleCancel = () => {
    modal.hide();
  };

  const handleSelectReason = (reason) => {
    onReport?.({
      reason: reason,
      description: `Reported for: ${reason}`,
    });
    modal.hide();
  };

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="flex h-[90vh] w-full max-w-[500px] flex-col overflow-hidden rounded-[20px] border-none bg-white p-0 text-black shadow-xl sm:h-auto sm:max-h-[85vh]"
      >
        <div className="relative flex items-center justify-between border-b px-4 py-3">
          <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="size-6" />
          </button>
          <h2 className="text-[17px] font-bold">Report</h2>
          <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto">
          <div className="flex flex-col items-center px-8 py-8 text-center">
            <h3 className="text-[20px] font-bold">Why are you reporting this post?</h3>
            <p className="mt-3 text-[15px] leading-tight text-gray-500">
              Your report is anonymous. If someone is in immediate danger, call the local emergency services - don't wait.
            </p>
          </div>

          <div className="flex flex-col pb-4">
            {REPORT_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => handleSelectReason(reason)}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <span className="text-[16px] text-left">{reason}</span>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const ReportPostModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
