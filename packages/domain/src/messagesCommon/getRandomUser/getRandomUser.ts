import {
  ANIMAL_AVATAR_CAT,
  ANIMAL_AVATAR_DOG,
  ANIMAL_AVATAR_FOX,
  ANIMAL_AVATAR_GORILLA,
  ANIMAL_AVATAR_KOALA,
  ANIMAL_AVATAR_LION,
  ANIMAL_AVATAR_RABBIT,
  ANIMAL_AVATAR_TIGER,
} from '@/common/static';
import { generateSlug } from 'random-word-slugs';

import { User } from '../types';

const AVATARS = [
  ANIMAL_AVATAR_CAT,
  ANIMAL_AVATAR_DOG,
  ANIMAL_AVATAR_FOX,
  ANIMAL_AVATAR_GORILLA,
  ANIMAL_AVATAR_KOALA,
  ANIMAL_AVATAR_LION,
  ANIMAL_AVATAR_RABBIT,
  ANIMAL_AVATAR_TIGER,
];

export default (): User => {
  const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  const randomName = generateSlug(2, { format: `title` });

  return {
    avatarSrc: randomAvatar,
    name: randomName,
  };
};
