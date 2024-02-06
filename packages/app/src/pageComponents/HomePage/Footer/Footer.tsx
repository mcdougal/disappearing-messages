import { TextLink, Typography } from '@/app/components';

const Footer = (): React.ReactElement => {
  return (
    <div className="px-4 pb-4 pt-10">
      <Typography color="gray" size="xs">
        Avatars by{` `}
        <TextLink
          href="https://www.freepik.com/free-vector/animal-avatars-flat-design_772910.htm#query=animal%20avatars&position=1&from_view=keyword&track=ais&uuid=90657734-77ac-4a0b-87ed-40823d02fdff"
          target="_blank">
          Freepik
        </TextLink>
      </Typography>
    </div>
  );
};

export default Footer;
