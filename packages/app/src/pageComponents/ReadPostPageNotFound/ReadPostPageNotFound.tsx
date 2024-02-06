import { HTTP_404 } from '@/common/static';
import Image from 'next/image';

import { Page } from '@/app/pageUtils';

import BackButton from './BackButton';

const ReadPostPageNotFound: Page = async () => {
  return (
    <main className="grid min-h-full place-items-stretch bg-white px-6 py-6 sm:py-10 lg:px-8">
      <div className="m-auto w-full max-w-screen-sm text-center">
        <div className="relative h-96">
          <Image
            alt="Surreal illustration of a donut-looking character with 404 written on its face"
            fill
            src={HTTP_404}
            style={{ objectFit: `cover` }}
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:mt-16 sm:text-5xl">
          Post deleted
        </h1>
        <p className="mb-10 mt-4 text-base leading-7 text-gray-600">
          You’re too late. Better luck next time.
        </p>
        <BackButton />
      </div>
    </main>
  );
};

export default ReadPostPageNotFound;
