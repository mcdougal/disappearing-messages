'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/app/components';

import {
  CommentContent,
  CommentHeader,
  PostContent,
  PostHeader,
} from '../components';

import getCreateCommentFormAction from './getCreateCommentFormAction';
import styles from './ReadPostDialog.module.scss';

type Props = {
  onClose: () => void;
  open: boolean;
  post: PostsFeedPost;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const ReadPostDialog = ({
  onClose,
  open,
  post,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const commentFormRef = useRef<HTMLFormElement>(null);
  const commentFormAction = getCreateCommentFormAction(
    upsertOptimisticPost,
    commentFormRef,
    sessionUser,
    post
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
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-full justify-center text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative w-full transform bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:rounded-lg sm:p-6">
                <div className="pb-20">
                  <div className="mb-10">
                    <PostHeader
                      onOpenComments={null}
                      post={post}
                      sessionUser={sessionUser}
                      upsertOptimisticPost={upsertOptimisticPost}
                    />
                    <PostContent post={post} />
                  </div>
                  {post.comments.length === 0 ? (
                    <p className="text-sm text-gray-400">No comments</p>
                  ) : (
                    <>
                      {post.comments.map((comment) => {
                        return (
                          <div
                            key={comment.id}
                            className="border-t border-gray-100 py-4 last:border-b md:py-6">
                            <CommentHeader comment={comment} />
                            <CommentContent comment={comment} />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex gap-2 bg-white p-3">
                  <Button
                    className="flex-1"
                    color="secondary"
                    onClick={onClose}
                    size="lg">
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    color="secondary"
                    onClick={(): void => {
                      setCommentFormOpen(true);
                    }}
                    size="lg">
                    Comment
                  </Button>
                </div>
                <div
                  className={twMerge(
                    `absolute bottom-0 left-0 right-0 overflow-hidden`,
                    commentFormOpen ? `visible` : `invisible`
                  )}>
                  <form
                    ref={commentFormRef}
                    action={commentFormAction}
                    className="bt-gray-200 w-full border-t bg-white p-3">
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
                          autoFocus={commentFormOpen}
                          className="block w-full resize-none overflow-hidden border-0 bg-transparent px-0 py-3 text-lg leading-6 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                          defaultValue=""
                          id="create-post-dialog-textarea"
                          maxLength={255}
                          name="text"
                          onChange={(event): void => {
                            const { parentNode } = event.currentTarget;
                            if (
                              parentNode &&
                              parentNode instanceof HTMLElement
                            ) {
                              parentNode.dataset.replicatedValue =
                                event.currentTarget.value;
                            }
                          }}
                          placeholder="What do you want to say?"
                          rows={6}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        className="flex-1"
                        onClick={(): void => {
                          setCommentFormOpen(false);
                        }}
                        size="xl"
                        type="submit">
                        Comment
                      </Button>
                    </div>
                    <button
                      aria-label="Close"
                      className="absolute right-5 top-6 -mt-1 rounded-full p-1 hover:bg-gray-200 sm:right-7 sm:top-8 sm:-mr-1 sm:-mt-3"
                      onClick={(): void => {
                        setCommentFormOpen(false);
                      }}
                      type="button">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReadPostDialog;
