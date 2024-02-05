import { Container, Typography } from '@/app/components';

import ButtonDemos from './ButtonDemos';
import ContainerDemos from './ContainerDemos';
import IconButtonDemos from './IconButtonDemos';
import TextareaDemos from './TextareaDemos';
import TypographyDemos from './TypographyDemos';

const AdminComponents = (): React.ReactElement => {
  return (
    <Container className="pb-40 pt-8" size="xl">
      <Typography as="h1" className="mb-14" size="5xl">
        Components
      </Typography>
      <TypographyDemos />
      <ButtonDemos />
      <IconButtonDemos />
      <TextareaDemos />
      <ContainerDemos />
    </Container>
  );
};

export default AdminComponents;
