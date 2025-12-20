import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/Common/ui/dialog";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

/**
 * BlockUserModal component
 * This modal allows users to block another user.
 * It matches the design provided in the image.
 */
const Modal = NiceModal.create(({ username, onBlock }) => {
  const modal = useModal();

  const handleCancel = () => {
    modal.hide();
  };

  const handleBlock = () => {
    onBlock?.();
    modal.hide();
  };

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="flex w-[300px] flex-col overflow-hidden rounded-[20px] border-none bg-white p-0 text-black shadow-xl"
      >
        <div className="flex flex-col items-center px-6 pt-4 pb-4 gap-4 text-center">
          <h2 className="text-[16px] font-bold">Block {username}?</h2>
          <p className="mt-4 text-[15px] leading-tight text-gray-400">
            {username} won&apos;t be able to find your profile or content. No
            one will see their replies to your posts, and they won&apos;t be
            notified that you blocked them.
          </p>
        </div>

        <div className="flex border-t border-gray-100">
          <button
            onClick={handleCancel}
            className="flex-1 py-3.5 text-[17px] border font-medium text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Cancel
          </button>
          <div className="w-[1px] bg-gray-100" />
          <button
            onClick={handleBlock}
            className="flex-1 py-3.5 text-[17px] border font-bold text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Block
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const BlockUserModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};

