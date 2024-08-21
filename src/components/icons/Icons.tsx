import {
  IconVideo,
  IconMicrophone2,
  IconArrowRight,
  IconVideoOff,
  IconVector,
  IconVectorOff,
  IconMicrophone2Off,
  IconCopy,
  IconCopyOff,
  IconLayoutBoardSplit,
  IconDeviceTv,
  IconBrandVlc,
  IconAppWindow,
  IconCast
} from '@tabler/icons-react';

interface IClassName {
  className: string;
}

const pickIcon = {
  IconVideoOff: ({ className }: IClassName) => (
    <IconVideoOff className={className} />
  ),
  IconVideo: ({ className }: IClassName) => <IconVideo className={className} />,
  IconMicrophone2Off: ({ className }: IClassName) => (
    <IconMicrophone2Off className={className} />
  ),
  IconMicrophone2: ({ className }: IClassName) => (
    <IconMicrophone2 className={className} />
  ),
  IconVector: ({ className }: IClassName) => (
    <IconVector className={className} />
  ),
  IconVectorOff: ({ className }: IClassName) => (
    <IconVectorOff className={className} />
  ),
  IconArrowRight: ({ className }: IClassName) => (
    <IconArrowRight className={className} />
  ),
  IconCopy: ({ className }: IClassName) => <IconCopy className={className} />,
  IconCopyOff: ({ className }: IClassName) => (
    <IconCopyOff className={className} />
  ),
  IconLayoutBoardSplit: ({ className }: IClassName) => (
    <IconLayoutBoardSplit className={className} />
  ),
  IconDeviceTv: ({ className }: IClassName) => (
    <IconDeviceTv className={className} />
  ),
  IconBrandVlc: ({ className }: IClassName) => (
    <IconBrandVlc className={className} />
  ),
  IconAppWindow: ({ className }: IClassName) => (
    <IconAppWindow className={className} />
  ),
  IconCast: ({ className }: IClassName) => <IconCast className={className} />
};

interface IIcons {
  name: keyof typeof pickIcon;
  className: string;
}

export default function Icons({ name, className }: IIcons) {
  return <>{pickIcon[name]({ className })}</>;
}
