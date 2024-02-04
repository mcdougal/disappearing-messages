'use client';

import { getExpirationDurationString } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef } from 'react';

import { Button, Textarea } from '@/app/components';

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <form
          ref={formRef}
          action={formAction}
          className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative flex transform flex-col overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex-1">
                  <Dialog.Title
                    as="h3"
                    className="mb-3 text-base font-semibold leading-6 text-gray-900">
                    Make a Post
                  </Dialog.Title>
                  <p className="mb-6 text-sm text-gray-500">
                    Your post will disappear after{` `}
                    {getExpirationDurationString()}. Every upvote or reply will
                    reset the clock.
                  </p>
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      alt={`User avatar for ${sessionUser.name}`}
                      height={32}
                      src={sessionUser.avatarSrc}
                      width={32}
                    />
                    <span className="text-sm">{sessionUser.name}</span>
                  </div>
                  <Textarea
                    autoFocus
                    id="post-textarea"
                    name="text"
                    placeholder="What do you want to say?"
                    rows={12}
                  />
                </div>
                <div className="mt-5 flex justify-end gap-2 sm:mt-6">
                  <Button
                    className="min-w-24"
                    color="secondary"
                    onClick={onClose}
                    size="xl">
                    Cancel
                  </Button>
                  <Button
                    className="min-w-24"
                    onClick={onClose}
                    size="xl"
                    type="submit">
                    Post
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
};

export default CreatePostDialog;
