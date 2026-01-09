import { ComponentType } from 'react';
import { RiPenNibLine, RiLayoutMasonryLine, RiCheckboxLine } from 'react-icons/ri';

export interface BannerCard {
  Icon: ComponentType<{ size?: number }>;
  iconSize: number;
  title: string;
  description: string;
}

export const bannerCards: BannerCard[] = [
  {
    Icon: RiPenNibLine,
    iconSize: 24,
    title: 'Design',
    description: 'My focus is on delivering engaging and impactful digital content.'
  },
  {
    Icon: RiLayoutMasonryLine,
    iconSize: 24,
    title: 'Development',
    description: 'I stay at forefront of technological advancements, ensuring your digital presence performant.'
  },
  {
    Icon: RiCheckboxLine,
    iconSize: 24,
    title: 'Testing & QA',
    description: 'I understand that your digital presence should not just look good, it should deliver traffic & engagement.'
  }
];
