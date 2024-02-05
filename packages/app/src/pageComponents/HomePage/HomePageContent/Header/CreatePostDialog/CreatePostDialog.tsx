'use client';

import { getExpirationDurationString } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/app/components';

import styles from './CreatePostDialog.module.scss';
import getCreatePostFormAction from './getCreatePostFormAction';

type Props = {
  onClose: () => void;
  open: boolean;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const CreatePostDialog = ({
  onClose,
  open,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const formAction = getCreatePostFormAction(
    upsertOptimisticPost,
    formRef,
    sessionUser
  );

  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="invisible fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity sm:visible" />
        </Transition.Child>
        <form
          ref={formRef}
          action={formAction}
          className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative flex transform flex-col overflow-hidden bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:rounded-lg sm:p-6">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      alt={`User avatar for ${sessionUser.name}`}
                      height={32}
                      src={sessionUser.avatarSrc}
                      width={32}
                    />
                    <span className="text-sm">{sessionUser.name}</span>
                  </div>
                  <label
                    className="sr-only"
                    htmlFor="create-post-dialog-textarea">
                    What do you want to say?
                  </label>
                  <div
                    className={twMerge(
                      `after:py-3 after:text-lg after:leading-6`,
                      styles.textAreaContainer
                    )}>
                    <textarea
                      aria-describedby="create-post-dialog-textarea-helper-text"
                      autoFocus
                      className="block w-full resize-none border-0 bg-transparent px-0 py-3 text-lg leading-6 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                      defaultValue=""
                      id="create-post-dialog-textarea"
                      maxLength={255}
                      name="text"
                      onChange={(event): void => {
                        const { parentNode } = event.currentTarget;
                        if (parentNode && parentNode instanceof HTMLElement) {
                          parentNode.dataset.replicatedValue =
                            event.currentTarget.value;
                        }
                      }}
                      placeholder="What do you want to say?"
                      rows={1}
                    />
                  </div>
                </div>
                <p
                  className="mt-3 text-sm text-gray-500"
                  id="create-post-dialog-textarea-helper-text">
                  Your post will disappear after{` `}
                  {getExpirationDurationString()}. Upvotes and comments reset
                  the clock.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    className="flex-1"
                    onClick={onClose}
                    size="xl"
                    type="submit">
                    Post
                  </Button>
                </div>
                <button
                  aria-label="Close"
                  className="absolute right-4 top-5 -mt-1 rounded-full p-2 hover:bg-gray-200 sm:right-6 sm:top-7 sm:-mr-1 sm:-mt-3"
                  onClick={onClose}
                  type="button">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
};

export default CreatePostDialog;
